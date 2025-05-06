# Explore Nigeria Website Documentation

## Table of Contents

- [Overview](#overview)
- [Site Structure](#site-structure)
- [CSS Functionality](#css-functionality)
- [JavaScript Functionality](#javascript-functionality)
- [Image Attributions](#image-attributions)

## Overview

"Explore Nigeria" is a responsive tourist information website designed to showcase the beauty, culture, and destinations within Nigeria. The website invites users to discover Nigeria's attractions through interactive features, image galleries, location maps, and detailed destination information.

### Purpose

The website serves as a digital gateway to Nigeria, promoting tourism and cultural appreciation by highlighting various destinations, providing visual experiences, and offering contact information for potential visitors.

## Site Structure

The website consists of three main pages:

### 1. Home Page (`index.html`)

- **Hero Section**: Features a welcoming banner with a call-to-action button
- **Mission Statement**: Explains the purpose of the website and what visitors can expect
- **Image Carousel**: Showcases a visually appealing grid of images highlighting Nigerian landscapes, architecture, and culture

### 2. Destinations Page (`destinations.html`)

- **Grid Layout**: Displays a collection of Nigerian destinations with descriptions
- **Interactive Map**: Shows the locations of destinations when selected
- **Fullscreen Image Preview**: Allows users to view larger versions of destination images

### 3. About Us Page (`about.html`)

- **Team Information**: Introduces the staff with photos and titles
- **Contact Form**: Allows visitors to send inquiries or messages

### Common Elements

- **Navigation Bar**: Present on all pages with consistent styling and active page highlighting
- **Footer**: Contains social media links, navigation shortcuts, and copyright information

## CSS Functionality

The website employs a variety of CSS techniques to create a responsive, visually appealing user experience:

### Core Styling Features

- **CSS Variables**: Defines a theme with primary and secondary colors (`--primary-color: #005000`, `--secondary-color: #FFEA00`) for easy global style management
- **Responsive Design**: Uses media queries to adapt layouts for different screen sizes
- **Flexbox & Grid**: Implements modern layout techniques for content organization
- **Custom Fonts**: Incorporates Montserrat and Lato from Google Fonts

### Visual Effects

- **Hover Animations**: Elements like navigation links, buttons, and images transform on hover
- **Image Containers**: Provides zoom effects when hovering over images
- **Box Shadows**: Adds subtle depth to content sections and grid items
- **Transitions**: Smooth color and transformation changes for interactive elements

### Layout Features

- **Sticky Header**: Navigation stays at the top of the viewport during scrolling
- **Grid System**: Adaptable grid with specialty layout options (`wide`, `tall`, `big`) for featured images
- **Fullscreen Preview**: Custom modal display for image enlargement

### Responsive Behavior

- **Mobile-First Design**: Layout adjusts based on screen width
- **Stacked Grid**: Converts to column layout on smaller screens
- **Adjusted Form Width**: Contact form expands to fill available space on mobile devices

## JavaScript Functionality

The website uses JavaScript to enhance user experience through several interactive features:

### Image Preview System

- **Event Listeners**: Attaches click events to images for fullscreen preview
- **Dynamic Source Management**: Updates preview image source based on clicked thumbnail
- **Modal Display Control**: Shows and hides the fullscreen preview container

### Interactive Map Integration

- **Location Display**: `showOnMap()` function updates the embedded Google Maps iframe
- **URL Encoding**: Properly formats location search queries for map display
- **Smooth Scrolling**: Automatically scrolls to show the map after a location is selected

### Page Load Optimization

- **DOMContentLoaded**: Ensures JavaScript runs only after the DOM is fully loaded
- **Lazy Loading**: Images use the `loading="lazy"` attribute to improve initial page load performance

## Image Attributions

While images from Unsplash and Wikimedia Commons typically don't require attribution, we've included credits as a best practice:

### Destination Page Images

- **Aro Meta Lagos**
  - Photographer: Amir Mortezaie
  - Source: [Unsplash](https://unsplash.com/photos/a-group-of-statues-of-men-standing-next-to-each-other-XEPhyDKg3S0)
- **Aso Rock**
  - Photographer: Mark Fischer
  - Source: [Flickr](https://www.flickr.com/photos/fischerfotos/16570360149/)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 2.0 Generic](https://creativecommons.org/licenses/by-sa/2.0/deed.en)
- **Cathedral Church of Christ**
  - Photographer: Olasunkanmiariyo
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:The_Cathedral_Church_of_Christ_Marina..jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/deed.en)
- **Central Bank of Nigeria**
  - Photographer: Chipla
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:Central_bank_nigeria.jpg)
- **Durbar Festival**
  - Photographer: Ahmad Jaafar
  - Source: [Unsplash](https://unsplash.com/photos/a-group-of-people-walking-down-a-street-next-to-a-horse-WYQEE17s8FM)
- **Ebute Metta Train Station**
  - Photographer: Muhammed A. Mustapha
  - Source: [Unsplash](https://unsplash.com/photos/a-large-building-with-a-sign-on-top-of-it-ug8rtp8cIDI)
- **Gurara Falls**
  - Photographer: Tytypicasso
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:The_Gurara_Falls,_Niger_State,_Nigeria.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **House of Assembly**
  - Photographer: Unknown
  - Source: [ntm](https://ntm.ng/wp-content/uploads/2023/06/images-2023-06-19T113902.533.jpeg)
- **Idanre Hills**
  - Photographer: Ayobami Macaulay
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:2-_Idanre_Hills_By_Ayobami_Macaulay.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **Lekki Conservation Center**
  - Photographer: Omotayo Tajudeen
  - Source: [Unsplash](https://unsplash.com/photos/unknown-person-walking-on-hanging-bridge-hbNlzEtn-CI)
- **Millennium Park**
  - Photographer: Kritzolina
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:Abuja_Millenium_Park_2019_01.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **National Arts Theatre**
  - Photographer: Omoeko Media
  - Source: [Wikimedia](https://en.m.wikipedia.org/wiki/File:National_Theater_in_Lagos_State-Nigeria.jpg)
  - License: License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **National Ecumenical Center**
  - Photographer: ProlifeCoachPA
  - Source: [ProlifeCoachPA](https://prolifecoachpa.com/images/travel-amp-history/10-lesser-known-facts-about-abuja-the-capital-of-nigeria_2.jpg)
- **Nike Art Gallery**
  - Photographer: Jeremy Weate
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:Outside_Nike_Art_Gallery_(4202980259).jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 2.0 Generic](https://creativecommons.org/licenses/by-sa/2.0/deed.en)
- **Obudu Mountain Resort**
  - Photographer: Dotun55
  - Source: [Wikimedia](https://igl.m.wikipedia.org/wiki/F%C3%A1%C3%ADl%C3%BA:Private_cattle_ranch.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **Ushafa Crushed Rock**
  - Photographer: Solomon Wada
  - Source: [Unsplashed](https://unsplash.com/photos/a-large-rock-formation-next-to-a-body-of-water-dJl902CwQyg)
- **Zuma Rock**
  - Photographer: MediaMOF
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:Abuja_monuments_36.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **Agbokim Waterfalls**
  - Photographer: Ozioma Chijioke
  - Source: [Unsplashed](https://unsplash.com/photos/woman-in-black-tank-top-and-black-shorts-sitting-on-rock-near-waterfalls-during-daytime-N1kbhVedc88)
- **National Mosque Abuja**
  - Photographer: Praise Godwin
  - Source: [Unsplash](https://unsplash.com/photos/a-large-building-with-a-yellow-dome-on-top-of-it-uBEB822H1ww)
- **Erin Ijesha Falls**
  - Photographer: Ei'eke
  - Source: [Wikimedia](https://commons.wikimedia.org/wiki/File:Agbokim_Waterfalls,_Agbokim,_Cross_River_state.jpg)
  - License: [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)

### Homepage Images

- **Welcome to Abuja (Hero Image)**
  - Photographer: Fatima Muhammed
  - Source: [Google Arts and Culture](https://artsandculture.google.com/asset/abuja-city-gate-fatima-muhammed/QwH1QuvLmeVsYg?hl=en)
- **City View**
  - Photographer: Namnso Ukpanah
  - Source: [Unsplash](https://unsplash.com/photos/aerial-photography-of-city-6UqJTfoXIq8)
- **Lagos Cathedral**
  - Photographer: Opeyemi Adisa
  - Source: [Unsplash](https://unsplash.com/photos/a-large-white-building-with-a-clock-tower-2FPV2fMoHZo)
- **Men Blowing Trumpet**
  - Photographer: Ayoola Salako
  - Source: [Unsplash](https://unsplash.com/photos/man-in-white-dress-shirt-playing-trumpet-9_uYzdZ3084)
- **Street Sunset View**
  - Photographer: Macdavis Johnson
  - Source: [Unsplash](https://unsplash.com/photos/a-car-driving-down-a-street-next-to-trees-hzx5kpvmgco)
- **Ikoyi Link Bridge at Night**
  - Photographer: Opeyemi Adisa
  - Source: [Unsplash](https://unsplash.com/photos/a-large-bridge-over-a-body-of-water-at-night-Ww2j734hEcA)
- **Waterfall**
  - Photographer: Ayoola Salako
  - Source: [Unsplash](https://unsplash.com/photos/water-falls-in-the-middle-of-the-forest-bAqih12-g9A)
- **Woman Herding Cattle**
  - Photographer: Fatima Yusuf
  - Source: [Unsplash](https://unsplash.com/photos/a-woman-in-a-red-dress-standing-in-front-of-a-herd-of-white-cows-p993yxPpTks)

### Staff Photos

- All staff portrait photos provided by UI Faces (<https://uifaces.co/>) under free use license

### Additional Resources

- **Icons**: Provided by Ionicons (<https://ionic.io/ionicons>) under MIT license
- **Favicon**: Generated using Favicon.io generator

---

&copy; 2025 Explore Nigeria | All rights reserved
