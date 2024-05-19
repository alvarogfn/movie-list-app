import { StyleSheet } from "react-native";
import React from "react";
import { Card, Paragraph } from "react-native-paper";

const EmptyList = () => {
  return (
    <Card style={styles.container}>
      <Card.Title title="How It's Work?" titleStyle={styles.title} />
      <Card.Content>
        <Paragraph>
          Search for a series by name to see details and all episodes about it.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "900",
  },
});
