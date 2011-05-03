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


function display_level(index, name) {
	//document.getElementById("level").innerHTML = '<span class="level-id">'+i+'.</span> <span class="level-name">'+name+'</span>';
	document.getElementById("level"+index).style.fontSize="100%";
	document.getElementById("level"+index).style.border="2px solid #BD2031";
	
	for(i=0;i<levels_name.length;i++) {
		if (i==index) {
		
		} else {
			elem=document.getElementById("level"+i);
			elem.style.fontSize="80%";
			elem.style.border="none";
		}
	}
	
}

function init_levels_bars() {
	concat="";
	for(i=0;i<levels_name.length;i++) {
		concat+="<div onclick=\"to_level("+i+")\" style=\"cursor:pointer;padding:5px;font-size:80%;margin-right:5px;margin-top:5px;display:inline-block;background-color:#fff;font-size:50%;\" id=\"level"+i+"\" data-val=\""+i+ "- "+levels_name[i]+"\">"+levels_name[i]+"</div>";
	}
	document.getElementById("levels").innerHTML=concat;
}

function to_level(i) {
	justWon=true;
	animationStarted=true;
	justFinishedALevel=true;
	previousLevel=(i==0)?0:i-1;
	currentLevel=i;
}	