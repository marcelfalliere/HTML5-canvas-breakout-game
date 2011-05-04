function level3() {
	level_x(3, draw_level3);
}

function draw_level3() {
	
	
	dx = [0.6];
		
	// Initialisation des briques destructibles
	briques_x=[365];
	briques_y=[260];
	briques_h= [std_brique_h*6];
	briques_w=[std_brique_w*2];
	briques_colors=[std_brique_color];
	briques_destroyed=[false];
	
	// Initialisation des briques indestructibles
	unb_briques_x=[70, 100,   130,  160, 190, 220, 250, 280, 310, 340, 370, 400, 430, 460, 490, 520, 550, 580, 610, 640, 670];
	unb_briques_y=[70,  100,  130,  160, 190, 220, 250, 280, 310, 340, 370, 340, 310, 280, 250, 220, 190, 160, 130, 100, 70];
	for(i=0;i<unb_briques_x.length;i++) {
		unb_briques_x[i]+=10;
		unb_briques_h[i]=30;
		unb_briques_w[i]=30;
		unb_briques_colors[i]=DEFAULT_UNBREAKABLE_COLOR;
		unb_briques_lives[i]=DEFAULT_NB_LIVES;
		unb_briques_last_impact_ts[i]=(new Date()).getTime();
	}

	// Images de fonds
	images_full_path=["roll.png", "problem.png"];
	images_x=[100, 430];
	images_y=[300, 340];
	images_loaded=[false, false];
	
}

