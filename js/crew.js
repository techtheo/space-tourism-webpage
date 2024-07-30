// Define a variable to hold the crew data
let crew = [];

//!LOAD JSON DATA

// Fetch and load the crew data from JSON when the window finishes loading
window.onload = async () => {
    try {
        // Fetch the JSON data from the specified file
        const response = await fetch("./data.json");
        // Parse the response as JSON
        const dados = await response.json();
        // Assign the crew data to the crew variable
        crew = dados.crew;
    } catch {
        // Log an error message if there is a problem with fetching or parsing the data
        console.log('Page not found!');
    }
};

//* CACHE ELEMENTS
// Cache the tab list element which contains all the tab buttons
const tabList = document.querySelector('[role="tablist"]');
// Cache all tab elements within the tab list
const tabs = tabList.querySelectorAll('[role="tab"]');
// Cache buttons for each crew role with aria-controls attribute
const btns = {
    commander: document.querySelector('[aria-controls="commander-tab"]'),
    specialist: document.querySelector('[aria-controls="specialist-tab"]'),
    pilot: document.querySelector('[aria-controls="pilot-tab"]'),
    engineer: document.querySelector('[aria-controls="engineer-tab"]')
};
// Cache the image elements for displaying crew member images in different formats
const imgWebp = document.getElementById('webp-image');
const imgPng = document.getElementById('png-image');
// Cache elements for displaying crew member details
const crewRole = document.getElementById('crew-role');
const crewName = document.getElementById('crew-name');
const crewDetails = document.getElementById('crew-details');

//* TAB FUNCTIONALITY

// Function to update the crew information displayed on the page
const updateCrewInfo = (index) => {
    // Set the text content of elements to display the current crew member's role, name, and bio
    crewRole.innerText = crew[index].role;
    crewName.innerText = crew[index].name;
    crewDetails.innerText = crew[index].bio;
    // Update image sources for the current crew member
    imgWebp.srcset = crew[index].images.webp;
    imgPng.src = crew[index].images.png;
};

// Function to handle page changes based on the selected crew member
const pageChange = (member) => {
    // Find the index of the crew member based on their role
    const index = ["commander", "specialist", "pilot", "engineer"].indexOf(member);
    // Return early if the member is not found
    if (index === -1) return;

    // Update the aria-selected attribute for all tabs to 'false'
    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
    // Set the aria-selected attribute of the selected button to 'true'
    btns[member].setAttribute('aria-selected', 'true');
    // Call updateCrewInfo to display the selected crew member's details
    updateCrewInfo(index);
};

// Event listener for keyboard navigation within the tab list
// Handle keyboard navigation for tabs
tabList.onkeydown = (e) => {
    // Find the currently selected tab
    const currentTab = Array.from(tabs).find(tab => tab.getAttribute('aria-selected') === 'true');
    
    // Return if no tab is currently selected
    if (!currentTab) return;

    // Function to find the next or previous tab element
    const moveToNextTab = (next) => next ? currentTab.nextElementSibling : currentTab.previousElementSibling;

    // Handle left arrow key press
    if (e.key === "ArrowLeft") {
        // Move to the previous tab or default to 'engineer' if at the start
        pageChange(moveToNextTab(false)?.innerText.split(' ')[1].toLowerCase() || 'engineer');
    }
    // Handle right arrow key press
    else if (e.key === "ArrowRight") {
        // Move to the next tab or default to 'commander' if at the end
        pageChange(moveToNextTab(true)?.innerText.split(' ')[1].toLowerCase() || 'commander');
    }
};

// Assign click event handlers to each button to change the page content when clicked
Object.keys(btns).forEach(role => {
    btns[role].onclick = () => pageChange(role);
});
