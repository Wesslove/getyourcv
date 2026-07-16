import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

export type TemplateKey = 'classic' | 'modern' | 'creative';

interface ChooseProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
}

export function ChooseCreate({ isOpen, onClose }: ChooseProps) {
  const navigate = useNavigate();

  // Ferme le modal avec la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChoose = (template: TemplateKey) => {
    onClose();
    navigate(`/cvs/new?template=${template}`);
  };

  return (
    <div className="choose-modal-overlay" onClick={onClose}>
      <div className="choose-modal" onClick={(e) => e.stopPropagation()}>
        <button className="choose-modal__close" onClick={onClose} aria-label="Fermer">
          <FiX />
        </button>

        <h2 className="landing-section-title">Des modèles pour chaque profil</h2>
        <div className="landing-templates__row">
          <button className="template-card template-card--modern" onClick={() => handleChoose('modern')}>
            <div className="template-preview template-preview--modern">
              <span className="tp-sidebar" />
              <div className="tp-content">
                <span className="tp-line tp-line--title" />
                <span className="tp-line tp-line--sub" />
                <span className="tp-line tp-line--w1" />
                <span className="tp-line tp-line--w2" />
              </div>
            </div>
            <span className="template-card__label">Moderne</span>
          </button>

          <button className="template-card template-card--classic" onClick={() => handleChoose('classic')}>
            <div className="template-preview template-preview--classic">
              <span className="tp-line tp-line--center-title" />
              <span className="tp-rule" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-line tp-line--w3" />
            </div>
            <span className="template-card__label">Classique</span>
          </button>

          <button className="template-card template-card--creative" onClick={() => handleChoose('creative')}>
            <div className="template-preview template-preview--creative">
              <span className="tp-diagonal" />
              <span className="tp-avatar" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-dot tp-dot--1" />
              <span className="tp-dot tp-dot--2" />
              <span className="tp-dot tp-dot--3" />
            </div>
            <span className="template-card__label">Créatif</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export function ChooseEdit({ isOpen, onClose, id }: ChooseProps) {
  const navigate = useNavigate();

  // Ferme le modal avec la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChoose = (template: TemplateKey) => {
    onClose();
    navigate(`/cvs/edit/${id}?template=${template}`);
  };

  return (
    <div className="choose-modal-overlay" onClick={onClose}>
      <div className="choose-modal" onClick={(e) => e.stopPropagation()}>
        <button className="choose-modal__close" onClick={onClose} aria-label="Fermer">
          <FiX />
        </button>

        <h2 className="landing-section-title">Des modèles pour chaque profil</h2>
        <div className="landing-templates__row">
          <button className="template-card template-card--modern" onClick={() => handleChoose('modern')}>
            <div className="template-preview template-preview--modern">
              <span className="tp-sidebar" />
              <div className="tp-content">
                <span className="tp-line tp-line--title" />
                <span className="tp-line tp-line--sub" />
                <span className="tp-line tp-line--w1" />
                <span className="tp-line tp-line--w2" />
              </div>
            </div>
            <span className="template-card__label">Moderne</span>
          </button>

          <button className="template-card template-card--classic" onClick={() => handleChoose('classic')}>
            <div className="template-preview template-preview--classic">
              <span className="tp-line tp-line--center-title" />
              <span className="tp-rule" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-line tp-line--w3" />
            </div>
            <span className="template-card__label">Classique</span>
          </button>

          <button className="template-card template-card--creative" onClick={() => handleChoose('creative')}>
            <div className="template-preview template-preview--creative">
              <span className="tp-diagonal" />
              <span className="tp-avatar" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-dot tp-dot--1" />
              <span className="tp-dot tp-dot--2" />
              <span className="tp-dot tp-dot--3" />
            </div>
            <span className="template-card__label">Créatif</span>
          </button>
        </div>
      </div>
    </div>
  );
}