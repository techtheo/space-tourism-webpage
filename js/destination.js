// Define a variable and initialize it with an empty array to hold the planets data
let planets = [];

// Define a function to convert the response to JSON format
async function jsonify(response) {
    return response.json(); // Return the JSON-parsed response
}

// Define a function to log an error message to the console
function showError() {
    console.error('Page not found!'); // Log 'Page not found!' to the console
}

// When the window finishes loading, execute the following code
window.onload = async () => {
    try {
        // Fetch data from the JSON file and assign it to the planets variable
        const dados = await fetch("./data.json").then(jsonify);
        planets = dados ? dados.destinations : [];
    } catch {
        showError(); // If there is an error, call showError()
    }
};


// ~ NOTE 👀 ~ \\

// This line sets up an event handler for the load event on the window object. The window.onload event is fired when the entire page (including all dependent resources like images and stylesheets) has fully loaded. The handler is an asynchronous function  that allows the use of await inside it. 

// The fetch function is called with the path to the JSON file ("./data.json"). This function returns a promise that resolves to the Response object representing the HTTP response.

// .then(jsonify) is a shorthand for .then(response => jsonify(response)). In JavaScript, if you pass a function reference (like jsonify) without parentheses, it means the function will be called with the arguments provided by the preceding promise.
// SUMMARY 🤦‍♂️😢)===>>>>
//  .then(jsonify) is a shorthand way to use the jsonify function as a callback in the .then() method.

// .catch(showError) method sets up an error handler. If any error occurs during the fetch operation or JSON parsing, the showError function is called, logging "Page not found!" to the console.

// ( planets = dados ? dados.destinations : [];) This assigns the value of dados.destinations to the planets variable if dados is truthy (i.e., not null or undefined). If dados is falsy, an empty array is assigned to planets. This line essentially checks if the data fetching was successful and then safely assigns the desired data.


// NOTE CLOSE 👏 \\



//* TAB LIST
// Select the tab list element with the role attribute 'tablist'
const tabList = document.querySelector('[role="tablist"]');
// Select all tab elements within the tab list
const tabs = document.querySelectorAll('[role="tab"]');

//* BUTTONS
// Define an object to store the buttons for each destination tab
const buttons = {
    moon: document.querySelector('[aria-controls="moon-tab"]'),
    mars: document.querySelector('[aria-controls="mars-tab"]'),
    europa: document.querySelector('[aria-controls="europa-tab"]'),
    titan: document.querySelector('[aria-controls="titan-tab"]')
};

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

// Define a function to update the displayed destination details
function updateDestination(destIndex) {
    // Update destination name, description, distance, and travel time
    destName.innerText = planets[destIndex].name;
    destDescription.innerText = planets[destIndex].description;
    distance.innerText = planets[destIndex].distance;
    travelTime.innerText = planets[destIndex].travel;

    // Update images for the selected destination
    imgWebp.srcset = planets[destIndex].images.webp;
    imgPng.src = planets[destIndex].images.png;
}

// Define a function to set the active tab
function setActiveTab(button) {
    // Set all buttons' aria-selected attribute to false
    for (let btn in buttons) buttons[btn].ariaSelected = false;
    button.ariaSelected = true; // Set the selected button's aria-selected attribute to true
    button.focus(); // Focus on the selected button
}

// Define a function to change the displayed destination details when a tab is clicked
const pageChange_click = (destination) => {
    // Map the destination to its index in the planets array
    const destIndex = {
        moon: 0,
        mars: 1,
        europa: 2,
        titan: 3
    }[destination];

    // Update the UI with the new destination details
    updateDestination(destIndex);
    setActiveTab(buttons[destination]);
};

// Define a function to change the displayed destination details when using keyboard navigation
tabList.onkeydown = (e) => {    // assigned an anonymous function that takes an event object (e) as its parameter. This event object contains information about the keyboard event, including which key was pressed.

    // Define the order of tabs
    const order = ['moon', 'mars', 'europa', 'titan'];
    // Find the currently selected tab
    const currentTab = order.find(tab => buttons[tab].ariaSelected === 'true'); // Identifies the currently selected tab by checking the ariaSelected attribute.
    // Get the index of the current tab
    const currentIndex = order.indexOf(currentTab); // Determines the index of the current tab and calculates the new index based on the arrow key pressed.

    // Handle left arrow key press
    if (e.key === "ArrowLeft") {  // Moves to the previous tab, wrapping around to the last tab if at the beginning.
        pageChange_click(order[(currentIndex - 1 + order.length) % order.length]);  // to update the displayed content based on the new tab selection.
    }   

    // Handle right arrow key press
    else if (e.key === "ArrowRight") { // Moves to the next tab, wrapping around to the first tab if at the end.
        pageChange_click(order[(currentIndex + 1) % order.length]);  // to update the displayed content based on the new tab selection.
    }  
};

// Assign onclick functions to each button to change the page content
buttons.moon.onclick = () => pageChange_click('moon');
buttons.mars.onclick = () => pageChange_click('mars');
buttons.europa.onclick = () => pageChange_click('europa');
buttons.titan.onclick = () => pageChange_click('titan');

// ~ NOTE ~ \\

// The window.onload event is fired when the entire page (including all dependent resources like images and stylesheets) has fully loaded. The handler is an asynchronous function that allows the use of await inside it. It attempts to fetch data from a JSON file and populate the planets array. If an error occurs during this process, the showError function is called.

// The updateDestination function updates the UI elements with the relevant details of the selected destination, while setActiveTab sets the appropriate tab as active and focuses on it. The pageChange_click function is called when a tab is clicked and triggers the update of destination details.

// The tabList.onkeydown function handles keyboard navigation. It allows users to navigate between tabs using the left and right arrow keys. The index of the current tab is determined, and the corresponding destination is displayed based on the key pressed.

// Each destination button (moon, mars, europa, titan) is assigned an onclick event handler that triggers the pageChange_click function with the corresponding destination name. This enables changing the content displayed when a specific tab is clicked.

// NOTE CLOSE \\ 
