import { useState } from 'react';
import { register } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const [envoiEncours, setEnvoiEncours] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');

    if (envoiEncours) return;
    setEnvoiEncours(true);

    try {
      await register({ nom, email, motDePasse });
      navigate('/login');
    } catch (err) {
      setErreur("Impossible de créer le compte. L'email est peut-être déjà utilisé.");
    } finally {
      setEnvoiEncours(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">Bienvenue</p>
        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">Quelques infos, et votre premier CV est prêt à démarrer.</p>

        {erreur && <p className="auth-error">{erreur}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="register-nom">Nom</label>
            <div className="auth-input-wrap">
              <FiUser className="auth-input-icon" />
              <input
                id="register-nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email</label>
            <div className="auth-input-wrap">
              <FiMail className="auth-input-icon" />
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Mot de passe</label>
            <div className="auth-input-wrap">
              <FiLock className="auth-input-icon" />
              <input
                id="register-password"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="landing-btn landing-btn--primary auth-submit" disabled={envoiEncours}>
            {envoiEncours ? 'Création en cours...' : (
              <>
                Créer mon compte <FiArrowRight />
              </>
            )}
          </button>

          <p className="auth-footer-text">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}