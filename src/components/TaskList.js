import React, { useState } from 'react';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = async (id) => {
    if (editText.trim()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: editText.trim() }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          // Update the task in the parent component
          onToggleTask(id); // This will trigger a re-render
        }
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="empty-state">
          <h3>No tasks yet!</h3>
          <p>Add your first task above to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      
      <div className="task-stats">
        <div className="stat-item">
          <div className="stat-number">{totalTasks}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{totalTasks - completedTasks}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="task-checkbox"
          />
          
          {editingId === task.id ? (
            <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="task-input"
                style={{ flex: 1, margin: 0 }}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(task.id);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
              />
              <button
                onClick={() => handleSaveEdit(task.id)}
                className="edit-button"
                style={{ background: '#28a745', color: 'white' }}
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="edit-button"
                style={{ background: '#6c757d', color: 'white' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
              <div className="task-actions">
                <button
                  onClick={() => handleEdit(task)}
                  className="edit-button"
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
