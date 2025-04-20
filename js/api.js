// js/api.js
import { defaultData } from './defaultData.js';
import { populateHighlights, populatePodcasts, populateSpotlights } from './populate.js';

export async function fetchContentData() {
  try {
    const res = await fetch(`/api/content`);
    const { content, updated_at } = await res.json();

    const localUpdatedAt = localStorage.getItem('wakaCanadaUpdatedAt');
    if (localUpdatedAt && new Date(updated_at) <= new Date(localUpdatedAt)) {
      console.log('No updates detected, skipping data fetch.');
      populateHighlights();
      populatePodcasts();
      populateSpotlights();
      return;
    }

    Object.assign(defaultData, content || {}); // Update properties instead of reassigning
    localStorage.setItem('wakaCanadaUpdatedAt', updated_at);
    populateHighlights();
    populatePodcasts();
    populateSpotlights();
  } catch (err) {
    console.error('Error fetching content:', err);
    populateHighlights();
    populatePodcasts();
    populateSpotlights();
  }
}

export async function updateContentInSupabase(contentData) {
  try {
    const res = await fetch(`/api/content`, {
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

export async function saveContentChanges() {
  const result = await updateContentInSupabase(defaultData);
  if (result.success) {
    alert('Content saved successfully!');
    populateHighlights();
    populatePodcasts();
    populateSpotlights();
  } else {
    alert('Failed to save content: ' + result.error);
  }
  localStorage.setItem('wakaCanadaData', JSON.stringify(defaultData));
}
