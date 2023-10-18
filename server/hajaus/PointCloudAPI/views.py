from django.http import JsonResponse
from mdVersXYZ import lire_coordonnees_fichier_xyz

# api Django
def get_coordinates(request):
    chemin_du_fichier_xyz = 'transformation.md'
    coordonnees = lire_coordonnees_fichier_xyz(chemin_du_fichier_xyz)
    return JsonResponse({'coordonnees': coordonnees})
