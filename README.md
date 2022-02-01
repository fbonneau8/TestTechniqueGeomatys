# TestTechniqueGeomatys

## Rappel de l'objectif
Trois tâches sont à réaliser. Si certains aspects vous posent problème, vous êtes libre
de les remanier tant que l’objectif global est atteint.    

- Une partie serveur réalisée avec Spring­boot : elle doit exposer une API Rest
permettant de prendre en entrée une image ainsi qu’un rectangle. Le rectangle
correspond à une zone qu’il faudra couper dans l’image. Le résultat du
découpage sera retourné dans une nouvelle image au format png. Cette
opération est souvent nommée ‘clip’, ‘crop’ ou ‘rogner’ dans les outils de dessins
(Gimp, PaintShopPro etc..)    

- La partie cliente sera réalisée en Angular . Cette mini­application devra
permettre d’uploader un fichier image et de définir le rectangle, puis d’afficher
l’image résultat du traitement.  
- L’ensemble des applications client et serveur sera mis en forme dans une image
Docker (avec ou sans docker­compose)  

## Difficultés rencontrées
Je ne connaissais pas Angular du tout, j'ai appris en même temps que je réalisais le projet.
D'ailleurs, cela se voit sur l'interface graphique approximative et pas trés esthétique.
Mais ce test m'avait déja pris pas mal de temps et mon but était de faire quelque chose qui fonctionne : objectif atteint !

J'aurais également aimé montrer que j'avais de l'expérience dans le CI/CD de gitlab et j'étais parti pour réaliser des images docker de mes 2 projets et de les stocker dans le container registry de gitlab.  
Le problème est que pour cela, il faut entrer une carte bleue même si on n'y dépense pas d'argent et je ne voulais pas faire ca avec ma carte bleue personnelle.  
Vous allez me poser la question : alors pourquoi github ? c'est la seule plateforme où on peut déposer des répertoires entiers sans passer par git.
(je travaille sur mon ordi de boulot et je ne voulais que les 2 repository git se mélangent)

## Parti pris
J'ai fait en sorte que la sélection du clip se fasse sur une image redimensionné pour plus de faciliter à l'écran par contre le résultat du clip est en taille réelle.  
Donc si c'est tres grande image de base, il est possible que le clip soit même plus grand que l'image redimensionnée de gauche.

## Exécution
Télécharger le projet en local et se mettre à la racine  
```
docker-compose build
docker-compose up
```
l'application se lance sur http://localhost:4200  
