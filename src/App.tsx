import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddTodo = () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) return;

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: Number(userId),
      completed: false,
      user: usersFromServer.find(user => user.id === Number(userId)),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <label>
          Title:
          <input
            data-cy="titleInput"
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
              setTitleError('');
            }}
          />
        </label>
        {titleError && <span className="error">{titleError}</span>}

        <label>
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value ? Number(e.target.value) : '');
              setUserError('');
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {userError && <span className="error">{userError}</span>}

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
