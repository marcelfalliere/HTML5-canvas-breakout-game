function level5() {
	level_x(5, draw_level5);
}

function draw_level5() {
	
	// Surcharge
	x = [400];
	y = [550];
	r = [DEFAULT_BALL_RAYON];
	dx = [0.3];
	dy = [2];
		
	// Initialisation des briques destructibles
	briques_x=[0, 0, 0, 0];
	briques_y=[20, 320, 300, 0];
	briques_h= [270, 210, 10, 10];
	briques_w=[800, 800, 800, 800];
	briques_colors=[std_brique_color, std_brique_color, std_brique_color, std_brique_color];
	briques_destroyed=[false, false, false, false];
	
	
	// Initialisation des briques indestructibles
	unb_briques_x=[0, 0, 0, 0];
	unb_briques_y=[310, 10, 290, 530];
	for(i=0;i<unb_briques_x.length;i++) {
		unb_briques_w[i]=800;
		unb_briques_h[i]=std_brique_h;
		
		switch(i) {
			case 0: unb_briques_lives[i]=10; break;
			case 1: unb_briques_lives[i]=20; break;
			case 3: unb_briques_lives[i]=1; break;
			default: unb_briques_lives[i]=DEFAULT_NB_LIVES; break;
		}
		
		unb_briques_colors[i]=DEFAULT_UNBREAKABLE_COLOR;
		unb_briques_last_impact_ts[i]=(new Date()).getTime();
	}

	
	
	// Images de fonds
	images_full_path=["stuck.png"];
	images_x=[500];
	images_y=[40];
	images_loaded=[false];
	
}

