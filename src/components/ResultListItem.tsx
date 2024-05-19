import { StyleSheet } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";
import { ResumedSerie } from "../model/ResumedSerie";
import LabeledText from "./LabeledText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackRoutes } from "../Router";

interface props {
  data: ResumedSerie;
}

type NavigationProps = StackNavigationProp<StackRoutes, "Home">;

const ResultListItem = ({ data }: props) => {
  const navigation = useNavigation<NavigationProps>();

  function openDetails() {
    navigation.push("Movie", { id: data.id });
  }

  return (
    <Card style={styles.container}>
      <Card.Title titleStyle={styles.title} title={data.name} />
      <Card.Cover
        style={styles.image}
        source={{ uri: data.image_thumbnail_path }}
      />
      <Card.Content style={styles.content}>
        <LabeledText label="Release" value={data.start_date} />
        <LabeledText label="Status" value={data.status} />
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={openDetails}>
          Details
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ResultListItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  image: {
    borderRadius: 5,
  },
  container: {
    padding: 10,
  },
  content: {
    marginVertical: 10,
  },
});
