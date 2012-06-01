(function () {
	var URI = require("../uri").URI;
	
	//RFC 2616 and RFC 2818
	URI.SCHEMES["http"] = URI.SCHEMES["https"] = {
		parse : function (components, options) {
			//report missing host
			if (!components.host) {
				components.errors.push("HTTP URIs must have a host.");
			}
		},
		
		serialize : function (components, options) {
			//normalize the default port
			if (components.port === (components.scheme === "http" ? 80 : 443) || components.port === "") {
				components.port = undefined;
			}
			//normalize the empty path
			if (!components.path) {
				components.path = "/";
			}
			
			//NOTE: We do not parse query strings for HTTP URIs
			//as WWW Form Url Encoded query strings are part of the HTML4+ spec,
			//and not the HTTP spec. 
			
			return components;
		}
	};
}());