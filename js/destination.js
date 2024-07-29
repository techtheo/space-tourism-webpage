// Define a variable to hold the planets data
let planets = [];

// Define a function to convert the response to JSON format
function jsonify(response) {
    return response.json(); // Return the JSON-parsed response
}

// Define a function to log an error message to the console
function showError() {
    console.log('Page not found!'); // Print 'Page not found!' to the console
}

// When the window finishes loading, execute the following code
window.onload = async () => {
    // Fetch data from the JSON file
    const dados = await fetch("./data.json")
        .then(jsonify)  // Convert the response to JSON
        .catch(showError);  // If there is an error, call showError()

    // If data fetching is successful, assign the destinations array to the planets variable
    planets = dados ? dados.destinations : [];
}

/*
~ ----------------------------------
~ DESTINATION TABS -- CACHE ELEMENTS
~ ----------------------------------
*/

//* TAB LIST
// Select the tab list element with the role attribute 'tablist'
const tabList = document.querySelector('[role="tablist"]');
// Select all tab elements within the tab list
const tabs = tabList.querySelectorAll('[role="tab"]');

//* BUTTONS
// Select the button for the moon tab using aria-controls attribute
const btnMoon = document.querySelector('[aria-controls="moon-tab"]');
// Select the button for the mars tab using aria-controls attribute
const btnMars = document.querySelector('[aria-controls="mars-tab"]');
// Select the button for the europa tab using aria-controls attribute
const btnEuropa = document.querySelector('[aria-controls="europa-tab"]');
// Select the button for the titan tab using aria-controls attribute
const btnTitan = document.querySelector('[aria-controls="titan-tab"]');

//* IMAGES
// Select the image element for displaying the WebP format of the destination image
const imgWebp = document.getElementById('webp-image');
// Select the image element for displaying the PNG format of the destination image
const imgPng = document.getElementById('png-image');

//* PLANETS
// Select the element to display the destination name
const destName = document.getElementById('destination-name');
// Select the element to display the destination description
const destDescription = document.getElementById('destination-description');
// Select the element to display the average distance to the destination
const distance = document.getElementById('avg-distance');
// Select the element to display the travel time to the destination
const travelTime = document.getElementById('travel-time');

/*
~ ----------------------------------
~ DESTINATION TABS -- BUTTON FUNCTIONS
~ ----------------------------------
*/

//*-- PAGE CHANGE ON CLICK
// Define a function to change the displayed destination details when a tab is clicked
const pageChange_click = (destination) => {
    // Initialize the index for the destination array
    let destIndex = 0;

    // Determine the index based on the destination and update tab states
    switch (destination) {
        case 'moon':
            destIndex = 0; // Set index for moon
            btnMoon.ariaSelected = true; // Set moon button as selected
            btnMoon.focus(); // Focus on moon button
            // Set other buttons' aria-selected attribute to false
            btnMars.ariaSelected = btnEuropa.ariaSelected = btnTitan.ariaSelected = false;
            break;
        case 'mars':
            destIndex = 1; // Set index for mars
            btnMars.ariaSelected = true; // Set mars button as selected
            btnMars.focus(); // Focus on mars button
            btnMoon.ariaSelected = btnEuropa.ariaSelected = btnTitan.ariaSelected = false;
            break;
        case 'europa':
            destIndex = 2; // Set index for europa
            btnEuropa.ariaSelected = true; // Set europa button as selected
            btnEuropa.focus(); // Focus on europa button
            btnTitan.ariaSelected = btnMars.ariaSelected = btnMoon.ariaSelected = false;
            break;
        case 'titan':
            destIndex = 3; // Set index for titan
            btnTitan.ariaSelected = true; // Set titan button as selected
            btnTitan.focus(); // Focus on titan button
            btnMoon.ariaSelected = btnMars.ariaSelected = btnEuropa.ariaSelected = false;
    }

    // Update destination details
    destName.innerText = planets[destIndex].name; // Set destination name
    destDescription.innerText = planets[destIndex].description; // Set destination description
    distance.innerText = planets[destIndex].distance; // Set average distance
    travelTime.innerText = planets[destIndex].travel; // Set travel time

    // Update images for the selected destination
    imgWebp.srcset = planets[destIndex].images.webp; // Set WebP image source
    imgPng.src = planets[destIndex].images.png; // Set PNG image source
}

//*-- PAGE CHANGE ON KEY DOWN (KEYBOARD NAVIGATION)
// Define a function to change the displayed destination details when using keyboard navigation
const pageChange_keydown = (e) => {
    // Define key codes for left and right arrow keys
    const arrowLeft = "ArrowLeft";
    const arrowRight = "ArrowRight";
    const keyPressed = e.key; // Get the pressed key
    let currentTab = '';

    // Iterate through tabs to set tabindex and find the currently selected tab
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute("tabindex", 1); // Set tabindex to 1 for each tab
        if (tabs[i].ariaSelected === 'true') { // Check if the tab is selected
            currentTab = tabs[i]; // Set current tab
            currentTab.setAttribute("tabindex", 2); // Set tabindex to 2 for the selected tab
        }
    }

    // Handle left arrow key press
    if (keyPressed == arrowLeft) {
        if (!currentTab.previousElementSibling) { // Check if there is no previous sibling
            pageChange_click('titan'); // Change to titan tab
            return;
        }
        switch (currentTab.previousElementSibling.innerText) {
            case "MOON":
                pageChange_click('moon'); // Change to moon tab
                return;
            case "MARS":
                pageChange_click('mars'); // Change to mars tab
                return;
            case "EUROPA":
                pageChange_click('europa'); // Change to europa tab
        }
    }

    // Handle right arrow key press
    if (keyPressed == arrowRight) {
        if (!currentTab.nextElementSibling) { // Check if there is no next sibling
            pageChange_click('moon'); // Change to moon tab
            return;
        }

        switch (currentTab.nextElementSibling.innerText) {
            case "MARS":
                pageChange_click('mars'); // Change to mars tab
                return;
            case "EUROPA":
                pageChange_click('europa'); // Change to europa tab
                return;
            case "TITAN":
                pageChange_click('titan'); // Change to titan tab
        }
    }
}

/*
~ ----------------------------------
~ DESTINATION TABS -- FUNCTIONS ATTRIBUTIONS
~ ----------------------------------
*/

// Assign onclick functions to each button to change the page content
btnMoon.onclick = () => pageChange_click('moon'); // Change to moon tab on click
btnMars.onclick = () => pageChange_click('mars'); // Change to mars tab on click
btnEuropa.onclick = () => pageChange_click('europa'); // Change to europa tab on click
btnTitan.onclick = () => pageChange_click('titan'); // Change to titan tab on click

// Assign onkeydown function to the tab list for keyboard navigation
tabList.onkeydown = pageChange_keydown; // Change tab on keydown
