//geocode pasted from andi email


// Calling methods with javascript libraries
// 
// Mapbox GL JS 	mapboxgl.METHOD
// Leaflet 			L.METHOD
// jQuery			jQuery.METHOD  or $('selector').METHOD
// d3				d3.METHOD

// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoieWNzdW4iLCJhIjoiY2pnMDlibDNwMTZhcDJ3cGNvMzA1dTdvcyJ9.sZE20YpLv9-iVLxmt_VzUg';

   var map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/ycsun/cjg6v0c0a0r9v2rpax2zfzi7w'
   });


// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
	zoom: 11.2,
	style: 'mapbox://styles/ycsun/cjg6v0c0a0r9v2rpax2zfzi7w', 	
	
    center: [-122.275631,47.611670],//longitude,latitude
});

// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads
	
	// ADDING A LEGEND TO A LAYER
	// Values from PARK_TYPE in the cville-parks map layer in Mapbox Studio that have unique colors
	var layers = [
		'Civic Spaces', // CIVIC SPACES
		'Urban Park', // URBAN PARK
		'Pitch', // pitch
		'Building', // BUILDING
		'Water Area'// WATER AREAS
	];
	
	// the colors you use in the Mapbox Studio  to style the parks on the map for each category
	var colors = [
		'#f6f6f4', 
		'#d2d1bc', 
		'#c8cbbd', 
		'#e9e9e7', 
		'#cad2d3'
	];

	// add a legend to the map
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	}

	// replace contents of info window when user hovers on a state
	map.on('mousemove', function(e) {	// event listener to do some code when the mouse moves

	  var arts = map.queryRenderedFeatures(e.point, {
	    layers: ['artin_text']	// replace 'cville-parks' with the name of your layer, if using a different layer
	  });
        

	  if (arts.length > 0) {	// if statement to make sure the following code is only added to the info window if the mouse moves over a state
	    
          $('#info-window-body').html('<h3><strong>' + arts[0].properties.title + '</strong></h3><p>' + arts[0].properties.park_name + ' PARK</p><img class="art-image" src="img/' + arts[0].properties.title + '.jpg">');

	  } else {
	    document.getElementById('info-window-body').innerHTML = '<p>Not hovering over an <strong>art spot</strong> right now.</p>';
	  }
	
	});
    
    /*slidebar copy from https://onextrapixel.com/creating-a-swipeable-side-menu-for-the-web*/
$(document).ready(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
     
});
 
$(".swipe-area").swipe({
    swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=="move" && direction =="right") {
                 $(".container").addClass("open-sidebar");
                 return false;
            }
            if (phase=="move" && direction =="left") {
                 $(".container").removeClass("open-sidebar");
                 return false;
            }
        }
});


// --------------------------------------------------------------------
	// BUS STOPS - POPUPS
	// code to add popups
    // event listener for clicks on map
    map.on('click', function(e) {
      var stops = map.queryRenderedFeatures(e.point, {
        layers: ['cville-bus-stops'] // replace this with the name of the layer
      });

      console.log(stops);

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!stops.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var stop = stops[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

      // Set the popup location based on each feature
      popup.setLngLat(stop.geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h3>Stop ID: ' + stop.properties.stop_id   // 'stop_id' field of the dataset will become the title of the popup
                           + '</h3><p>' + stop.properties.stop_name // 'stop_name' field of the dataset will become the body of the popup
                           + '</p>');

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

});


// Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

 map.on('mousemove', function(e) {   // Event listener to do some code when the mouse moves, see https://www.mapbox.com/mapbox-gl-js/api/#events. 

        var art = map.queryRenderedFeatures(e.point, {    
            layers: ['publicarttext']    // replace 'cville-parks' with the name of the layer you want to query (from your Mapbox Studio map, the name in the layers panel). For more info on queryRenderedFeatures, see the example at https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/. Documentation at https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures.
        });
              
        if (art.length > 0) {   // if statement to make sure the following code is only added to the info window if the mouse moves over a state

            $('#info-window-body').html('<h3><strong>' + parks[0].properties.PARKNAME + '</strong></h3><p>' + parks[0].properties.PARK_TYPE + ' PARK</p><img class="park-image" src="img/' + parks[0].properties.PARKNAME + '.jpg">');

        } else {    // what shows up in the info window if you are NOT hovering over a park

            $('#info-window-body').html('<p>Not hovering over a <strong>Public Art Spot</strong> right now.</p>');
            
        }

    });

