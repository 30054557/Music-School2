
// Select the navigation menu button
const menuToggle = document.getElementById("menu-toggle");

// Select the navigation links
const navLinks = document.getElementById("nav-links");

// Only add the click event if both elements exist
if (menuToggle && navLinks) {

    // Add a click event to the menu button
    menuToggle.addEventListener("click", function() {

        // Show or hide the navigation menu
        navLinks.classList.toggle("show");

        // Update the accessibility state
        const isExpanded = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isExpanded);

    });

}


// Find the container where I want the class cards displayed
const classesGrid = document.querySelector(".classes-grid");

// Only load the JSON file if this page has a classes grid
if (classesGrid) {

    // Load the class information from my JSON file
    fetch("classes.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(classes) {

            // Create a card for each class in the JSON file
            classes.forEach(function(classItem) {

                // Add the class information to the page
                classesGrid.innerHTML += `
                    <div class="class-card" data-instrument="${classItem.instrument}">

                        <div class="class-image">
                            <img src="${classItem.image}" alt="${classItem.alt}">
                        </div>

                        <div class="class-content">

                            <h3>${classItem.name}</h3>

                            <p>${classItem.description}</p>

                            <div class="class-details">
                                <p><strong>Level:</strong> ${classItem.level}</p>
                                <p><strong>Duration:</strong> ${classItem.duration}</p>
                                <p><strong>Price:</strong> ${classItem.price}</p>
                            </div>

                            <a href="contact.html" class="btn btn-primary">
                                Enquire Now
                            </a>

                        </div>
                    </div>
                `;
            });

            // Set up the search after the cards have been created
            setupClassSearch();

        })
        .catch(function(error) {
            // Display an error if the JSON file cannot be loaded
            console.error("There was a problem loading the classes:", error);
        });

}


// Search and filter the classes
function setupClassSearch() {

    const classSearch = document.getElementById("classSearch");
    const instrumentFilter = document.getElementById("instrumentFilter");

    // Get all the class cards created from the JSON file
    const classCards = document.querySelectorAll(".class-card");

    // Check which cards match the search
    function filterClasses() {

        const searchText = classSearch.value.toLowerCase();
        const selectedInstrument = instrumentFilter.value;

        classCards.forEach(function(card) {

            const instrument = card.dataset.instrument;
            const cardText = card.textContent.toLowerCase();

            const matchesSearch = cardText.includes(searchText);

            const matchesInstrument =
                selectedInstrument === "all" ||
                instrument === selectedInstrument;

            // Show or hide the card depending on the filters
            if (matchesSearch && matchesInstrument) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    }

    // Run the search when someone types or changes the dropdown
    classSearch.addEventListener("input", filterClasses);
    instrumentFilter.addEventListener("change", filterClasses);
}


// Get the theme button from the page
const themeToggle = document.getElementById("theme-toggle");

// Check which theme the visitor used previously
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme when the page loads
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Update the button to match the current theme
if (themeToggle) {

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }

    // Switch themes when the button is clicked
    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        // Check whether dark mode is now active
        const isDarkMode = document.body.classList.contains("dark-mode");

        // Save the visitor's choice
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
        }

    });
}
