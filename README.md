## 🏗️ Architecture du projet **hajaus**

C'est une application **full-stack** avec une architecture **client/serveur** qui transforme des coordonnées XYZ en visualisations 3D. Elle utilise effectivement **Python** côté serveur et **TypeScript/Angular** côté client.

---

### 📂 Structure du projet

```
hajaus/
├── client/          ← Frontend Angular (TypeScript)
│   ├── src/app/
│   │   ├── app.component.ts     ← Composant principal (rendu 3D avec Three.js)
│   │   ├── api.service.ts       ← Service HTTP pour appeler l'API Django
│   │   ├── app.module.ts
│   │   └── ...
│   └── package.json
│
├── server/          ← Backend Python (Django)
│   ├── hajaus/
│   │   ├── manage.py            ← Point d'entrée Django
│   │   ├── cube.py              ← Script Python pour lire les fichiers XYZ
│   │   ├── cube.xyz             ← Fichier de données XYZ (cube)
│   │   ├── transformation.md    ← Fichier de coordonnées XYZ (surface)
│   │   ├── db.sqlite3           ← Base de données SQLite
│   │   └── PointCloudAPI/       ← Application Django (API REST)
│   │       ├── views.py         ← Endpoint API qui renvoie les coordonnées
│   │       ├── models.py        ← Modèle Coordonnee (x, y, z)
│   │       └── ...
│   ├── index.html               ← Prototype HTML standalone
│   ├── script.js                ← Prototype JS avec Three.js
│   └── test.xyz                 ← Fichier test de coordonnées
└── README.md
```

---

### 🐍 Partie Python (Backend Django)

Le serveur **Django** fait deux choses :

1. **Lecture des fichiers XYZ** via [`cube.py`](https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/hajaus/cube.py) :

```python name=server/hajaus/cube.py url=https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/hajaus/cube.py
def lire_coordonnees_fichier_xyz(chemin_fichier):
    coordonnees = []
    with open(chemin_fichier, 'r') as fichier:
        lignes = fichier.readlines()
        for ligne in lignes:
            x, y, z = map(float, ligne.split())
            coordonnees.append((x, y, z))
    print(coordonnees)
    return coordonnees
```

Cette fonction parse un fichier contenant des coordonnées `X Y Z` (une par ligne) et retourne une liste de tuples.

2. **API REST** via [`PointCloudAPI/views.py`](https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/hajaus/PointCloudAPI/views.py) qui expose les coordonnées en **JSON** :

```python name=server/hajaus/PointCloudAPI/views.py url=https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/hajaus/PointCloudAPI/views.py
from django.http import JsonResponse
from cube import lire_coordonnees_fichier_xyz

def get_coordinates(request):
    chemin_du_fichier_xyz = 'transformation.md'
    coordonnees = lire_coordonnees_fichier_xyz(chemin_du_fichier_xyz)
    return JsonResponse({'coordonnees': coordonnees})
```

---

### 🎨 Partie TypeScript/Angular (Frontend)

Le client Angular utilise **Three.js** pour le rendu 3D. Le composant principal [`app.component.ts`](https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/client/src/app/app.component.ts) fait :

1. **Initialisation de la scène 3D** (scène, caméra, rendu WebGL, OrbitControls pour naviguer)
2. **Conversion des coordonnées XYZ → géométrie 3D** → export/import **STL** → affichage du mesh

Le service [`api.service.ts`](https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/client/src/app/api.service.ts) permet d'appeler l'API Django pour récupérer les coordonnées dynamiquement.

---

### 📊 Les fichiers de données XYZ

Les fichiers `.xyz` contiennent des nuages de points 3D (format `X Y Z` par ligne). Par exemple [`test.xyz`](https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/test.xyz) décrit les 8 sommets d'un cube :

```text name=server/test.xyz url=https://github.com/Huor97/hajaus/blob/79a5cf9b8f1478ae027e3e5ee5bc4162a10f4439/server/test.xyz
0 0 0
1 0 0
1 1 0
0 1 0
0 0 1
1 0 1
1 1 1
0 1 1
```

---

### 🔄 Flux global de l'application

```
Fichier .xyz (coordonnées brutes)
       │
       ▼
  Python/Django (cube.py) — lit et parse les coordonnées
       │
       ▼
  API REST (PointCloudAPI/views.py) — expose en JSON
       │
       ▼
  Angular (api.service.ts) — appelle l'API via HTTP
       │
       ▼
  Three.js (app.component.ts) — crée la géométrie 3D,
       │                         convertit en STL,
       ▼                         affiche le rendu WebGL
  Visualisation 3D interactive (avec OrbitControls)
```

---

### 🛠️ Technologies utilisées

| Couche | Technologie | Rôle |
|--------|------------|------|
| **Backend** | **Python / Django** | Lecture des fichiers XYZ, API REST |
| **Base de données** | **SQLite** | Stockage (prévu pour le modèle `Coordonnee`) |
| **Frontend** | **Angular 16 / TypeScript** | Interface utilisateur |
| **Rendu 3D** | **Three.js** | Visualisation 3D (WebGL) |
| **Format 3D** | **STL** | Export/import de géométries 3D |
| **Prototype** | **JavaScript vanilla** | `script.js` — version standalone |

En résumé, c'est un projet qui prend des données spatiales brutes (fichiers XYZ) et les transforme en modèles 3D interactifs dans le navigateur, avec **Python/Django** pour le traitement des données côté serveur et **Angular/Three.js** pour la visualisation côté client ! 🎯