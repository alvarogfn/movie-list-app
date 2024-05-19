import { StyleSheet, View } from "react-native";
import React, { Fragment } from "react";
import { ActivityIndicator } from "react-native-paper";

interface props {
  loading: boolean;
  children: React.ReactNode;
}
const Loading = ({ loading, children }: props) => {
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={80} />
    </View>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexGrow: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
