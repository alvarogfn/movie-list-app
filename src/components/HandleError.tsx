import { StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { ErrorStatus } from "../enums/ErrorStatus";
import { Avatar, Card, Paragraph, Title } from "react-native-paper";

export enum error {}

interface props {
  children: React.ReactNode;
  error: ErrorStatus | null;
}

const HandleError = ({ children, error = null }: props) => {
  function handleStatusCode(statusCode: ErrorStatus): React.ReactNode {
    switch (statusCode) {
      case ErrorStatus.code404:
        return (
          <ErrorCard
            title="The search returned no results"
            causes={["Name Not Found"]}
          />
        );
      case ErrorStatus.code502:
        return (
          <ErrorCard
            title="The server responded badly"
            causes={["API Errors.", "Network Errors."]}
          />
        );
      default:
        return (
          <ErrorCard
            title="Internal App Error"
            causes={[
              "There is something wrong with the app.",
              "App malfunction",
            ]}
          />
        );
    }
  }

  return error !== null ? (
    <Fragment>{handleStatusCode(error)}</Fragment>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

interface ErrorCardProps {
  title: string;
  causes: string[];
}

const ErrorCard = ({ title, causes }: ErrorCardProps) => {
  return (
    <Card style={styles.container}>
      <Card.Title titleStyle={styles.title} title={title} />
      <Card.Content>
        <Avatar.Icon icon="alert" color="red" size={150} style={styles.icon} />
        <Title style={styles.title}>This could have been caused by:</Title>
        {causes.map((cause) => {
          return (
            <Paragraph style={styles.paragraph} key={cause}>
              ● {cause}
            </Paragraph>
          );
        })}
      </Card.Content>
    </Card>
  );
};

export default HandleError;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 10,
  },
  icon: {
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "900",
  },
  paragraph: {},
});
