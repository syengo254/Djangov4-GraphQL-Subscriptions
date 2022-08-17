import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

import BookContextProvider from "./context/bookContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
});

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://127.0.0.1:8000/graphql",
//   })
// );

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:8000/subscriptions", {
    reconnect: true,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

