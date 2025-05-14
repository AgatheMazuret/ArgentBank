# Projet 13 - Bank API avec React

## Description

Ce projet est une application bancaire permettant aux utilisateurs de gérer leurs comptes et transactions. Il est construit avec une architecture front-end et back-end séparée. Le front-end utilise React et Redux, tandis que le back-end est une API RESTful documentée avec Swagger.

## Structure du projet

- **backend/** : Contient le serveur Node.js, les routes, les contrôleurs, les modèles de base de données et les scripts de population.
- **frontend/** : Contient l'application React, les composants, les pages, les fichiers de configuration et les assets.
- **swagger.yaml** : Documentation de l'API avec Swagger.

## Prérequis

- Node.js (version 16 ou supérieure)
- pnpm (gestionnaire de paquets)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   ```
2. Accédez au dossier du projet :
   ```bash
   cd Project-13-Bank-API-master
   ```
3. Installez les dépendances :
   ```bash
   pnpm install
   ```

## Lancement du projet

### Démarrer le backend

1. Accédez au dossier `backend` :
   ```bash
   cd backend
   ```
2. Démarrez le serveur :
   ```bash
   pnpm start
   ```

### Démarrer le frontend

1. Accédez au dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Lancez l'application :
   ```bash
   pnpm dev
   ```

## Fonctionnalités principales

- **Authentification** : Connexion et gestion des utilisateurs.
- **Transactions** : Consultation, création, modification et suppression des transactions.
- **Gestion des comptes** : Visualisation des informations des comptes bancaires.

## Documentation de l'API

La documentation de l'API est disponible dans le fichier `swagger.yaml`.

## Scripts utiles

- `pnpm install` : Installer les dépendances.
- `pnpm dev` : Démarrer le projet en mode développement.
- `pnpm start` : Démarrer le serveur backend.

## Contribution

Les contributions sont les bienvenues. Veuillez consulter le fichier `CONTRIBUTING.md` pour plus d'informations.

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.

## Arborescence du projet

```
Project-13-Bank-API-master/
├── backend/
│   ├── CONTRIBUTING.md
│   ├── docker-compose.yml
│   ├── package.json
│   ├── README.md
│   ├── swagger.yaml
│   ├── designs/
│   │   ├── index.html
│   │   ├── sign-in.html
│   │   ├── user.html
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── img/
│   │   └── wireframes/
│   │       ├── edit-user-name.png
│   │       └── transactions.png
│   ├── server/
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── database/
│   │   │   ├── connection.js
│   │   │   └── models/
│   │   │       └── userModel.js
│   │   ├── middleware/
│   │   │   └── tokenValidation.js
│   │   ├── routes/
│   │   │   └── userRoutes.js
│   │   ├── scripts/
│   │   │   └── populateDatabase.js
│   │   └── services/
│   │       └── userService.js
├── frontend/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── README.md
│   ├── style.css
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── argentBankLogo.png
│   │   ├── bank-tree.jpeg
│   │   ├── icon-chat.png
│   │   ├── icon-money.png
│   │   └── icon-security.png
│   └── src/
│       ├── app.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── vite-env.d.ts
│       ├── api/
│       │   └── api.tsx
│       ├── assets/
│       │   ├── argentBankLogo.png
│       │   ├── bank-tree.jpeg
│       │   ├── icon-chat.png
│       │   ├── icon-money.png
│       │   └── icon-security.png
│       ├── pages/
│       │   ├── main.tsx
│       │   ├── sign-in.tsx
│       │   └── user.tsx
│       ├── redux/
│       │   ├── auth-actions.tsx
│       │   ├── auth-reducer.ts
│       │   └── store.tsx
│       ├── router/
│       │   └── app.tsx
│       └── types/
│           └── index.tsx
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── swagger.yaml
```
