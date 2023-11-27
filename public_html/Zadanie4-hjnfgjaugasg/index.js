function removeActiveClass() {
    let liElements = document.querySelectorAll('.navbar-nav .nav-item');
    liElements.forEach(function(li) {
        li.classList.remove('active');
    });
}

function handleNavClick(event){
    removeActiveClass();
    event.currentTarget.classList.add('active');
}

function filterHandle(event){
    let sstring = event.target.value.toLowerCase();
    let photos = Array.from(document.querySelectorAll('.thumbnail-image'));

    photos.forEach(photo => {
        if (!photo.alt.toLowerCase().includes(sstring)) {
            photo.parentElement.style.display = "none";

        } else {
            photo.parentElement.style = "";
        }
    });
}

function getElementByRelativePath(relativePath) {
    const foundElement = currentSelection.galleryImages.find(image => image.relativePath === relativePath);
    return foundElement || null;
}

function getIndexByRelativePath(relativePath) {
    const index = currentSelection.galleryImages.findIndex(image => image.relativePath === relativePath);
    return index !== -1 ? index : null;
}


function updateModal(imageData){
    let image = document.getElementById('modal-image');
    image.setAttribute('src', imageData.relativePath);
    image.setAttribute('alt', imageData.description);
    image.classList.add('modal-image');

    let title = document.getElementById('modal-title');
    title.innerText = imageData.title;

    let description = document.getElementById('modal-description');
    description.innerText = imageData.description;

    let date = document.getElementById('modal-date');
    let dateVar = new Date(imageData.date);
    date.innerText = dateVar.toDateString();

    let coords = document.getElementById('modal-coordinates');
    coords.innerText = `${imageData.gpsCoordinates.latitude}°N, ${imageData.gpsCoordinates.longitude}°E`
}

function showModal(event){
    let modal = document.getElementById('modal');
    Array.from(document.body.children).forEach(item => item !== modal && item.classList.add('blur'));
    let imageData = getElementByRelativePath(event.currentTarget.getAttribute('src'));
    updateModal(imageData);
    modal.classList.remove('hidden');
}

function removeModal(event){
    let modal = document.getElementById('modal');
    Array.from(document.body.children).forEach(item => item !== modal && item.classList.remove('blur'));
    modal.classList.add('hidden');
}

function decrementImage(){
    let image = document.getElementById('modal-image');
    let index = getIndexByRelativePath(image.getAttribute('src'))
    index = index <= 0 ? currentSelection.galleryImages.length - 1 : index - 1;
    updateModal(currentSelection.galleryImages[index]);
}

function incrementImage(){
    let image = document.getElementById('modal-image');
    console.log(image);
    let index = getIndexByRelativePath(image.getAttribute('src'))
    index = index >= currentSelection.galleryImages.length - 1 ? 0 : index + 1;
    updateModal(currentSelection.galleryImages[index]);
}

function handlePrev(){
    decrementImage();
}

function handleNext() {
    incrementImage();
}

function handleAutoplay(){
    autoPlayToggle = !autoPlayToggle;
    if (autoPlayToggle){
        autoPlayIntervalHandler = setInterval(incrementImage, 3000);
    }
    else {
        clearInterval(autoPlayIntervalHandler);
    }
}

function loadGallery(){
    let filter = document.getElementById('gallery-filter');
    filter.addEventListener('input', filterHandle);

    let imageContainer = document.getElementById('images-container');

    currentSelection.galleryImages.forEach(function(image){
       let imageFrame = document.createElement('div');
       imageFrame.classList.add('thumbnail');

       let imageElement = document.createElement('img');
       imageElement.src = image.relativePath;
       imageElement.alt = `${image.title} ${image.description}`;
       imageElement.classList.add('thumbnail-image');
       imageElement.addEventListener('click', showModal);

       imageFrame.appendChild(imageElement);
       imageContainer.appendChild(imageFrame);
    });
}

let data;
let currentSelection
let autoPlayToggle = false;
let autoPlayIntervalHandler;
window.onload = function(){
    fetch('./gallery.json')
        .then(response => response.json())
        .then(content => {
            data = content;
            currentSelection = content;
            loadGallery();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    document.querySelectorAll('.navbar-nav .nav-item')
        .forEach(function (li){
            li.addEventListener('click', handleNavClick);
        });

    let closeButton = document.getElementById('modal-close');
    let prevButton = document.getElementById('modal-prev');
    let nextButton = document.getElementById('modal-next');
    let autoPlayButton = document.getElementById('modal-autoplay');
    closeButton.addEventListener('click', removeModal);
    prevButton.addEventListener('click', handlePrev);
    nextButton.addEventListener('click', handleNext);
    autoPlayButton.addEventListener('click', handleAutoplay);
}