import { useEffect, useState } from 'react';
import { getCvs, deleteCv } from '../api/cvApi';
import type { CvDto } from '../types/cv';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiLogOut, FiFileText } from 'react-icons/fi';
import logo from '../assets/favicon.png';

import { ChooseCreate } from '../components/Choose';
import { ChooseEdit } from '../components/Choose';
import { DeleteCvModal } from '../components/DeleteCvModal';

export function CvList() {
  const [cvs, setCvs] = useState<CvDto[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const { logout } = useAuth();
  const [showChooseCreate, setShowChooseCreate] = useState(false);
  const [showChooseEdit, setShowChooseEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // États pour la modale de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCvId, setDeleteCvId] = useState<number | null>(null);
  const [deleteCvName, setDeleteCvName] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Ouvre la modale de suppression avec les infos du CV ciblé
  const openDeleteModal = (cv: CvDto) => {
    setDeleteCvId(cv.id);
    setDeleteCvName(`${cv.prenom} ${cv.nom}`);
    setDeleteModalOpen(true);
  };

  // Confirme la suppression
  const handleConfirmDelete = async () => {
    if (deleteCvId === null) return;
    setDeleteLoading(true);
    setErreur('');
    try {
      await deleteCv(deleteCvId);
      await chargerCvs();
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Erreur lors de la suppression du CV', err);
      setErreur('La suppression du CV a échoué.');
    } finally {
      setDeleteLoading(false);
    }
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
        <button onClick={() => setShowChooseCreate(true)} className="landing-btn landing-btn--primary">
          <FiPlus /> Créer un nouveau CV
        </button>
      </div>

      <ChooseCreate isOpen={showChooseCreate} onClose={() => setShowChooseCreate(false)} id={null} />

      <ChooseEdit isOpen={showChooseEdit} onClose={() => setShowChooseEdit(false)} id={editId} />

      <DeleteCvModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        cvName={deleteCvName}
        isLoading={deleteLoading}
      />

      {erreur && <p className="error-message">{erreur}</p>}

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
                <button onClick={() => {
                  setShowChooseEdit(true);
                  setEditId(cv.id);
                }} className="cv-action">
                  <FiEdit2 /> Modifier
                </button>
                <button onClick={() => openDeleteModal(cv)} className="cv-action cv-action--danger">
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