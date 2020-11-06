# Projet Athlètes
## Requirements
npm install  
(pour récupérer les node_modules)
## Pages
### /
Page d'accueil.
- Liens vers /athletes et /sports
### /athletes
- Liste des athlèthes.
- Possibilité de créer un athlète.
### /sports
- Liste des sports.
- Possibilité de créer un sport.
- Possibilité d'ajouter un sport à un athlète.
## API
POST /api/sports (objet sport en request body) --> crée un sport  
GET /api/sports --> renvoie les sports (JSON)  
GET /api/sports/{sportId}/athletes --> renvoie les athlètes d'un sport (JSON)  
POST /api/sports/{sportId}/athletes/{athleteId} --> ajoute un athlète à un sport  

POST /api/athletes (objet athlete en request body) --> crée un athlete  
GET /api/athletes --> renvoie les athlèthes (JSON)  
GET /api/athletes/{athleteId}/sports --> renvoie les sports d'un athlète (JSON)  
