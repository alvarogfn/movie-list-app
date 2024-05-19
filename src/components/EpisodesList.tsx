import { StyleSheet } from "react-native";
import React from "react";
import { Avatar, Card, List } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Episode } from "../model/Episode";

interface props {
  episodes: Episode[];
}

const EpisodesList = ({ episodes }: props) => {
  return (
    <Card style={{ height: 400 }}>
      <FlatList
        keyExtractor={({ season, episode }) =>
          `season${season}episode${episode}`
        }
        data={episodes}
        renderItem={({ item }) => {
          return (
            <List.Item
              title={item.name}
              description={item.air_date}
              left={() => <Avatar.Text label={item.episode.toString()} />}
            ></List.Item>
          );
        }}
      ></FlatList>
    </Card>
  );
};

export default EpisodesList;

const styles = StyleSheet.create({});
