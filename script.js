const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = "PpdlVs3luSvpYR2QAyRFr69e_M1r_D8Nnd9DDItYgM0"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check if all images were loaded

function loaded() {
    imageLoaded++;
   if(imageLoaded === totalImages) {
       ready = true;
       loader.hidden = true
   }
}


//Helper Functions
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key])
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank',
        })

        const img = document.createElement('img');
      setAttributes(img, {
          src: photo.urls.regular,
          alt: photo.alt_description,
          title: photo.alt_description,
      })

      //Event Listener, check when each image is finished loading
    //   img.addEventListener('load',imageLoaded);
    img.addEventListener('load', loaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
//Get Photos
async function getPhotos() {
    try {
        const response =  await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();

    } catch(error) {
console.log(error)
    }
}

//Check to see if scrolling near bottom of page , Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

//onLoad
getPhotos();