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
