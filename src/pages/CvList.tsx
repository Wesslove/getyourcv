import { useEffect, useState } from 'react';
import { getCvs, deleteCv } from '../api/cvApi';
import type { CvDto } from '../types/cv';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiLogOut, FiFileText } from 'react-icons/fi';
// import { FaRegFilePdf } from "react-icons/fa6";
import logo from '../assets/favicon.png';

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
    return (
      <div className="dashboard-page dashboard-page--centered">
        <div className="spinner" role="status" aria-label="Chargement" />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Mes CV</h2>
        <button onClick={logout} className="landing-btn landing-btn--danger">
          <FiLogOut /> Se déconnecter
        </button>
      </div>

      <div className="dashboard-cta">
        <Link to="/cvs/new" className="landing-btn landing-btn--primary">
          <FiPlus /> Créer un nouveau CV
        </Link>
      </div>

      {cvs.length === 0 ? (
        <div className="dashboard-empty">
          <FiFileText className="dashboard-empty__icon" />
          <p>Aucun CV pour l'instant. Créez-en un pour commencer.</p>
        </div>
      ) : (
        <div className="cv-list">
          {cvs.map((cv) => (
            <div key={cv.id} className="cv-item">
              <div className="cv-item__info">
                <img src={logo} className="cv-item__icon" />
                <div>
                  <strong>{cv.prenom} {cv.nom}</strong>
                  <p>{cv.email}</p>
                </div>
              </div>
              <div className="cv-item__actions">
                <Link to={`/cvs/${cv.id}`} className="cv-action">
                  <FiEye /> Aperçu
                </Link>
                <Link to={`/cvs/edit/${cv.id}`} className="cv-action">
                  <FiEdit2 /> Modifier
                </Link>
                <button onClick={() => handleDelete(cv.id)} className="cv-action cv-action--danger">
                  <FiTrash2 /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}