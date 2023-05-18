import { Store } from "../core/Store";
import configStore from "./config";
const store = new Store({
  books: [],
  book: {},
  loading: false,
  message: "Search for the book title",
});

export default store;

export const searchBooks = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.books = [];
    store.state.message = "";
  }
  try {
    const res = await fetch(`${configStore.state.serverUrl}/books`);
    const books = await res.json();
    store.state.books = books;
  } catch (error) {
    console.log(error);
  } finally {
    store.state.loading = false;
  }
};

export const getBookDetails = async (id) => {
  try {
    const res = await fetch(`${configStore.state.serverUrl}/books/${id}`);
    store.state.book = await res.json();
    console.log(store.state.book);
  } catch (error) {
    console.log(error);
  }
};
