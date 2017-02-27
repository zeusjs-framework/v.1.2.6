//create dom methods
Element.prototype.remove = function(){
	this.parentElement.removeChild(this);
}

//create empty arrays/objects/vars
$Scope = [];
$Zeus = {};
$Zeus.route = new Array;	
$Zeus.route.current = new Array;
$Zeus.route.parameter = new Array;

//create filled arrays/objects/vars
$Zeus.route.fullPath = window.location.pathname;
$Zeus.route.host = window.location.host;

//create functions

	//http
	$Zeus.http = function(url, callback){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				callback(xhttp.response);
			}
		};
		xhttp.open("GET", url, false);
		xhttp.send();
	}

	//route
		
		//set actual location
		$Zeus.route.location = function(location){
			window.location.pathname = location;
		}
		
		//set home path and navigate to them if no path
		$Zeus.route.routeHome = function(){
			if(document.querySelectorAll("[route-home]").length > 1){
				console.log("[Zeus] - FATAL ERROR: only one route-home element is allowed!");
			} else {
				var element = document.querySelector("[route-home]");
				$Zeus.route.homePath = element.getAttribute("route-home");
				
				if($Zeus.route.fullPath == "" || $Zeus.route.fullPath == "/"){
					$Zeus.route.location($Zeus.route.homePath);
				} else {
					element.remove();
				}
			}
		}
		
		//set fallback path | path is not registered
		$Zeus.route.routeFallback = function(){
			if(document.querySelectorAll("[route-fallback]").length > 1){
				console.log("[Zeus] - FATAL ERROR: only one route-fallback element is allowed!");
			} else {
				console.log(document.querySelector("[route-fallback]").getAttribute("route-fallback"));
				$Zeus.route.fallbackPath = document.querySelector("[route-fallback]").getAttribute("route-fallback");
			}
		}
		
		//register paths
		$Zeus.route.register = function(items){
			
			var routesplit = $Zeus.route.fullPath.split("/");
			
			var fallback = 0;
			for(var i = 0; i < items.length; i++){
				
				if(items[i]['route'].split("/").length == routesplit.length){
					var error_collector = 0;
					for(var j = 0; j < routesplit.length; j++){
						if(items[i]['route'].split("/")[j].indexOf(":") > -1){
							$Zeus.route.parameter[items[i]['route'].split("/")[j].replace(":", "")] = routesplit[j];
						} else {
							if(routesplit[j] != items[i]['route'].split("/")[j]){
								error_collector += 1;
							}	
						}
					}
					if(error_collector == 0){
						$Zeus.route.current.uncompiled = items[i]['route'];
						$Zeus.route.current.name = items[i]['name'];
						fallback = 1;
					}
				}
			}
		
		if(fallback == 0){
			$Zeus.route.location($Zeus.route.fallbackPath);
		}
		
		$Zeus.route.element();
			
		}
		
		//remove all routecontainer items without right path name
		$Zeus.route.element = function(){
			var routeContainer = document.querySelectorAll("[route-container]");
			
			for(var i = 0; i < routeContainer.length; i++){
				var element = routeContainer[i];
				var routeItems = element.querySelectorAll("[route-item]");
				
				for(var j = 0; j < routeItems.length; j++){
					var subelement = routeItems[j];
					if(subelement.getAttribute("route").replace(/ /g, '').split(",").indexOf($Zeus.route.current["name"]) == -1){
						subelement.remove();
					}
				}
			
			}
		}
			
		//apply listener to route locations
		$Zeus.route.applyListener = function(){
			var route_location = document.querySelectorAll("[route-location]");
			
			for(var i = 0; i < route_location.length; i++){
				route_location[i].addEventListener("click", function(){
				$Zeus.route.location(this.getAttribute("route-location"));
			  });
			}
		}
		
		//active route
		$Zeus.route.active = function(){
			var activeClass = document.querySelectorAll("[route-active-class]");
			for(var k = 0; k < activeClass.length; k++){
				var split = activeClass[k].getAttribute("route-active-class").split("|");
				if(split[1].replace(/ /g, '').split(",").indexOf($Zeus.route.current.name) != -1){
					activeClass[k].className += split[0];
				}
				
			}
		}
		
		//zeus bind
		$Zeus.bind = function(){
			var bindelements = document.querySelectorAll("[zeus-bind]");
			for(var i = 0; i < bindelements.length; i++){
				bindelements[i].innerHTML = $Scope[bindelements[i].getAttribute("zeus-bind")];
			}
		}
		
		//zeus value
		$Zeus.value = function(){
			var valueelements = document.querySelectorAll("[zeus-value]");
			for(var i = 0; i < valueelements.length; i++){
				valueelements[i].value = $Scope[valueelements[i].getAttribute("zeus-value")];
			}
		}
$Zeus.application = function(callback){
	$Zeus.route.routeHome();
	$Zeus.route.routeFallback();
	$Zeus.route.applyListener();
		
	$Zeus.route.active();
	$RouteParameter = $Zeus.route.parameter;
	callback();
	
	$Zeus.bind();
	$Zeus.value();
	
}
