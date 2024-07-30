// Define a variable to hold the technology data
let technology = [];

//!LOAD JSON DATA

// Fetch and load the technology data from JSON when the window finishes loading
window.onload = async () => {
    try {
        // Fetch the JSON data from the specified file
        const response = await fetch("./data.json");
        // Parse the response as JSON
        const dados = await response.json();
        // Assign the technology data to the technology variable
        technology = dados.technology;
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
// Cache buttons for each technology tab with aria-controls attribute
const btns = {
    launcher: document.querySelector('[aria-controls="launch-tab"]'),
    capsule: document.querySelector('[aria-controls="capsule-tab"]'),
    spaceport: document.querySelector('[aria-controls="spaceport-tab"]')
};
// Cache elements for displaying technology images in different formats
const techPicture = document.getElementById('tech-picture');
const techImage = document.getElementById('tech-image');
// Cache elements for displaying technology name and details
const techName = document.getElementById('tech-name');
const techDetails = document.getElementById('tech-details');

//* TAB FUNCTIONALITY

// Function to update the technology information displayed on the page
const updateTechInfo = (index) => {
    // Set the text content of elements to display the current technology's name and description
    techName.innerText = technology[index].name;
    techDetails.innerText = technology[index].description;
    // Update image sources based on the screen size
    if (window.matchMedia("(min-width: 51em)").matches) {
        // If the screen width is at least 51em, set the srcset for portrait images
        techPicture.srcset = technology[index].images.portrait;
    } else {
        // If the screen width is less than 51em, set the src for landscape images
        techImage.src = technology[index].images.landscape;
    }
};

// Function to handle page changes based on the selected technology tab
const pageChange = (tech) => {
    // Find the index of the technology based on the tab's role
    const index = ["launcher", "spaceport", "capsule"].indexOf(tech);
    // Return early if the technology is not found
    if (index === -1) return;
    
    // Update the aria-selected attribute for all tabs to 'false'
    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
    // Set the aria-selected attribute of the selected button to 'true'
    btns[tech].setAttribute('aria-selected', 'true');
    // Call updateTechInfo to display the selected technology's details
    updateTechInfo(index);
};

// Event listener for keyboard navigation within the tab list
tabList.onkeydown = (e) => {
    // Find the currently selected tab
    const currentTab = Array.from(tabs).find(tab => tab.getAttribute('aria-selected') === 'true');
    // Return early if no tab is selected
    if (!currentTab) return;

    // Function to find the next or previous tab element
    const moveToNextTab = (next) => next ? currentTab.nextElementSibling : currentTab.previousElementSibling;

    // Handle left arrow key press
    if (e.key === "ArrowLeft") {
        // Change to the previous tab, or to 'capsule' if at the start
        pageChange(moveToNextTab(false)?.innerText.split('\n')[1].toLowerCase() || 'capsule');
    }
    // Handle right arrow key press
    else if (e.key === "ArrowRight") {
        // Change to the next tab, or to 'launcher' if at the end
        pageChange(moveToNextTab(true)?.innerText.split('\n')[1].toLowerCase() || 'launcher');
    }
};

// Assign click event handlers to each button to change the page content when clicked
Object.keys(btns).forEach(role => {
    btns[role].onclick = () => pageChange(role);
});

// Update images on window resize to ensure the correct images are displayed
window.onresize = () => {
    // Find the currently selected tab
    const currentTech = Array.from(tabs).find(tab => tab.getAttribute('aria-selected') === 'true');
    // If a tab is selected, update the technology information to match the current tab
    if (currentTech) pageChange(currentTech.innerText.split('\n')[1].toLowerCase());
};


// ~ NOTE ~ \\

// The line of code checks if a valid tab is currently selected. If so, it retrieves the second part of the tab’s text content (after splitting by newlines), converts it to lowercase, and passes it to the pageChange function. This process ensures that the page updates to reflect the currently selected tab, even when the window is resized, preserving the user’s context.

