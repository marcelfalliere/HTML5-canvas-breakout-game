// Le contexte du canvas
var ctx;


// Fr�quence de rafraichissement (milisecondes)
var frequency=3;

// Niveau en cours
var currentLevel=0;
var previousLevel;
var justFinishedALevel=false;
var justWon=false;

// Id de la boucle d'�v�nement
var mainEventId; // Boucle principale qui v�rifie les niveau et les fin d'animation fadeOut
var gameEventId; // Boucle pour chaque niveaux
var welcomeBallId; // Boucle de bienvenue
var transitionEffectId; // Boucle de transition

// Tableau des noms de niveaux
var levels_name=["A simple start", "Double fountain of luv", "Never give up! Trust your instincts!", "Bunker doesn't stant a chance", "A classic windows loading bar"];


function main() {

	

	ctx = document.getElementById('canvas').getContext("2d");
	 
	 // animation de d�but de jeu
	 welcome();
	 
	 // v�rifie s'il vient d'y avoir lieu un changement de level
	 mainEventId=window.setInterval(function () {
		if (justFinishedALevel) {
			justFinishedALevel=false;
			
			// animation de fin de niveau
			clearInterval(gameEventId);
			clearInterval(welcomeBallId);
			transitionEffect(justWon,  function() { 
				
				},function() { 
					clear();
					switch(currentLevel) {
					case 1: level1(); break;
					case 2: level2(); break;
					case 3: level3(); break;
					case 4: level4(); break;
					case 5: level5(); break;
					default:
						credits();
						break;
				}
			});
			
			justWon=false;
			
		
		}
	 }, 20);
	 
}

