// public/script.js
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

spinBtn.addEventListener('click', async () => {
    resultDiv.innerText = "Spinning...";
    
    try {
        // Fetch from your backend API
        const response = await fetch('http://localhost:3000/api/random');
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        
        // Show the link
        resultDiv.innerHTML = `Winner: <a href="${data.url}" target="_blank">${data.url}</a>`;

    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerText = "❌ Error! Check your Console (F12).";
    }
});