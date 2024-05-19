import { ScrollView, StyleSheet,  } from "react-native";
import React from "react";
import { Button, Card, Paragraph,  } from "react-native-paper";
import LabeledText from "../components/LabeledText";
import { ExpandedSerie } from "../model/ExpandedSerie";
import { StackScreenProps } from "@react-navigation/stack";
import { StackRoutes } from "../Router";
import api from "../services/api";
import Loading from "../components/Loading";
import HandleError from "../components/HandleError";
import { ErrorStatus } from "../enums/ErrorStatus";

type stackProps = StackScreenProps<StackRoutes, "Movie">;

interface props extends stackProps {}

const Movie = ({ route, navigation }: props) => {
  const [data, setData] = React.useState<ExpandedSerie | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<ErrorStatus>(null);

  React.useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (route.params) {
        try {
          const { id } = route.params;
          const response = await api.searchById(id);
          setData(response);
        } catch (e) {
          if (e instanceof Error) {
            switch (e.message) {
              case ErrorStatus.code404:
                return setError(ErrorStatus.code404);
              case ErrorStatus.code502:
                return setError(ErrorStatus.code502);
              default:
                return setError(ErrorStatus.code500);
            }
          }
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Loading loading={loading}>
        <HandleError error={error}>
          {data && (
            <Card style={styles.card}>
              <Card.Title
                style={styles.cardHeader}
                titleNumberOfLines={4}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                title={data.name}
                subtitle={data.genres.join(", ")}
              />
              <Card.Cover
                style={styles.image}
                source={{ uri: data.image_path }}
              />
              <Card.Content style={styles.content}>
                <Paragraph style={styles.description}>
                  {data.description}
                </Paragraph>
                <LabeledText label="Release Date" value={data.start_date} />
                <LabeledText label="From" value={data.country} />
                <LabeledText
                  label="Total Episodes"
                  value={data.episodes.length.toString()}
                />
                <LabeledText label="Status" value={data.status} />
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() =>
                    navigation.push("Episodes", {
                      episodes: data.episodes,
                      name: data.name,
                    })
                  }
                >
                  Episodes
                </Button>
              </Card.Actions>
            </Card>
          )}
        </HandleError>
      </Loading>
    </ScrollView>
  );
};

export default Movie;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 7.5,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    paddingTop: 15,
    height: "100%",
  },

  cardHeader: {
    marginBottom: 10,
  },

  title: {
    fontWeight: "900",
    fontSize: 25,
  },
  subtitle: {
    fontWeight: "300",
  },

  content: {
    flexGrow: 1,
  },

  image: {
    borderRadius: 5,
    marginBottom: 10,
  },

  description: {
    textAlign: "justify",
  },
});
