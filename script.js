const addAnnouncementButton = document.getElementById('submit-announcement');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const announcementList = document.querySelector('.announcement-list');
const noAnnouncementsMessage = document.getElementById('no-announcements');

// Function to add a new announcement to the list
function addAnnouncement() {
    const messageInput = document.getElementById('announcement-message');
    const message = messageInput.value.trim();
    
    if (!message) return; // Exit if no message is provided

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString(); // Format: MM/DD/YYYY
    const time = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

    // Create a new announcement item (div)
    const announcementItem = document.createElement('div');
    announcementItem.classList.add('announcement-item');

    // Create elements for the announcement content (date, time, and message)
    const dateElement = document.createElement('p');
    dateElement.textContent = `Date: ${date} ${time}`;
    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    // Add the elements to the announcement item
    announcementItem.appendChild(dateElement);
    announcementItem.appendChild(messageElement);

    // Add the announcement item to the announcement list
    announcementList.appendChild(announcementItem);

    // Clear the input field
    messageInput.value = '';
}

// Function to search through announcements
function searchAnnouncements() {
    const searchTerm = searchInput.value.toLowerCase();
    const announcementItems = document.querySelectorAll('.announcement-item');
    let found = false;

    announcementItems.forEach(item => {
        const message = item.querySelector('p:last-of-type').textContent.toLowerCase();

        if (message.includes(searchTerm)) {
            item.style.display = 'block';
            found = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Show or hide the "No announcements found" message
    noAnnouncementsMessage.style.display = found ? 'none' : 'block';
}

// Add event listener to the "Add Announcement" button
addAnnouncementButton.addEventListener('click', addAnnouncement);

// Add event listener to the search button
searchButton.addEventListener('click', searchAnnouncements);
