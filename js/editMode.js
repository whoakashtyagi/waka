// js/editMode.js
import { defaultData } from './defaultData.js';
import { saveContentChanges } from './api.js';
import { populateHighlights, populatePodcasts, populateSpotlights } from './populate.js';

let isEditMode = false;

export function toggleEditMode() {
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