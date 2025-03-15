// Grapping The Elements
let text = document.getElementById("myText");
let displayChars = document.getElementById("char-show");
let displayWords = document.getElementById("word-show");


// Event To Calculate Total Characters & Words
text.addEventListener("input", () => {

    let content = text.value;
    let specialCharacters = [
        "!", "#", "$", "%", "&", "'", "(", ")", "*",
        "+", ",", "-", ".", "/", ":", ";", "<", "=",
        ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
    ]

    // For Total Characters
    var totalChars = 0;
    for (let chars of content) {
        // Ignore line breaks and count only non-space, non-special characters
        if (chars !== " " && chars !== "\n" && !specialCharacters.includes(chars)) {
            totalChars += 1;
        }
    }

    // For Total Words:
    // Remove Line Breaks And Split Into Words
    const words = content.replace(/\n/g, ' ').split(/\s+/);
    let totalWords = 0;
    for (let word of words) {
        // Check If Word Is Not Empty And Does Not Consist Only Of Special Characters
        if (word !== "" && !specialCharacters.includes(word)) {
            let isSpecialOnly = true;
            for (let char of word) {
                if (!specialCharacters.includes(char)) {
                    isSpecialOnly = false;
                    break;
                }
            }
            if (!isSpecialOnly) {
                totalWords += 1;
            }
        }
    }

    // Displaying Total Characters And Words
    displayChars.innerText = totalChars;
    displayWords.innerText = totalWords;
});



// Function To Convert The Text To UPPERCASE Form
const upper_case = () => {
    // Apply UPPERCASE Function
    text.value = text.value.toUpperCase();

    // Returning The Text 
    return text.value;
}


// Function To Convert The Text To lowercase Form
const lower_case = () => {
    // Apply lowercase Function
    text.value = text.value.toLowerCase();

    // Returning The Text 
    return text.value;
}


// Function To Capitalize The Text
const capitalize = () => {
    let content = text.value;
    let lines = content.split('\n');

    // Capitalize each line
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(/\s+/);
        for (let j = 0; j < words.length; j++) {
            if (words[j] !== "") {
                words[j] = words[j][0].toUpperCase() + words[j].slice(1).toLowerCase();
            }
        }
        lines[i] = words.join(' ');
    }

    // Join the lines back with line breaks
    let capitalizedText = lines.join('\n');

    // Update the text area with the modified text
    text.value = capitalizedText;
    return capitalizedText;
}



// Function For Copy Text Functionality
const copy = () => {
    // Check If The Clipboard Api Is Available
    if (navigator.clipboard) {

        // Copy The Text Inside The Text Field
        navigator.clipboard.writeText(text.value)
            .then(() => {
                // Alert The Copied Text
                alert("Text Copied!!");
            })
            .catch((error) => {
                console.error("Error copying text: ", error);
                alert("Failed to copy text. Please try again.");
            });
    }

    else {
        // Fallback for older browsers
        // Select the text field
        text.select();
        text.setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand("copy");
            alert("Text Copied!!");
        } catch (error) {
            console.error("Error copying text: ", error);
            alert("Failed to copy text. Please try again.");
        }
    }
};