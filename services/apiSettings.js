import axios from "axios";

export async function getSettings() {
  const { data } = await axios.get("/api/settings");
  return data[0];
}
