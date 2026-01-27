const getLinkBtn = document.getElementById('getLinkBtn');
const resultDiv = document.getElementById('result');

const addForm = document.getElementById('addForm'); // Get the new form
const newLinkInput = document.getElementById('newLinkInput');
const addResultDiv = document.getElementById('addResult');


// Timer handle (Global)
let addMsgTimer = null;

// 👇 NEW: Helper function to show message and auto-hide it
const showFeedback = (htmlContent) => {
    // 1. Set the text
    addResultDiv.innerHTML = htmlContent;

    // 2. Cancel any existing timer (if the user clicks fast)
    if (addMsgTimer) clearTimeout(addMsgTimer);

    // 3. Start a new 5-second timer to clear the text
    addMsgTimer = setTimeout(() => {
        addResultDiv.innerHTML = '';
        addMsgTimer = null;
    }, 5000);
};

// --- 1. GET A LINK (Generates a 3D Button) ---
const getLink = async () => {
    // Show loading text momentarily
    resultDiv.innerHTML = '<p style="color:#aaa">Searching...</p>';
    
    try {
        const response = await fetch('/api/random');
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        // CLEAR previous result
        resultDiv.innerHTML = '';

        // CREATE the new 3D Button dynamically
        const linkButton = document.createElement('a');
        linkButton.href = data.url;
        linkButton.target = '_blank'; // Open in new tab
        linkButton.innerText = "🚀 Visit Website";
        linkButton.className = "btn-3d btn-gold"; // Add the Gold 3D styles
        
        // Append to the DOM
        resultDiv.appendChild(linkButton);

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color:#ef4444'>❌ Error fetching link.</p>";
    }
}

// Attach click handler after function is defined
getLinkBtn.addEventListener('click', getLink);

// --- 2. ADD A LINK (Smart Feedback) ---
addForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    const url = newLinkInput.value;

    if (!url) {
        showFeedback("<p style='color:#f59e0b'>Please paste a URL first!</p>");
        return;
    }

    showFeedback("<p style='color:#aaa'>Adding...</p>");

    try {
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (response.ok) {
            // Success Message (auto-clear after 5s)
            showFeedback("<p style='color:#10b981'>✅ Added! Thanks for swapping.</p>");

            // If it was a duplicate, maybe log it to console (optional)
            if (data.isDuplicate) {
                console.log("This domain was already in the DB, so we skipped the insert.");
            }

            newLinkInput.value = ""; // Clear input

            await getLink(); // Refresh the displayed link
        } else {
            showFeedback(`<p style='color:#ef4444'>❌ ${data.error || 'Failed'}</p>`);
        }
    } catch (error) {
        console.error(error);
        showFeedback("<p style='color:#ef4444'>❌ Server error.</p>");
    }
});