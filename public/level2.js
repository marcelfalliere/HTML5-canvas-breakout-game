function level2() {
	level_x(2, draw_level2);
}

function draw_level2() {
	
				
	// Initialisation des briques destructibles
	briques_x=[45, 95, 145, 195, 245, 295, 345, 395, 445, 495, 545, 595, 645, 695,
						 55, 105, 155, 205, 255,  505,                 555, 605, 655, 705,
						 45, 95, 145, 195, 245, 295, 345, 395, 445, 495, 545, 595, 645, 695];
	briques_y=[50, 50, 	50,  50,  50,  50,  50,  50, 50, 50, 50, 50, 50, 50,
						 150, 150, 	150,  150,  150,                  150, 150, 150, 150, 150 ,
						 250, 250, 	250,  250,  250,  250,  250,  250, 250, 250, 250, 250, 250, 250];
	for(i=0;i<briques_x.length;i++) {
		briques_h[i]=std_brique_h;
		briques_w[i]=std_brique_w;
		briques_colors[i]=std_brique_color;
		briques_destroyed[i]=false;
	}
	
	// Initialisation du bonus de marketage
	bonuses_used=[false, false];
	bonuses_x=[355, 425];
	bonuses_y=[155, 155];
	bonuses_type=[FONTAIN_OF_BALL, FONTAIN_OF_BALL];
	bonuses_finished=[false, false];
	
	// Images de fonds
	images_full_path=["intense.png", "lying.png"];
	images_x=[330, 10];
	images_y=[190, 10];
	images_loaded=[false, false];
}

