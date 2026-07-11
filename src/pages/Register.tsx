import { useState } from 'react';
import { register } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';

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
  <div className="page">
    <div className="card">
      <h2>Créer un compte</h2>

      {erreur && <p className="error-message">{erreur}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

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
          {envoiEncours ? 'Création en cours...' : 'Créer mon compte'}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14 }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  </div>
);
}