// Initialize EmailJS
(function () {
    emailjs.init("MZWNXxfmfGy-c_FO9");
})();

// Data embedded directly in the HTML
let defaultData = {
    "highlights": [
        {
            "id": "highlight1",
            "url": "https://www.youtube.com/embed/UnzrIEacYvE",
            "title": null,
            "description": null,
            "subtitle1": null,
            "subtitle2": null,
            "subtitle3": null
        }
    ],
    "podcasts": [
        {
            "id": "podcast1",
            "url": "https://www.youtube.com/embed/WZWcHAf-Dvk?rel=0&showinfo=0",
            "title": "Episode 1",
            "description": "EXCLUSIVE INTERVIEW WITH THE NIGERIAN BORN TORONTO POLICE OFFICER BASSEY OSAGIE",
            "subtitle1": null,
            "subtitle2": null,
            "subtitle3": null
        },
        {
            "id": "podcast2",
            "url": "https://www.youtube.com/embed/Dlot2byO-lQ?rel=0&showinfo=0",
            "title": "Episode 2",
            "description": "Why I quit my 9-5 to do event planning in Canada. FOLAKEMI SOFOWORA explains... BUSINESS ARENA",
            "subtitle1": null,
            "subtitle2": null,
            "subtitle3": null
        },
        {
            "id": "podcast3",
            "url": "https://www.youtube.com/embed/_WyaGLmYANE?rel=0&showinfo=0",
            "title": "Episode 3",
            "description": "Movie Director Tope Adebayo speaks on Nollywood Yoruba movie JagunJagun Part 2",
            "subtitle1": null,
            "subtitle2": null,
            "subtitle3": null
        }
    ],
    "spotlights": [
        {
            "id": "spotlight1",
            "url": "https://www.youtube.com/embed/SKObTXoEe0w?rel=0&showinfo=0",
            "title": "TORONTO LAWA Episode 13",
            "description": "Toronto Lawa is a Yoruba Nollywood comedy skit series set in Canada. The series follows the life of Nigerian immigrants by casting a comedic lens into their lives and aspirations in Canada.",
            "subtitle1": "Comedy Series",
            "subtitle2": "Now Streaming",
            "subtitle3": "🇳🇬 Yoruba/English"
        },
        {
            "id": "spotlight2",
            "url": "https://www.youtube.com/embed/Ngg0VkQccGQ?rel=0&showinfo=0",
            "title": "TORONTO LAWA S1 Episode 1",
            "description": "Toronto Lawa stands as a carefully crafted episodic production, purposefully designed to offer entertainment to its audience. Delving into the intricacies of immigrant experiences, the series meticulously elucidates a nuanced perspective on the adoption of contrived lifestyles by certain individuals to both garner approval and conform to societal norms in a foreign environment.",
            "subtitle1": "Comedy Series",
            "subtitle2": "Now Streaming",
            "subtitle3": "🇳🇬 Yoruba/English"
        }
    ]
};

async function fetchContentData() {
    try {
        // Fetch from content table
        const res = await fetch(`${API_BASE}/api/content`);
        const { content } = await res.json();
        defaultData = content || defaultData;

        // Initialize content
        populateHighlights();
        populatePodcasts();
        populateSpotlights();

        // Add admin controls if admin is logged in
        // checkAdminStatus();

    } catch (error) {
        console.error('Error fetching content:', error);

        // Use default data as fallback
        populateHighlights();
        populatePodcasts();
        populateSpotlights();
    }
}


// Function to update content in Supabase
async function updateContentInSupabase(contentData) {
    try {
        console.log('Updating content in Supabase...');

        // Update the content in the prapper_cms table
        const res = await fetch(`${API_BASE}/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: contentData })
        });
        const body = await res.json();
        if (!body.success) throw new Error(body.error);
        return { success: true };

    } catch (error) {
        console.error('Failed to update content:', error);
        return { success: false, error: error.message };
    }
}

// Example usage:
// This function could be called after editing content
async function saveContentChanges() {
    // Update the defaultData object with any changes made
    // For example, after editing through a form or admin interface


    // Then save the updated data to Supabase
    const result = await updateContentInSupabase(defaultData);

    if (result.success) {
        alert('Content saved successfully!');

        // Refresh the content on the page
        populateHighlights();
        populatePodcasts();
        populateSpotlights();
    } else {
        alert('Failed to save content: ' + result.error);
    }
}

let isEditMode = false;

// Edit mode functions
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');

    if (isEditMode) {
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        makeContentEditable();
    } else {
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        saveChanges();
    }
}

function makeContentEditable() {
    // Make highlights video editable
    const highlightsVideo = document.getElementById('highlights-video');
    if (highlightsVideo) {
        const videoWrapper = highlightsVideo.parentElement;
        const originalSrc = highlightsVideo.src;

        // Add editing class to wrapper
        videoWrapper.classList.add('editing');

        // Create input field for video URL
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.className = 'video-url-input';
        urlInput.value = originalSrc;
        urlInput.placeholder = 'Enter YouTube embed URL';

        // Hide iframe and show input
        highlightsVideo.style.display = 'none';
        videoWrapper.appendChild(urlInput);

        // Store original iframe for later
        highlightsVideo.setAttribute('data-original-src', originalSrc);
        highlightsVideo.classList.add('editable-video');
    }

    // Make podcast content editable
    const podcastContainer = document.getElementById('podcast-container');
    const podcastElements = podcastContainer.getElementsByClassName('podcast-episode');
    Array.from(podcastElements).forEach((element, index) => {
        const titleElement = element.querySelector('h3');
        const descriptionElement = element.querySelector('p');
        const videoElement = element.querySelector('iframe');
        const videoWrapper = element.querySelector('.episode-video');

        // Add editing class to wrapper
        videoWrapper.classList.add('editing');

        titleElement.contentEditable = true;
        descriptionElement.contentEditable = true;

        if (videoElement) {
            const originalSrc = videoElement.src;

            // Create input field for video URL
            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.className = 'video-url-input';
            urlInput.value = originalSrc;
            urlInput.placeholder = 'Enter YouTube embed URL';

            // Hide iframe and show input
            videoElement.style.display = 'none';
            videoWrapper.appendChild(urlInput);

            // Store original iframe for later
            videoElement.setAttribute('data-original-src', originalSrc);
            videoElement.classList.add('editable-video');
        }

        titleElement.classList.add('editable');
        descriptionElement.classList.add('editable');
    });

    // Make spotlight content editable
    const spotlightContainer = document.getElementById('spotlight-container');
    const spotlightElements = spotlightContainer.getElementsByClassName('nollywood-feature');
    Array.from(spotlightElements).forEach((element, index) => {
        const titleElement = element.querySelector('h3');
        const descriptionElement = element.querySelector('.series-description');
        const subtitleElements = element.querySelectorAll('.movie-details span');
        const videoElement = element.querySelector('iframe');
        const videoWrapper = element.querySelector('.feature-video');

        // Add editing class to wrapper
        videoWrapper.classList.add('editing');

        titleElement.contentEditable = true;
        descriptionElement.contentEditable = true;
        subtitleElements.forEach(el => {
            el.contentEditable = true;
            el.classList.add('editable');
        });

        if (videoElement) {
            const originalSrc = videoElement.src;

            // Create input field for video URL
            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.className = 'video-url-input';
            urlInput.value = originalSrc;
            urlInput.placeholder = 'Enter YouTube embed URL';

            // Hide iframe and show input
            videoElement.style.display = 'none';
            videoWrapper.appendChild(urlInput);

            // Store original iframe for later
            videoElement.setAttribute('data-original-src', originalSrc);
            videoElement.classList.add('editable-video');
        }

        titleElement.classList.add('editable');
        descriptionElement.classList.add('editable');
    });
}

function saveChanges() {
    // Save highlights video changes
    const highlightsVideo = document.getElementById('highlights-video');
    if (highlightsVideo && highlightsVideo.classList.contains('editable-video')) {
        const videoWrapper = highlightsVideo.parentElement;
        const urlInput = videoWrapper.querySelector('.video-url-input');

        // Remove editing class
        videoWrapper.classList.remove('editing');

        if (urlInput && urlInput.value) {
            highlightsVideo.src = urlInput.value;
            defaultData.highlights[0].url = urlInput.value;
        }

        // Remove input and show iframe
        videoWrapper.removeChild(urlInput);
        highlightsVideo.style.display = '';
        highlightsVideo.classList.remove('editable-video');
    }

    // Save podcast changes
    const podcastContainer = document.getElementById('podcast-container');
    const podcastElements = podcastContainer.getElementsByClassName('podcast-episode');
    Array.from(podcastElements).forEach((element, index) => {
        const titleElement = element.querySelector('h3');
        const descriptionElement = element.querySelector('p');
        const videoElement = element.querySelector('iframe');
        const videoWrapper = element.querySelector('.episode-video');

        // Remove editing class
        videoWrapper.classList.remove('editing');

        defaultData.podcasts[index].title = titleElement.textContent;
        defaultData.podcasts[index].description = descriptionElement.textContent;

        if (videoElement && videoElement.classList.contains('editable-video')) {
            const urlInput = videoWrapper.querySelector('.video-url-input');

            if (urlInput && urlInput.value) {
                videoElement.src = urlInput.value;
                defaultData.podcasts[index].url = urlInput.value;
            }

            // Remove input and show iframe
            videoWrapper.removeChild(urlInput);
            videoElement.style.display = '';
            videoElement.classList.remove('editable-video');
        }

        titleElement.contentEditable = false;
        descriptionElement.contentEditable = false;

        titleElement.classList.remove('editable');
        descriptionElement.classList.remove('editable');
    });

    // Save spotlight changes
    const spotlightContainer = document.getElementById('spotlight-container');
    const spotlightElements = spotlightContainer.getElementsByClassName('nollywood-feature');
    Array.from(spotlightElements).forEach((element, index) => {
        const titleElement = element.querySelector('h3');
        const descriptionElement = element.querySelector('.series-description');
        const subtitleElements = element.querySelectorAll('.movie-details span');
        const videoElement = element.querySelector('iframe');
        const videoWrapper = element.querySelector('.feature-video');

        // Remove editing class
        videoWrapper.classList.remove('editing');

        defaultData.spotlights[index].title = titleElement.textContent;
        defaultData.spotlights[index].description = descriptionElement.textContent;

        if (videoElement && videoElement.classList.contains('editable-video')) {
            const urlInput = videoWrapper.querySelector('.video-url-input');

            if (urlInput && urlInput.value) {
                videoElement.src = urlInput.value;
                defaultData.spotlights[index].url = urlInput.value;
            }

            // Remove input and show iframe
            videoWrapper.removeChild(urlInput);
            videoElement.style.display = '';
            videoElement.classList.remove('editable-video');
        }

        titleElement.contentEditable = false;
        descriptionElement.contentEditable = false;
        subtitleElements.forEach(el => {
            el.contentEditable = false;
            el.classList.remove('editable');
        });

        titleElement.classList.remove('editable');
        descriptionElement.classList.remove('editable');
    });

    saveContentChanges();

    // Save to localStorage
    localStorage.setItem('wakaCanadaData', JSON.stringify(defaultData));
}

// Populate highlights section
function populateHighlights() {
    if (defaultData.highlights && defaultData.highlights.length > 0) {
        const highlight = defaultData.highlights[0];
        const iframe = document.getElementById('highlights-video');
        iframe.src = highlight.url;
    }
}

// Populate podcast section
function populatePodcasts() {
    const podcastContainer = document.getElementById('podcast-container');
    podcastContainer.innerHTML = '';

    if (defaultData.podcasts && defaultData.podcasts.length > 0) {
        defaultData.podcasts.forEach(podcast => {
            const podcastElement = document.createElement('div');
            podcastElement.className = 'podcast-episode';

            podcastElement.innerHTML = `
                <div class="episode-video">
                    <iframe 
                        src="${podcast.url}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="episode-content">
                    <h3>${podcast.title}</h3>
                    <p>${podcast.description}</p>
                </div>
            `;

            podcastContainer.appendChild(podcastElement);
        });
    }
}

// Populate spotlight section
function populateSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    if (defaultData.spotlights && defaultData.spotlights.length > 0) {
        defaultData.spotlights.forEach(spotlight => {
            const spotlightElement = document.createElement('div');
            spotlightElement.className = 'nollywood-feature';

            spotlightElement.innerHTML = `
                <div class="feature-video">
                    <iframe 
                        src="${spotlight.url}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="feature-content">
                    <h3>${spotlight.title}</h3>
                    <p class="series-description">${spotlight.description}</p>
                    <div class="movie-details">
                        ${spotlight.subtitle1 ? `<span>🎬 ${spotlight.subtitle1}</span>` : ''}
                        ${spotlight.subtitle2 ? `<span>🌟 ${spotlight.subtitle2}</span>` : ''}
                        ${spotlight.subtitle3 ? `<span>${spotlight.subtitle3}</span>` : ''}
                    </div>
                </div>
            `;

            spotlightContainer.appendChild(spotlightElement);
        });
    }
}

// Form submission function
function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const templateParams = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[name="email"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        service: form.querySelector('select[name="service"]').value,
        message: form.querySelector('textarea[name="message"]').value,
        to_email: 'info@wakacanada.net'
    };

    emailjs.send(
        'service_4dke18j',
        'template_zmvspqv',
        templateParams
    )
        .then(function () {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            form.reset();
        })
        .catch(function (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            console.error('EmailJS error:', error);
        })
        .finally(function () {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });

    return false;
}

// Initialize variables for logo click tracking
let logoClickCount = 0;
let logoClickTimeout;

// Function to handle logo clicks
function handleLogoClick() {
    logoClickCount++;

    // Clear any existing timeout
    if (logoClickTimeout) {
        clearTimeout(logoClickTimeout);
    }

    // Set a timeout to reset the click count after 5 seconds
    logoClickTimeout = setTimeout(() => {
        logoClickCount = 0;
    }, 5000);

    // Check if we've reached 5 clicks
    if (logoClickCount === 5) {
        // Create a modal dialog for password input
        const modal = document.createElement('div');
        modal.className = 'password-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'password-modal-content';

        const title = document.createElement('h3');
        title.textContent = 'Enter Password';

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password';
        passwordInput.className = 'password-input';

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.className = 'password-submit-btn';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'password-cancel-btn';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'password-button-container';
        buttonContainer.appendChild(submitBtn);
        buttonContainer.appendChild(cancelBtn);

        modalContent.appendChild(title);
        modalContent.appendChild(passwordInput);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        // Focus on the password input
        passwordInput.focus();

        // Handle submit button click
        submitBtn.addEventListener('click', function () {
            if (passwordInput.value === '123') {
                document.querySelector('.edit-controls').classList.add('visible');
                alert('Edit controls have been enabled!');
                document.body.removeChild(modal);
            } else {
                alert('Incorrect password. Please try again.');
                passwordInput.value = '';
                logoClickCount = 0;
            }
        });

        // Handle cancel button click
        cancelBtn.addEventListener('click', function () {
            document.body.removeChild(modal);
            logoClickCount = 0;
        });

        // Handle Enter key press
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        // Handle Escape key press
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                    logoClickCount = 0;
                }
            }
        });
    }
}

// Initialize content when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to the logo
    document.querySelector('.logo').addEventListener('click', handleLogoClick);

    // Load saved data from localStorage if available
    const savedData = localStorage.getItem('wakaCanadaData');
    if (savedData) {
        defaultData = JSON.parse(savedData);
    }

    // Add event listeners for edit/save buttons
    document.getElementById('editBtn').addEventListener('click', toggleEditMode);
    document.getElementById('saveBtn').addEventListener('click', toggleEditMode);
    fetchContentData();
});
