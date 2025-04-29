/*
  This script is used to create a fullscreen image preview and to show the location on the map when an image is clicked.
  It will begin to work when the page loads.
*/
document.addEventListener("DOMContentLoaded", () => {
  // Get the preview elements
  const fullscreenPreview = document.getElementById("fullscreenPreview");
  const previewImage = document.getElementById("previewImage");

  // Attach click event to all images inside .image-container
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", () => {
      previewImage.src = img.src; // Makes the source of preview the same as the source of the clicked image
      previewImage.alt = img.alt; // Changes the alt text too
      fullscreenPreview.style.display = "flex"; // Changes the display of the preview div from "none" to flex, making it visible
    });
  });

  // Hide the fullscreen view when you click anywhere on it
  fullscreenPreview.addEventListener("click", () => {
    fullscreenPreview.style.display = "none"; //Changes the display back to "none" hiding it.
  });
});

//Changes the location on the map to be the location of the clicked image and scrolls the map into view.
function showOnMap(location) {
  const map = document.getElementById("map");
  const encodedLocation = encodeURIComponent(location);
  map.src = `https://www.google.com/maps/embed/v1/place?q=${encodedLocation}&maptype=satellite&zoom=16&key=AIzaSyCDvkxRJOhNrcg6I1gHQsHFBnrl4coiwbs`;

  document.getElementById("map-section").scrollIntoView({ behavior: "smooth" }); // Defines the scroll animation behaviour
}
