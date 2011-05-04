var last_colision_with_a_brick=(new Date()).getTime();

// pitch balck kind of level ?
var no_lights=false;

function level_x(i, draw_function) {
	
	display_level(i, levels_name[i-1]);
	
	currentLevel=i; 
	previousLevel=i;
	
	// On dessine le niveau :o
	before_draw_level();
	draw_function();  
	after_draw_level();
	
	
	document.onmousemove  = function(event) {
		if (event.pageX > 10+(paddlew/2) && event.pageX < 10+WIDTH-(paddlew/2)) {
			paddlex = event.pageX - 10	- (paddlew/2);
		}
	}
	document.getElementById("canvas").onclick  = function(event) {
		// Le jeu commence !
		gameEventId = window.setInterval("main_level()", frequency);
			
		// Annulation des actions	
		document.onkeydown = function (event) { }
		document.onkeyup = function (event) { }
		document.getElementById("canvas").onclick  = function(event) { }
	}
	
}

function before_draw_level() {
	// On vide les valeurs précédentes, ainsi que le canvas en lui même
	clear();
	clear_models();
	
	// Initialisation de la balle
	default_ball();
	// Initialisation de la barre
	default_paddle();
}

function after_draw_level() {

	
	// Barre
	draw_paddle();
	// Briques destructibles
	draw_briques();
	// Bonus des balles fontaines
	draw_bonuses();
	
	// Fond d'écran qui est en fait le foreground
	draw_background();
	
	// Balle principale, et les autres
	draw_ball_or_balls();
	
	
	// Images de fonds
	draw_images();
}



 
// A faire dans tout les niveau, à chaque passage de la boucle d'event
function main_level() {
	clear();
	
	// Vérification : est-ce que j'ai gagné ??
	if (is_there_only_true_in_this_table(briques_destroyed) && is_there_only_true_in_this_table(bonuses_finished) && !justWon) {
		justWon=true;
		window.setTimeout(function() {
			animationStarted=true;
			justFinishedALevel=true;
			currentLevel=previousLevel+1;
		}, 1000);
	} else {
		
		// Vérifications de la collision de la balle avec les rebords et la barre
		check_collision_balls_borders_paddle();
		// Vérification de collisions de(s) la(les) balle(s) avec les briques desctructibles
		check_collision_balls_bricks();
		// Vérifications de la collision de la balle avec un bonus (oh yeah)
		check_collision_balls_bonus();
		// Briques indestructibles
		check_collision_balls_indestructibles_bricks()
		
		// Barre
		draw_paddle();
		// Briques destructibles
		draw_briques();
		// Bonus des balles fontaines
		draw_bonuses();
		
		// Fond d'écran qui est en fait le foreground
		draw_background();
		
		// Balle principale, et les autres
		draw_ball_or_balls();
		
	}
}





// clear arrays of models
function clear_models() {

	no_lights=false;

	balls_lost=[];
	x=[];
	y=[];
	r=[];
	dx=[];
	dy=[];

	briques_destroyed=[];
	briques_x=[];
	briques_y=[];
	briques_h=[];
	briques_w=[];
	briques_colors=[];
	
	unb_briques_x=[];
	unb_briques_y=[];
	unb_briques_h=[];
	unb_briques_w=[];
	unb_briques_colors=[];
	unb_briques_lives=[];
	unb_briques_last_impact_ts=[];
	
	bonuses_used=[];
	bonuses_x=[];
	bonuses_y=[];
	bonuses_type=[];
	bonuses_finished = [];
	
	images_full_path=[];
	images_x=[];
	images_y=[];
	images_loaded=[];
}