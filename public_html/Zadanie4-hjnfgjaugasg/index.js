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
    const foundElement = data.galleryImages.find(image => image.relativePath === relativePath);
    return foundElement || null;
}

function loadModal(modal, imageData){
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
    loadModal(modal, imageData);
    modal.classList.remove('hidden');
}

function removeModal(event){
    let modal = document.getElementById('modal');
    Array.from(document.body.children).forEach(item => item !== modal && item.classList.remove('blur'));
    modal.classList.add('hidden');
}

function loadGallery(){
    let filter = document.getElementById('gallery-filter');
    filter.addEventListener('input', filterHandle);

    let imageContainer = document.getElementById('images-container');

    data.galleryImages.forEach(function(image){
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
window.onload = function(){
    document.querySelectorAll('.navbar-nav .nav-item')
        .forEach(function (li){
            li.addEventListener('click', handleNavClick);
    });

    let closeButton = document.getElementById('modal-close-button');
    closeButton.addEventListener('click', removeModal);

    fetch('./gallery.json')
        .then(response => response.json())
        .then(file => {
            data = file;
            console.log(data);
            loadGallery();
        })
        .catch(error => console.error('Error fetching JSON:', error));
}