import type { CvDto } from '../types/cv';

interface Props {
  cv: CvDto;
}

export function ModernTemplate({ cv }: Props) {
  return (
    <div style={{ display: 'flex', fontFamily: "'Inter', Arial, sans-serif", maxWidth: 800, margin: '0 auto', background: 'white' }}>
      {/* Sidebar */}
      <aside style={{ background: '#12233a', color: '#f7f5ef', padding: 28, width: 260 }}>
       <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 2, color: '#f7f5ef' }}>{cv.prenom}</h1>
<h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 20, color: '#f7f5ef' }}>{cv.nom}</h1>

        <div style={{ height: 2, background: '#d9a441', width: 40, marginBottom: 20 }} />

        <div style={{ fontSize: 12, marginBottom: 28, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, opacity: 0.85 }}>
          <p style={{ margin: 0 }}>{cv.email}</p>
          <p style={{ margin: 0 }}>{cv.telephone}</p>
          <p style={{ margin: 0 }}>{cv.adresse}</p>
        </div>

        {cv.competences.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#d9a441', borderBottom: '1px solid rgba(247,245,239,0.2)', paddingBottom: 6, marginBottom: 14 }}>
              Compétences
            </h3>
            {cv.competences.map((comp) => (
              <div key={comp.id} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 13, marginBottom: 4 }}>{comp.nom}</p>
                <div style={{ background: 'rgba(247,245,239,0.15)', height: 4, borderRadius: 2 }}>
                  <div
                    style={{
                      background: '#d9a441',
                      height: 4,
                      borderRadius: 2,
                      width: `${(comp.niveau / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Contenu principal */}
      <main style={{ padding: 28, flex: 1 }}>
        {cv.experiences.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f4e79', marginBottom: 14 }}>
              Expériences
            </h2>
            {cv.experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 16, borderLeft: '3px solid #d9a441', paddingLeft: 14 }}>
                <strong style={{ color: '#12233a', fontSize: 15 }}>{exp.poste}</strong>
                <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 6px' }}>
                  {exp.entreprise} · {exp.dateDebut} → {exp.enCours ? 'En cours' : exp.dateFin}
                </p>
                <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {cv.formations.length > 0 && (
          <section>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f4e79', marginBottom: 14 }}>
              Formations
            </h2>
            {cv.formations.map((formation) => (
              <div key={formation.id} style={{ marginBottom: 16, borderLeft: '3px solid #d9a441', paddingLeft: 14 }}>
                <strong style={{ color: '#12233a', fontSize: 15 }}>{formation.diplome}</strong>
                <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 0' }}>
                  {formation.etablissement} · {formation.dateDebut} → {formation.enCours ? 'En cours' : formation.dateFin}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}