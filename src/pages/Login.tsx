import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [envoiEncours, setEnvoiEncours] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErreur('');

  if (envoiEncours) return;
  setEnvoiEncours(true);

  try {
    const token = await login({ email, motDePasse });
    setAuthToken(token);
    navigate('/cvs');
  } catch (err) {
    setErreur('Email ou mot de passe incorrect.');
  } finally {
    setEnvoiEncours(false);
  }
};

 return (
  <div className="page">
    <div className="card">
      <h2>Connexion</h2>

      {erreur && <p className="error-message">{erreur}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={envoiEncours}>
          {envoiEncours ? 'Connexion en cours...' : 'Se connecter'}
        </button>
        <p style={{ marginTop: 16, fontSize: 14 }}>
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </form>
    </div>
  </div>
);
}