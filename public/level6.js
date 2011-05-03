function level6() {
	level_x(6, draw_level6);
}

function draw_level6() {
	
	no_lights=false;
	
	// Initialisation des briques destructibles
	briques_x=[375];
	briques_y=[270];
	briques_h= [std_brique_h*6-20];
	briques_w=[std_brique_w*2-20];
	briques_colors=[std_brique_color];
	briques_destroyed=[false];
	
	// Initialisation des briques indestructibles
	unb_briques_x=[335, 365, 395, 425, 335, 365, 395, 425, 335, 335, 425, 425];
	unb_briques_y=[230, 230, 230, 230, 320, 320, 320, 320, 260, 290, 260, 290];
	
	for(i=0;i<unb_briques_x.length;i++) {
		unb_briques_w[i]=30;
		unb_briques_h[i]=30;
		unb_briques_lives[i]=DEFAULT_NB_LIVES*2;
		unb_briques_colors[i]=DEFAULT_UNBREAKABLE_COLOR;
		unb_briques_last_impact_ts[i]=(new Date()).getTime();
	}
	
	// Bonus ... droping bombes =)
	bonuses_x=[60, 180, 300, 420, 540, 660];
	for(i=0;i<bonuses_x.length;i++) {
		bonuses_x[i]=bonuses_x[i]+40;
		bonuses_used[i]=false;
		bonuses_y[i]=60;
		bonuses_type[i]=FONTAIN_OF_BALL;
		bonuses_finished[i]=false;
	}
	
	
	// Images de fonds
	/*images_full_path=["look.png", "rofl.png", "focus.png", "go.png"];
	images_x=[34, 161, 294, 714];
	images_y=[71, 13, 95, 90];
	images_loaded=[false, false, false, false];*/
	
}

