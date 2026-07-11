import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCv, uploadCvPhoto } from '../api/cvApi';
import type { CreateCvDto } from '../types/cv';

type Experience = CreateCvDto['experiences'][number];
type Formation = CreateCvDto['formations'][number];
type Competence = CreateCvDto['competences'][number];

export function CreateCv() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState < Experience[] > ([]);
  const [formations, setFormations] = useState < Formation[] > ([]);
  const [competences, setCompetences] = useState < Competence[] > ([]);

  const [situationMatrimoniale, setSituationMatrimoniale] = useState('');
  const [loisirs, setLoisirs] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [permis, setPermis] = useState('');
  const [resume, setResume] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  const [langues, setLangues] = useState < CreateCvDto['langues'] > ([]);
  const [envoiEncours, setenvoiEncours] = useState(false);

  // --- Expériences ---
  const ajouterExperience = () => {
    setExperiences([
      ...experiences,
      { poste: '', entreprise: '', description: '', dateDebut: '', dateFin: null },
    ]);
  };

  const modifierExperience = (index: number, champ: keyof Experience, valeur: string) => {
    const copie = [...experiences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setExperiences(copie);
  };

  const supprimerExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // --- Formations ---
  const ajouterFormation = () => {
    setFormations([
      ...formations,
      { diplome: '', etablissement: '', dateDebut: '', dateFin: null },
    ]);
  };

  const modifierFormation = (index: number, champ: keyof Formation, valeur: string) => {
    const copie = [...formations];
    copie[index] = { ...copie[index], [champ]: valeur };
    setFormations(copie);
  };

  const supprimerFormation = (index: number) => {
    setFormations(formations.filter((_, i) => i !== index));
  };

  // --- Compétences ---
  const ajouterCompetence = () => {
    setCompetences([...competences, { nom: '', niveau: 1 }]);
  };

  const modifierCompetence = (index: number, champ: keyof Competence, valeur: string | number) => {
    const copie = [...competences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setCompetences(copie);
  };

  const supprimerCompetence = (index: number) => {
    setCompetences(competences.filter((_, i) => i !== index));
  };

  const ajouterLangue = () => {
    setLangues([...langues, { nom: '', niveau: 1 }]);
  };

  const modifierLangue = (index: number, champ: 'nom' | 'niveau', valeur: string | number) => {
    const copie = [...langues];
    copie[index] = { ...copie[index], [champ]: valeur };
    setLangues(copie);
  };

  const supprimerLangue = (index: number) => {
    setLangues(langues.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setUploadError('');

      if (envoiEncours) return; // sécurité supplémentaire
  setenvoiEncours(true);

    try {
      const createdCv = await createCv({
        nom,
        prenom,
        dateNaissance,
        adresse,
        email,
        telephone,
        experiences,
        formations,
        competences,
        situationMatrimoniale,
        loisirs,
        nationalite,
        permis,
        resume,
        langues,
      });

      if (selectedFile) {
        await uploadCvPhoto(createdCv.id, selectedFile);
      }

   navigate('/cvs');
    } catch (err) {
      setErreur('Erreur lors de la création du CV.');
    } finally {
      setenvoiEncours(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Créer un CV</h2>

        {erreur && <p className="error-message">{erreur}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <input value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Date de naissance</label>
            <input type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Adresse</label>
            <input value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Photo du CV (facultatif)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
            {uploadError && <p className="error-message">{uploadError}</p>}
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
              La photo sera envoyée lors de la création du CV.
            </p>
          </div>

          <div className="form-group">
            <label>Résumé / Titre professionnel</label>
            <input value={resume} onChange={(e) => setResume(e.target.value)} placeholder="ex: Développeur Full-Stack" />
          </div>
          <div className="form-group">
            <label>Situation matrimoniale</label>
            <input value={situationMatrimoniale} onChange={(e) => setSituationMatrimoniale(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nationalité</label>
            <input value={nationalite} onChange={(e) => setNationalite(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Permis</label>
            <input value={permis} onChange={(e) => setPermis(e.target.value)} placeholder="ex: B" />
          </div>
          <div className="form-group">
            <label>Loisirs</label>
            <input value={loisirs} onChange={(e) => setLoisirs(e.target.value)} />
          </div>

          <h3>Expériences</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Poste"
                value={exp.poste}
                onChange={(e) => modifierExperience(index, 'poste', e.target.value)}
              />
              <input
                placeholder="Entreprise"
                value={exp.entreprise}
                onChange={(e) => modifierExperience(index, 'entreprise', e.target.value)}
              />
              <input
                placeholder="Description"
                value={exp.description}
                onChange={(e) => modifierExperience(index, 'description', e.target.value)}
              />
              <input
                type="date"
                value={exp.dateDebut}
                onChange={(e) => modifierExperience(index, 'dateDebut', e.target.value)}
              />
              <button type="button" onClick={() => supprimerExperience(index)} className="btn btn-danger">
                Retirer
              </button>
            </div>
          ))}
          <button type="button" onClick={ajouterExperience} className="btn btn-secondary" style={{ color: 'var(--ink)', border: '1px solid var(--border)', marginBottom: 20 }}>
            + Ajouter une expérience
          </button>

          <h3>Formations</h3>
          {formations.map((form, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Diplôme"
                value={form.diplome}
                onChange={(e) => modifierFormation(index, 'diplome', e.target.value)}
              />
              <input
                placeholder="Établissement"
                value={form.etablissement}
                onChange={(e) => modifierFormation(index, 'etablissement', e.target.value)}
              />
              <input
                type="date"
                value={form.dateDebut}
                onChange={(e) => modifierFormation(index, 'dateDebut', e.target.value)}
              />
              <button type="button" onClick={() => supprimerFormation(index)} className="btn btn-danger">
                Retirer
              </button>
            </div>
          ))}
          <button type="button" onClick={ajouterFormation} className="btn btn-secondary" style={{ color: 'var(--ink)', border: '1px solid var(--border)', marginBottom: 20 }}>
            + Ajouter une formation
          </button>

          <h3>Compétences</h3>
          {competences.map((comp, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Nom"
                value={comp.nom}
                onChange={(e) => modifierCompetence(index, 'nom', e.target.value)}
              />
              <input
                type="number"
                min={1}
                max={5}
                value={comp.niveau}
                onChange={(e) => modifierCompetence(index, 'niveau', Number(e.target.value))}
              />
              <button type="button" onClick={() => supprimerCompetence(index)} className="btn btn-danger">
                Retirer
              </button>
            </div>
          ))}


          <button type="button" onClick={ajouterCompetence} className="btn btn-secondary" style={{ color: 'var(--ink)', border: '1px solid var(--border)', marginBottom: 20 }}>
            + Ajouter une compétence
          </button>


          <h3>Langues</h3>
          {langues.map((langue, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Nom de la langue"
                value={langue.nom}
                onChange={(e) => modifierLangue(index, 'nom', e.target.value)}
              />
              <input
                type="number"
                min={1}
                max={5}
                value={langue.niveau}
                onChange={(e) => modifierLangue(index, 'niveau', Number(e.target.value))}
              />
              <button type="button" onClick={() => supprimerLangue(index)} className="btn btn-danger">
                Retirer
              </button>
            </div>
          ))}
          <button type="button" onClick={ajouterLangue} className="btn btn-secondary" style={{ color: 'var(--ink)', border: '1px solid var(--border)', marginBottom: 20 }}>
            + Ajouter une langue
          </button>
          <div>
            <button type="submit" className="btn btn-primary" disabled={envoiEncours}>
                  {envoiEncours ? 'Création en cours...' : 'Créer le CV'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}