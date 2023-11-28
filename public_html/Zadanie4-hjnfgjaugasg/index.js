function truncateDecimal(number, decimalPlaces) {
    return parseFloat(number.toFixed(decimalPlaces));
}

function removeActiveClass() {
    let liElements = document.querySelectorAll('.navbar-nav .nav-item');
    liElements.forEach(function(li) {
        li.classList.remove('active');
    });
}

function handleNavClick(event){
    removeActiveClass();
    event.currentTarget.classList.add('active');

    removeModal();
    currentSelection = data.galleryImages;

    let gallery = document.getElementById('gallery-view');
    let map = document.getElementById('map-view');

    if (event.currentTarget === document.getElementById('gallery-link')){
        gallery.classList.remove('hidden');
        map.classList.add('hidden');
        loadGallery();
    }
    else if(event.currentTarget === document.getElementById('map-link')){
        gallery.classList.add('hidden');
        map.classList.remove('hidden');
        loadMap();
    }
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
    const foundElement = currentSelection.find(image => image.relativePath === relativePath);
    return foundElement || null;
}

function getIndexByRelativePath(relativePath) {
    const index = currentSelection.findIndex(image => image.relativePath === relativePath);
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
    coords.innerText = `${truncateDecimal(imageData.gpsCoordinates.latitude, 3)}°N, ${truncateDecimal(imageData.gpsCoordinates.longitude, 3)}°E`
}

function showModal(){
    let modal = document.getElementById('modal');
    let cover = document.getElementById('cover');

    modal.classList.remove('hidden');
    cover.classList.remove('hidden')

    Array.from(document.body.children).forEach(item => item !== modal && item.classList.add('blur'));
}

function removeModal(){
    let modal = document.getElementById('modal');
    let cover = document.getElementById('cover');

    modal.classList.add('hidden');
    cover.classList.add('hidden')

    Array.from(document.body.children).forEach(item => item !== modal && item.classList.remove('blur'));

    if(autoPlayToggle) handleAutoplay();
}

function handleGalleryClick(event){
    let imageData = getElementByRelativePath(event.currentTarget.getAttribute('src'));
    updateModal(imageData);
    showModal();
}

function restrictSelectionByCoordinate(lat, long){
    currentSelection = [];
    data.galleryImages.forEach(function (item){
        if(item.gpsCoordinates.latitude === lat && item.gpsCoordinates.longitude === long){
            currentSelection.push(item);
        }
    });
}

function handleMarkerClick(event){
    restrictSelectionByCoordinate(event.latlng.lat, event.latlng.lng)
    updateModal(currentSelection[0]);
    showModal();
}

function decrementImage(){
    let image = document.getElementById('modal-image');
    let index = getIndexByRelativePath(image.getAttribute('src'))
    index = index <= 0 ? currentSelection.length - 1 : index - 1;
    updateModal(currentSelection[index]);
}

function incrementImage(){
    let image = document.getElementById('modal-image');
    let index = getIndexByRelativePath(image.getAttribute('src'))
    index = index >= currentSelection.length - 1 ? 0 : index + 1;
    updateModal(currentSelection[index]);
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
    imageContainer.innerHTML = '';

    data.galleryImages.forEach(function(image){
       let imageFrame = document.createElement('div');
       imageFrame.classList.add('thumbnail');

       let imageElement = document.createElement('img');
       imageElement.src = image.relativePath;
       imageElement.alt = `${image.title} ${image.description}`;
       imageElement.classList.add('thumbnail-image');
       imageElement.addEventListener('click', handleGalleryClick);

       imageFrame.appendChild(imageElement);
       imageContainer.appendChild(imageFrame);
    });
}

function loadMap(){
    let map = L.map('map').setView([51.505, -0.09], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markerGroup = new L.MarkerClusterGroup();
    data.galleryImages.forEach(function (item){
        let marker = L.marker([item.gpsCoordinates.latitude, item.gpsCoordinates.longitude])
        marker.addEventListener('click', handleMarkerClick);
        markerGroup.addLayer(marker);
    });
    map.addLayer(markerGroup);
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
            currentSelection = content.galleryImages;
            let gallery = document.getElementById('gallery-view');
            gallery.classList.remove('hidden');
            loadGallery();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    document.querySelectorAll('.navbar-nav .nav-item')
        .forEach(function (li){
            li.addEventListener('click', handleNavClick);
        });

    let closeButton = document.getElementById('modal-close');
    let clickOutsideBox = document.getElementById('cover');
    let prevButton = document.getElementById('modal-prev');
    let nextButton = document.getElementById('modal-next');
    let autoPlayButton = document.getElementById('modal-autoplay');
    closeButton.addEventListener('click', removeModal);
    clickOutsideBox.addEventListener('click', removeModal);
    prevButton.addEventListener('click', handlePrev);
    nextButton.addEventListener('click', handleNext);
    autoPlayButton.addEventListener('click', handleAutoplay);
}