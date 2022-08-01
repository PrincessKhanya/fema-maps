let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -26.2041, lng: 28.0473 },
    zoom: 12,
  });
  new google.maps.Marker({
    position: { lat: -26.2041, lng: 28.0473 },
    map: map,
    label: "A",
    title: "Johannesburg",
    animation: google.maps.Animation.DROP
  })


  
}

window.initMap = initMap;

