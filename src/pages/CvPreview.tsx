import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CvDto } from '../types/cv';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { getCvById, downloadCvPdf } from '../api/cvApi';

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

  if (chargement) return <p>Chargement...</p>;
  if (!cv) return <p>CV introuvable.</p>;

  const templateActuel = TEMPLATES.find((t) => t.key === template);

  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <button onClick={() => navigate('/cvs')} className="btn btn-secondary" style={{ marginBottom: 16 }}>
        ← Retour à mes CV
      </button>

      <div className="header-bar">
        {TEMPLATES.map((t) => (
          <button
            key={t.key}
            onClick={() => setTemplate(t.key)}
            className={template === t.key ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            {t.label}
          </button>
        ))}
        <button onClick={() => downloadCvPdf(cv.id, template)} className="btn btn-primary">
          Télécharger en PDF
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {templateActuel && <templateActuel.Component cv={cv} />}
      </div>
    </div>
  );
}