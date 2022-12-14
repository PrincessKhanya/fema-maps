let map, infoWindow;
var searchInput = 'search_input'

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -26.2041, lng: 28.0473 },
    zoom: 12,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
  new google.maps.Marker({
    position: { lat: -26.2041, lng: 28.0473 },
    map: map,
    label: "A",
    title: "Johannesburg",
    animation: google.maps.Animation.DROP,
  });

  infoWindow = new google.maps.InfoWindow;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(p){
      var position ={
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };
      infoWindow.setPosition(position);
      infoWindow.setContent('Your position');
      infoWindow.open(map);
    }, function(){
      handleLocationError('Geolation service failed', map.center())
    })
  } else {
    handleLocationError('No geolocation available', map.center())
  }

  var input = document.getElementById("search");
  var searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', function(){
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  searchBox.addListener('places_changed', function(){
    var places = searchBox.getPlaces();

    if(places.length === 0){
      return;
    }

    markers.forEach((m) => {m.setMap(null);});
    markers = [];  

    var bounds = new google.maps.LatLngBounds();

    places.forEach((p)=>{
      if (!p.geometry || !p.geometry.location){
        return;
      }
      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));
      if(p.geometry.viewport){
        bounds.union(p.geometry.viewport);
      }else{
        bounds.extend(p.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  // let autocomplete;
  // function initAutocomplete(){
  //   autocomplete =  new google.maps.places.Autocomplete(
  //     document.getElementById('search'), {
  //       types: ['establishment'],
  //       componentRestrictions: {'country': ['ZA']},
  //       fields: ['place_id', 'geometry', 'name']

  //     }
  //   );
  //   autocomplete.addListner('place_changed', onPlaceChanged);
  // }
  // function onPlaceChanged(){
  //   var place = autocomplete.getPlace();
  //   if(!place.geometry){
  //     document.getElementById('autocomplete').placeholder = 'Enter a place'

  //   }else{
  //     document.getElementById('details').innerHTML = place.name
  //   }
  // }

}

window.initMap = initMap;



function handleLocationError(content,position){
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(map);

}


