
import { Text, View, TextInput, Pressable } from "react-native";
import colors from "@/constants/Colors";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white}/>
        </Pressable>
        <Text style={styles.logoText}>
          Chegou<Text style={{ color: colors.green }}>App!</Text>
        </Text>
        <Text style={styles.slogan}>Criando sua conta!</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            placeholder="Seu nome..."
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Sobrenome</Text>
          <TextInput
            placeholder="Sobrenome..."
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Condomínio</Text>
          <TextInput
            placeholder="Seu Condomínio..."
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            placeholder="Seu Anivensário..."
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            placeholder="Digite seu telefone..."
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha..."
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </Pressable>
        {/* <Link href='/(auth)/signup/page'>
          <Text>Ainda não tem uma conta? Cadastre-se!</Text>
        </Link> */}
      </View>
    </View>
  );
}