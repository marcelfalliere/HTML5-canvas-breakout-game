

// Fréquence de rafraichissement (milisecondes)
var frequency=15;

// Largeur et hauteur du canvas
var WIDTH=800;
var HEIGHT=600;


// Mouvement de la bare principale
var isPaddleGoingRight=false;
var isPaddleGoingLeft=false;


// Constante (mais bon c'est du js...)
var DEFAULT_BALL_COLOR = "#BD2031";
var DEFAULT_BALL_RAYON = 10;
var DEFAULT_PADDLE_COLOR = "#231F20";
var BONUS_RAYON=20;
var BONUS_RAYON_AURA_1=25;
var BONUS_RAYON_AURA_2=27;
var DEFAULT_UNBREAKABLE_COLOR = "#231F20";
var DEFAULT_UNBREAKABLE_LIVES_COLOR = "#FFFFFF";
var DEFAULT_NO_LIGHTS_COLOR="#222222"
var DEFAULT_NO_LIGHTS_COLOR_PADDLE="#BD2031"


// Balle principale
var balls_lost = [false];
var x = [400];
var y = [550];
var r = [DEFAULT_BALL_RAYON];
var dx = [1];
var dy = [2.3];

// Barre
var paddlex=(WIDTH/2) - (75/2);
var paddleh=10;
var paddlew=75;

// Briques cassables
var briques_destroyed = [];
var briques_x = [];
var briques_y = [];
var briques_h = [];
var briques_w = [];
var briques_colors = [];

std_brique_h=10;
std_brique_w=30;
std_brique_color="#006295";

// Briques incassables
var unb_briques_x = [];
var unb_briques_y = [];
var unb_briques_h = [];
var unb_briques_w = [];
var unb_briques_colors = [];
var unb_briques_lives = [];
var unb_briques_last_impact_ts = [];

var DEFAULT_NB_LIVES=3;

// Bonus 
var bonuses_used = [];
var bonuses_x = [];
var bonuses_y = [];
var bonuses_type = []; 
var bonuses_finished = [];

var FONTAIN_OF_BALL = "fontain_of_ball";

// Chemin des images
var IMAGES_PATH="gfx/";

// Images
var images_full_path=[];
var images_x=[];
var images_y=[];
var images_loaded=[];




function default_ball() {
	balls_lost = [false];
	x = [400];
	y = [550];
	r = [DEFAULT_BALL_RAYON];
	dx = [frequency*0.2];
	dy = [frequency*0.4];
}

function default_paddle() {
	paddlex=(WIDTH/2) - (75/2);
	paddleh=10;
	paddlew=75;
}

function clear() { 
	ctx.clearRect(0, 0, WIDTH, HEIGHT); 
}
function clear_bg_images() { 
	document.getElementById("canvas-bg-images").innerHTML=""; 
}

function circle(x, y, r, c) {
    ctx.beginPath();
    var rad = ctx.createRadialGradient(x, y, 1, x, y, r);
    rad.addColorStop(0, 'rgba(242,181,147, 0.1)');
	rad.addColorStop(1, DEFAULT_NO_LIGHTS_COLOR)
    ctx.fillStyle = rad;
    ctx.rect(x-r, y-r, r*2, r*2);
    ctx.fill();
}

function draw_background() {
	
	if (no_lights) {
		
		aura=100;
		
		for(i=0;i<balls_lost.length;i++) {
			if (!balls_lost[i]) {
				// Top
				ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR;
				ctx.beginPath();
				ctx.rect(0,0,WIDTH,y[i]-aura);
				ctx.closePath();
				ctx.fill();
				// Bottom
				ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR;
				ctx.beginPath();
				ctx.rect(0,y[i]+aura,WIDTH, HEIGHT-y[i]+aura);
				ctx.closePath();
				ctx.fill();
				// Left
				ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR;
				ctx.beginPath();
				ctx.rect(0,y[i]-aura,x[i]-aura+0.9, aura*2);
				ctx.closePath();
				ctx.fill();
				// Right
				ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR;
				ctx.beginPath();
				ctx.rect(x[i]+aura,y[i]-aura,WIDTH-x[i]+aura, aura*2);
				ctx.closePath();
				ctx.fill();
				// Bezou car petit pb d'affichage
				//Bezout en haut à droit
				ctx.moveTo(x[i], y[i]-aura);
				ctx.quadraticCurveTo(x[i]+aura, y[i]-aura, x[i]+aura, y[i]);
				ctx.quadraticCurveTo(x[i]+aura, y[i]-aura, x[i]+aura, y[i]-aura);
				ctx.quadraticCurveTo(x[i], y[i]-aura, x[i], y[i]-aura);
				//Bezout en haut à gauche
				ctx.moveTo(x[i], y[i]-aura);
				ctx.quadraticCurveTo(x[i]-aura, y[i]-aura, x[i]-aura, y[i]);
				ctx.quadraticCurveTo(x[i]-aura, y[i]-aura, x[i]-aura, y[i]-aura);
				ctx.quadraticCurveTo(x[i], y[i]-aura, x[i], y[i]-aura);
				//Bezout en bas à gauche
				ctx.moveTo(x[i], y[i]+aura);
				ctx.quadraticCurveTo(x[i]-aura, y[i]+aura, x[i]-aura, y[i]);
				ctx.quadraticCurveTo(x[i]-aura, y[i]+aura, x[i]-aura, y[i]+aura);
				ctx.quadraticCurveTo(x[i], y[i]+aura, x[i], y[i]+aura);
				//Bezout en bas à gauche
				ctx.moveTo(x[i], y[i]+aura);
				ctx.quadraticCurveTo(x[i]+aura, y[i]+aura, x[i]+aura, y[i]);
				ctx.quadraticCurveTo(x[i]+aura, y[i]+aura, x[i]+aura, y[i]+aura);
				ctx.quadraticCurveTo(x[i], y[i]+aura, x[i], y[i]+aura);
				// FIn
				ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR;
				ctx.fill();
				
				
				circle(x[i], y[i], aura, "255, 255, 150")
			}
		}
		
	
		ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR_PADDLE;
		ctx.beginPath();
		ctx.rect(paddlex-1,HEIGHT-paddleh-1+5,2,2);
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR_PADDLE;
		ctx.beginPath();
		ctx.rect(paddlex-1+20,HEIGHT-paddleh-1+1,2,2);
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR_PADDLE;
		ctx.beginPath();
		ctx.rect((paddlew/2)+paddlex-1+20,HEIGHT-paddleh-1+1,2,2);
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR_PADDLE;
		ctx.beginPath();
		ctx.rect(paddlew+paddlex-1,HEIGHT-paddleh-1+5,2,2);
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = DEFAULT_NO_LIGHTS_COLOR_PADDLE;
		ctx.beginPath();
		ctx.rect((paddlew/2)+paddlex-1,HEIGHT-paddleh-1,2,2);
		ctx.closePath();
		ctx.fill();


		
	} else {
		ctx.fillStyle = "transparent";
		ctx.beginPath();
		ctx.rect(0,0,WIDTH,HEIGHT);
		ctx.closePath();
		ctx.fill();
	}
}

// Dessine les balles et déplaces leur coordonnées
// pour le prochain mouvement
function draw_ball_or_balls() {
	for(i=0;i<balls_lost.length;i++) {
		if (!balls_lost[i]) {
			ctx.fillStyle = DEFAULT_BALL_COLOR;
			ctx.beginPath();
			ctx.arc(x[i], y[i], r[i], 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
			
			x[i] += dx[i];
			y[i] += dy[i];
		}
	}
	
}

function draw_briques() {

	for (i=0;i<briques_x.length;i++) {
		if (!briques_destroyed[i]) {
			ctx.fillStyle=briques_colors[i];
			ctx.beginPath();
			ctx.rect(briques_x[i],briques_y[i],briques_w[i],briques_h[i]);
			ctx.closePath();
			ctx.fill();
		}
	}
	
	for (i=0;i<unb_briques_x.length;i++) {
		if (unb_briques_lives[i]>0) {
			ctx.fillStyle=unb_briques_colors[i];
			ctx.beginPath();
			ctx.rect(unb_briques_x[i],unb_briques_y[i],unb_briques_w[i],unb_briques_h[i]);
			ctx.closePath();
			ctx.fill();
			
			
			// Afficher les vies
			for(j=0;j<unb_briques_lives[i];j++) {
				ctx.fillStyle=DEFAULT_UNBREAKABLE_LIVES_COLOR;
				ctx.beginPath();
				ctx.rect(unb_briques_x[i]+(j*2)+1 ,unb_briques_y[i]+1,1,3);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}


function draw_paddle() {
	if (isPaddleGoingRight && paddlex+paddlew<WIDTH) { paddlex += frequency/2.5; isPaddleGoingLeft=false; }
	else if (isPaddleGoingLeft && paddlex>0) { paddlex -= frequency/2.5; isPaddleGoingRight=false; }

	ctx.fillStyle = DEFAULT_PADDLE_COLOR;
	ctx.beginPath();
	ctx.rect(paddlex,HEIGHT-paddleh+5,paddlew,paddleh-5);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = DEFAULT_PADDLE_COLOR;
	ctx.beginPath();
	ctx.moveTo(paddlex, HEIGHT-paddleh+5);
	ctx.quadraticCurveTo( paddlex+paddlew/2, HEIGHT-paddleh-5, paddlex+paddlew, HEIGHT-paddleh+5  );
	
	ctx.closePath();
	ctx.fill();

	
}

function draw_bonuses() {
	for (i=0;i<bonuses_used.length;i++) {
		if (!bonuses_used[i]) {
			
			if (bonuses_type[i]==FONTAIN_OF_BALL) {
			
				ctx.fillStyle=DEFAULT_PADDLE_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i], bonuses_y[i], BONUS_RAYON, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				
				ctx.fillStyle=DEFAULT_BALL_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i]-BONUS_RAYON*0.5, bonuses_y[i]-BONUS_RAYON*0.3, BONUS_RAYON*0.2, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle=DEFAULT_BALL_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i], bonuses_y[i]-BONUS_RAYON*0.4, BONUS_RAYON*0.3, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle=DEFAULT_BALL_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i]+BONUS_RAYON*0.55, bonuses_y[i]-BONUS_RAYON*0.05, BONUS_RAYON*0.35, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle=DEFAULT_BALL_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i]-BONUS_RAYON*0.25, bonuses_y[i]+BONUS_RAYON*0.35, BONUS_RAYON*0.45, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.strokeStyle=DEFAULT_PADDLE_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i], bonuses_y[i], BONUS_RAYON_AURA_1, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.stroke();
				
				ctx.strokeStyle=DEFAULT_PADDLE_COLOR;
				ctx.beginPath();
				ctx.arc(bonuses_x[i], bonuses_y[i], BONUS_RAYON_AURA_2, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.stroke();
			}
			
		}
	}
}



function draw_images() {
	
	concat_images="";
	for (i=0;i<images_full_path.length;i++) {
		if (!images_loaded[i]) {
			concat_images+="<img src='"+IMAGES_PATH+images_full_path[i]+"' style='position:absolute;top:"+images_y[i]+"px;left:"+images_x[i]+"px;'/>";
		}
	}
	document.getElementById("canvas-bg-images").innerHTML=concat_images;
}
