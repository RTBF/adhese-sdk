/**
 * @class
 * This file contains the main Adhese object used for most implementations of Adhese on webpages.
 * It defines a number of private objects.
 */
 function Adhese() {
 	this.config = {debug:false};
 	this.request = {};
 	this.ads = [];
 	this.that = this;
 	this.helper = new this.Helper();
 	return this;
 }

/**
 * Initializes the object. Resets all saved objects.
 * This method should be called at least just after creation of the Adhese object.
 * In most cases re-initialization is not need, but depending on your implementation,
 * it is available by simply calling init on an existing instance of Adhese.
 *
 * The options object can contain the following attributes:
 * debug: true/false, for setting debug logging, not intended for production use
 * host: the host of your adhese account, available in your support account
 * location: can be either a string containing the actual location to be passed to the adserver or a function to be called to retrieve the location
 *
 * The method will check if jQuery is available, and if so, make it available for ad templates as well.
 *
 * @param  {object} options An object that contains properties defined by your Adhese implementation
 * @return {void}
 */
 Adhese.prototype.init = function(options) {
 	if (options.debug)
 		this.config.debug = options.debug;

 	if (this.config.debug)
 		this.helper.log("Adhese: initializing...");

 	this.config.jquery =  typeof jQuery !== 'undefined';

 	if (options.host)
 		this.config.host = options.host;

 	if (options.location && typeof options.location=="function")
 		this.config.location = options.location();
 	else if (options.location && typeof options.location=="string")
 		this.config.location = options.location;


 	this.registerRequestParameter('rn', Math.round(Math.random()*10000));
  if(typeof(Fingerprint) === "function"){
      this.registerRequestParameter('fp', new Fingerprint({canvas: true}).get());      
  }
	this.registerRequestParameter('pr', (window.devicePixelRatio || 1));
	this.registerRequestParameter('re', this.helper.stringToHex(document.referrer));

 	this.userAgent = this.helper.getUserAgent();
	for (var p in this.userAgent) {
 		this.registerRequestParameter('br', this.userAgent[p]);
 	}

 	if (this.config.debug) {
 		this.helper.log('Adhese: initialized with config:');
 		this.helper.log(this.config);
 	}

 };

/**
 * Function to add target parameters to an Adhese instance. These parameters will be appended to each request.
 * @param  {string} key   the prefix for this target
 * @param  {string} value the value to be added
 * @return {void}
 */
Adhese.prototype.registerRequestParameter = function(key, value) {
	var v = this.request[key];
	if (!v) v = new Array();
	v.push(value);
	this.request[key] = v;
}

/**
 * The tag function is the default function to be called from within an ad container.
 * It requires at least the formatCode parameter.
 * The function creates an Ad object
 * @param  {string} formatCode Contains the format code as defined in Adhese
 * @param  {object} options An object that contains properties that define targeting, location and other request properties defined by your Adhese implementation
 * @return {object}	The newly created Ad object.
 */
 Adhese.prototype.tag = function(formatCode, options) {
 	var ad = new this.Ad(this, formatCode, options);
 	this.ads.push([formatCode, ad]);
 	if (ad.options.write) {
 		this.write(ad);
 	}
 	return ad;
 };

/**
 * Executes a document.write and creates a script tag when called.
 * The script tag requests a javascript advertisement from the server.
 * @param  {object} ad The Ad object instance to be written to the document.
 * @return {void}
 */
 Adhese.prototype.write = function(ad) {
 	if (this.config.debug) {
 		console.log('Adhese.write: request uri: ' + this.getRequestUri(ad, {type:'js'}));
 	}
 	document.write('<scri'+'pt type="text/javascript" src="' + this.getRequestUri(ad, {type:'js'}) + '"></scr'+'ipt>');
 };

/**
 * Creates an invisible pixel in the document that sends a request to Adhese for tracking an impression or action.
 * @param  {string} uri The URI used for tracking.
 * @return {void}
 */
 Adhese.prototype.track = function(uri) {
	this.helper.addTrackingPixel(uri);
};

/**
 * This function can be used to create a request for several slots at once. For each ad object passed, a sl part is added to the request. The target parameters are added once.
 * @param  {Ad[]} adArray An array of Ad objects that need to be included in the URI
 * @param  {object} options Possible options: type:'js'|'json'|'jsonp', when using type:'jsonp' you can also provide the name of a callback function callback:'callbackFunctionName'. Type 'js' is the default if no options are given. Callback 'callback' is the default for type 'jsonp'
 * @return {string}         The URI to be used to retrieve an array of ads.
 */
Adhese.prototype.getMultipleRequestUri = function(adArray, options) {
	var uri = this.config.host;
 	if (!options) options = {'type':'js'};

 	// add prefix depending on request type
 	switch(options.type) {
	 	case 'json':
	 	uri += 'json/';
	 	break;

	 	case 'jsonp':
	 	if (!options.callbackFunctionName) options.callbackFunctionName = 'callback';
	 	uri += 'jsonp/' + options.callbackFunctionName + '/';
	 	break;

	 	default:
	 	uri += 'ad/';
	 	break;
	}

	 // add an sl clause for each Ad in adArray
	for (var i = adArray.length - 1; i >= 0; i--) {
		if (adArray[i].options.location) {
			uri += "sl" + adArray[i].options.location + "-" + adArray[i].format + "/";
    	} else {
    		uri += "sl" + this.config.location + "-" + adArray[i].format + "/";
    	}
	}

	for (var a in this.request) {
		var s = a;
		for (var x=0; x<this.request[a].length; x++) {
			s += this.request[a][x] + (this.request[a].length-1>x?';':'');
		}
		uri += s + '/';
	}
	uri += '?t=' + new Date().getTime();
	return uri;
}

/**
 * Returns the uri to execute the actual request for this ad
 *
 * @param {Ad} ad the Ad instance whose uri is needed
 * @param {object} options Possible options: type:'js'|'json'|'jsonp', when using type:'jsonp' you can also provide the name of a callback function callback:'callbackFunctionName'. Type 'js' is the default if no options are given. Callback 'callback' is the default for type 'jsonp'
 * @return {string}
 */
 Adhese.prototype.getRequestUri = function(ad, options) {
 	var adArray = [ad];
 	return this.getMultipleRequestUri(adArray, options);
 };
