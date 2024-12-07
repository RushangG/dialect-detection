// Function to detect the dialect
function detectDialect() {
    const text = document.getElementById("textInput").value.toLowerCase();
    let result = "Unknown Dialect";

    // British English patterns
    const britishPatterns = ["colour", "favourite", "lift", "lorry", "flat"];
    
    // American English patterns
    const americanPatterns = ["color", "favorite", "elevator", "truck", "apartment"];

    // Australian English patterns
    const australianPatterns = ["mate", "arvo", "barbie", "brekkie", "thongs"];

    // Check for British patterns
    if (britishPatterns.some(word => text.includes(word))) {
        result = "British English";
    }
    // Check for American patterns
    else if (americanPatterns.some(word => text.includes(word))) {
        result = "American English";
    }
    // Check for Australian patterns
    else if (australianPatterns.some(word => text.includes(word))) {
        result = "Australian English";
    }

    // Display the result
    document.getElementById("result").innerText = `Detected Dialect: ${result}`;
}

// Function to fetch and populate the dropdown with country names
function populateCountryDropdown() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("countryDropdown");
            data.forEach(country => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.textContent = country.name.common;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching country data:", error));
}

// Function to fetch and display country info
function fetchCountryInfo() {
    const countryName = document.getElementById("countryDropdown").value;

    if (!countryName) {
        alert("Please select a country.");
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            const countryInfo = `
                <h3>${country.name.common}</h3>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Flag:</strong> <img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 50px; height: auto;"></p>
                <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
            `;

            document.getElementById("countryInfo").innerHTML = countryInfo;

            // Play voice (if available)
            if (countryName.toLowerCase() === "france") {
                document.getElementById("voiceSource").src = "assets/Hitch_1.mp3"; // Path to your local audio file
                document.getElementById("countryVoice").style.display = "block";
                document.getElementById("countryVoice").play();
            }
        })
        .catch(error => {
            console.error("Error fetching country info:", error);
            document.getElementById("countryInfo").innerText = "Failed to fetch country information.";
        });
}

// Initialize dropdown on page load
window.onload = function() {
    populateCountryDropdown();
};
