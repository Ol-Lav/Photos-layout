"use strict";

const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    return await response.json();
  } catch (error) {
    return `Error: ${error}`;
  }
};

const getDataInfo = async () => {
  const data = await fetchData();
  const dataLength = data.length;

  console.log(`Data length: ${dataLength}`);

  const groupedByTag = data.map(el => el.tags)
    .flat()
    .reduce((obj, el) => {
      const count = obj[el] || 0;
      return {
        ...obj,
        [el] : count + 1,
      }
    },{}
  );

  console.log("Elements grouped by tags:", groupedByTag);

  const groupedByTagLength = data.map(el => el.tags)
    .flat()
    .reduce((obj, el) => {
      const count = obj[el.length] || 0;
        return {
          ...obj,
          [el.length] : count + 1,
        }
      },{}
   );

  console.log("Elements grouped by tag length:", groupedByTagLength);
};

async function getFeaturedImages() {
  const data = await fetchData();
  const featuredImages = data.sort((a, b) => a.rating - b.rating).slice(0, 5);
  const extraImages = featuredImages.slice(3);

  featuredImages.forEach(el => {
    const div = document.createElement('div');
    div.className = "featuredImages__item";
    div.innerHTML = `
      <img
        src="${el.image}"
        alt="${el.title} #${el.tags.join(' #')}"
        class="featuredImages__item"
      />
      <div class="featuredImages__text-container">
        <h2 class="featuredImages__text">
          ${el.title}
        </h2>
        <p class="featuredImages__tags">
          #${el.tags.join(' #')}
        </p>
      </div>
    `;

    if (extraImages.includes(el)) {
      div.classList.add("featuredImages__item-extra");
    }

    if (featuredImages.indexOf(el) === 0) {
      div.classList.add("featuredImages__img-first");
    }

    const featuredImagescontainer = document.querySelector('.featuredImages__container')

    featuredImagescontainer.append(div);
  })
};

async function getLastImages() {
  const data = await fetchData();
  const lastImages = data.sort((a, b) => a.age - b.age).slice(0, 2);

  let html = '';

  lastImages.forEach(el => {
    let htmlSegment = `
      <div class="lastImages__item">
        <img
          src="${el.image}"
          alt="${el.title} #${el.tags.join(' #')}"
          class="lastImages__img"
        />
        <div class="lastImages__text-container">
          <h2 class="lastImages__text">
            ${el.title}
          </h2>
          <p class="lastImages__tags">
            #${el.tags.join(' #')}
          </p>
        </div>
      </div>
    `;

    html += htmlSegment;
  })

  const lastImagesContainer = document.querySelector('.lastImages__container');

  lastImagesContainer.innerHTML = html += `<div class="banner">Banner</div>`;
};

getFeaturedImages();
getLastImages();
getDataInfo();
