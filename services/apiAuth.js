import axios from "axios";

export async function sendAuthInfo(body) {
  try {
    const { data } = await axios.post("/api/Auth/Login", body);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error?.response?.data?.message || "SERVER ERROR",
    };
  }
}

export async function Logout(params) {
  try {
    const { data } = await axios.post("/api/Auth/Logout");
    return data;
  } catch (error) {
    console.log(error);
    return { message: "SERVER ERROR" };
  }
}
export async function createUser(body) {
  try {
    const { data } = axios.post("/api/Auth/Signin", body);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "SERVER ERROR" };
  }
}

export async function getUser() {
  try {
    const { data } = await axios.get("/api/me");
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUserapi({ fullName, avatar }) {
  const data = new FormData();
  data.append("fullName", fullName);
  if (avatar) data.append("avatar", avatar);

  const { data: res } = await axios.put("/api/Auth/updateUser", data);

  return { res };
}

export async function updatePasswordApi(password) {
  try {
    const { data } = axios.patch("/api/Auth/Signin", password);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "SERVER ERROR" };
  }
}
