import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

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
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">Bon retour</p>
        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Accédez à vos CV et reprenez là où vous vous êtes arrêté.</p>

        {erreur && <p className="auth-error">{erreur}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <div className="auth-input-wrap">
              <FiMail className="auth-input-icon" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Mot de passe</label>
            <div className="auth-input-wrap">
              <FiLock className="auth-input-icon" />
              <input
                id="login-password"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="landing-btn landing-btn--primary auth-submit" disabled={envoiEncours}>
            {envoiEncours ? 'Connexion en cours...' : (
              <>
                Se connecter <FiArrowRight />
              </>
            )}
          </button>

          <p className="auth-footer-text">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
}