import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import api from "../services/api";
import { ResumedSerie } from "../model/ResumedSerie";
import ResultListItem from "../components/ResultListItem";
import Pagination from "../components/Pagination";
import EmptyList from "../components/EmptyList";
import Loading from "../components/Loading";
import HandleError from "../components/HandleError";
import { ErrorStatus } from "../enums/ErrorStatus";

interface props {}

const Home = ({}: props) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<ResumedSerie[]>([]);
  const [page, setPages] = React.useState({
    actual: 1,
    last: 1,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ErrorStatus>(null);

  async function handleSearch(page: number = 1) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.searchByName(value, page);

      if (response.result.length === 0) throw new Error(ErrorStatus.code404);

      setData(response.result);
      setPages({ actual: page, last: response.totPages });
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

  const renderItem: ListRenderItem<ResumedSerie> = ({ item }) => {
    return <ResultListItem data={item} />;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        onSubmitEditing={() => handleSearch()}
        value={value}
        onChangeText={(e) => setValue(e)}
      />
      <Loading loading={loading}>
        <HandleError error={error}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.list}
            ItemSeparatorComponent={() => (
              <View style={{ marginVertical: 5 }} />
            )}
            ListFooterComponentStyle={styles.footer}
            ListFooterComponent={() =>
              !!data.length && (
                <Pagination
                  changePage={handleSearch}
                  actualPage={page.actual}
                  lastPage={page.last}
                />
              )
            }
            contentContainerStyle={styles.content}
            ListEmptyComponent={() => <EmptyList />}
          />
        </HandleError>
      </Loading>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
  },

  searchBar: {
    margin: 10,
    backgroundColor: "#fff",
  },

  list: {
    paddingHorizontal: 10,
  },

  content: {
    flexGrow: 1,

    justifyContent: "space-between",
  },

  footer: {
    paddingVertical: 10,
  },
});
