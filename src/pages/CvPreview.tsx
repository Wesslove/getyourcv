import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CvDto } from '../types/cv';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { getCvById, downloadCvPdf } from '../api/cvApi';

type TemplateKey = 'classic' | 'modern';

export function CvPreview() {
  const { id } = useParams<{ id: string }>();
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

return (
  <div className="page" style={{ maxWidth: 900 }}>
    <div className="header-bar">
      <button onClick={() => setTemplate('classic')} className={template === 'classic' ? 'btn btn-primary' : 'btn btn-secondary'}>
        Modèle Classique
      </button>
      <button onClick={() => setTemplate('modern')} className={template === 'modern' ? 'btn btn-primary' : 'btn btn-secondary'}>
        Modèle Moderne
      </button>
      <button onClick={() => downloadCvPdf(cv.id, template)} className="btn btn-primary">
        Télécharger en PDF
      </button>
    </div>

    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {template === 'classic' && <ClassicTemplate cv={cv} />}
      {template === 'modern' && <ModernTemplate cv={cv} />}
    </div>
  </div>
);
}