import React, { useState, useRef } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App - Retro-themed single-page Todo application.
 * - Allows adding, viewing, and deleting tasks.
 * - State is held in-memory only (no persistence).
 * - Accessible labels and keyboard support (Enter to add).
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  /**
   * PUBLIC_INTERFACE
   * addTodo - Adds the current text as a new todo item.
   * - Ignores empty or whitespace-only values.
   */
  const addTodo = () => {
    const value = text.trim();
    if (!value) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: value }
    ]);
    setText('');
    // Return focus to input for quick entry
    if (inputRef.current) inputRef.current.focus();
  };

  /**
   * PUBLIC_INTERFACE
   * deleteTodo - Removes a todo by id.
   */
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  /**
   * PUBLIC_INTERFACE
   * handleKeyDown - Adds todo when pressing Enter in input.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <div className="App" role="application" aria-label="Retro Todo Application">
      <main className="container" aria-live="polite">
        <div className="header" aria-labelledby="app-title">
          <span className="badge" aria-hidden="true">vintage</span>
          <div>
            <h1 id="app-title" className="title">Retro Todo Console</h1>
            <p className="subtitle">Type your task and press Enter or click Add</p>
          </div>
        </div>

        <div className="input-row">
          <label htmlFor="todo-input" className="label">Add a todo</label>
          <input
            id="todo-input"
            ref={inputRef}
            type="text"
            className="input"
            placeholder="e.g., Buy milk"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Todo text"
          />
          <button
            type="button"
            className="btn"
            onClick={addTodo}
            aria-label="Add todo"
          >
            Add
          </button>
        </div>

        <ul className="list" aria-label="Todo list">
          {todos.length === 0 && (
            <li className="item" aria-live="polite">
              <span className="dot" aria-hidden="true"></span>
              <span className="item-text">No tasks yet. Add your first todo!</span>
              <button className="btn-danger" type="button" disabled aria-disabled="true">—</button>
            </li>
          )}
          {todos.map((t) => (
            <li key={t.id} className="item">
              <span className="dot" aria-hidden="true"></span>
              <span className="item-text">{t.text}</span>
              <button
                type="button"
                className="btn-danger"
                aria-label={`Delete ${t.text}`}
                onClick={() => deleteTodo(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <p className="note">Todos are not saved and will disappear on refresh.</p>
      </main>
    </div>
  );
}

export default App;
