# GetYourCV

<div align="center">
  <img src="public/favicon.png" alt="GetYourCV Logo" width="120" />
  <h3>Une application web pour créer, gérer et exporter des CV professionnels en quelques minutes</h3>
</div>

---

GetYourCV est une application web moderne développée avec React, TypeScript et Vite pour aider les candidats à créer rapidement un CV clair, structuré et prêt à être envoyé. L’application permet de saisir ses informations, de gérer plusieurs CV, de choisir un modèle visuel et de les prévisualiser avant export.

## ✨ Fonctionnalités

### 🧾 Création et gestion de CV
- Créer un CV complet avec vos informations personnelles, expériences, formations, compétences, langues et loisirs.
- Éditer et supprimer un CV existant depuis une interface simple.
- Consulter la liste de ses CV dans un tableau de bord.

### 🎨 Modèles de présentation
- Plusieurs templates de mise en page : classique, moderne et créatif.
- Prévisualisation avant téléchargement.
- Interface pensée pour un rendu professionnel et lisible.

### 📄 Export et partage
- Prévisualisation du CV avant l’export.
- Téléchargement au format PDF.
- Ajout d’une photo de profil sur le CV.

### 🔐 Authentification
- Inscription et connexion utilisateur.
- Accès protégé aux pages de création, modification et prévisualisation.
- Session conservée dans le navigateur.

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm

### Démarrage rapide

```bash
# 1. Clonez le dépôt
git clone https://github.com/gedeon2306/getyourcv.git

# 2. Accédez au répertoire du projet
cd getyourcv

# 3. Installez les dépendances
npm install

# 4. Lancez le serveur de développement
npm run dev
```

### Scripts disponibles

- `npm run dev` : démarre le serveur de développement Vite.
- `npm run build` : construit l’application pour la production.
- `npm run lint` : exécute ESLint pour la qualité du code.
- `npm run preview` : affiche une prévisualisation de la version de production.
- `npm run deploy` : publie le build sur GitHub Pages.

## 🛠 Technologies utilisées

- React 19 : interface utilisateur moderne et réactive.
- TypeScript : typage statique robuste.
- Vite : environnement de développement rapide.
- React Router DOM : navigation entre les pages.
- React Icons : bibliothèque d’icônes.
- Axios : communication avec l’API backend.
- ESLint : qualité et cohérence du code.

## 📂 Structure du projet

```text
getyourcv/
├── public/               # fichiers statiques et assets
├── src/
│   ├── api/              # appels API et configuration Axios
│   ├── context/          # contexte d’authentification
│   ├── pages/            # pages React (login, dashboard, preview...)
│   ├── templates/        # composants de mise en page du CV
│   ├── types/            # définitions TypeScript
│   └── App.tsx           # configuration des routes
├── package.json          # dépendances et scripts
└── vite.config.ts       # configuration Vite
```

## 🌐 API

L’application consomme une API backend hébergée à l’adresse suivante :
- https://cvgenerator.somee.com/api

## 🤝 Contribution

Les contributions sont les bienvenues. N’hésitez pas à ouvrir une issue ou à proposer une pull request pour toute amélioration.
