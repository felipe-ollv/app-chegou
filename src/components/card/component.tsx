import React from "react";
import { View, Text } from "react-native";
import { styles } from './styles'

type InfoCardProps = {
  title: string;
  receivedBy: string;
  receivedDate: string;
  status_package: "RECEIVED" | string;
};

export default function InfoCardComponent({
  title,
  receivedBy,
  receivedDate,
  status_package,
}: InfoCardProps) {
  const extraText = status_package === "RECEIVED" ? "PENDENTE" : "RECEBIDO";
  const extraStyle =
    status_package === "RECEIVED" ? styles.extraReceived : styles.extraDefault;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{receivedBy}</Text>
      <Text style={styles.desc}>{receivedDate}</Text>

      <Text style={[styles.extraBase, extraStyle]}>{extraText}</Text>
    </View>
  );
}


