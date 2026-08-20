"use client";

import axios from "axios";

function SeedButton() {
  async function handleSeed() {
    try {
      const { data } = await axios.post("/api/seed");

      alert("Data created successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  return <button onClick={handleSeed}>Generate Fake Data</button>;
}

export default SeedButton;
