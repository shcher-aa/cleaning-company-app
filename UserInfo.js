import React from 'react';
import { getAuth } from 'firebase/auth';

function UserInfo() {
  const user = getAuth().currentUser;

  if (!user) return null;

  return (
    <div className="text-sm p-3 border-b border-gray-300">
      <p><strong>{user.displayName}</strong></p>
      <p className="text-xs text-gray-600">{user.email}</p>
    </div>
  );
}

export default UserInfo;