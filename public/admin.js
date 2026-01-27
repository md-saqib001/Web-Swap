// public/admin.js

const tableBody = document.getElementById('linksTable');

// 1. Fetch and Display Links
async function loadLinks() {
    // Show a loading state
    tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#94a3b8;">Loading data...</td></tr>';

    try {
        const res = await fetch('/api/admin/links');
        if (!res.ok) throw new Error("Failed");

        const links = await res.json();

        // Handle empty database
        if (links.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 30px;">No links found yet!</td></tr>';
            return;
        }

        tableBody.innerHTML = links.map(link => `
            <tr id="row-${link.id}">
                <td style="color: #64748b;">#${link.id}</td>
                <td>
                    <a href="${link.url}" target="_blank" class="link-url">
                        ${link.url}
                    </a>
                </td>
                <td>
                    <button class="btn-delete" onclick="deleteLink(${link.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');

    } catch (err) {
        console.error(err);
        tableBody.innerHTML = "<tr><td colspan='3' style='color:#ef4444; text-align:center;'>❌ Failed to load data.</td></tr>";
    }
}

// 2. Delete Link Function
// We attach it to the window object so the HTML 'onclick' can find it
window.deleteLink = async function(id) {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
        const res = await fetch(`/api/admin/links/${id}`, { method: 'DELETE' });
        
        if (res.ok) {
            // Remove the row from the screen instantly with a fade out effect
            const row = document.getElementById(`row-${id}`);
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 300); // Wait for fade out
        } else {
            alert("Failed to delete.");
        }
    } catch (err) {
        alert("Server error.");
    }
};

// Load data on page open
loadLinks();