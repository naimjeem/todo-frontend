import React, { useState } from 'react';
import { isFeatureEnabled, FEATURE_FLAGS } from '../utils/featureFlags';

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const taskData = {
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      // Add priority if feature is enabled
      if (isFeatureEnabled(FEATURE_FLAGS.PRIORITY_TASKS)) {
        taskData.priority = priority;
      }

      // Add category if feature is enabled
      if (isFeatureEnabled(FEATURE_FLAGS.TASK_CATEGORIES)) {
        taskData.category = category;
      }

      onAddTask(taskData);
      setText('');
      setPriority('medium');
      setCategory('general');
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
        
        {/* Priority field - only shown if feature is enabled */}
        {isFeatureEnabled(FEATURE_FLAGS.PRIORITY_TASKS) && (
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        )}

        {/* Category field - only shown if feature is enabled */}
        {isFeatureEnabled(FEATURE_FLAGS.TASK_CATEGORIES) && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
          </select>
        )}

        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
