import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCvById, updateCv, uploadCvPhoto } from '../api/cvApi';
import type { CreateCvDto, CvDto } from '../types/cv';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';

type Experience = CreateCvDto['experiences'][number];
type Formation = CreateCvDto['formations'][number];
type Competence = CreateCvDto['competences'][number];

const TEMPLATES = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
};

export function EditCv() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const templateKey = (searchParams.get('template') as keyof typeof TEMPLATES) || 'classic';
  const SelectedTemplate = TEMPLATES[templateKey] || ClassicTemplate;

  // --- États du formulaire (initialisés vides, remplis au chargement) ---
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [resume, setResume] = useState('');
  const [situationMatrimoniale, setSituationMatrimoniale] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [permis, setPermis] = useState('');
  const [loisirs, setLoisirs] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [langues, setLangues] = useState<CreateCvDto['langues']>([]);

  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(''); // aperçu local du nouveau fichier
  const [erreur, setErreur] = useState('');
  const [envoiEncours, setEnvoiEncours] = useState(false);
  const [chargement, setChargement] = useState(true);

  // --- État des onglets et détection mobile ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveTab('editor');
    }
  }, [isMobile]);

  // --- Chargement des données du CV existant ---
  useEffect(() => {
    if (!id) return;
    setChargement(true);
    getCvById(Number(id))
      .then((cv) => {
        setNom(cv.nom);
        setPrenom(cv.prenom);
        setDateNaissance(cv.dateNaissance.split('T')[0]);
        setAdresse(cv.adresse);
        setEmail(cv.email);
        setTelephone(cv.telephone);
        setResume(cv.resume);
        setSituationMatrimoniale(cv.situationMatrimoniale);
        setNationalite(cv.nationalite);
        setPermis(cv.permis);
        setLoisirs(cv.loisirs);
        setExperiences(
          cv.experiences.map((e) => ({
            poste: e.poste,
            entreprise: e.entreprise,
            description: e.description,
            dateDebut: e.dateDebut.split('T')[0],
            dateFin: e.dateFin ? e.dateFin.split('T')[0] : null,
          })),
        );
        setFormations(
          cv.formations.map((f) => ({
            diplome: f.diplome,
            etablissement: f.etablissement,
            dateDebut: f.dateDebut.split('T')[0],
            dateFin: f.dateFin ? f.dateFin.split('T')[0] : null,
          })),
        );
        setCompetences(cv.competences.map((c) => ({ nom: c.nom, niveau: c.niveau })));
        setLangues(cv.langues.map((l) => ({ nom: l.nom, niveau: l.niveau })));
        setExistingPhotoUrl(cv.photoUrl ?? null);
        setChargement(false);
      })
      .catch(() => {
        setErreur('Impossible de charger le CV.');
        setChargement(false);
      });
  }, [id]);

  // --- Gestion de la photo ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview('');
    }
  };

  // --- Expériences ---
  const ajouterExperience = () =>
    setExperiences([
      ...experiences,
      { poste: '', entreprise: '', description: '', dateDebut: '', dateFin: null },
    ]);

  const modifierExperience = (index: number, champ: keyof Experience, valeur: string) => {
    const copie = [...experiences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setExperiences(copie);
  };

  const supprimerExperience = (index: number) =>
    setExperiences(experiences.filter((_, i) => i !== index));

  // --- Formations ---
  const ajouterFormation = () =>
    setFormations([...formations, { diplome: '', etablissement: '', dateDebut: '', dateFin: null }]);

  const modifierFormation = (index: number, champ: keyof Formation, valeur: string) => {
    const copie = [...formations];
    copie[index] = { ...copie[index], [champ]: valeur };
    setFormations(copie);
  };

  const supprimerFormation = (index: number) =>
    setFormations(formations.filter((_, i) => i !== index));

  // --- Compétences ---
  const ajouterCompetence = () => setCompetences([...competences, { nom: '', niveau: 1 }]);

  const modifierCompetence = (index: number, champ: keyof Competence, valeur: string | number) => {
    const copie = [...competences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setCompetences(copie);
  };

  const supprimerCompetence = (index: number) =>
    setCompetences(competences.filter((_, i) => i !== index));

  // --- Langues ---
  const ajouterLangue = () => setLangues([...langues, { nom: '', niveau: 1 }]);

  const modifierLangue = (index: number, champ: 'nom' | 'niveau', valeur: string | number) => {
    const copie = [...langues];
    copie[index] = { ...copie[index], [champ]: valeur };
    setLangues(copie);
  };

  const supprimerLangue = (index: number) => setLangues(langues.filter((_, i) => i !== index));

  // --- Soumission du formulaire (mise à jour) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    if (envoiEncours) return;
    setEnvoiEncours(true);

    try {
      await updateCv(Number(id), {
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

      // Si un nouveau fichier a été sélectionné, on l'envoie après la mise à jour
      if (selectedFile && id) {
        await uploadCvPhoto(Number(id), selectedFile);
      }

      navigate('/cvs');
    } catch {
      setErreur('Erreur lors de la mise à jour du CV.');
    } finally {
      setEnvoiEncours(false);
    }
  };

  // --- Construction de l'objet pour l'aperçu en direct ---
  // Les tableaux du formulaire n'ont pas d'id/enCours (type de création) : on les
  // complète avec des valeurs temporaires, utilisées uniquement pour l'aperçu visuel.
  const cvPreviewData: CvDto = {
    id: Number(id),
    photoUrl: photoPreview || existingPhotoUrl || undefined, // Priorité à la nouvelle image locale
    nom,
    prenom,
    dateNaissance,
    adresse,
    email,
    telephone,
    resume,
    situationMatrimoniale,
    nationalite,
    permis,
    loisirs,
    experiences: experiences.map((exp, index) => ({
      ...exp,
      id: index,
      enCours: !exp.dateFin,
    })),
    formations: formations.map((form, index) => ({
      ...form,
      id: index,
      enCours: !form.dateFin,
    })),
    competences: competences.map((comp, index) => ({ ...comp, id: index })),
    langues: langues.map((langue, index) => ({ ...langue, id: index })),
  };

  if (chargement) {
    return (
      <div className="editor-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p>Chargement du CV...</p>
      </div>
    );
  }

  return (
    <div className="editor-layout">
      {/* Barre d'onglets - visible uniquement sur mobile */}
      {isMobile && (
        <div className="editor-tabs">
          <button
            className={`editor-tab ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Édition
          </button>
          <button
            className={`editor-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Aperçu
          </button>
        </div>
      )}

      {/* Panneau gauche : Éditeur */}
      <div className={`editor-sidebar ${!isMobile || activeTab === 'editor' ? 'active' : ''}`}>
        <div className="editor-header">
          <button onClick={() => navigate('/cvs')} className="landing-btn landing-btn--ghost">
            <FiArrowLeft /> Retour
          </button>
          <button onClick={handleSubmit} className="landing-btn landing-btn--primary" disabled={envoiEncours}>
            <FiSave /> {envoiEncours ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>

        {erreur && <p className="error-message">{erreur}</p>}

        <form onSubmit={handleSubmit} className="editor-form">
          {/* Informations Personnelles */}
          <div className="editor-section">
            <h3>Informations Personnelles</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Prénom</label>
                <input value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)} required />
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
                <label>Date de naissance</label>
                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Photo du CV</label>
              {existingPhotoUrl && !photoPreview && (
                <div style={{ marginBottom: 10 }}>
                  <img
                    src={existingPhotoUrl}
                    alt="Photo actuelle"
                    style={{ maxWidth: 150, display: 'block', borderRadius: 8 }}
                  />
                </div>
              )}
              {photoPreview && (
                <div style={{ marginBottom: 10 }}>
                  <img
                    src={photoPreview}
                    alt="Nouvelle photo"
                    style={{ maxWidth: 150, display: 'block', borderRadius: 8 }}
                  />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          {/* Profil professionnel */}
          <div className="editor-section">
            <h3>Profil Professionnel</h3>
            <div className="form-group">
              <label>Titre / Résumé</label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Ex: Développeur Full-Stack passionné..."
                rows={3}
              ></textarea>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Nationalité</label>
                <input value={nationalite} onChange={(e) => setNationalite(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Permis</label>
                <input value={permis} onChange={(e) => setPermis(e.target.value)} placeholder="Ex: B" />
              </div>
              <div className="form-group">
                <label>Situation</label>
                <input
                  value={situationMatrimoniale}
                  onChange={(e) => setSituationMatrimoniale(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Loisirs</label>
                <input value={loisirs} onChange={(e) => setLoisirs(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Expériences */}
          <div className="editor-section">
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
                <div className="form-grid">
                  <input
                    type="date"
                    value={exp.dateDebut}
                    onChange={(e) => modifierExperience(index, 'dateDebut', e.target.value)}
                  />
                  <input
                    type="date"
                    value={exp.dateFin || ''}
                    onChange={(e) => modifierExperience(index, 'dateFin', e.target.value)}
                    placeholder="Date de fin"
                  />
                </div>
                <textarea
                  placeholder="Description des tâches"
                  value={exp.description}
                  onChange={(e) => modifierExperience(index, 'description', e.target.value)}
                  rows={2}
                />
                <button type="button" onClick={() => supprimerExperience(index)} className="btn-remove">
                  Supprimer
                </button>
              </div>
            ))}
            <button type="button" onClick={ajouterExperience} className="btn-add">
              + Ajouter une expérience
            </button>
          </div>

          {/* Formations */}
          <div className="editor-section">
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
                <div className="form-grid">
                  <input
                    type="date"
                    value={form.dateDebut}
                    onChange={(e) => modifierFormation(index, 'dateDebut', e.target.value)}
                  />
                  <input
                    type="date"
                    value={form.dateFin || ''}
                    onChange={(e) => modifierFormation(index, 'dateFin', e.target.value)}
                    placeholder="Date de fin"
                  />
                </div>
                <button type="button" onClick={() => supprimerFormation(index)} className="btn-remove">
                  Supprimer
                </button>
              </div>
            ))}
            <button type="button" onClick={ajouterFormation} className="btn-add">
              + Ajouter une formation
            </button>
          </div>

          {/* Compétences & Langues */}
          <div className="editor-section">
            <h3>Compétences & Langues</h3>
            <label>Compétences (Niveau de 1 à 5)</label>
            {competences.map((comp, index) => (
              <div key={index} className="section-block inline-block">
                <input
                  placeholder="Ex: React"
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
                <button type="button" onClick={() => supprimerCompetence(index)} className="btn-remove-icon">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={ajouterCompetence} className="btn-add">
              + Ajouter une compétence
            </button>

            <label style={{ marginTop: '1rem', display: 'block' }}>Langues (Niveau de 1 à 5)</label>
            {langues.map((langue, index) => (
              <div key={index} className="section-block inline-block">
                <input
                  placeholder="Ex: Anglais"
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
                <button type="button" onClick={() => supprimerLangue(index)} className="btn-remove-icon">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={ajouterLangue} className="btn-add">
              + Ajouter une langue
            </button>
          </div>
        </form>
      </div>

      {/* Panneau droit : Aperçu */}
      <div className={`editor-preview-pane ${!isMobile || activeTab === 'preview' ? 'active' : ''}`}>
        <div className="preview-container">
          <SelectedTemplate cv={cvPreviewData} />
        </div>
      </div>
    </div>
  );
}