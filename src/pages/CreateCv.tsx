import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCv } from '../api/cvApi';
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

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [competences, setCompetences] = useState<Competence[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');

    try {
      await createCv({
        nom,
        prenom,
        dateNaissance,
        adresse,
        email,
        telephone,
        experiences,
        formations,
        competences,
      });
      navigate('/cvs');
    } catch (err) {
      setErreur('Erreur lors de la création du CV.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un CV</h2>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <div>
        <label>Nom</label>
        <input value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>
      <div>
        <label>Prénom</label>
        <input value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      </div>
      <div>
        <label>Date de naissance</label>
        <input type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required />
      </div>
      <div>
        <label>Adresse</label>
        <input value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Téléphone</label>
        <input value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
      </div>

      <hr />
      <h3>Expériences</h3>
      {experiences.map((exp, index) => (
        <div key={index} style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
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
          <button type="button" onClick={() => supprimerExperience(index)}>Retirer</button>
        </div>
      ))}
      <button type="button" onClick={ajouterExperience}>+ Ajouter une expérience</button>

      <hr />
      <h3>Formations</h3>
      {formations.map((form, index) => (
        <div key={index} style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
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
          <button type="button" onClick={() => supprimerFormation(index)}>Retirer</button>
        </div>
      ))}
      <button type="button" onClick={ajouterFormation}>+ Ajouter une formation</button>

      <hr />
      <h3>Compétences</h3>
      {competences.map((comp, index) => (
        <div key={index} style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
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
          <button type="button" onClick={() => supprimerCompetence(index)}>Retirer</button>
        </div>
      ))}
      <button type="button" onClick={ajouterCompetence}>+ Ajouter une compétence</button>

      <hr />
      <button type="submit">Créer le CV</button>
    </form>
  );
}