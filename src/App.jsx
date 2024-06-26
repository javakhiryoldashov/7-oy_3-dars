import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import './index.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setLoading(true);
    setTimeout(() => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setLoading(false);
    }, 500);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setIsEditing(true);
    setCurrentTodo(todo);
    setInput(todo.text);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, text: input } : todo
      )
    );
    setInput('');
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      <h1 className="text-3xl font-bold text-white my-4">Todo App</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            type="text"
            className="p-2 border rounded w-full mb-2"
            placeholder="Add a new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (isEditing ? updateTodo() : addTodo())
            }
          />
          <button
            className={`p-2 w-full rounded ${
              isEditing
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={isEditing ? updateTodo : addTodo}
          >
            {isEditing ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
        <div>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
        </div>
        <h2 className="text-xl font-bold mt-4">Completed</h2>
        <div>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
