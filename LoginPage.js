import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function LoginPage() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      await signInWithPopup(auth, provider);
      // Пользователь успешно вошёл
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div>
      <h2>Вход для сотрудников</h2>
      <button onClick={handleLogin}>Войти через Google</button>
    </div>
  );
}

export default LoginPage;
