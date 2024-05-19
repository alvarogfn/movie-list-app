import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface props {
  label: string;
  value: string;
}

const LabeledText = ({ label, value }: props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default LabeledText;

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
  },
  label: {
    fontWeight: "600",
    marginVertical: 2.5,
  },
  value: {
    fontWeight: "300",
  },
});
