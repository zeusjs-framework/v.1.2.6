# v.1.2.1

Added Route Function


#usage

##first step: include js file in head
e.g.

`<script language="javascript" type="text/javascript" src="http://localhost/zeus/zeus-1.1.2.js"></script>`

##second step: setup home and fallback routes | in body

//home route | the event occurs when no route is set in url | e.g. http://example.org

`<base route-home="ROUTENAME">`

//fallback route | the event occurs when actual route is not registered and not available | e.g. http://example.org/brokeroute

`<base route-fallback="ROUTENAME">`

##third step: create menu or something else
to navigate to routes you must add atleast one attribute to one html element (navigation item)

e.g. `<a route-location="home" route-active-class="active|home">home</a>`

route-location can be added to the most html elements and defines your ROUTENAME

route-active-class can be added to the most html elements and defined classes if ROUTENAME is active.

route-active-class="YOUR CLASSES | ROUTENAMES"        | ROUTENAMES/ROUTECLASSES CAN BE MULTIPLE NAMES e.g. "active|home,test, test1" 

##fourth step: setup route container and items | for display

a route-container attribute defines the parent of the items | multiple possible, nested possible
`<div route-container>`

in the route-container there are elements with the route-item attribute: e.g. `<div route-item route="ROUTENAME">`. This elements and their children are only existent if the route is active.
Its possible to show one div by multiple routes e.g. `<div route-item route="ROUTENAME, ROUTENAME2">`

##fifth step: register routes and other code

`$Zeus.route.register([	
				{ route: "/home", name: "home" },
				{ route: "/news", name: "news" },
				{ route: "/news/:time", name: "newsParameter" },
				{ route: "/contact", name: "contact" }
			]);`
      
You must register the routes first!.

route defines the url bar in your browser. e.g. http://example.org/homedir   ->  route: "/homedir"
                                                http://example.org/homedir/sub -> route: "/homedir/sub/"

name defines only a variable for you to use for divs (route-items)

you can define parameters like :PARAMETER
