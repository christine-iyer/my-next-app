"use client";
import { useEffect, useState } from 'react';

type RowData = Record<string, string>;  // Define a type for rows in the data

export default function Home() {
  const [data, setData] = useState<RowData[]>([]);  // Set data type explicitly

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

  const parseCSV = (csv: string): RowData[] => {  // Specify return type of parseCSV
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {} as RowData);
    });
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            {Object.entries(row).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
