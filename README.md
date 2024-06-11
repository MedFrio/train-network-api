# Train Network API

Cette API a été réalisée en Node.js avec Express et une base de données MongoDB. Elle permet de gérer des sites ferroviaires selon le principe suivant : une "ligne" de train dessert plusieurs villes et plusieurs gares. Une gare peut être desservie par plusieurs lignes. Une gare peut se trouver dans deux villes (comme la gare de Réaumont / Saint Cassien) et une ville peut avoir une ou plusieurs gares. Chaque ligne ferroviaire est définie par une nature (tourisme ou fret, par exemple).

## Prérequis

Avant d'utiliser cette API, assurez-vous d'avoir installé :

- Node.js
- MongoDB

## Installation

1. Clonez ce dépôt sur votre machine.

2. Accédez au répertoire du projet :
cd train-network-api

3. Installez les dépendances :
npm install


4. Configurez votre base de données MongoDB dans le fichier index.js:

MONGODB_URI=mongodb://localhost:27017/trainnetwork


## Utilisation

Une fois que vous avez installé les dépendances et configuré la base de données, vous pouvez démarrer le serveur :

npm start


Le serveur démarrera sur le port 3000 par défaut. 

## Routes

### Stations

- `GET /stations`: Récupérer toutes les stations.
- `GET /stations/:id`: Récupérer une station par son ID.
- `POST /stations`: Créer une nouvelle station.
- `PUT /stations/:id`: Mettre à jour une station existante.
- `DELETE /stations/:id`: Supprimer une station existante.

### Lines

- `GET /lines`: Récupérer toutes les lignes.
- `GET /lines/:id`: Récupérer une ligne par son ID.
- `POST /lines`: Créer une nouvelle ligne.
- `PUT /lines/:id`: Mettre à jour une ligne existante.
- `DELETE /lines/:id`: Supprimer une ligne existante.

Assurez-vous de remplacer `:id` par l'identifiant réel de la station ou de la ligne dans les requêtes.
