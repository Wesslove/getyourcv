import { useEffect } from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

interface DeleteCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cvName?: string;
  isLoading?: boolean;
}

export function DeleteCvModal({ isOpen, onClose, onConfirm, cvName, isLoading }: DeleteCvModalProps) {
  // Ferme la modale avec la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="choose-modal-overlay" onClick={onClose}>
      <div className="choose-modal choose-modal--delete" onClick={(e) => e.stopPropagation()}>
        <button className="choose-modal__close" onClick={onClose} aria-label="Fermer">
          <FiX />
        </button>

        <div className="delete-modal-content">
          <FiAlertTriangle className="delete-modal__icon" />
          <h2 className="landing-section-title" style={{ marginBottom: '0.75rem' }}>
            Supprimer le CV
          </h2>
          <p className="delete-modal__text">
            {cvName
              ? `Êtes-vous sûr de vouloir supprimer le CV de ${cvName} ? Cette action est irréversible.`
              : 'Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible.'}
          </p>

          <div className="delete-modal__actions">
            <button
              className="landing-btn landing-btn--ghost mr"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </button>
            <span>                               </span>
            <button
              className="landing-btn landing-btn--danger"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Suppression...' : 'Supprimer définitivement'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}