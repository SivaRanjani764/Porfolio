console.log("Script is loaded!");

// Select the menu icon and the navigation bar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Add an event listener to the menu icon to toggle the navigation bar
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Toggle the "X" icon when menu is opened/closed
    navbar.classList.toggle('active'); // Show/hide the navigation bar
};

// Select all sections on the page
let sections = document.querySelectorAll('section');

// Select all navigation links inside the <nav> within the <header>
let navLinks = document.querySelectorAll('header nav a');

// Select the header
let header = document.querySelector('.header');

// Add an event listener to detect when the user scrolls the page
window.onscroll = () => {
    console.log("Scrolling..."); // Check if scrolling is detected

    // Sticky Header Logic
    if (header) {
        console.log(header); // Debugging: Should not be null
        header.classList.toggle('sticky', window.scrollY > 100); // Add 'sticky' class if scrolled past 100px
    }

    // Loop through each section to determine which one is currently in view
    sections.forEach(sec => {
        let top = window.scrollY; // Get the current vertical scroll position
        let offset = sec.offsetTop - 100; // Section position from the top (adjusted for better visibility)
        let height = sec.offsetHeight; // Height of the current section
        let id = sec.getAttribute('id'); // Get the section's ID (e.g., "about", "services") to match with nav links

        // Check if the user has scrolled into this section
        if (top >= offset && top < offset + height) {
            // Remove "active" class from all navigation links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            // Find the corresponding <a> tag in the navigation menu and add the "active" class
            let activeLink = document.querySelector(`header nav a[href*='${id}']`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // Close the navbar when a navigation link is clicked (for mobile view)
    menuIcon.classList.remove('bx-x'); // Remove 'X' icon to revert to the menu icon
    navbar.classList.remove('active'); // Hide the navbar
};
// function toggleContent() {
//     let content = document.getElementById("eduContent");
//     let btn = document.querySelector(".show-more-btn");
//     if (content.classList.contains("show")) {
//         content.classList.remove("show");
//         btn.innerText = "Show More";
//     } else {
//         content.classList.add("show");
//         btn.innerText = "Show Less";
//     }
// };
    function toggleContent(event) {
        // Get the button that was clicked
        let btn = event.target;

        // Find the parent div containing the button and the paragraph content
        let parent = btn.closest(".content");

        // Get the hidden paragraph content (inside <span class="more-text">)
        let moreText = parent.querySelector(".more-text");

        // If the clicked section is already open, close it
        if (moreText.style.display === "inline") {
            moreText.style.display = "none"; // Hide the expanded content
            btn.innerText = " Show More"; // Change button text back to "Show More"
            return; // Stop execution here (other sections remain unchanged)
        }

        // Hide all expanded sections before opening the new one
        document.querySelectorAll(".more-text").forEach(more => {
            more.style.display = "none"; // Hide all expanded content
        });

        // Reset all buttons to "Show More"
        document.querySelectorAll(".show-more-btn").forEach(button => {
            button.innerText = " Show More"; // Reset button text
        });

        // Expand the clicked section
        moreText.style.display = "inline"; // Show the content
        btn.innerText = " Show Less"; // Change button text to "Show Less"
    }

    // Add event listeners to all "Show More" buttons when the page loads
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".show-more-btn").forEach(btn => {
            btn.addEventListener("click", toggleContent); // Attach toggleContent() function to each button
        });
    });
