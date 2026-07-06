import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');

    try {
      const token = await login({ email, motDePasse });
      setAuthToken(token);
      navigate('/cvs');
    } catch (err) {
      setErreur('Email ou mot de passe incorrect.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
      </div>

      <button type="submit">Se connecter</button>
    </form>
  );
}