# Design document

jeu incrémental -> pas clicker mais plutôt mécaniques de jeu qui se déploient au fur et à mesure

avec une storyline, un perso principal, mais qui ne fait pas les actions (sauf au tout début)

Au lieu d'avoir des rebirth/prestige, on va plutôt avoir de la hiérarchie d'organisation

on va avoir une fin

## Univers

médiéval, guerres infinies, on mène un groupe de mercenaires

## Objectif

conquérir le continent, ammener la paix par la force (principalement pour nos civils à nous)

## Progression

toujours (à chaque étape de progresion) gestion de deux éléments :

- militaire, attaque
- civil, construction

Le côté civil donne des améliorations/buffs au côté militaire. Le côté militaire étend le pouvoir/richesse du côté civil

On ne grimpe pas dans les rangs d'un truc existant, on crée notre propre armée
solo -> binôme -> bande -> troupe/région -> armée/pays -> empire continental

Au niveau civil, on crée un truc discret, secret, histoire de se protéger. Et comme des civils y vivent, on ne veut pas être nomades

## Gameplay

La gameloop va donc constituer à effectuer des combats pour améliorer notre base afin d'effectuer des combats qui rapporteront plus de ressources. La motivation secondaire qui justifie cette boucle infinie est d'améliorer la vie des civils qui nous accompagnent.

### Interaction à la racine

le combat de base se fait via un composant sur lequel on survole le curseur latéralement dans un sens puis dans l'autre, ce qui représente le mouvement de l'épée. Ce mouvement fait monter une barre de progrès dans le rectangle d'interaciton, tandis qu'une barre monte en continu dans un rectangle à côté, représentant l'attaque de l'ennemi. Le premier rectangle rempli désigne qui est victorieux.

### Niveau méta

au niveau militaire, on aura à chaque niveau deux types d'activités :

- action liée au niveau actuel
- délégation de l'activité du niveau précédent

chaque activité commence en acceptant un contrat

|        | militaire                                                                                                         | civil                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| solo   | voir plus haut                                                                                                    | petite cave à améliorer                      |
| binôme | deux modes<br>- envoyer l'autre en mission et faire du solo<br>- incorporer l'autre dans le gameplay solo         | petite maison à améliorer                    |
| bande  | deux modes<br>- envoyer les individus en missions solo/binôme<br>- événements un peu plus gros avec tout le monde | petit hameau dans une grande cave            |
| troupe | - participation à des batailles rangées<br>- délégation                                                           | village avec plusieurs quartiers, puis ville |
| armée  | - batailles rangées en solo<br>- délégation                                                                       | plusieurs villages puis villes               |
| empire | - batailles rangées en solo<br>- délégation                                                                       | plusieurs régions/pays                       |

## Scénario

### Prologue : Introduction au type de jeu, setting, et mécanique de combat

On se réveille, blessé, et l'on trouve une épée. Un sanglier blessé nous charge, on le combat facilement grâce à l'épée, puis on se réfugie dans la grotte. Si l'on échoue le combat, on s'évanouit et l'on reprend au début.

### Début du premier stade : Premiers contrats et premières améliorations du QG

Quelqu'un nous a observé tuer le sanglier, il nous donne une récompense et nous propose de tuer d'autres animaux pour d'autres récompenses. On reçoit un premier contrat et débloque donc l'onglet des contrats.

Pour effectuer ce premier contrat, il va être nécessaire de se soigner. Pour cela il va falloir équiper notre grotte, ce qui est l'occasion d'apporter la première amélioration à notre QG.

La boucle de gameplay est désormais lancée.
