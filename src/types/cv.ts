export interface CompetenceDto {
  id: number;
  nom: string;
  niveau: number;
}

export interface FormationDto {
  id: number;
  diplome: string;
  etablissement: string;
  dateDebut: string;
  dateFin: string | null;
  enCours: boolean;
}

export interface ExperienceDto {
  id: number;
  poste: string;
  entreprise: string;
  description: string;
  dateDebut: string;
  dateFin: string | null;
  enCours: boolean;
}

export interface CvDto {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  email: string;
  telephone: string;
  photoUrl?: string;
  experiences: ExperienceDto[];
  formations: FormationDto[];
  competences: CompetenceDto[];
  situationMatrimoniale: string;
  loisirs: string;
  nationalite: string;
  permis: string;
  resume: string;
  langues: LangueDto[];
}

export interface CreateCvDto {
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  email: string;
  telephone: string;
  experiences: Omit<ExperienceDto, 'id' | 'enCours'>[];
  formations: Omit<FormationDto, 'id' | 'enCours'>[];
  competences: Omit<CompetenceDto, 'id'>[];
  situationMatrimoniale: string;
  loisirs: string;
  nationalite: string;
  permis: string;
  resume: string;
  langues: Omit<LangueDto, 'id'>[];
}


export interface LangueDto {
  id: number;
  nom: string;
  niveau: number;
}