# Dans ton script Python pour traiter le fichier XYZ
def lire_coordonnees_fichier_xyz(chemin_fichier):
    coordonnees = []
    with open(chemin_fichier, 'r') as fichier:
        lignes = fichier.readlines()
        for ligne in lignes:
            x, y, z = map(float, ligne.split())  # Traitement des coordonnées du fichier
            coordonnees.append((x, y, z))
            
    # print("==>",coordonnees)
    return coordonnees


# Exemple d'appel de la fonction pour traiter un fichier XYZ
chemin_du_fichier_xyz = 'transformation.md'  # Remplace cela par le chemin réel de ton fichier XYZ
coordonnees = lire_coordonnees_fichier_xyz(chemin_du_fichier_xyz)