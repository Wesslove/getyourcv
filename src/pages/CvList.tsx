import { useEffect, useState } from 'react';
import { getCvs, deleteCv } from '../api/cvApi';
import type { CvDto } from '../types/cv';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function CvList() {
  const [cvs, setCvs] = useState<CvDto[]>([]);
  const [chargement, setChargement] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    chargerCvs();
  }, []);

  const chargerCvs = async () => {
    try {
      const data = await getCvs();
      setCvs(data);
    } catch (err) {
      console.error('Erreur lors du chargement des CV', err);
    } finally {
      setChargement(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteCv(id);
    chargerCvs();
  };

  if (chargement) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Mes CV</h2>
      <button onClick={logout}>Se déconnecter</button>
       <Link to="/cvs/new">Créer un nouveau CV</Link>

      {cvs.length === 0 ? (
        <p>Aucun CV pour l'instant.</p>
      ) : (
        <ul>
          {cvs.map((cv) => (
            <li key={cv.id}>
              {cv.prenom} {cv.nom} — {cv.email}
              <button onClick={() => handleDelete(cv.id)}>Supprimer</button>
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}