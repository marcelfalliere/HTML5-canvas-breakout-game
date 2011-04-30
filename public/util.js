function distance(xb, xa, yb, ya) {
	delta_x = (xb>xa)?(xb-xa):(xa-xb);
	delta_y = (yb>ya)?(yb-ya):(ya-yb);
	
	return Math.sqrt(Math.pow((xb-xa),2)+Math.pow((yb-ya),2));
}


function is_there_only_true_in_this_table(tab) {
	for (i=0;i<tab.length;i++) {
		if (tab[i]==false) { return false; }
	}
	return true;
}


function display_level(i, name) {
	document.getElementById("level").innerHTML = '<span class="level-id">'+i+'.</span> <span class="level-name">'+name+'</span>';
}

