import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="UserInfo">
    <p className="UserInfo__name">{user.name}</p>
    <p className="UserInfo__username">{user.username}</p>
    <a href={`mailto:${user.email}`} className="UserInfo__email">
      {user.email}
    </a>
  </div>
);
