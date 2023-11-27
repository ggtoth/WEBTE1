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

function handleImageClick(event){
    Array.from(document.body.children).forEach(item => item.classList.add('blur'));

    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');
    modalContainer.id = 'modal';

    let imageData = getElementByRelativePath(event.currentTarget.getAttribute('src'));
    let image = document.createElement('img');
    image.src = imageData.relativePath;
    image.alt = imageData.description;
    image.classList.add('modal-image');

    let title = document.createElement('h2');
    title.innerText = imageData.title;

    let description = document.createElement('p');
    description.innerText = imageData.description;

    let date = document.createElement('p');
    let dateVar = new Date(imageData.date);
    date.innerText = dateVar.toDateString();

    let coords = document.createElement('p');
    coords.innerText = `${imageData.gpsCoordinates.latitude}°N, ${imageData.gpsCoordinates.longitude}°E`

    modalContainer.appendChild(image);
    modalContainer.appendChild(title);
    modalContainer.appendChild(description);
    modalContainer.appendChild(date);
    modalContainer.appendChild(coords);
    document.body.appendChild(modalContainer);
}


function removeModal(){
    let modal = document.getElementById('modal');
    Array.from(document.body.children).forEach(item => item.classList.remove('blur'));
    modal.parentElement.removeChild(modal);
}

function loadGallery(){
    let root = document.getElementById('appRoot');

    let container = document.createElement('div');
    container.classList.add('gallery-container');
    container.id = 'gallery';

    let filter = document.createElement('input');
    filter.type = 'text';
    filter.id = 'gallery-filter';
    filter.placeholder = 'Write Keyword';

    filter.addEventListener('input', filterHandle);

    let imageContainer = document.createElement('div');
    imageContainer.classList.add('images-container')

    data.galleryImages.forEach(function(image){
       let imageFrame = document.createElement('div');
       imageFrame.classList.add('thumbnail');

       let imageElement = document.createElement('img');
       imageElement.src = image.relativePath;
       imageElement.alt = `${image.title} ${image.description}`;
       imageElement.classList.add('thumbnail-image');
       imageElement.addEventListener('click', handleImageClick);

       imageFrame.appendChild(imageElement);
       imageContainer.appendChild(imageFrame);
    });

    container.appendChild(filter);
    container.appendChild(imageContainer);
    root.appendChild(container);
}

let data;
window.onload = function(){
    document.querySelectorAll('.navbar-nav .nav-item')
        .forEach(function (li){
            li.addEventListener('click', handleNavClick);
    });

    fetch('./gallery.json')
        .then(response => response.json())
        .then(file => {
            data = file;
            console.log(data);
            loadGallery();
        })
        .catch(error => console.error('Error fetching JSON:', error));
}