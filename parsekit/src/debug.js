/**
 * Borrowed from http://snippets.dzone.com/posts/show/4296
 */
function var_dump(data,addwhitespace,safety,level) {
	var rtrn = '';
	var dt,it,spaces = '';
	if(!level) {level = 1;}
	for(var i=0; i<level; i++) {
		spaces += '   ';
	}//end for i<level
	if(typeof(data) != 'object') {
		dt = data;
		if(typeof(data) == 'string') {
			if(addwhitespace == 'html') {
				dt = dt.replace(/&/g,'&amp;');
				dt = dt.replace(/>/g,'&gt;');
				dt = dt.replace(/</g,'&lt;');
			}//end if addwhitespace == html
			dt = dt.replace(/\"/g,'\"');
			dt = '"' + dt + '"';
		}//end if typeof == string
		if(typeof(data) == 'function' && addwhitespace) {
			dt = new String(dt).replace(/\n/g,"\n"+spaces);
			if(addwhitespace == 'html') {
				dt = dt.replace(/&/g,'&amp;');
				dt = dt.replace(/>/g,'&gt;');
				dt = dt.replace(/</g,'&lt;');
			}//end if addwhitespace == html
		}//end if typeof == function
		if(typeof(data) == 'undefined') {
			dt = 'undefined';
		}//end if typeof == undefined
		if(addwhitespace == 'html') {
			if(typeof(dt) != 'string') {
				dt = new String(dt);
			}//end typeof != string
			dt = dt.replace(/ /g,"&nbsp;").replace(/\n/g,"<br>");
		}//end if addwhitespace == html
		return dt;
	}//end if typeof != object && != array
	for (var x in data) {
		if(safety && (level > safety)) {
			dt = '*RECURSION*';
		} else {
			try {
			dt = var_dump(data[x],addwhitespace,safety,level+1);
			} catch (e) {continue;}
		}//end if-else level > safety
		it = var_dump(x,addwhitespace,safety,level+1);
		rtrn += it + ':' + dt + ',';
		if(addwhitespace) {
			rtrn += '\n'+spaces;
		}//end if addwhitespace
	}//end for...in
	if(addwhitespace) {
		rtrn = '{\n' + spaces + rtrn.substr(0,rtrn.length-(2+(level*3))) + '\n' + spaces.substr(0,spaces.length-3) + '}';
	} else {
		rtrn = '{' + rtrn.substr(0,rtrn.length-1) + '}';
	}//end if-else addwhitespace
	if(addwhitespace == 'html') {
		rtrn = rtrn.replace(/ /g,"&nbsp;").replace(/\n/g,"<br>");
	}//end if addwhitespace == html
	return rtrn;
}

function log(message) {
	if (!log.window_ || log.window_.closed) {
		var win = window.open("", null, "width=600,height=400," +
							"scrollbars=yes,resizable=yes,status=no," +
							"location=no,menubar=no,toolbar=no");
		if (!win) return;
		var doc = win.document;
		doc.write("<html><head><title>Debug Log</title></head>" +
				"<body></body></html>");
		doc.close();
		log.window_ = win;
	}
	var logLine = log.window_.document.createElement("div");
	logLine.appendChild(log.window_.document.createTextNode(message));
	log.window_.document.body.appendChild(logLine);
}

function var_log(variable) {
	log(var_dump(variable));
}