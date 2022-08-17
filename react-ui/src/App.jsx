import React from "react";
import { gql, useMutation } from "@apollo/client";

import { BookContext } from "./context/bookContext";

import "./App.css";

const ADD_BOOK = gql`
  mutation AddBook($data: BookInput!) {
    addBook(data: $data) {
      newbook {
        id
        name
      }
    }
  }
`;

function App() {
  const { books, loading, error } = React.useContext(BookContext);
  const [bookName, setBookName] = React.useState("");
  const [
    addBook,
    { data: newBookData, loading: newBookloading, error: newBookError },
  ] = useMutation(ADD_BOOK);

  const handleAddBook = (e) => {
    e.preventDefault();

    if (bookName) {
      addBook({
        variables: {
          data: {
            name: bookName,
          },
        },
      }).then((res) => {
        const { newbook } = res.data.addBook;

        if (newbook.id) {
          setBookName("");
        }
      });
    }
  };

  return (
    <div className="App">
      <h2>Books App</h2>
      {error && <p>An error occurred: {error.message}</p>}
      {loading && <p>Loading...</p>}
      <ul>
        {books &&
          books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
      </ul>
      <h3>Add a Book</h3>
      <form onSubmit={handleAddBook}>
        <div>
          <label htmlFor="name_id">Book name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            id="name_id"
            required
          />
        </div>
        <button type="submit" disabled={newBookloading}>
          {newBookloading ? "Adding..." : "Add"}
        </button>
        <div>
          {newBookError && (
            <p>Error during book addition: {newBookError.message}</p>
          )}
          {newBookData && <p>Added new book. Refresh page!</p>}
        </div>
      </form>
    </div>
  );
}

export default App;

