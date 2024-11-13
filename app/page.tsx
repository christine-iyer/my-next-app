"use client";
import { useEffect, useState } from 'react';

// Explicitly define RowData as an object with string keys and string values
type RowData = {
  [key: string]: string;
};

export default function Home() {
  const [data, setData] = useState<RowData[]>([]);
  const [newEntry, setNewEntry] = useState<RowData>({ Category: "TV", Name: "", Population: "" });

  useEffect(() => {
    fetchSpreadsheetData();
  }, []);

  const fetchSpreadsheetData = async () => {
    try {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1CpPH9yTkxAv9VqKmpZZlKx58Hh86q2XMZsG3NFZ6ZKE/export?format=csv&gid=0'
      );
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);
      setData(parsedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const parseCSV = (csv: string): RowData[] => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || "";
        return obj;
      }, {} as RowData);  // Assert as RowData type
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEntry.Name || !newEntry.Population) {
      console.error("Name and Population are required fields.");
      return;
    }

    setData([...data, newEntry]);
    setNewEntry({ Category: "TV", Name: "", Population: "" });
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>

      {/* Form to create a new entry */}
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select name="Category" value={newEntry.Category} onChange={handleChange}>
            <option value="TV">TV</option>
            <option value="Politics">Politics</option>
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={newEntry.Name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </label>

        <label>
          Population:
          <input
            type="number"
            name="Population"
            value={newEntry.Population}
            onChange={handleChange}
            placeholder="Enter population"
            required
          />
        </label>

        <button type="submit">Create</button>
      </form>

      <h2>Data List:</h2>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            <strong>Category:</strong> {row.Category}, <strong>Name:</strong> {row.Name}, <strong>Population:</strong> {row.Population}
          </li>
        ))}
      </ul>
    </div>
  );
}
