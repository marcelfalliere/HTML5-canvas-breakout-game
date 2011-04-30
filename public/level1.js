function level1() {
	level_x(1, draw_level1);
}

function draw_level1() {
	
		
	// Initialisation des briques destructibles
	briques_x=[60, 180, 300, 420, 540, 660, 60, 180, 300, 420, 540, 660];
	briques_y=[300, 300, 300, 300, 300, 300, 200, 200, 200, 200, 200, 200];
	for(i=0;i<briques_x.length;i++) {
		briques_h[i]=std_brique_h*2;
		briques_w[i]=std_brique_w*2;
		briques_colors[i]=std_brique_color;
		briques_destroyed[i]=false;
	}
	
	
	// Initialisation du bonus de marketage
	bonuses_used=[false];
	bonuses_x=[395];
	bonuses_y=[50];
	bonuses_type=[FONTAIN_OF_BALL];
	bonuses_finished=[false];
	
	// Images de fond
	images_full_path=["trap.png"];
	images_x=[420];
	images_y=[57];
	images_loaded=[false];
	
}

