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
  };




  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Blankety blank dot blank{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Cranky Franky Pudding Pie</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
