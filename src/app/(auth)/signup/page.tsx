
import { Text, View, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import styles  from "./styles";
import { Link  } from "expo-router";
import HeaderComponent from '../../../components/header/component';
import { SetStateAction, useState } from "react";

export default function SignUpScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    console.log('date', selectedDate)
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <ScrollView>
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
              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  style={styles.input}
                  placeholder="Seu Aniversário..."
                  editable={false}  
                  pointerEvents="none"
                  value={date.toLocaleString()}
                />
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  locale="pt-BR"
                  maximumDate={new Date()}
                  onChange={onChange}
                />
              )}
          </View>
          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              placeholder="Digite seu telefone..."
              style={styles.input}
              keyboardType="numeric"
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
    </ScrollView>
  );
}