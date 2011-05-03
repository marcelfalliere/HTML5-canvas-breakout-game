function level6() {
	level_x(6, draw_level6);
}

function draw_level6() {
	
	no_lights=true;
	
	// Surcharge
	dx = [1];
	dy = [4];
	
	// Initialisation des briques destructibles
	// Initialisation des briques destructibles
	briques_x=[60, 180, 300, 420, 540, 660,60, 180, 300, 420, 540, 660, 60, 180, 300, 420, 540, 660, 60, 180, 300, 420, 540, 660];
	briques_y=[100, 100, 100, 100, 100, 100,300, 300, 300, 300, 300, 300, 200, 200, 200, 200, 200, 200, 400, 400, 400, 400, 400, 400];
	for(i=0;i<briques_x.length;i++) {
		briques_h[i]=std_brique_h*4;
		briques_w[i]=std_brique_w*2;
		briques_y[i]-=50;
		briques_colors[i]=std_brique_color;
		briques_destroyed[i]=false;
	}
	
	
	
	// Images de fonds
	images_full_path=["where.png", "youarealone.png", "alonein.png", "dark.png", "the.png"];
	images_x=[376, 43, 445, , 279, 48];
	images_y=[519, 427, 300, 90, 196, 90];
	images_loaded=[false, false, false, false];
	
	
}

