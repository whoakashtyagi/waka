// js/main.js
import { updateDefaultData } from './defaultData.js';
import { fetchContentData } from './api.js';
import { toggleEditMode } from './editMode.js';
import { submitForm } from './form.js';
import { handleLogoClick } from './logo.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.logo').addEventListener('click', handleLogoClick);

  const saved = localStorage.getItem('wakaCanadaData');
  const savedUpdatedAt = localStorage.getItem('wakaCanadaUpdatedAt');
  if (saved && savedUpdatedAt) {
    updateDefaultData(JSON.parse(saved));
  }

  document.getElementById('editBtn').addEventListener('click', toggleEditMode);
  document.getElementById('saveBtn').addEventListener('click', toggleEditMode);
  document.getElementById('contactForm').addEventListener('submit', submitForm);

  fetchContentData();
});
