import React, { useState } from 'react';

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <div className="add-task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
          maxLength={200}
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
