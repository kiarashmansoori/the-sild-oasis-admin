import axios from "axios";

export async function getBookingsData() {
  const { data } = await axios.get("/api/bookings");
  return data;
}

export async function getBookingData(id) {
  const { data } = await axios.get(`/api/bookings/${id}`);
  return data;
}
export async function updateBooking(id, body) {
  const { data } = await axios.patch(`/api/bookings/${id}`, body);
  return data;
}
export async function deleteBooking(id, body) {
  const { data } = await axios.delete(`/api/bookings/${id}`);
  return data;
}

export async function getBookingsAfterDate(last) {
  const { data } = await axios.get(`/api/bookings/after-date?last=${last}`);
  return data;
}
export async function getBookingsStay(last) {
  const { data } = await axios.get(`/api/bookings/stays-date?last=${last}`);
  return data;
}
export async function getStaysTodayActivity(last) {
  const { data } = await axios.get(`/api/bookings/Today`);
  return data;
}
