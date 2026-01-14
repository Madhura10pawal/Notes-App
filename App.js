import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === "") return;
    setNotes([...notes, text]);
    setText("");
    inputRef.current.focus();
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className="app">
      <h1>📝 Notes App</h1>

      <div className="input-box">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add</button>
      </div>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => deleteNote(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
