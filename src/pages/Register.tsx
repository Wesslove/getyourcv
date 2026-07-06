import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

export function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');

    try {
      await register({ nom, email, motDePasse });
      navigate('/login');
    } catch (err) {
      setErreur("Impossible de créer le compte. L'email est peut-être déjà utilisé.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un compte</h2>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <div>
        <label>Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>

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

      <button type="submit">Créer mon compte</button>
    </form>
  );
}