// js/populate.js
import { defaultData } from './defaultData.js';

export function populateHighlights() {
  if (defaultData.highlights?.length) {
    document.getElementById('highlights-video').src = defaultData.highlights[0].url;
  }
}

export function populatePodcasts() {
  const container = document.getElementById('podcast-container');
  container.innerHTML = '';
  defaultData.podcasts?.forEach(podcast => {
    const el = document.createElement('div');
    el.className = 'podcast-episode';
    el.innerHTML = `
      <div class="episode-video">
        <iframe src="${podcast.url}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
      <div class="episode-content">
        <h3>${podcast.title}</h3>
        <p>${podcast.description}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

export function populateSpotlights() {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';
  defaultData.spotlights?.forEach(spotlight => {
    const el = document.createElement('div');
    el.className = 'nollywood-feature';
    el.innerHTML = `
      <div class="feature-video">
        <iframe src="${spotlight.url}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
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
    container.appendChild(el);
  });
}
