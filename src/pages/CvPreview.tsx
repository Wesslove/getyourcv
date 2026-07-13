import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CvDto } from '../types/cv';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { getCvById, downloadCvPdf } from '../api/cvApi';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

type TemplateKey = 'classic' | 'modern';

const TEMPLATES: { key: TemplateKey; label: string; Component: React.ComponentType<{ cv: CvDto }> }[] = [
  { key: 'classic', label: 'Modèle Classique', Component: ClassicTemplate },
  { key: 'modern', label: 'Modèle Moderne', Component: ModernTemplate },
];

export function CvPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cv, setCv] = useState<CvDto | null>(null);
  const [template, setTemplate] = useState<TemplateKey>('classic');
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    if (id) {
      getCvById(Number(id))
        .then(setCv)
        .finally(() => setChargement(false));
    }
  }, [id]);

  if (chargement) {
    return (
      <div className="dashboard-page dashboard-page--centered">
        <div className="spinner" role="status" aria-label="Chargement" />
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="dashboard-page dashboard-page--centered">
        <p className="dashboard-loading">CV introuvable.</p>
      </div>
    );
  }

  const templateActuel = TEMPLATES.find((t) => t.key === template);

  return (
    <div className="dashboard-page">
      <div className="cv-preview-wrap">
        <button onClick={() => navigate('/cvs')} className="landing-btn landing-btn--ghost cv-preview-back">
          <FiArrowLeft /> Retour à mes CV
        </button>

        <div className="cv-preview-toolbar">
          <div className="cv-preview-tabs">
            {TEMPLATES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTemplate(t.key)}
                className={`landing-btn ${template === t.key ? 'landing-btn--primary' : 'landing-btn--ghost'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => downloadCvPdf(cv.id, template)} className="landing-btn landing-btn--primary">
            <FiDownload /> Télécharger en PDF
          </button>
        </div>

        <div className="cv-preview-card">
          {templateActuel && <templateActuel.Component cv={cv} />}
        </div>
      </div>
    </div>
  );
}