// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  /* Hamburger Menu Toggle */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  /* Destinations Page: Map Section Code */
  const mapSection = document.getElementById("map-section");
  const mapFrame = document.getElementById("map-frame");
  const backBtn = document.getElementById("back-btn");
  const mapButtons = document.querySelectorAll(".map-btn");

  if (mapButtons.length) {
    // A simple mapping from location name to a google maps embed URL.
    const locationMapURLs = {
      "Obudu Mountain Resort":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.3172713397583!2d8.333333!3d6.500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNsKwMjInMjAuMCJOIDhX!5e0!3m2!1sen!2sng!4v1610000000000",
      "Yankari Game Reserve":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.3188917763105!2d10.752245!3d11.247010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1064f09c0!2sYankari%20Game%20Reserve!5e0!3m2!1sen!2sng!4v1610000000001",
      "Olumo Rock":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.024!2d3.369!3d7.160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103950!2sOlumo%20Rock!5e0!3m2!1sen!2sng!4v1610000000002",
      "Nike Art Gallery":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.502!2d3.379!3d6.450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103950!2sNike%20Art%20Gallery!5e0!3m2!1sen!2sng!4v1610000000003",
    };

    mapButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const locationName = btn.getAttribute("data-location");
        // Change button color (feedback effect)
        btn.style.backgroundColor = "#e6c200";
        if (locationMapURLs[locationName]) {
          mapFrame.src = locationMapURLs[locationName];
        } else {
          mapFrame.src = "https://www.google.com/maps/embed?pb=";
        }
        mapSection.classList.remove("hidden");
        mapSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* Back button for map section */
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      mapSection.classList.add("hidden");
      mapFrame.src = "";
    });
  }
});
