import { Store } from "../core/Store";

const store = new Store({
  url: "http://localhost:3000",
  pageLimit: 2,
  page: 1,
  pageMax: 1,
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
    const res = await fetch(
      `${store.state.url}/books?_page=${page}&_limit=${store.state.pageLimit}`
    );

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
    const res = await fetch(`${store.state.url}/books/${id}`);
    store.state.book = await res.json();
  } catch (error) {
    console.log(error);
  }
};
