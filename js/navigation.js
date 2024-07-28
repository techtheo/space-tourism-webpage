/*
~ -----------------
~ NAVIGATION
~ -----------------
*/

// Select the mobile navigation toggle button element
const navToggle = document.querySelector('.mobile-nav-toggle');
// Select the primary navigation element
const nav = document.querySelector('.primary-navigation');

// Add a click event listener to the navigation toggle button
navToggle.addEventListener('click', () => {
    // Get the current visibility state of the navigation from the data-visible attribute
    const visibility = nav.getAttribute('data-visible');
    
    // Check if the navigation is currently hidden
    if (visibility === 'false') {
        // If hidden, move the navigation into view by translating it on the X-axis
        nav.style.transform = 'translateX(0%)';
        // Change the toggle button's background image to a close icon
        navToggle.style.backgroundImage = "url('./assets/shared/icon-close.svg')";
        // Set the data-visible attribute of the navigation to true
        nav.setAttribute('data-visible', true);
        // Set the aria-expanded attribute of the toggle button to true for accessibility
        navToggle.firstChild.setAttribute('aria-expanded', 'true');
    } else {
        // If visible, move the navigation out of view by translating it on the X-axis
        nav.style.transform = 'translateX(100%)';
        // Change the toggle button's background image to a hamburger icon
        navToggle.style.backgroundImage = "url('./assets/shared/icon-hamburger.svg')";
        // Set the data-visible attribute of the navigation to false
        nav.setAttribute('data-visible', false);
        // Set the aria-expanded attribute of the toggle button to false for accessibility
        navToggle.firstChild.setAttribute('aria-expanded', 'false');
    }
});
