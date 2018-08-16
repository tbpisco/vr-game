export class GetURLParameterByName {

	constructor() {

        //show an error
        
	};

	static get(name, url){

		if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2] || results[2] == "undefined" || results[2] == "null") return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
}
