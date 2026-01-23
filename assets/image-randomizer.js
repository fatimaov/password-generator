// Image data used for random background selection
const imgData = [
    {
        credits: 'Photo by <a class="text-white-50" target="_blank" href="https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Erik Mclean</a> on <a class="text-white-50" target="_blank" href="https://unsplash.com/photos/a-body-of-water-surrounded-by-mountains-on-a-foggy-day-nF_826lMv6s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
        imageUrl: './assets/img/erik-mclean-nF_826lMv6s-unsplash_opt.jpg'
    },
    {
        credits: 'Photo by <a class="text-white-50" target="_blank" href="https://unsplash.com/@jslate01?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joshua Slate</a> on <a class="text-white-50" target="_blank" href="https://unsplash.com/photos/green-trees-surrounded-by-clouds-HN9O6R5wUUc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>' ,
        imageUrl: './assets/img/joshua-slate-HN9O6R5wUUc-unsplash_opt.jpg'
    },
    {
        credits: 'Photo by <a class="text-white-50" target="_blank" href="https://unsplash.com/@mmmtan7?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michael Tandian</a> on <a class="text-white-50" target="_blank" href="https://unsplash.com/photos/a-body-of-water-with-mountains-in-the-background-yncB2zEUnOo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>' ,
        imageUrl: './assets/img/michael-tandian-yncB2zEUnOo-unsplash_opt.jpg'
    }
]

// Preload all background images to avoid flicker on load
imgData.forEach(img => {
  const preload = new Image();
  preload.src = img.imageUrl;
});

// Returns a random image object from the image data array
function imgRandomizer() {
    return imgData[Math.floor(Math.random() * imgData.length)];
    
}

// Extracts the credits HTML from the selected image object
function getCredits (randomImg) {
    return randomImg.credits;
}

// Extracts the image URL from the selected image object
function getImgUrl (randomImg) {
    return randomImg.imageUrl;
}

export {imgRandomizer, getCredits, getImgUrl} ;