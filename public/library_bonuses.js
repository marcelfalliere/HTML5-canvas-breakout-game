
// Constantes
var NB_BALLS_PER_FONTAIN_OF_BALLS=12;
var CERCLE_TRIGO_DX = [Math.sqrt(3)/2, Math.sqrt(2)/2, 1/2, 
										  -1/2, -Math.sqrt(2)/2, -Math.sqrt(3)/2,
											-Math.sqrt(3)/2, -Math.sqrt(2)/2, -1/2,
											1/2, Math.sqrt(2)/2, Math.sqrt(3)/2];
var CERCLE_TRIGO_DY = [1/2, Math.sqrt(2)/2, Math.sqrt(3)/2, 
											Math.sqrt(3)/2, Math.sqrt(2)/2, 1/2,
											-1/2, -Math.sqrt(2)/2, -Math.sqrt(3)/2, 
											-Math.sqrt(3)/2, -Math.sqrt(2)/2, -1/2];

function start_fontain_of_balls(j) {
	m_x=bonuses_x[j];
	m_y=bonuses_y[j];
	
	do_fontain(m_x, m_y, 1)
	
	// l'after quake !!
	window.setTimeout(function() {
		do_fontain(m_x, m_y, 0.9)
	}, 1000);
	
	// l'after quake3 lol !!
	window.setTimeout(function() {
		do_fontain(m_x, m_y, 2.2);
		window.setTimeout(function() {
			bonuses_finished[j]=true;
		}, 1000);
	}, 2500);
	
}

function do_fontain(m_x, m_y, modificateur) {
	for (i=0 ; i<NB_BALLS_PER_FONTAIN_OF_BALLS; i++) {
			balls_lost.push(false);
			x.push(m_x);
			y.push(m_y);
			r.push(DEFAULT_BALL_RAYON);
			
			dx.push(CERCLE_TRIGO_DX[i]*frequency/2);
			dy.push(CERCLE_TRIGO_DY[i]*(frequency/2)*modificateur);
		}
}