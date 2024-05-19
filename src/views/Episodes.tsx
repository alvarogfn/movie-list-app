import { ListRenderItem, StyleSheet } from "react-native";
import React from "react";
import { Episode } from "../model/Episode";
import { FlatList } from "react-native-gesture-handler";
import { Card, Divider, List } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { StackRoutes } from "../Router";

type NavigationProps = StackScreenProps<StackRoutes, "Episodes">;

interface props extends NavigationProps {}

const Episodes = ({ route }: props) => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(() => {
    if (route.params) return route.params.episodes;
    else return [];
  });

  const renderItem: ListRenderItem<Episode> = ({ item }) => {
    return (
      <List.Item
        titleNumberOfLines={3}
        title={item.name}
        description={`Season ${item.season} Episode ${item.episode}`}
      />
    );
  };

  return (
    <Card style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <Card.Title
            titleNumberOfLines={4}
            title={route.params.name}
            subtitle={`Total: ${episodes.length}`}
            titleStyle={styles.title}
          />
        )}
        keyExtractor={({ season, episode }) =>
          `season${season}episode${episode}`
        }
        data={episodes}
        ItemSeparatorComponent={() => <Divider />}
        initialNumToRender={7}
        renderItem={renderItem}
      />
    </Card>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    margin: 7.5,
    padding: 5,
  },
  title: {
    fontSize: 20,
  },
});
