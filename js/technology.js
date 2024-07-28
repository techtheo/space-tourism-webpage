//!LOAD JSON DATA

// Define a function to parse the response as JSON
function jsonify(response) {
    return response.json(); // Convert the response to JSON
}

// Define a function to log an error message to the console
function showError() {
    console.log('Page not found!'); // Print 'Page not found!' to the console
}

/*
~ ----------------------------------
~ TECH TABS -- CACHE ELEMENTS
~ ----------------------------------
*/

//* TAB LIST
// Select the tab list element with the role attribute 'tablist'
const tabList = document.querySelector('[role="tablist"]');
// Select all tab elements within the tab list
const tabs = tabList.querySelectorAll('[role="tab"]');

//* BUTTONS
// Select the button for the launch tab using aria-controls attribute
const btnLauncher = document.querySelector('[aria-controls="launch-tab"]');
// Select the button for the capsule tab using aria-controls attribute
const btnCapsule = document.querySelector('[aria-controls="capsule-tab"]');
// Select the button for the spaceport tab using aria-controls attribute
const btnSpaceport = document.querySelector('[aria-controls="spaceport-tab"]');

//* IMAGES
// Select the image element for displaying the technology picture
const techPicture = document.getElementById('tech-picture');
// Select the image element for displaying the technology image
const techImage = document.getElementById('tech-image');

//* TECH
// Select the element to display the technology name
const techName = document.getElementById('tech-name');
// Select the element to display the technology details
const techDetails = document.getElementById('tech-details');

/*
~ ----------------------------------
~ WINDOWS RESIZE FUNCTION
~ ----------------------------------
*/

// When the window finishes loading, execute the following code
window.onload = async () => {
    // Fetch data from the JSON file
    const dados = await fetch("./data.json")
        .then(jsonify)  // Convert the response to JSON
        .catch(showError);  // If there is an error, call showError()

    // If data fetching is successful, assign the technology array to the technology variable
    technology = dados.technology;
    // Uncomment to set the initial image source based on the screen size
    // if (window.matchMedia("(min-width: 51em)").matches) {
    //     techImage.src = "./assets/technology/image-launch-vehicle-portrait.jpg";
    // }
}

// When the window is resized, execute the following code
window.onresize = () => {
    // Initialize the index for the technology array
    let techIndex = -1;
    // Determine the index based on the selected tab
    if (btnLauncher.ariaSelected == 'true') {
        techIndex = 0; // Set index for launcher
    }

    if (btnSpaceport.ariaSelected == 'true') {
        techIndex = 1; // Set index for spaceport
    }

    if (btnCapsule.ariaSelected == 'true') {
        techIndex = 2; // Set index for capsule
    } 

    // Update the image source based on the screen size
    if (window.matchMedia("(min-width: 51em)").matches) {
        techPicture.srcset = technology[techIndex].images.portrait; // Set portrait image source
    } else {
        techImage.src = technology[techIndex].images.landscape; // Set landscape image source
    }
}

/*
~ ----------------------------------
~ TECH TABS -- BUTTON FUNCTIONS
~ ----------------------------------
*/

//*-- PAGE CHANGE ON CLICK
// Define a function to change the displayed technology details when a tab is clicked
const pageChange_click = (tech) => {
    // Initialize the index for the technology array
    let techIndex = 0;
    // Determine the index based on the technology type and update tab states
    switch (tech) {
        case 'launcher':
            techIndex = 0; // Set index for launcher
            btnLauncher.ariaSelected = true; // Set launcher button as selected
            btnLauncher.focus(); // Focus on launcher button
            // Set other buttons' aria-selected attribute to false
            btnCapsule.ariaSelected = btnSpaceport.ariaSelected = false;
            break;
        case 'spaceport':
            techIndex = 1; // Set index for spaceport
            btnSpaceport.ariaSelected = true; // Set spaceport button as selected
            btnSpaceport.focus(); // Focus on spaceport button
            btnLauncher.ariaSelected = btnCapsule.ariaSelected = false;
            break;
        case 'capsule':
            techIndex = 2; // Set index for capsule
            btnCapsule.ariaSelected = true; // Set capsule button as selected
            btnCapsule.focus(); // Focus on capsule button
            btnLauncher.ariaSelected = btnSpaceport.ariaSelected = false;
    }

    // Technology Details
    techName.innerText = technology[techIndex].name; // Set technology name
    techDetails.innerText = technology[techIndex].description; // Set technology details

    // Images
    if (window.matchMedia("(min-width: 51em)").matches) {
        techPicture.srcset = technology[techIndex].images.portrait; // Set portrait image source
    } else {
        techImage.src = technology[techIndex].images.landscape; // Set landscape image source
    }
}

//*-- PAGE CHANGE ON KEY PRESS (KEYBOARD NAVIGATION)
// Define a function to change the displayed technology details when using keyboard navigation
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
            pageChange_click('capsule'); // Change to capsule tab
            return;
        }

        switch (currentTab.previousElementSibling.innerText) {
            case "Numbered buttons\n1":
                pageChange_click('launcher'); // Change to launcher tab
                break;
            case "Numbered buttons\n2":
                pageChange_click('spaceport'); // Change to spaceport tab
        }
    }

    // Handle right arrow key press
    if (keyPressed == arrowRight) {
        if (!currentTab.nextElementSibling) { // Check if there is no next sibling
            pageChange_click('launcher'); // Change to launcher tab
            return;
        }

        switch (currentTab.nextElementSibling.innerText) {
            case "Numbered buttons\n2":
                pageChange_click('spaceport'); // Change to spaceport tab
                break;
            case "Numbered buttons\n3":
                pageChange_click('capsule'); // Change to capsule tab
        }
    }
}

/*
~ ----------------------------------
~ TECH TABS -- FUNCTION ATTRIBUTIONS
~ ----------------------------------
*/

// Assign onclick functions to each button to change the page content
btnLauncher.onclick = () => pageChange_click('launcher'); // Change to launcher tab on click
btnCapsule.onclick = () => pageChange_click('capsule'); // Change to capsule tab on click
btnSpaceport.onclick = () => pageChange_click('spaceport'); // Change to spaceport tab on click

// Assign onkeydown function to the tab list for keyboard navigation
tabList.onkeydown = pageChange_keydown; // Change tab on keydown
