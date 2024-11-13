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
    setNewEntry({ Category: "TV", Link: "", Details: "", Recommeder:"" });
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>

      {/* Form to create a new entry */}
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select name="Category" value={newEntry.Category} onChange={handleChange}>
            <option value="Books">Books</option>
            <option value="Politics">Politics</option>
            <option value="TV">TV</option>
            <option value="Movies">Movies</option>
            <option value="Recipes">Recipes</option>
            <option value="Audiobooks">Audiobooks</option>
            <option value="Comdey">Comdey</option>
            <option value="Portland">Portland</option>
          </select>
        </label>
        <label>
          Link:
          <input
            type="text"
            name="Link"
            value={newEntry.Link}
            onChange={handleChange}
            placeholder="Enter link"
            required
          />
        </label>
        <label>
          Recommender:
          <input
            type="text"
            name="Recommender"
            value={newEntry.Recommender}
            onChange={handleChange}
            placeholder="Enter Recommender"
            required
          />
        </label>

        <label>
          Details:
          <input
            type="text"
            name="Details"
            value={newEntry.Details}
            onChange={handleChange}
            placeholder="Enter Details"
            required
          />
        </label>

        <button style={{borderColor:"blue"}}type="submit">Create</button>
      </form>

      <h2>Data List:</h2>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            <strong>Category:</strong> {row.Category}, 
            <strong>Link:</strong> {row.Link}, 
            <strong>Details:</strong> {row.Details},
             <strong>Recommender:</strong> {row.Recommender}
          </li>
        ))}
      </ul>
    </div>
  );
}
