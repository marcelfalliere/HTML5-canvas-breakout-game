var last_colision_with_a_brick=(new Date()).getTime();

function level_x(i, draw_function) {
	
	
	display_level(i, levels_name[i-1]);
	
	currentLevel=i; 
	previousLevel=i;
	
	// On dessine le niveau :o
	before_draw_level();
	draw_function();
	after_draw_level();
	
	document.onkeyup = function (event) {
		if(event.keyCode==13) { 
			// Le jeu commence !
			gameEventId = window.setInterval("main_level()", frequency);
			
			// Surcharge du onkeydown et onkeyup sur le document
			document.onkeydown = function (event) { 
				isPaddleGoingRight=event.keyCode==39;
				isPaddleGoingLeft=event.keyCode==37;
			}
			document.onkeyup = function (event) { 
				if (event.keyCode==39 ) { isPaddleGoingRight=false; }
				if (event.keyCode==37 ) { isPaddleGoingLeft=false; }
				
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
		
		// Balle principale, et les autres
		draw_ball_or_balls();
		// Barre
		draw_paddle();
		// Briques destructibles
		draw_briques();
		// Bonus des balles fontaines
		draw_bonuses();
	}
}

// clear arrays of models
function clear_models() {

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

function check_collision_balls_borders_paddle() {
	for(j=0;j<balls_lost.length;j++) {
		if (x[j] + r[j] > WIDTH || x[j] - r[j] < 0)
			dx[j] = -dx[j];
		if (y[j] - r[j] < 0)
			dy[j] = -dy[j];
		else if (y[j]  >= HEIGHT-paddleh) {
			if (x[j] > paddlex && x[j] < paddlex + paddlew)
				dy[j] = -dy[j];
			else {
				// Dude has lost a ball - check if theres one left. If not, he lost for good.
				balls_lost[j]=true;
				if (is_there_only_true_in_this_table(balls_lost))  {
					// animation de perte
					justFinishedALevel=true;
					justWon=false;
				}
			}
		}
	}
}

// Usefull only for welcome
function check_collision_only_paddle() {
	for(j=0;j<balls_lost.length;j++) {
		if (y[j]  >= HEIGHT-paddleh) {
			if (x[j] > paddlex && x[j] < paddlex + paddlew)
				dy[j] = -dy[j];
		}
	}
}


function check_collision_balls_bricks() {
	
	for(j=0;j<balls_lost.length;j++) {
		for (i=0;i<briques_x.length;i++) {
			if (!briques_destroyed[i] && ((new Date()).getTime())-last_colision_with_a_brick>100 ) {
				if ( (x[j]<=briques_x[i]+briques_w[i] && x[j]>=briques_x[i] && y[j]>=briques_y[i] && y[j]<=briques_y[i]+briques_h[i]) ||
					 (x[j]<=briques_x[i]+briques_w[i] && x[j]>=briques_x[i] && y[j]-r[j]<=briques_y[i]-briques_h[i] && y[j]>=briques_y[i]-briques_h[i]) ||  
					 (x[j]<=briques_x[i]+briques_w[i] && x[j]>=briques_x[i] && y[j]+r[j]>=briques_y[i] && y[j]<=briques_y[i])
					) {
					
					briques_destroyed[i]=true;
					dy[j] = -dy[j];
					last_colision_with_a_brick=(new Date()).getTime();
					
				} else if ( (x[j]-r[j]<=briques_x[i]+briques_w[i] && x[j]>=briques_x[i]+briques_w[i] && y[j]>=briques_y[i] && y[j]<=briques_y[i]+briques_h[i]) ||
							(x[j]+r[j]>=briques_x[i] && x[j]<=briques_x[i] && y[j]>=briques_y[i] && y[j]<=briques_y[i]+briques_h[i])) {
										
					briques_destroyed[i]=true;
					dx[j] = -dx[j];
					last_colision_with_a_brick=(new Date()).getTime();
				}
			}
		}
	}

}


function check_collision_balls_indestructibles_bricks() {
	
	for(j=0;j<balls_lost.length;j++) {
		for (i=0;i<unb_briques_x.length;i++) {
			if (unb_briques_lives[i]>0) {
			
				if (
					(x[j]<=unb_briques_x[i]+unb_briques_w[i] && x[j]>=unb_briques_x[i] && y[j]>=unb_briques_y[i] && y[j]<=unb_briques_y[i]+unb_briques_h[i]) ||
					(x[j]<=unb_briques_x[i]+unb_briques_w[i] && x[j]>=unb_briques_x[i] && y[j]-r[j]<=unb_briques_y[i]-unb_briques_h[i] && y[j]>=unb_briques_y[i]-unb_briques_h[i]) ||  
					(x[j]<=unb_briques_x[i]+unb_briques_w[i] && x[j]>=unb_briques_x[i] && y[j]+r[j]>=unb_briques_y[i] && y[j]<=unb_briques_y[i]) 
						) {
					dy[j] = -dy[j];
					
					if (((new Date()).getTime())-unb_briques_last_impact_ts[i]>200) { unb_briques_lives[i]=unb_briques_lives[i]-1; }
					
					unb_briques_last_impact_ts[i]=(new Date()).getTime();
					
					
				} else if (
					(x[j]-r[j]<=unb_briques_x[i]+unb_briques_w[i] && x[j]>=unb_briques_x[i]+unb_briques_w[i] && y[j]>=unb_briques_y[i] && y[j]<=unb_briques_y[i]+unb_briques_h[i]) ||
					(x[j]+r[j]>=unb_briques_x[i] && x[j]<=unb_briques_x[i] && y[j]>=unb_briques_y[i] && y[j]<=unb_briques_y[i]+unb_briques_h[i]) 
						) {
					dx[j] = -dx[j];
					
					if (((new Date()).getTime())-unb_briques_last_impact_ts[i]>200) { unb_briques_lives[i]=unb_briques_lives[i]-1; }
					
					unb_briques_last_impact_ts[i]=(new Date()).getTime();
					
				}
			}
		}
	}

}


function check_collision_balls_bonus() {

	for(j=0;j<balls_lost.length;j++) {
		for (i=0;i<bonuses_x.length;i++) {
			if (!balls_lost[j] && !bonuses_used[i] && distance(x[j], bonuses_x[i], y[j], bonuses_y[i]) <= BONUS_RAYON_AURA_2+r[j] ) {
				bonuses_used[i]=true;
				
				if (bonuses_type[i]==FONTAIN_OF_BALL) {
					// Déclenchement du bonus
					start_fontain_of_balls(i);
				}
				
			}
		}
	}
}