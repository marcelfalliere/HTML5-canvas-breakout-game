var last_colision_with_a_brick=(new Date()).getTime();

// pitch balck kind of level ?
var no_lights=false;

function level_x(i, draw_function) {
	
	display_level(i, levels_name[i-1]);
	
	currentLevel=i; 
	previousLevel=i;
	
	// On dessine le niveau :o
	before_draw_level();
	draw_function();  console.log(no_lights);
	after_draw_level(); console.log(no_lights);
	
	document.onkeyup = function (event) {
		if(event.keyCode==13) { 
			// Le jeu commence !
			gameEventId = window.setInterval("main_level()", frequency);
			isPaddleGoingLeft=false;
			isPaddleGoingRight=false;
			
			// Surcharge du onkeydown et onkeyup sur le document
			document.onkeydown = function (event) { 
				isPaddleGoingRight=event.keyCode==39;
				isPaddleGoingLeft=event.keyCode==37;
				
				if (isPaddleGoingRight) { isPaddleGoingLeft=false; }
				if (isPaddleGoingLeft) { isPaddleGoingRight=false; }
			}
			document.onkeyup = function (event) { 
				if (event.keyCode==39 ) { isPaddleGoingRight=false; isPaddleGoingLeft=false; }
				if (event.keyCode==37 ) { isPaddleGoingLeft=false; isPaddleGoingRight=false; }
				
			}
			
		} 
	};
	

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

	
	// Initialisation du fond d'écran
	init_background();

	// Balle principale, et les autres
	draw_ball_or_balls();
	// Barre
	draw_paddle();
	// Briques destructibles
	draw_briques();
	// Bonus balles fontaines
	draw_bonuses();
	// Images de fonds
	draw_images();
	
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
	
	images_full_path=[];
	images_x=[];
	images_y=[];
	images_loaded=[];
}