import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h3 className="TodoInfo__title">{todo.title}</h3>
    <p>Status: {todo.completed ? 'Completed' : 'Not completed'}</p>
    {todo.user && <UserInfo user={todo.user} />}
  </div>
);
