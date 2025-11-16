const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --------------------------
// HELPERS
// --------------------------

function bumpVersion(version, level) {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  if (!semverRegex.test(version)) {
    console.error(`Versão inválida: "${version}". Use formato X.Y.Z`);
    process.exit(1);
  }

  const [major, minor, patch] = version.split(".").map(Number);

  switch (level) {
    case "major": return `${major + 1}.0.0`;
    case "minor": return `${major}.${minor + 1}.0`;
    case "patch": return `${major}.${minor}.${patch + 1}`;
    default:
      console.error("Tipo inválido. Use: major | minor | patch");
      process.exit(1);
  }
}

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function getLastTag() {
  try {
    return execSync("git describe --tags --abbrev=0").toString().trim();
  } catch {
    return null;
  }
}

function generateChangelog(prevTag, newVersion) {
  let log = prevTag
    ? execSync(`git log ${prevTag}..HEAD --pretty=format:"- %s"`).toString()
    : execSync(`git log --pretty=format:"- %s"`).toString();

  if (!log.trim()) log = "- No changes available";

  return `## Version ${newVersion}\n${new Date().toISOString()}\n\n${log}\n`;
}

// --------------------------
// MAIN
// --------------------------

(async () => {
  const arg1 = process.argv[2];     // patch | minor | major | android
  const buildProfile = process.argv[3];   // production | preview | development
  const platform = process.argv[4]; // ios (apenas para builds iOS)

  // ----------------------------
  // ANDROID BUILD (sem versão nova)
  // ----------------------------
  if (arg1 === "android") {
    const lastTag = getLastTag();

    if (!lastTag) {
      console.error("Não há tag criada ainda. Execute o build do iOS primeiro.");
      process.exit(1);
    }

    const appJson = JSON.parse(fs.readFileSync("app.json", "utf8"));
    if ("v" + appJson.expo.version !== lastTag) {
      console.error(
        `A versão do app.json (${appJson.expo.version}) não bate com a última tag (${lastTag}).`
      );
      console.error("Execute primeiro o build do iOS.");
      process.exit(1);
    }

    console.log(`\n✔ Usando versão: ${appJson.expo.version} (tag ${lastTag})`);
    run(`eas build --profile ${buildProfile} --platform android`);
    return;
  }

  // ----------------------------
  // iOS BUILD (gera versão nova)
  // ----------------------------

  if (!arg1 || !buildProfile || !platform) {
    console.log(`
Uso incorreto!

iOS (gera versão nova):
  node build.js patch production ios

Android (usa a mesma versão):
  node build.js android production
`);
    process.exit(1);
  }

  if (platform !== "ios") {
    console.error("Para gerar versão nova, use: ios");
    process.exit(1);
  }

  const incrementType = arg1;

  // 1) Atualiza versão
  const appJsonPath = path.join(__dirname, "app.json");
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
  const oldVersion = appJson.expo.version;

  const newVersion = bumpVersion(oldVersion, incrementType);
  appJson.expo.version = newVersion;

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

  console.log(`\n✅ Versão atualizada: ${oldVersion} → ${newVersion}`);

  // 2) Changelog + tag
  const lastTag = getLastTag();
  const changelogEntry = generateChangelog(lastTag, newVersion);

  fs.appendFileSync("CHANGELOG.md", `\n${changelogEntry}\n`);
  console.log("Changelog atualizado.");

  run("git add app.json CHANGELOG.md");
  run(`git commit -m "build: bump version to ${newVersion}"`);
  run(`git tag v${newVersion}`);
  run("git push");
  run("git push --tags");

  console.log(`Tag criada: v${newVersion}`);

  // 3) Build iOS
  run(`eas build --profile ${buildProfile} --platform ios`);
})();
