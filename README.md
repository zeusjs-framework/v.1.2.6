# v.1.2.1

Added Route Function


#usage

##first step: include js file in head
e.g.
<script language="javascript" type="text/javascript" src="http://localhost/zeus/zeus-1.1.2.js"></script>

##second step: setup home and fallback routes | in body

//home route | the event occurs when no route is set in url | e.g. http://example.org
<base route-home="ROUTENAME">

//fallback route | the event occurs when actual route is not registered and not available | e.g. http://example.org/brokeroute
<base route-fallback="ROUTENAME">

