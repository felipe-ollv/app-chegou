
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles  from "./styles";
import { Link  } from "expo-router";
import HeaderComponent from '../../../components/header/component';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent logoText='Chegou' slogan='Criando sua conta!'/>

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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
        <Link href='(panel)/profile/page'>
          <Text>Só para ir para a tela de profile</Text>
        </Link>
      </View>
    </View>
  );
}