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
    currentSelection = data;

    if (event.currentTarget === document.getElementById('gallery-link')){
        changeToGallery(event.currentTarget);
    }
    else if(event.currentTarget === document.getElementById('map-link')){
        changeToMap(event.currentTarget);
    }
}

function hideContent(){
    let content = document.getElementById("page-content");
    Array.from(content.children).forEach(function (item){
        item.classList.add('hidden');
    });
}

function changeToGallery(link){
    removeActiveClass();
    link.classList.add('active');
    removeModal();
    hideContent();

    let gallery = document.getElementById('gallery-view');
    gallery.classList.remove('hidden');
    loadGallery();
    updateFilter(document.getElementById('gallery-filter').value);
}

function changeToMap(link){
    removeActiveClass();
    link.classList.add('active');
    removeModal();
    hideContent();
    let mapElement = document.getElementById('map-view');
    mapElement.classList.remove('hidden');
    loadMap();
}

function updateFilter(sstring){
    currentSelection = [];

    galleryImages.forEach(function(item){
       if (item["image"].title.toLowerCase().includes(sstring)
           || item["image"].description.toLowerCase().includes(sstring))
       {
           item["galleryElement"].parentElement.style.display = "";
           currentSelection.push(item["image"]);
       }
       else{
           item["galleryElement"].parentElement.style.display = "none";
       }
    });
}

function filterHandle(event){
    if (showingLocationGallery){
        showingLocationGallery = false;
        currentSelection = data;
        loadGallery();
    }
    updateFilter(event.target.value);
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
    currentSelection.length === 1 ? hideNavigation() : showNavigation();

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
    let imageData = galleryImages.find(item => item["galleryElement"] === event.currentTarget);
    updateModal(imageData["image"]);
    showModal();
}

function restrictSelectionByCoordinate(marker){
    currentSelection = [];
    let imageOfMarker = mapMarkers.find(item => item["marker"] === marker)["image"];
    mapMarkers.forEach(function (item){
        if(item["image"].gpsCoordinates.latitude === imageOfMarker.gpsCoordinates.latitude
            && item["image"].gpsCoordinates.longitude === imageOfMarker.gpsCoordinates.longitude){
            currentSelection.push(item["image"]);
        }
    });
}

function handleMarkerClick(event){
    currentSelection = data;
    restrictSelectionByCoordinate(event.target);
    if (currentSelection.length === 1){
        updateModal(currentSelection[0]);
        showModal();
    }
    else{
        showingLocationGallery = true;
        document.getElementById('gallery-filter').value = '';
        changeToGallery(document.getElementById('gallery-link'));
    }
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

function hideNavigation(){
    let prevButton = document.getElementById('modal-prev');
    let nextButton = document.getElementById('modal-next');
    let autoPlayButton = document.getElementById('modal-autoplay');
    let modalImage = document.getElementById('modal-image');

    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    autoPlayButton.style.display = 'none';
    modalImage.style.width = '90%';
}

function showNavigation(){
    let prevButton = document.getElementById('modal-prev');
    let nextButton = document.getElementById('modal-next');
    let autoPlayButton = document.getElementById('modal-autoplay');
    let modalImage = document.getElementById('modal-image');

    prevButton.style.display = '';
    nextButton.style.display = '';
    autoPlayButton.style.display = '';
    modalImage.style.width = '';
}

function handleRoute(){
    routeToggle = !routeToggle;
    if (routeToggle){
        let waypoints = [];
        mapMarkers.forEach(function (item){
           waypoints.push([item["image"].gpsCoordinates.latitude, item["image"].gpsCoordinates.longitude])
        });
        routeControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,
            createMarker: function (waypointIndex, waypoint, numberOfWaypoints) {
                return null;
            }
        }).addTo(map);
        routeControl.on('routesfound', function (event) {
            let totalDistance = event.routes[0].summary.totalDistance / 1000;

            let distanceSpan = document.getElementById('distance-span');
            distanceSpan.innerText = `Total distance: ${totalDistance} km`;
            distanceSpan.classList.remove('hidden');
        });
    }
    else{
        map.removeControl(routeControl);
        let distanceSpan = document.getElementById('distance-span');
        distanceSpan.classList.add('hidden');
    }

}

function loadGallery(){
    let filter = document.getElementById('gallery-filter');
    filter.addEventListener('input', filterHandle);

    let imageContainer = document.getElementById('images-container');
    imageContainer.innerHTML = '  ';

    galleryImages = [];
    currentSelection.forEach(function(image){
       let imageFrame = document.createElement('div');
       imageFrame.classList.add('thumbnail');

       let imageElement = document.createElement('img');
       imageElement.src = image.relativePath;
       imageElement.alt = `${image.title} - ${image.description}`;
       imageElement.classList.add('thumbnail-image');
       imageElement.addEventListener('click', handleGalleryClick);

       imageFrame.appendChild(imageElement);
       imageContainer.appendChild(imageFrame);
       galleryImages.push({
           "galleryElement": imageElement,
           "image": image
       });
    });
}

function loadMap(){
    if(map !== null){
        map.invalidateSize();
        return
    }
    map = L.map('map').setView([51.505, -0.09], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markerGroup = new L.MarkerClusterGroup();
    data.forEach(function (item){
        let marker = L.marker([item.gpsCoordinates.latitude, item.gpsCoordinates.longitude])
        marker.addEventListener('click', handleMarkerClick);
        markerGroup.addLayer(marker);
        mapMarkers.push({
            "marker": marker,
            "image": item
        })
    });
    map.addLayer(markerGroup);
}

let data;
let currentSelection
let autoPlayToggle = false;
let autoPlayIntervalHandler;
let map = null;
let mapMarkers = [];
let galleryImages = [];
let routeToggle = false;
let routeControl;
let showingLocationGallery = false;
window.onload = function(){

    fetch('./gallery.json')
        .then(response => response.json())
        .then(content => {
            content.galleryImages.sort()
            data = content.galleryImages.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                return dateA - dateB;
            });
            currentSelection = data;
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
    let routeToggle = document.getElementById('route-toogle');

    closeButton.addEventListener('click', removeModal);
    clickOutsideBox.addEventListener('click', removeModal);
    prevButton.addEventListener('click', handlePrev);
    nextButton.addEventListener('click', handleNext);
    autoPlayButton.addEventListener('click', handleAutoplay);
    routeToggle.addEventListener('click', handleRoute);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        removeModal();
    }
});