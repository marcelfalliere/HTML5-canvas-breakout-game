

function check_collision_balls_borders_paddle() {
	for(j=0;j<balls_lost.length;j++) {
		if (x[j] + r[j] > WIDTH || x[j] - r[j] < 0)
			dx[j] = -dx[j];
		if (y[j] - r[j] < 0)
			dy[j] = -dy[j];
		else if (y[j]  >= HEIGHT-paddleh) {
			if (x[j]+r[j] > paddlex && x[j]-r[j] < paddlex + paddlew) {
				
				if (dy[j]>0) {					
					// modificateur en fonction de la distance de l'impact et du centre de la barre
					d=Math.floor(x[j]-(paddlex+(paddlew/2)));
					
					mod=0;
					if (d!=0) { mod=(Math.pow(d,2)/400)*(d/Math.abs(d)); }
					dx[j] = dx[j] + 2*mod;
					dy[j] = -dy[j];
				}
				
			} else {
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
				if (dy[j]>0) {					
					// modificateur en fonction de la distance de l'impact et du centre de la barre
					d=Math.floor(x[j]-(paddlex+(paddlew/2)));
					
					mod=0;
					if (d!=0) { mod=(Math.pow(d,2)/400)*(d/Math.abs(d)); }
					dx[j] = dx[j] + 2*mod;
					dy[j] = -dy[j];
				}
				
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