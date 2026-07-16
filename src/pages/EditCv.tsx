import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCvById, updateCv, uploadCvPhoto } from "../api/cvApi";
import type { CreateCvDto } from "../types/cv";

type Experience = CreateCvDto["experiences"][number];
type Formation = CreateCvDto["formations"][number];
type Competence = CreateCvDto["competences"][number];

export function EditCv() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(true);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [situationMatrimoniale, setSituationMatrimoniale] = useState("");
  const [loisirs, setLoisirs] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [permis, setPermis] = useState("");
  const [resume, setResume] = useState("");

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [envoiEncours, setenvoiEncours] = useState(false);

  const [langues, setLangues] = useState<CreateCvDto["langues"]>([]);

  useEffect(() => {
    if (id) {
      getCvById(Number(id)).then((cv) => {
        setNom(cv.nom);
        setPrenom(cv.prenom);
        setDateNaissance(cv.dateNaissance.split("T")[0]);
        setAdresse(cv.adresse);
        setEmail(cv.email);
        setTelephone(cv.telephone);
        setExperiences(
          cv.experiences.map((e) => ({
            poste: e.poste,
            entreprise: e.entreprise,
            description: e.description,
            dateDebut: e.dateDebut.split("T")[0],
            dateFin: e.dateFin ? e.dateFin.split("T")[0] : null,
          })),
        );
        setFormations(
          cv.formations.map((f) => ({
            diplome: f.diplome,
            etablissement: f.etablissement,
            dateDebut: f.dateDebut.split("T")[0],
            dateFin: f.dateFin ? f.dateFin.split("T")[0] : null,
          })),
        );
        setCompetences(
          cv.competences.map((c) => ({ nom: c.nom, niveau: c.niveau })),
        );
        setSituationMatrimoniale(cv.situationMatrimoniale);
        setLoisirs(cv.loisirs);
        setNationalite(cv.nationalite);
        setPermis(cv.permis);
        setResume(cv.resume);
        setPhotoUrl(cv.photoUrl ?? null);
        setLangues(cv.langues.map((l) => ({ nom: l.nom, niveau: l.niveau })));
        setChargement(false);
      });
    }
  }, [id]);

  const uploadPhoto = async () => {
    if (!id || !selectedFile) {
      setUploadError("Veuillez sélectionner un fichier avant d’envoyer.");
      return;
    }

    try {
      setUploadError("");
      const uploadedUrl = await uploadCvPhoto(Number(id), selectedFile);
      setPhotoUrl(uploadedUrl);
      setSelectedFile(null);
    } catch (err) {
      setErreur("Erreur lors de la création du CV.");
    } finally {
      setenvoiEncours(false);
    }
  };

  const modifierExperience = (
    index: number,
    champ: keyof Experience,
    valeur: string,
  ) => {
    const copie = [...experiences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setExperiences(copie);
  };

  const modifierFormation = (
    index: number,
    champ: keyof Formation,
    valeur: string,
  ) => {
    const copie = [...formations];
    copie[index] = { ...copie[index], [champ]: valeur };
    setFormations(copie);
  };

  const modifierCompetence = (
    index: number,
    champ: keyof Competence,
    valeur: string | number,
  ) => {
    const copie = [...competences];
    copie[index] = { ...copie[index], [champ]: valeur };
    setCompetences(copie);
  };

  const modifierLangue = (
    index: number,
    champ: "nom" | "niveau",
    valeur: string | number,
  ) => {
    const copie = [...langues];
    copie[index] = { ...copie[index], [champ]: valeur };
    setLangues(copie);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");

    if (envoiEncours) return; // sécurité supplémentaire
    setenvoiEncours(true);

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

      navigate("/cvs");
    } catch (err) {
      setErreur("Erreur lors de la modification du CV.");
    } finally {
      setenvoiEncours(false);
    }
  };

  if (chargement) return <p>Chargement...</p>;

  return (
    <div className="page">
      <div className="card">
        <h2>Modifier le CV</h2>

        {erreur && <p className="error-message">{erreur}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <input
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
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
            <input
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Photo du CV</label>
            {photoUrl && (
              <div style={{ marginBottom: 10 }}>
                <img
                  src={photoUrl}
                  alt="Photo du CV"
                  style={{
                    maxWidth: 150,
                    display: "block",
                    marginBottom: 10,
                    borderRadius: 8,
                  }}
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={uploadPhoto}
              style={{ marginTop: 8 }}
            >
              Téléverser la photo
            </button>
            {uploadError && <p className="error-message">{uploadError}</p>}
          </div>
          <div className="form-group">
            <label>Résumé / Titre professionnel</label>
            <input
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="ex: Développeur Full-Stack"
            />
          </div>
          <div className="form-group">
            <label>Situation matrimoniale</label>
            <input
              value={situationMatrimoniale}
              onChange={(e) => setSituationMatrimoniale(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nationalité</label>
            <input
              value={nationalite}
              onChange={(e) => setNationalite(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Permis</label>
            <input
              value={permis}
              onChange={(e) => setPermis(e.target.value)}
              placeholder="ex: B"
            />
          </div>
          <div className="form-group">
            <label>Loisirs</label>
            <input
              value={loisirs}
              onChange={(e) => setLoisirs(e.target.value)}
            />
          </div>
          <h3>Expériences</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Poste"
                value={exp.poste}
                onChange={(e) =>
                  modifierExperience(index, "poste", e.target.value)
                }
              />
              <input
                placeholder="Entreprise"
                value={exp.entreprise}
                onChange={(e) =>
                  modifierExperience(index, "entreprise", e.target.value)
                }
              />
              <input
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  modifierExperience(index, "description", e.target.value)
                }
              />
              <input
                type="date"
                value={exp.dateDebut}
                onChange={(e) =>
                  modifierExperience(index, "dateDebut", e.target.value)
                }
              />
            </div>
          ))}

          <h3>Formations</h3>
          {formations.map((form, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Diplôme"
                value={form.diplome}
                onChange={(e) =>
                  modifierFormation(index, "diplome", e.target.value)
                }
              />
              <input
                placeholder="Établissement"
                value={form.etablissement}
                onChange={(e) =>
                  modifierFormation(index, "etablissement", e.target.value)
                }
              />
              <input
                type="date"
                value={form.dateDebut}
                onChange={(e) =>
                  modifierFormation(index, "dateDebut", e.target.value)
                }
              />
            </div>
          ))}

          <h3>Compétences</h3>
          {competences.map((comp, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Nom"
                value={comp.nom}
                onChange={(e) =>
                  modifierCompetence(index, "nom", e.target.value)
                }
              />
              <input
                type="number"
                min={1}
                max={5}
                value={comp.niveau}
                onChange={(e) =>
                  modifierCompetence(index, "niveau", Number(e.target.value))
                }
              />
            </div>
          ))}

          <h3>Langues</h3>
          {langues.map((langue, index) => (
            <div key={index} className="section-block">
              <input
                placeholder="Nom de la langue"
                value={langue.nom}
                onChange={(e) => modifierLangue(index, "nom", e.target.value)}
              />
              <select
                value={langue.niveau}
                onChange={(e) =>
                  modifierLangue(index, "niveau", Number(e.target.value))
                }
              >
                <option value={1}>Débutant</option>
                <option value={2}>Élémentaire</option>
                <option value={3}>Intermédiaire</option>
                <option value={4}>Avancé</option>
                <option value={5}>Courant / Natif</option>
              </select>
            </div>
          ))}

          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={envoiEncours}
            >
              {envoiEncours
                ? "Enregistrement en cours..."
                : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
