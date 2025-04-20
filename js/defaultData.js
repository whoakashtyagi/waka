// js/defaultData.js
export const defaultData = {};

export function updateDefaultData(newData) {
  Object.assign(defaultData, newData);
}

updateDefaultData({
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
      "description": "Toronto Lawa is a Yoruba Nollywood comedy skit series set in Canada. ...",
      "subtitle1": "Comedy Series",
      "subtitle2": "Now Streaming",
      "subtitle3": "🇳🇬 Yoruba/English"
    },
    {
      "id": "spotlight2",
      "url": "https://www.youtube.com/embed/Ngg0VkQccGQ?rel=0&showinfo=0",
      "title": "TORONTO LAWA S1 Episode 1",
      "description": "Toronto Lawa stands as a carefully crafted episodic production, ...",
      "subtitle1": "Comedy Series",
      "subtitle2": "Now Streaming",
      "subtitle3": "🇳🇬 Yoruba/English"
    }
  ]
});
