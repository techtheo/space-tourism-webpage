// Define a variable to hold the crew data
let crew = [];

//!LOAD JSON DATA

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

    // If data fetching is successful, assign the crew array to the crew variable
    crew = dados.crew;
}

/*
~ ----------------------------------
~ CREW TABS -- CACHE ELEMENTS
~ ----------------------------------
*/

//* TAB LIST
// Select the tab list element with the role attribute 'tablist'
const tabList = document.querySelector('[role="tablist"]');
// Select all tab elements within the tab list
const tabs = tabList.querySelectorAll('[role="tab"]');

//* BUTTONS
// Select the button for the commander tab using aria-controls attribute
const btnCommander = document.querySelector('[aria-controls="commander-tab"]');
// Select the button for the specialist tab using aria-controls attribute
const btnSpecialist = document.querySelector('[aria-controls="specialist-tab"]');
// Select the button for the pilot tab using aria-controls attribute
const btnPilot = document.querySelector('[aria-controls="pilot-tab"]');
// Select the button for the engineer tab using aria-controls attribute
const btnEngineer = document.querySelector('[aria-controls="engineer-tab"]');

//* IMAGES
// Select the image element for displaying the WebP format of the crew member image
const imgWebp = document.getElementById('webp-image');
// Select the image element for displaying the PNG format of the crew member image
const imgPng = document.getElementById('png-image');

//* CREW
// Select the element to display the crew member's role
const crewRole = document.getElementById('crew-role');
// Select the element to display the crew member's name
const crewName = document.getElementById('crew-name');
// Select the element to display the crew member's bio
const crewDetails = document.getElementById('crew-details');

/*
~ ----------------------------------
~ CREW TABS -- BUTTON FUNCTIONS
~ ----------------------------------
*/

//*-- PAGE CHANGE ON CLICK
// Define a function to change the displayed crew details when a tab is clicked
const pageChange_click = (member) => {
    // Initialize the index for the crew array
    crewIndex = 0;
    // Determine the index based on the crew member and update tab states
    switch (member) {
        case 'commander':
            crewIndex = 0; // Set index for commander
            btnCommander.ariaSelected = true; // Set commander button as selected
            btnCommander.focus(); // Focus on commander button
            // Set other buttons' aria-selected attribute to false
            btnSpecialist.ariaSelected = btnPilot.ariaSelected = btnEngineer.ariaSelected = false;
            break;
        case 'specialist':
            crewIndex = 1; // Set index for specialist
            btnSpecialist.ariaSelected = true; // Set specialist button as selected
            btnSpecialist.focus(); // Focus on specialist button
            btnCommander.ariaSelected = btnPilot.ariaSelected = btnEngineer.ariaSelected = false;
            break;
        case 'pilot':
            crewIndex = 2; // Set index for pilot
            btnPilot.ariaSelected = true; // Set pilot button as selected
            btnPilot.focus(); // Focus on pilot button
            btnCommander.ariaSelected = btnEngineer.ariaSelected = btnSpecialist.ariaSelected = false;
            break;
        case 'engineer':
            crewIndex = 3; // Set index for engineer
            btnEngineer.ariaSelected = true; // Set engineer button as selected
            btnEngineer.focus(); // Focus on engineer button
            btnCommander.ariaSelected = btnSpecialist.ariaSelected = btnPilot.ariaSelected = false;
    }

    // Crew Details
    crewRole.innerText = crew[crewIndex].role; // Set crew member role
    crewName.innerText = crew[crewIndex].name; // Set crew member name
    crewDetails.innerText = crew[crewIndex].bio; // Set crew member bio

    // Images
    imgWebp.srcset = crew[crewIndex].images.webp; // Set WebP image source
    imgPng.src = crew[crewIndex].images.png; // Set PNG image source
}

//*-- PAGE CHANGE ON KEY PRESS (KEYBOARD NAVIGATION)
// Define a function to change the displayed crew details when using keyboard navigation
const pageChange_keydown = (e) => {
    // Define key codes for left and right arrow keys
    const arrowLeft = "ArrowLeft";
    const arrowRight = "ArrowRight";
    const keyPressed = e.key; // Get the pressed key
    let currentTab = '';

    // Iterate through tabs to set tabindex and find the currently selected tab
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute('tabindex', 1); // Set tabindex to 1 for each tab
        if (tabs[i].ariaSelected === 'true') { // Check if the tab is selected
            currentTab = tabs[i]; // Set current tab
            currentTab.setAttribute('tabindex', 2); // Set tabindex to 2 for the selected tab
        }
    }

    // Handle left arrow key press
    if (keyPressed == arrowLeft) {
        if (!currentTab.previousElementSibling) { // Check if there is no previous sibling
            pageChange_click('engineer'); // Change to engineer tab
            return;
        }

        switch (currentTab.previousElementSibling.innerText) {
            case "The Commander":
                pageChange_click('commander'); // Change to commander tab
                return;
            case "The Mission Specialist":
                pageChange_click('specialist'); // Change to specialist tab
                return;
            case "The Pilot":
                pageChange_click('pilot'); // Change to pilot tab
        }
    }

    // Handle right arrow key press
    if (keyPressed == arrowRight) {
        if (!currentTab.nextElementSibling) { // Check if there is no next sibling
            pageChange_click('commander'); // Change to commander tab
            return;
        }

        switch (currentTab.nextElementSibling.innerText) {
            case "The Mission Specialist":
                pageChange_click('specialist'); // Change to specialist tab
                return;
            case "The Pilot":
                pageChange_click('pilot'); // Change to pilot tab
                return;
            case "The Engineer":
                pageChange_click('engineer'); // Change to engineer tab
        }
    }
}

/*
~ ----------------------------------
~ CREW TABS -- FUNCTIONS ATTRIBUTIONS
~ ----------------------------------
*/

// Assign onclick functions to each button to change the page content
btnCommander.onclick = () => pageChange_click('commander'); // Change to commander tab on click
btnSpecialist.onclick = () => pageChange_click('specialist'); // Change to specialist tab on click
btnPilot.onclick = () => pageChange_click('pilot'); // Change to pilot tab on click
btnEngineer.onclick = () => pageChange_click('engineer'); // Change to engineer tab on click

// Assign onkeydown function to the tab list for keyboard navigation
tabList.onkeydown = pageChange_keydown; // Change tab on keydown
