import axios from "axios";

export async function getCabins() {
  const { data } = await axios.get("/api/cabins");
  return data;
}

export async function deleteCabin(id) {
  const cabin = await axios.delete(`/api/cabins/${id}`);

  return cabin;
}
export async function addCabin({ cabin, id, image }) {
  if (id) {
    await axios.put("/api/cabins", { ...cabin, _id: id });
    return { message: "edit successfuly" };
  } else {
    const data = new FormData();
    data.append("name", cabin.name);
    data.append("maxCapacity", cabin.maxCapacity);
    data.append("reqularprice", cabin.reqularprice);
    data.append("discount", cabin.discount);
    data.append("description", cabin.description);
    if (image) data.append("image", image);
    try {
      await axios.post("/api/cabins", data);
    } catch (error) {
      console.log(error);
    }

    return { message: "add succesfuly" };
  }
}
