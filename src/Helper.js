/**
 * @class
 * Helper object with convenience methods
 * @return {Object}
 */
 Adhese.prototype.Helper = function() {
 	this.oslist = [
 {
     string: navigator.userAgent,
    subString: "Windows Phone",
    identity: "WindowsPhone"
 },
 {
   string: navigator.userAgent,
   subString: "Windows NT 10.0",
   identity: "Windows10"
 },
 {
       string: navigator.userAgent,
      subString: "Windows NT 6.3",
      identity: "Windows8.1"
  },
  {
 		string: navigator.userAgent,
 		subString: "Windows NT 6.2",
 		identity: "Windows8"
 	},
 	{
 		string: navigator.userAgent,
 		subString: "Windows NT 6.1",
 		identity: "Windows7"
 	},
 	{
 		string: navigator.userAgent,
 		subString: "Windows NT 6.0",
 		identity: "WindowsVista"
 	},
 	{
 		string: navigator.userAgent,
 		subString: "Windows NT 5.1",
 		identity: "WindowsXP"
 	},
 	{
 		string: navigator.userAgent,
 		subString: "Windows 98",
 		identity: "Windows98"
 	},
  {
   string: navigator.userAgent,
   subString: "Android",
   identity: "Android"
  },
 	{
 		string: navigator.userAgent,
 		subString: "iPhone",
 		identity: "iOS"
 	},
 	{
 		string: navigator.userAgent,
 		subString: "iPad",
 		identity: "iOS"
 	},
 	{
 		string: navigator.platform,
 		subString: "Mac",
 		identity: "OSX"
 	},
  {
   string: navigator.platform,
   subString: "Linux",
   identity: "Linux"
  }
 	];

 	this.browserlist = [
 	{
        string: navigator.userAgent,
        subString: "Trident/7",
        identity: "Explorer",
        versionSearch: "rv"
    },{
 		string: navigator.userAgent,
 		subString: "MSIE",
 		identity: "Explorer",
 		versionSearch: "MSIE"
 	}, {
 		string: navigator.userAgent,
 		subString: "Chrome",
 		identity: "Chrome"
  },{
 		string: navigator.vendor,
 		subString: "Apple",
 		identity: "Safari",
 		versionSearch: "Version"
 	}, {
 		prop: window.opera,
 		identity: "Opera"
 	}, {
 		string: navigator.userAgent,
 		subString: "Firefox",
 		identity: "Firefox"
 	}
 	];
 };

/**
 * Log function used in debug mode. Simply logs to the console and saves the log messages in a private array
 * @return {void}
 */
 Adhese.prototype.Helper.prototype.log = function(){
 	this.logObjs = this.logObjs || {};
	this.logs = this.logs || [];
	var logArgs = '';
	var logTime = new Date().getTime();
	for (var i = 0, a = arguments; i < a.length; i++) {
		if (a[i]) {
			logArgs += a[i] + ' ';
		}
	}
	this.logObjs[logTime] = logObj = {
		msg: logArgs
	};
	//this.logs.push(logTime + ": " + logArgs);
	this.logs.push([logTime, arguments]);
	if (window.location.search.match("debug")) {
		console.log(logTime, arguments)
	};
};


/*helper.debug()
prints all log messages
*/


Adhese.prototype.Helper.prototype.debug = function() {
	for (var i in this.logs) {
    var l = this.logs[i];
		console.log(l[0], l[1]);
	}
};
Adhese.prototype.Helper.prototype.debugTable = function() {
	if (typeof console.table == 'function') {
		console.table(this.logObjs);
	}
}

/**
 * Looks for META tags in the document with name inName.
 * @param  {string} inName	Name of the META tag to read.
 * @param  {number} limitReturn	Limits the length of the returning array. If omitted or -1, the full array is returned..
 * @return {array}	Returns an array of strings.
 */
 Adhese.prototype.Helper.prototype.getMetaTagContent = function(inName, limitReturn) {
	// body...
};

/**
 * Gets the value of a query string parameter of the location of the document in which the Adhese object resides.
 * Depending on the implementation, this is not necessarily the visible url of a browser or app
 * @param  {string} inName	The name of the parameter to read.
 * @return {array}	Returns an array of strings containing the values read from the location uri.
 */
 Adhese.prototype.Helper.prototype.getQueryStringParameter = function(inName) {
 	var match = RegExp('[?&]' + key + '=([^&]*)').exec(window.location.search);
 	return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : default_;
 };

/**
 * Creates img element of 1 pixel and adds it to the document outside the viewport.
 * @param  {string} uri	The uri used as source for the image element.
 * @return {void}
 */
 Adhese.prototype.Helper.prototype.addTrackingPixel = function(uri) {
 	var img = document.createElement('img');
 	//img.src = uri + this.timestamp(uri);
 	img.src = uri;
 	img.style.height = "1px";
 	img.style.width = "1px";
 	img.style.margin = "-1px";
 	img.style.border = "0";
 	img.style.position = "absolute";
 	img.style.top = "0";
 	document.body.appendChild(img);
 };

/**
 * Gets viewport dimensions.
 * @return {object}	Returns an object containing a width and height attribute.
 */
 Adhese.prototype.Helper.prototype.getScreenProperties = function() {
 	var dim = new Object();
 	dim.width = (window.innerWidth ?  window.innerWidth : document.body.offsetWidth);
 	dim.height = (window.innerHeight ?  window.innerHeight : document.body.offsetHeight);
 	return dim;
 };

/**
 * Adds a listener to a DOM event
 * @param  {string} event The name of the DOM event.
 * @param  {function} listener A function name that will be called when the event is fired.
 * @return {void}
 */
 Adhese.prototype.Helper.prototype.addEvent = function(ev, fu, param, element) {
 	if(typeof element == "undefined"){
		element = window;
	}
 	if(element.addEventListener){ // W3C standard
		element.addEventListener(ev, function() {fu(param);}, false);
	} else if(element.attachEvent){ // Microsoft
		element.attachEvent('on'+ev, function() {fu(param);});
	}
}

/**
 * Adds a listener to a DOM event
 * @param  {string} event The name of the DOM event.
 * @param  {function} listener The function name that was listening to the event.
 * @return {void}
 */
 Adhese.prototype.Helper.prototype.removeEvent = function(e, l, el){
 	if(window.removeEventListener) {
 		window.removeEventListener(e, l, false);
 	} else if(window.detachEvent) {
 		window.detachEvent('on'+e, l);
 	}
 }

/**
 * Gets the offset of an element from the top left of the window.
 * @param  {HTMLElement} element The element who's offset you want to know.
 * @return {object}	Returns an object containing a top and left attribute.
 */
 Adhese.prototype.Helper.prototype.getAbsoluteOffset = function(element) {
 	var o = {"top":0,"left":0};
 	if (typeof(element) != 'undefined') {
 		for (o.left = 0, o.top = 0; element; element = element.offsetParent) {
 			o.left += element.offsetLeft;
 			o.top += element.offsetTop;
 		}
 	}
 	return o;
 }

/**
 * Populates a normalized Operating System, Browser and Browser version object.
 * Is automatically called by the Adhese.init function.
 * @return {object} an object containing an os, browser and browserVersion attribute
 */
 Adhese.prototype.Helper.prototype.getUserAgent = function(){
 	var obj = {};
 	obj.browser = this.searchString(this.browserlist) || "unknownBrowser";
 	obj.browserVersion = obj.browser + this.searchVersion(navigator.userAgent)
 	|| this.searchVersion(navigator.appVersion)
 	|| "unknownVersion";
 	obj.os = this.searchString(this.oslist) || "unknownOS";
 	return obj;
 }

/**
 * Internal method for determining the Operating System identification in the UserAgent
 * @param  {string} data The list of normalized values to match the found user-agent string with.
 * @return {string}      A string containing the User Agent name.
 */
 Adhese.prototype.Helper.prototype.searchString = function (data) {
 	for (var i=0;i<data.length;i++) {
 		var dataString = data[i].string;
 		var dataProp = data[i].prop;
 		this.versionSearchString = data[i].versionSearch || data[i].identity;
 		if (dataString) {
 			if (dataString.indexOf(data[i].subString) != -1)
 				return data[i].identity;
 		}
 		else if (dataProp) {
 			return data[i].identity;
 		}
 	}
 }

/**
 * Internal method for determining the User Agent version
 * @param  {array} dataString The list of normalized values to match the found user-agent string with.
 * @return {string}            A string containing the User Agent name and version number
 */
 Adhese.prototype.Helper.prototype.searchVersion = function (dataString) {
 	var index = dataString.indexOf(this.versionSearchString);
 	if (index == -1) return;
 	return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
 }



 Adhese.prototype.Helper.prototype.merge = function(a, b){
 	var c = {};
 	for (var k in a) {
 		c[k] = a[k];
 	}
 	for (var k in b) {
 		c[k] = b[k];
 	}
 	return c;
 }
/**
 * Internal method for generating a hexadecimal representation of a string
 * @param  {string} The string to be converted to a hexadecimal value
 * @return {number} A hexadecimal number generated from the input string
 */
Adhese.prototype.Helper.prototype.stringToHex = function(str, hex) {
    try{
        hex = unescape(encodeURIComponent(str)).split('').map(
            function(v){
                return v.charCodeAt(0).toString(16);
            }).join('');
  }
  catch(e){
    hex = str
    console.log('invalid text input: ', e, str)
  }
  return hex
}
/**
 * Internal method for generating a string representation of a hexadecimal
 * @param  {number} A hexadecimal number generated from the input string
 * @return {string} The string to be converted to a hexadecimal value
 */
 Adhese.prototype.Helper.prototype.hexToString = function(hex, str){
	try{
    	str = decodeURIComponent(hex.replace(/(..)/g,'%$1'))
	} catch(e){
    str = hex
    console.log('invalid hex input: ', e, hex)
  }
  return str
}


/**
 * Function that creates a new cookie or overwrites an existing one with the same name
 * @param  {string} name  the name of this cookie, if it already exists, it will be overwrittem
 * @param  {string} value the value to be stored in the cookie
 * @param  {number} days  the number of days this cookie will remain valid
 * @return {void}
 */
Adhese.prototype.Helper.prototype.createCookie = function(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime( date.getTime() + (days*24*60*60*1000) - (date.getTimezoneOffset()*60*1000) );
		expires = "; expires="+date.toUTCString();
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

/**
 * Function to read the value of a cookie with a specific name
 * @param  {string} name the name of the cookie to be read
 * @return {string}      the value of the cookie, of no cookie exists, null is returned
 */
Adhese.prototype.Helper.prototype.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/**
 * Function to remove a cookie
 * @param  {string} name the name of the cookie to be removed
 * @return {void}
 */
Adhese.prototype.Helper.prototype.eraseCookie = function(name) {
	this.createCookie(name,"",-1);
}

/**
 * Function to test if the client will eat our cookies.
 * @return {boolean}	returns true if user accepts cookie, false if not
 */
Adhese.prototype.Helper.prototype.eatsCookie = function() {
	this.createCookie("adheseTestCookie","",1);
	if (this.readCookie("adheseTestCookie")!=null) {
		this.eraseCookie("adheseTestCookie");
		return true;
	} else {
		return false;
	}
}

/**
 * Function to get the values from meta elements
 * @param {string} the name or property of the meta elements
 * @return {array} list of contents from the matching elements
 */
Adhese.prototype.Helper.prototype.getMetaContent = function(meta_name) {
	var meta_elements = document.getElementsByTagName("META");
	var meta_contents = [];
	for (var i = meta_elements.length - 1; i >= 0; i--){
		var meta_element = meta_elements[i];
		if(meta_element && (meta_element.name === meta_name || meta_element.getAttribute("property") === meta_name) && meta_element.content){
			meta_contents.push(meta_element.content);
		}
	}
	return meta_contents;
};

/**
 * Function to check if an element is visible or not
 * @param {string} the id from the element to be checked or the element itself
 * @return {boolean} true if visible, false if not
 */
 Adhese.prototype.Helper.prototype.adhElementInViewport = function(element) {
  if(typeof(element) == "string"){
    element = document.getElementById(element);
  }
	if(element){
    	var rect = element.getBoundingClientRect();
			return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}else{
			return false;
		}
};
