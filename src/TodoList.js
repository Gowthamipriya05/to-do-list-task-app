
import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [completed, setCompleted] = useState([]);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setCompleted([...completed, false]);
      setTask('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const newCompleted = completed.filter((_, i) => i !== index);
    setTodos(newTodos);
    setCompleted(newCompleted);

    if (editingIndex === index) {
      setEditingIndex(-1);
      setEditedTask('');
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditedTask(todos[index]);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = editedTask;
      setTodos(updatedTodos);
      setEditedTask('');
      setEditingIndex(-1);
    }
  };

  const handleCancelEdit = () => {
    setEditedTask('');
    setEditingIndex(-1);
  };

  const toggleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div className="todo-container">
      <h1>**** Todo List ****</h1>
      <div>
        <input
          className="input"
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {editingIndex !== -1 ? (
          <>
            <button className="btn save-button" onClick={handleSaveEdit}>Save</button>
            <button className="btn cancel-button" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button className="btn add-button" onClick={handleAddTodo}>Add</button>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {index === editingIndex ? (
              <input
                className="edit-input"
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
            ) : (
              <span className={completed[index] ? 'completed-task' : 'incomplete-task'}>{todo}</span>
            )}
            {index === editingIndex ? (
              null
            ) : (
              <div>
                <button className="btn edit-button" onClick={() => handleEditTodo(index)}>Edit</button>
                <button className="btn delete-button" onClick={() => handleDeleteTodo(index)}>Delete</button>
                <button className="btn complete-button" onClick={() => toggleComplete(index)}>
                  {completed[index] ? 'Uncomplete' : 'Complete'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
