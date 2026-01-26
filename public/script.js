const getLinkBtn = document.getElementById('getLinkBtn');
const resultDiv = document.getElementById('result');

const addLinkBtn = document.getElementById('addLinkBtn');
const newLinkInput = document.getElementById('newLinkInput');
const addResultDiv = document.getElementById('addResult');

// --- 1. GET A LINK (Discover) ---
getLinkBtn.addEventListener('click', async () => {
    resultDiv.innerHTML = "Searching...";
    
    try {
        const response = await fetch('http://localhost:3000/api/random');
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        resultDiv.innerHTML = `Go to: <a href="${data.url}" target="_blank">${data.url}</a>`;
    } catch (error) {
        console.error(error);
        resultDiv.innerText = "❌ Error fetching link.";
    }
});

// --- 2. ADD A LINK (Contribute) ---
addLinkBtn.addEventListener('click', async () => {
    const url = newLinkInput.value;

    // Simple check to ensure it's not empty
    if (!url) {
        addResultDiv.innerText = "Please paste a URL first!";
        return;
    }

    addResultDiv.innerText = "Adding...";

    try {
        const response = await fetch('http://localhost:3000/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        if (response.ok) {
            addResultDiv.innerText = "✅ Link added! Thanks for swapping.";
            newLinkInput.value = ""; // Clear the box
        } else {
            addResultDiv.innerText = "❌ Failed to add.";
        }
    } catch (error) {
        console.error(error);
        addResultDiv.innerText = "❌ Server error.";
    }
});