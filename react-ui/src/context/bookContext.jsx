import React from "react";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GETBOOKS {
    books {
      id
      name
    }
  }
`;

const BOOKS_SUB = gql`
  subscription BOOKSSUB {
    books {
      id
      name
    }
  }
`;

export const BookContext = React.createContext();

const BookContextProvider = ({ children }) => {
  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
    subscribeToMore,
  } = useQuery(GET_BOOKS);

  const [books, setBooks] = React.useState([]);
  const [contextStatus, setContextStatus] = React.useState({
    loading: false,
    error: null,
  });

  const booksSubscribeToMore = subscribeToMore({
    document: BOOKS_SUB,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      return subscriptionData.data;
    },
  });

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.books);
    }
    if (booksError) {
      setContextStatus((oldVal) => ({ ...oldVal, error: booksError }));
    }

    setContextStatus((oldVal) => ({ ...oldVal, loading: booksLoading }));
  }, [booksData, booksError, booksLoading]);

  useEffect(() => {
    booksSubscribeToMore();
  }, []);

  return (
    <BookContext.Provider value={{ books, ...contextStatus }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
