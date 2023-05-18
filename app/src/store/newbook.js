import { Store } from "../core/Store";
import configStore from "./config"

//https://img.ridicdn.net/cover/4587000480/xxlarge
const store = new Store({
  id: null,
  coverURL: "",
  name: "",
  message: "",
  width: 0,
  height: 0,
  pages: [],
});

export async function putInfoCount(count) {
  await fetch(`${configStore.state.serverUrl}/info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  });
}

export async function postNewBook() {
  const res = await fetch(`${configStore.state.serverUrl}/info`);
  const { count } = await res.json();
  const id = count + 1;
  await putInfoCount(id);
  store.state.id = id;
  const { coverURL, name, pages } = store.state;

  await fetch(`${configStore.state.serverUrl}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coverURL,
      name,
      pages,
    }),
  });
}

export async function update() {
  const { id, coverURL, name, pages } = store.state;
  await fetch(`${configStore.state.serverUrl}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coverURL,
      name,
      pages,
    }),
  });
}

export default store;
