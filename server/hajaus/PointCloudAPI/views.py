from django.http import JsonResponse
from cube import lire_coordonnees_fichier_xyz

def get_coordinates(request):
    chemin_du_fichier_xyz = 'transformation.md'
    coordonnees = lire_coordonnees_fichier_xyz(chemin_du_fichier_xyz)
    return JsonResponse({'coordonnees': coordonnees})
