/**
 * Function to check for preview parameters in the query string of the page location.
 * If present, the parameters are used to generate a live preview for the ad and are saved in a cookie named adhese_preview.
 * If no parameters are present but an adhese_preview cookie exists, the cookies value will be used to generate a live preview.
 * The parameters we are looking for are adhesePreviewCreativeId, adhesePreviewSlotId, adhesePreviewCreativeTemplate, adhesePreviewCreativeWidth, adhesePreviewCreativeHeight.
 */

Adhese.prototype.checkPreview = function () {
	this.previewFormats = {};
	if(!this.config.previewHost){
		return false;
	}
	if (window.location.search.indexOf("adhesePreview")!=-1) {
		this.helper.log("checking for preview");
        var b = window.location.search.substring(1);
        var countAd = (b.match(/adhesePreviewCreativeId/g)).length;
		var p = b.split("&");
		var c = '';
		var s = '';
		var t = '';
		var tf = '';
		var w = 0;
		var h = 0;
		var tc = [];
		for (var x=0; x<p.length; x++) {
			if (p[x].split("=")[0]=="adhesePreviewCreativeId") {
				c = unescape(p[x].split("=")[1]);
		    }
			if (p[x].split("=")[0]=="adhesePreviewSlotId") {
				s = p[x].split("=")[1];
		    }
			if (p[x].split("=")[0]=="adhesePreviewCreativeTemplate") {
				t = p[x].split("=")[1];
				tc.push(t);
			}
			if (p[x].split("=")[0]=="adhesePreviewTemplateFile") {
				tf = p[x].split("=")[1];
			}
			if (p[x].split("=")[0]=="adhesePreviewWidth") {
				w = p[x].split("=")[1];
			}
			if (p[x].split("=")[0]=="adhesePreviewHeight") {
				h = p[x].split("=")[1];
			}
			if (p[x].split("=")[0] == "adhesePreviewCreativeKey") {
				if(countAd > 1){
					if (s != "" && tc[0] != "") {
						for(i in tc){
							var t = tc[i];
							this.previewFormats[t]={slot:s,creative:c,templateFile:tf,width:w,height:h};
						}
					}
					tc=[];
				}
			}
		}
 		if(countAd == 1){
			for(var y = 0; y<tc.length; y++){
 				this.previewFormats[tc[y]] = {slot:s,creative:c, templateFile:tf,width:w,height:h};
 			}
 		}
		var c=[];
		for(k in this.previewFormats){
			c.push(k + "," + this.previewFormats[k].creative + "," + this.previewFormats[k].slot + "," + this.previewFormats[k].template + "," + this.previewFormats[k].width + "," + this.previewFormats[k].height);
		}
		this.helper.createCookie("adhese_preview",c.join('|'),0);
		this.previewActive = true;
	} else if (this.helper.readCookie("adhese_preview")) {
		var v = this.helper.readCookie("adhese_preview").split("|");
		for (var x=0; x<v.length; x++) {
			var c = v[x].split(",");
			this.previewFormats[c[0]] = {creative: c[1], slot: c[2], template: c[3], width: c[4], height: c[5]};
		}
		this.previewActive = true;
	}
};

/**
 * The showPreviewSign function displays a message to inform the user that the live preview is active.
 */
Adhese.prototype.showPreviewSign = function () {
	var that = this;
	var p = document.createElement('DIV');
	var msg = '<div id="adhPreviewMessage" style="cursor:pointer;font-family:Helvetica,Verdana; font-size:12px; text-align:center; background-color: #000000; color: #FFFFFF; position:fixed; top:10px;left:10px;padding:10px;z-index:9999;width: 100px;"><b>Adhese preview active.</br> Click to disable</div>';
	p.innerHTML = msg;
	// once and afterload
	document.body.appendChild(p);
	that.helper.addEvent("click", that.closePreviewSign.bind(that), p);
};

/**
 * The closePreviewSign function exits the live preview mode and reloads the page.
 */
Adhese.prototype.closePreviewSign = function () {
	this.helper.eraseCookie("adhese_preview");
	if(location.search.indexOf("adhesePreviewCreativeId") != -1){
		location.href = location.href.split("?")[0];
	}else{
		location.reload();
	}
};
