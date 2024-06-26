import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      toggleComplete(todo.id);
      setLoading(false);
    }, 1000); 
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded mb-2 transition ${todo.completed ? 'bg-gray-300 text-gray-500 line-through' : 'bg-white hover:bg-gray-100'}`}
    >
      <div className="flex-1">{todo.text}</div>
      <div className="flex items-center space-x-2">
        <button onClick={handleToggleComplete} disabled={loading} className={`text-blue-500 hover:text-blue-700 ${todo.completed ? 'text-red-500' : ''}`}>
          {loading ? 'Loading...' : todo.completed ? 'Uncomplete' : 'Complete'}
        </button>
        {todo.completed && <div className="h-1 w-full bg-transparent mt-2"></div>}
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">Delete</button>
        <button onClick={() => editTodo(todo.id)} className="text-green-500 hover:text-green-700">Edit</button>
      </div>
    </div>
  );
};

export default TodoItem;
