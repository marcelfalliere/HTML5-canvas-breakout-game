var fadeOutFinished=false;


// Balle qui rebondit, utile sur la page d'accueil
function bouncing_ball() {

	draw_briques();

	for(j=0;j<balls_lost.length;j++) {
		if (x[j] + dx[j] > WIDTH || x[j] + dx[j] < 0)
			dx[j] = -dx[j];
		if (y[j] + dy[j] > HEIGHT || y[j] + dy[j] < 0)
			dy[j] = -dy[j];
	}
	draw_ball_or_balls();
}

// "Level" des credits
function credits() {
	clear_bg_images();
	clearInterval(gameEventId);
	clearInterval(welcomeBallId);
	clear();
	clear_models();
	draw_background();
	
	// Images
	images_full_path=["enjoyed.png", "end.png", "contest.png", "blog.png"];
	images_x=[16, 47, 146, 262];
	images_y=[17, 92, 280, 414];
	images_loaded=[false, false, false, false];
	draw_images();
	
	// Afficher liens vers le contest et vers le blog
	document.getElementById("contest").style.top=325+"px";
	document.getElementById("contest").style.left=820+"px";
	document.getElementById("contest").style.position="absolute";
	document.getElementById("blog").style.top=450+"px";
	document.getElementById("blog").style.left=820+"px";
	document.getElementById("blog").style.position="absolute";
	
	// Barre
	document.onkeydown = function (event) { 
		isPaddleGoingRight=event.keyCode==39;
		isPaddleGoingLeft=event.keyCode==37;
	}
	document.onkeyup = function (event) {
		if (event.keyCode==39 ) { isPaddleGoingRight=false; }
		if (event.keyCode==37 ) { isPaddleGoingLeft=false; }	
	}
	
	// Balle par defaut
	default_ball();
	draw_ball_or_balls();
	
	display_level(levels_name.length-1, "Thanks your for playing");
	
	// Boucle du welcome pour la petite animation
	welcomeBallId=window.setInterval(function() {
		clear();
		check_collision_balls_bricks();
		check_collision_only_paddle();
		draw_paddle();
		bouncing_ball();
	}, frequency);
}

// "Level" d'accueil
function welcome(first_level) {
	clear_bg_images();
	clearInterval(gameEventId);
	clearInterval(welcomeBallId);
	clear();
	clear_models();
	
	display_level(0, "Training ground");
	
	// Images
	images_full_path=["welcome_title.png", "controls.png", "objectives.png"];
	images_x=[55, 30, 610];
	images_y=[62, 200, 200];
	images_loaded=[false, false, false];
	draw_images();
	
	// Balle principale
	default_ball();
	default_paddle();
	
	// Initialisation des briques autour du logo
	briques_destroyed=[false, false, false, false, false, false, false, false, false, false, false];
	briques_x=[45, 95, 145, 195, 245, 295, 345, 395, 445, 495, 545, 595, 645, 695,
						 45, 45, 715,  715, 
						 45, 95, 145, 195, 245, 295, 345, 395, 445, 495, 545, 595, 645, 695, 632];
	briques_y=[50, 50, 	50,  50,  50,  50,  50,  50, 50, 50, 50, 50, 50, 50,
						 80, 130, 60 , 110,
						 150, 150, 	150,  150,  150,  150,  150,  150, 150, 150, 150, 150, 150, 150, 306];
	for(i=0;i<briques_x.length;i++) {
		briques_h[i]=std_brique_h;
		briques_w[i]=std_brique_w;
		briques_colors[i]=std_brique_color;
		briques_destroyed[i]=false;
	}
	briques_w[14]=std_brique_h;
	briques_w[15]=std_brique_h;
	briques_w[16]=std_brique_h;
	briques_w[17]=std_brique_h;
	briques_h[14]=std_brique_w;
	briques_h[15]=std_brique_w;
	briques_h[16]=std_brique_w;
	briques_h[17]=std_brique_w;
	
	// Initialisation de la balle
	for(j=0;j<balls_lost.length;j++) { y[j]=300; }
	
	// Boucle du welcome pour la petite animation
	welcomeBallId=window.setInterval(function() {
		clear(); 
		check_collision_balls_bricks();
		check_collision_only_paddle();
		draw_paddle();
		bouncing_ball();
	}, frequency);
	
	
	// Paddle
	document.onkeydown = function (event) { 
		isPaddleGoingRight=event.keyCode==39;
		isPaddleGoingLeft=event.keyCode==37;
	}
	
	document.onkeyup = function (event) {
	 
		if (event.keyCode==39 ) { isPaddleGoingRight=false; }
		if (event.keyCode==37 ) { isPaddleGoingLeft=false; }
		
		// Enter is pressed : goto (lawl) to first level
		if(event.keyCode==13) {
			
			clearInterval(welcomeBallId);
		
			transitionEffect(true, 
			function() { 
				bouncing_ball();
			},function() { 
				clear_bg_images();
				level();
			});
		}
	}
	
}


// Fade out and in
function transitionEffect(is_a_success, callback_begin_to_middle, callback_middle_of_fade) {
	
	var fadeOut=0;
	var sens="monte";
	transitionEffectId = window.setInterval(function() {
		
		clear(); 
		
		if(sens=="monte") {
			fadeOut=fadeOut+0.025;
			callback_begin_to_middle();
			if (fadeOut>=1) {
				sens="descente";
				
				callback_middle_of_fade();
			}
		}
		
		if (sens=="descente") {
			fadeOut=fadeOut-0.025;
			callback_middle_of_fade();
			if (fadeOut<=0) {
				fadeOut=0;
				
				clearInterval(transitionEffectId);
				
			}
		}
		
		if (is_a_success) {	ctx.fillStyle = "rgba(0,98,149,"+fadeOut+")"; } else { ctx.fillStyle = "rgba(189,32,49,"+fadeOut+")"; }
		ctx.fillRect(0,0,WIDTH, HEIGHT);
		
	}, 5);
}