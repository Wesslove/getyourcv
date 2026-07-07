import type { CvDto } from '../types/cv';

interface Props {
  cv: CvDto;
}

export function ClassicTemplate({ cv }: Props) {
  return (
    <div style={{ fontFamily: "'Inter', Arial, sans-serif", padding: 40, maxWidth: 700, margin: '0 auto', background: 'white' }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginBottom: 4, color: '#12233a' }}>
        {cv.prenom} {cv.nom}
      </h1>
      <p style={{ color: '#6b7280', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}>
        {cv.email} · {cv.telephone} · {cv.adresse}
      </p>

      <div style={{ height: 3, background: '#d9a441', width: 60, margin: '20px 0 24px' }} />

      {cv.experiences.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f4e79', marginBottom: 14 }}>
            Expériences
          </h2>
          {cv.experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: '2px solid #d8d3c5' }}>
              <strong style={{ color: '#12233a', fontSize: 15 }}>{exp.poste} — {exp.entreprise}</strong>
              <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 6px' }}>
                {exp.dateDebut} → {exp.enCours ? 'En cours' : exp.dateFin}
              </p>
              <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {cv.formations.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f4e79', marginBottom: 14 }}>
            Formations
          </h2>
          {cv.formations.map((formation) => (
            <div key={formation.id} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: '2px solid #d8d3c5' }}>
              <strong style={{ color: '#12233a', fontSize: 15 }}>{formation.diplome} — {formation.etablissement}</strong>
              <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 0' }}>
                {formation.dateDebut} → {formation.enCours ? 'En cours' : formation.dateFin}
              </p>
            </div>
          ))}
        </section>
      )}

      {cv.competences.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f4e79', marginBottom: 14 }}>
            Compétences
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {cv.competences.map((comp) => (
              <span
                key={comp.id}
                style={{
                  background: '#f7f5ef',
                  border: '1px solid #d9a441',
                  color: '#12233a',
                  padding: '5px 14px',
                  borderRadius: 3,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {comp.nom} · {comp.niveau}/5
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}