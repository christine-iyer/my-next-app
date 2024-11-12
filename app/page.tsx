"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [data, setData] = useState([]); // Store fetched data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data", { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !population) {
      console.error("Name and population are required fields.");
      return;
    }

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, population }),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        setName(""); // Clear input after submission
        setPopulation("");
        await fetchData();
      } else {
        console.error("Failed to submit data:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <h1>Data List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <input
          type="number"
          placeholder="Population"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Updated Data:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - Population: {item.population}
          </li>
        ))}
      </ul>
    </div>
  );
}