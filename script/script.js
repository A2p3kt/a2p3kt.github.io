function showOnMap(location) {
  const map = document.getElementById("map");
  const encodedLocation = encodeURIComponent(location);
  map.src = `https://www.google.com/maps/embed/v1/place?q=${encodedLocation}&maptype=satellite&zoom=16&key=AIzaSyBRMZyFvNl5yCaWROH3LtppS5SFimivyQg`;

  document.getElementById("map-section").scrollIntoView({ behavior: "smooth" });
}
