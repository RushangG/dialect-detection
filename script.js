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

// Function to fetch country info
function fetchCountryInfo(countryName) {
    // Use the Restcountries API to fetch country data
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            // Grab the first country result from the response
            const country = data[0];
            
            // Display country information
            const countryInfo = `
                <h3>${country.name.common}</h3>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Flag:</strong> <img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 50px; height: auto;"></p>
                <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
            `;

            document.getElementById("countryInfo").innerHTML = countryInfo;
        })
        .catch(error => {
            console.error("Error fetching country info:", error);
            document.getElementById("countryInfo").innerText = "Failed to fetch country information.";
        });
}

// Example: Call the function when a country name is input
document.getElementById("countrySearchButton").addEventListener("click", function() {
    const countryName = document.getElementById("countryNameInput").value.trim();
    if (countryName) {
        fetchCountryInfo(countryName);
    } else {
        document.getElementById("countryInfo").innerText = "Please enter a country name.";
    }
});
