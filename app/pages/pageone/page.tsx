"use client";
import { useState } from 'react';

export default function Chris() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the definition when the user submits the word
  const fetchDefinition = async (e) => {
    e.preventDefault();
    setError(null);
    setDefinition(null);

    if (!word) {
      setError('Please enter a word.');
      return;
    }

    try {
      const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);
      const data = await response.json();
      
      if (data.list && data.list.length > 0) {
        setDefinition(data.list[0]); // Get the first result
      } else {
        setError('No definitions found.');
      }
    } catch (err) {
      setError('Could not find the word.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Urban Dictionary App</h1>
      <form onSubmit={fetchDefinition}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ border: '2px solid green', color: 'yellow',  padding: '10px 20px', borderRadius: '5px' }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {definition && (
        <div style={{ marginTop: '20px' }}>
          <h2>Word: {definition.word}</h2>

          <h3>Definition:</h3>
          <p>{definition.definition}</p>

          <h3>Example:</h3>
          <p style={{ fontStyle: 'italic' }}>{definition.example}</p>

          <p>
            👍 {definition.thumbs_up} &nbsp; 👎 {definition.thumbs_down}
          </p>
        </div>
      )}
    </div>
  );
}