import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

interface props {
  actualPage: number;
  lastPage: number;
  changePage: (newPage: number) => void;
}

const Pagination = ({ actualPage, lastPage, changePage }: props) => {
  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <Button
          style={styles.button}
          disabled={actualPage <= 1}
          onPress={() => changePage(actualPage - 1)}
        >
          Previous
        </Button>
        <Text>{actualPage}</Text>
        <Button
          style={styles.button}
          onPress={() => changePage(actualPage + 1)}
          disabled={actualPage === lastPage}
        >
          Next
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  button: {
    height: "100%",
  },

  container: {},
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
