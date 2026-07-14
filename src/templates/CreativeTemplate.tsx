import type { CvDto } from '../types/cv';

interface Props {
  cv: CvDto;
}

// Palette de couleurs pour les tags (compétences/langues), en rotation
const TAG_COLORS = ['#d9a441', '#1f4e79', '#5b8c7b'];

function tagColor(index: number) {
  return TAG_COLORS[index % TAG_COLORS.length];
}

function NiveauDots({ niveau, color }: { niveau: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: n <= niveau ? color : '#e7dfcb',
          }}
        />
      ))}
    </div>
  );
}

export function CreativeTemplate({ cv }: Props) {
  return (
    <div
      className="creative-cv"
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        maxWidth: 800,
        margin: '0 auto',
        background: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bandeau d'en-tête */}
      <div
        style={{
          background: 'linear-gradient(135deg, #12233a, #1f4e79)',
          padding: '40px 40px 70px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            background: '#d9a441',
            opacity: 0.15,
            transform: 'rotate(45deg) translate(35%, -55%)',
          }}
        />
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 34, color: '#f7f5ef', margin: 0, position: 'relative' }}>
          {cv.prenom} {cv.nom}
        </h1>
        {cv.resume && (
          <p style={{ color: 'rgba(247,245,239,0.85)', fontStyle: 'italic', marginTop: 10, fontSize: 14, maxWidth: 460, position: 'relative' }}>
            {cv.resume}
          </p>
        )}
      </div>

      {cv.photoUrl && (
        <img
          src={cv.photoUrl}
          alt="Photo"
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid white',
            boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
            position: 'absolute',
            top: 60,
            right: 40,
          }}
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, padding: '32px 40px 40px' }}>
        {/* Colonne latérale */}
        <aside>
          <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
            <p style={{ margin: 0 }}>{cv.email}</p>
            <p style={{ margin: 0 }}>{cv.telephone}</p>
            <p style={{ margin: 0 }}>{cv.adresse}</p>
          </div>

          {cv.competences.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#12233a', borderBottom: '2px solid #d9a441', display: 'inline-block', paddingBottom: 4, marginBottom: 14 }}>
                Compétences
              </h3>
              {cv.competences.map((comp, i) => (
                <div key={comp.id} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 13, margin: '0 0 4px', color: '#12233a', fontWeight: 600 }}>{comp.nom}</p>
                  <NiveauDots niveau={comp.niveau} color={tagColor(i)} />
                </div>
              ))}
            </div>
          )}

          {cv.langues.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#12233a', borderBottom: '2px solid #d9a441', display: 'inline-block', paddingBottom: 4, marginBottom: 14 }}>
                Langues
              </h3>
              {cv.langues.map((langue, i) => (
                <div key={langue.id} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 13, margin: '0 0 4px', color: '#12233a', fontWeight: 600 }}>{langue.nom}</p>
                  <NiveauDots niveau={langue.niveau} color={tagColor(i)} />
                </div>
              ))}
            </div>
          )}

          {(cv.situationMatrimoniale || cv.nationalite || cv.permis || cv.loisirs) && (
            <div>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#12233a', borderBottom: '2px solid #d9a441', display: 'inline-block', paddingBottom: 4, marginBottom: 14 }}>
                Informations
              </h3>
              <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.8 }}>
                {cv.situationMatrimoniale && <p style={{ margin: 0 }}>{cv.situationMatrimoniale}</p>}
                {cv.nationalite && <p style={{ margin: 0 }}>{cv.nationalite}</p>}
                {cv.permis && <p style={{ margin: 0 }}>Permis {cv.permis}</p>}
                {cv.loisirs && <p style={{ margin: 0 }}>{cv.loisirs}</p>}
              </div>
            </div>
          )}
        </aside>

        {/* Contenu principal */}
        <main>
          {cv.experiences.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: '#12233a', marginBottom: 18 }}>
                Expériences
              </h2>
              <div style={{ position: 'relative', paddingLeft: 20 }}>
                <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 2, background: '#e7dfcb' }} />
                {cv.experiences.map((exp, i) => (
                  <div key={exp.id} style={{ position: 'relative', marginBottom: 20 }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: -20,
                        top: 4,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: tagColor(i),
                        border: '2px solid white',
                        boxShadow: '0 0 0 1px #e7dfcb',
                      }}
                    />
                    <strong style={{ color: '#12233a', fontSize: 15 }}>{exp.poste}</strong>
                    <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 6px' }}>
                      {exp.entreprise} · {exp.dateDebut} → {exp.enCours ? 'En cours' : exp.dateFin}
                    </p>
                    <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.formations.length > 0 && (
            <section>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: '#12233a', marginBottom: 18 }}>
                Formations
              </h2>
              <div style={{ position: 'relative', paddingLeft: 20 }}>
                <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 2, background: '#e7dfcb' }} />
                {cv.formations.map((formation, i) => (
                  <div key={formation.id} style={{ position: 'relative', marginBottom: 20 }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: -20,
                        top: 4,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: tagColor(i),
                        border: '2px solid white',
                        boxShadow: '0 0 0 1px #e7dfcb',
                      }}
                    />
                    <strong style={{ color: '#12233a', fontSize: 15 }}>{formation.diplome}</strong>
                    <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", margin: '2px 0 0' }}>
                      {formation.etablissement} · {formation.dateDebut} → {formation.enCours ? 'En cours' : formation.dateFin}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
