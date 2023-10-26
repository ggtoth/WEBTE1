const data = {
    "Slovensko": {
        "Bratislavský kraj": [
            "Bratislava I", "Bratislava II", "Bratislava III", "Bratislava IV", "Bratislava V", "Malacky", "Pezinok", "Senec"
        ],
        "Trnavský kraj": [
            "Dunajská Streda", "Galanta", "Hlohovec", "Pezinok", "Senica", "Skalica", "Trnava"
        ],
        "Trenčiansky kraj": [
            "Bánovce nad Bebravou", "Myjava", "Nové Mesto nad Váhom", "Partizánske", "Považská Bystrica", "Púchov", "Trenčín"
        ],
        "Žilinský kraj": [
            "Čadca", "Dolný Kubín", "Kysucké Nové Mesto", "Liptovský Mikuláš", "Martin", "Námestovo", "Ružomberok", "Tvrdošín"
        ],
        "Banskobystrický kraj": [
            "Banská Bystrica", "Brezno", "Detva", "Krupina", "Lučenec", "Poltár", "Revúca", "Rimavská Sobota", "Veľký Krtíš", "Zvolen", "Žarnovica"
        ],
        "Prešovský kraj": [
            "Bardejov", "Humenné", "Kežmarok", "Levoča", "Medzilaborce", "Poprad", "Prešov", "Sabinov", "Snina", "Stará Ľubovňa", "Stropkov", "Svidník", "Vranov nad Topľou"
        ],
        "Košický kraj": [
            "Gelnica", "Košice I", "Košice II", "Košice III", "Košice IV", "Košice-okolie", "Michalovce", "Rožňava", "Sobrance", "Spišská Nová Ves", "Trebišov"
        ],
        "Nitranský kraj": [
            "Komárno", "Levice", "Nitra", "Nové Zámky", "Šaľa", "Topoľčany", "Zlaté Moravce"
        ]
    },
    "Česko": {
        "Hlavní město Praha": [
            "Praha 1", "Praha 2", "Praha 3", "Praha 4", "Praha 5",
            "Praha 6", "Praha 7", "Praha 8", "Praha 9", "Praha 10", "Praha 11", "Praha 12", "Praha 13", "Praha 14", "Praha 15"
        ],
        "Jihočeský kraj": [
            "České Budějovice", "Český Krumlov", "Jindřichův Hradec", "Písek", "Prachatice", "Strakonice", "Tábor"
        ],
        "Jihomoravský kraj": [
            "Blansko", "Brno-město", "Brno-venkov", "Břeclav", "Hodonín", "Vyškov", "Znojmo"
        ],
        "Karlovarský kraj": [
            "Cheb", "Karlovy Vary", "Sokolov"
        ],
        "Královéhradecký kraj": [
            "Hradec Králové", "Jičín", "Náchod", "Rychnov nad Kněžnou", "Trutnov"
        ],
        "Liberecký kraj": [
            "Česká Lípa", "Jablonec nad Nisou", "Liberec", "Semily"
        ],
        "Moravskoslezský kraj": [
            "Bruntál", "Frýdek-Místek", "Karviná", "Nový Jičín", "Opava", "Ostrava-město"
        ],
        "Olomoucký kraj": [
            "Jeseník", "Olomouc", "Prostějov", "Přerov", "Šumperk"
        ],
        "Pardubický kraj": [
            "Chrudim", "Pardubice", "Svitavy", "Ústí nad Orlicí"
        ],
        "Plzeňský kraj": [
            "Domažlice", "Klatovy", "Plzeň-město", "Plzeň-jih", "Plzeň-sever", "Rokycany", "Tachov"
        ],
        "Středočeský kraj": [
            "Benešov", "Beroun", "Kladno", "Kolín", "Kutná Hora", "Mělník", "Mladá Boleslav", "Nymburk", "Praha-východ", "Praha-západ", "Příbram", "Rakovník"
        ],
        "Ústecký kraj": [
            "Chomutov", "Děčín", "Litoměřice", "Louny", "Most", "Teplice", "Ústí nad Labem"
        ],
        "Kraj Vysočina": [
            "Havlíčkův Brod", "Jihlava", "Pelhřimov", "Třebíč", "Žďár nad Sázavou"
        ],
        "Zlínský kraj": [
            "Kroměříž", "Uherské Hradiště", "Vsetín", "Zlín"
        ]
    }
}

const pcs = {
    "Dell XPS": {
        "Brand": "Dell",
        "Processor": "Intel Core i7-11700K",
        "RAM": "16GB",
        "Storage": "512GB SSD",
        "Graphics": "NVIDIA GeForce RTX 3080",
        "Price": 1999
    },
    "HP Omen": {
        "Brand": "HP",
        "Processor": "AMD Ryzen 9 5900X",
        "RAM": "32GB",
        "Storage": "1TB SSD + 2TB HDD",
        "Graphics": "AMD Radeon RX 6900 XT",
        "Price": 2299
    },
    "Lenovo Legion": {
        "Brand": "Lenovo",
        "Processor": "Intel Core i5-10400F",
        "RAM": "16GB",
        "Storage": "256GB SSD",
        "Graphics": "NVIDIA GeForce GTX 1660",
        "Price": 999
    },
    "Asus ROG": {
        "Brand": "Asus",
        "Processor": "Intel Core i9-11900K",
        "RAM": "32GB",
        "Storage": "2TB SSD",
        "Graphics": "NVIDIA GeForce RTX 3090",
        "Price": 2999
    },
    "Acer Predator": {
        "Brand": "Acer",
        "Processor": "AMD Ryzen 7 5800X",
        "RAM": "16GB",
        "Storage": "512GB SSD",
        "Graphics": "NVIDIA GeForce RTX 3070",
        "Price": 1799
    },
    "MSI Gaming": {
        "Brand": "MSI",
        "Processor": "Intel Core i7-12700K",
        "RAM": "32GB",
        "Storage": "1TB SSD",
        "Graphics": "NVIDIA GeForce RTX 3060 Ti",
        "Price": 1499
    },
    "Alienware Aurora": {
        "Brand": "Alienware",
        "Processor": "AMD Ryzen 9 5950X",
        "RAM": "16GB",
        "Storage": "2TB SSD",
        "Graphics": "NVIDIA GeForce RTX 3080",
        "Price": 3499
    },
    "Corsair One": {
        "Brand": "Corsair",
        "Processor": "Intel Core i7-11700",
        "RAM": "16GB",
        "Storage": "512GB SSD",
        "Graphics": "NVIDIA GeForce GTX 1650",
        "Price": 1299
    },
    "Razer Blade": {
        "Brand": "Razer",
        "Processor": "Intel Core i5-11400H",
        "RAM": "32GB",
        "Storage": "256GB SSD",
        "Graphics": "NVIDIA GeForce RTX 3050",
        "Price": 1099
    },
    "Gateway PC": {
        "Brand": "Gateway",
        "Processor": "AMD Ryzen 5 5600G",
        "RAM": "16GB",
        "Storage": "512GB SSD",
        "Graphics": "NVIDIA GeForce GTX 1660 Ti",
        "Price": 1199
    }
};

const super_pc = {
    "Secret PC": {
        "Brand": "Sigma",
        "Processor": "Intel Core i9-14900K",
        "RAM": "256gb",
        "Storage": "4TB SSD",
        "Graphics": "NVIDIA GeForce GTX 4090 24GB OC",
        "Price": 1
    }
}

window.onload = function (){
    let countriesSelect = document.getElementById("Countries");
    for (let dataKey in data) {
        let newOption = new Option(dataKey, dataKey);
        countriesSelect.add(newOption);
    }
    let computersSelect = document.getElementById("Computers");
    for (let dataKey in pcs) {
        let newOption = new Option(dataKey, dataKey);
        computersSelect.add(newOption);
    }
    document.getElementById('first-name-wc-max').innerText = document.getElementById('first-name-field').maxLength;
    document.getElementById('last-name-wc-max').innerText = document.getElementById('last-name-field').maxLength;
    document.getElementById('email-wc-max').innerText = document.getElementById('email-field').maxLength;
    document.getElementById('phone-wc-max').innerText = document.getElementById('phone-field').maxLength;
    document.getElementById('address-wc-max').innerText = document.getElementById('address-field').maxLength;

    document.getElementById('first-name-wc').innerText = "0";
    document.getElementById('last-name-wc').innerText = "0";
    document.getElementById('email-wc').innerText = "0";
    document.getElementById('phone-wc').innerText = "0";
    document.getElementById('address-wc').innerText = "0";

    document.getElementById('submit').addEventListener('click', validateForm);
}

function countries_onchange(selectElement){
    let regions = document.getElementById("Regions");
    let districts = document.getElementById("Districts");
    regions.selectedIndex = 0;
    while (regions.options.length > 1){
        regions.options.remove(1);
    }
    districts.selectedIndex = 0;
    regions_onchange(regions);
    if(selectElement.selectedIndex === 0){
        return;
    }
    for(let dataKey in data[selectElement.value]){
        let newOption = new Option(dataKey, dataKey);
        regions.add(newOption);
    }
}

function regions_onchange(selectElement){
    let countries = document.getElementById("Countries");
    let districts = document.getElementById("Districts");
    districts.selectedIndex = 0;
    validateAddressSelection(districts);
    while (districts.options.length > 1){
        districts.options.remove(1);
    }
    if(selectElement.selectedIndex === 0){
        return;
    }
    for(let dataKey in data[countries.value][selectElement.value]){
        let optionValue = data[countries.value][selectElement.value][dataKey];
        let newOption = new Option(optionValue, optionValue);
        districts.add(newOption);
    }
}

function districts_onchange(selectElement){
    validateAddressSelection(selectElement);
    validateAddress(document.getElementById('address-field'));
}

function computers_onchange(selectElement){
    let specsClassStyle = document.querySelector(".pc-specifications").style;
    if (!secret_remove_flag)
        validateComputerSelection(selectElement);
    else secret_remove_flag = false;
    if (selectElement.selectedIndex === 0) {
        specsClassStyle.visibility = 'hidden';
        specsClassStyle.display = 'none';
        return;
    }
    specsClassStyle.visibility = 'visible';
    specsClassStyle.display = 'block'
    let pcSpecs = pcs[selectElement.value];
    if(selectElement.value === "Secret PC"){
        pcSpecs = super_pc["Secret PC"];
    }
    document.getElementById("spec-brand").innerText = pcSpecs["Brand"];
    document.getElementById("spec-processor").innerText = pcSpecs["Processor"];
    document.getElementById("spec-ram").innerText = pcSpecs["RAM"];
    document.getElementById("spec-storage").innerText = pcSpecs["Storage"];
    document.getElementById("spec-graphics").innerText = pcSpecs["Graphics"];
    document.getElementById("spec-price").innerText = pcSpecs["Price"];
}

function checkInputText(inputItem, regex){
    let pattern = new RegExp(regex);
    return pattern.test(inputItem.value);
}

function genericRegexCheck(element, regex){
    if(!checkInputText(element, regex)){
        element.style.borderColor = 'red';
        return false;
    }
    element.style.borderColor = 'green';
    return true;
}

function validateFirstName(element){
    document.getElementById('first-name-wc').innerText = element.value.length;
    let alert = document.getElementById('first-name-alert');
    if(element.value.length === 0){
        alert.style.visibility = 'visible';
        alert.style.display = 'block';
        element.style.borderColor = 'red';
    }
    else {
        alert.style.visibility = 'hidden';
        alert.style.display = 'none';
        element.style.borderColor = 'black';
    }
    return genericRegexCheck(element, "^[A-zÀ-úČ-ž]+$");
}

function validateLastName(element){
    document.getElementById('last-name-wc').innerText = element.value.length;
    let alert = document.getElementById('last-name-alert');
    if(element.value.length === 0){
        alert.style.visibility = 'visible';
        alert.style.display = 'block';
        element.style.borderColor = 'red';
    }
    else {
        alert.style.visibility = 'hidden';
        alert.style.display = 'none';
        element.style.borderColor = 'black';
    }
    return genericRegexCheck(element, "^[A-Za-zÀ-úČ-ž]+$");
}

function validateEmail(element){
    document.getElementById('email-wc').innerText = element.value.length;
    let alert = document.getElementById('email-alert');
    if(element.value.length === 0){
        alert.style.visibility = 'visible';
        alert.style.display = 'block';
        element.style.borderColor = 'red';
    }
    else {
        alert.style.visibility = 'hidden';
        alert.style.display = 'none';
        element.style.borderColor = 'black';
    }
    return genericRegexCheck(element, '^([a-z0-9\\-\\_\\.]*[a-z0-9])@([^\\-\\_\\.][a-z0-9\\-\\_]*\\.)([a-z0-9\\-\\_]{2,4})$');
}

function validateComputerSelection(computerSelect){
    let container = document.getElementById('computers-select-container');
    if (computerSelect.selectedIndex === 0){
        container.style.borderColor = 'red';
        return false;
    }
    container.style.borderColor = 'green';
    return true;
}

function validateAddressSelection(districts){
    let addressSelect = document.getElementById('address-select-container');
    validateAddress(document.getElementById('address-field'));
    if(districts.selectedIndex === 0){
        addressSelect.style.borderColor = 'red';
        return false;
    }
    addressSelect.style.borderColor = 'green';
    return true;
}

function validateAddress(element){
    document.getElementById('address-wc').innerText = element.value.length;
    let alert = document.getElementById('address-alert');
    let districts = document.getElementById('Districts');
    if (districts.selectedIndex === 0 || element.value.length === 0){
        alert.style.visibility = 'visible';
        alert.style.display = 'block';
        element.style.borderColor = 'red';
    }
    else {
        alert.style.visibility = 'hidden';
        alert.style.display = 'none';
        element.style.borderColor = 'black';
    }
    return genericRegexCheck(element, "[A-Za-zÀ-úČ-ž,/]+$");
}

function validatePhone(element){
    document.getElementById('phone-wc').innerText = element.value.length;
    if(element.value.length === 0){
        element.style.borderColor = 'black';
        return false;
    }
    return genericRegexCheck(element, "^(\\+[0-9]{12,12})$");
}

function validateDate(element){
    if(element.value === ""){
        return false
    }
    let date = new Date(element.value);
    return date.getUTCFullYear() >= 1900 && date <= (new Date());
}

function changeDate(element){
    let ageField = document.getElementById('age-field');
    if(element.value === ""){
        document.getElementById('date-alert').style.visibility = 'visible';
    }
    else{
        document.getElementById('date-alert').style.visibility = 'hidden';
    }
    if(!validateDate(element)){
        ageField.value = "";
        element.style.borderColor = 'red';
        return false;
    }
    element.style.borderColor = 'green';
    let inputDate = new Date(element.value);
    let age = new Date(new Date() - inputDate);
    ageField.value = age.getUTCFullYear() - 1970;
    return true;
}

function getGender(){
    if (document.getElementById('female').checked){
        return "Žena";
    }
    else if(document.getElementById('male').checked){
        return "Muž";
    }
    else if(document.getElementById('other').checked){
        return "Iné";
    }
    return "";
}

let secret_enable = false;
let secret_remove_flag = false;
function secretOption() {
    let computers = document.getElementById('Computers');
    if (!secret_enable && getGender() === "Iné") {
        computers.options.add(
            new Option("Secret PC", "Secret PC")
        )
        secret_enable = true;

    } else {
        secret_remove_flag = computers.selectedIndex !== computers.options.length - 1;
        computers.options.remove(computers.options.length - 1);
        secret_enable = false;
        computers_onchange(computers);
    }
}

function other_checkbox_onchange(element){
    let container = document.getElementById('hidden-other-container');
    let textarea = document.getElementById('other-text-area');
    if (element.checked) {
        container.style.display = 'block';
        container.style.visibility = 'visible';
        return;
    }
    textarea.value = '';
    container.style.display = '';
    container.style.visibility = '';

}

let revealed = false;
function revealName(){
    let hiddenName = document.getElementById('hidden-name-container');
    if (revealed){
        hiddenName.style.display = '';
        hiddenName.style.visibility = '';
        revealed = false;
        return;
    }
    hiddenName.style.display = 'flex';
    hiddenName.style.visibility = 'visible';
    revealed = true
}

(function() {
    emailjs.init('N0SAp5RgZ3S01lT7X');
})();

let message = "";
let sendAddress = "";

function validateForm() {
    let firstName = document.getElementById('first-name-field');
    let lastName = document.getElementById('last-name-field');
    let birthDate = document.getElementById('birth-date-field');
    let email = document.getElementById('email-field');
    let phone = document.getElementById('phone-field');
    let country = document.getElementById('Countries');
    let region = document.getElementById('Regions');
    let district = document.getElementById('Districts');
    let address = document.getElementById('address-field');
    let computer = document.getElementById('Computers');
    let gender = getGender();
    let rgb = document.getElementById('checkbox-rgb');
    let xStorage = document.getElementById('checkbox-extra-storage');
    let xRam = document.getElementById('checkbox-extra-ram');
    let other = document.getElementById('checkbox-other');
    let textArea = document.getElementById('other-text-area');

    let incompleteForm = false;

    if(!validateFirstName(firstName)) incompleteForm = true;
    if(!validateLastName(lastName)) incompleteForm = true;
    if(!changeDate(birthDate)) incompleteForm = true;
    if(!validateEmail(email)) incompleteForm = true;
    if(!validateAddress(address)) incompleteForm = true;
    if(!validateAddressSelection(district)) incompleteForm = true;
    if(!validateComputerSelection(computer)) incompleteForm = true;

    if(incompleteForm) return false;

    let summaryHeader  = "<h1> Objednávka info </h1>";

    let summarySubmit = "<input type=\"button\" class=\"summary-button cancel-button\" value=\"Späť\" id='cancel'>";
    let summaryCancel = "<input type=\"button\" class=\"summary-button submit-button\" value=\"Objednať\" id='send'>";

    message =
        "<p>"  +    "<b>Krstné meno: </b>" + firstName.value +
        "<br>" +    "<b>Priezvisko: </b>" + lastName.value +
        "<br>" +    "<b>Dátum narodenia: </b>" + birthDate.value +
        "<br>" +    "<b>Email: </b>" + email.value +
        "<br>" +    "<b>Štát: </b>" + country.options[country.selectedIndex].value +
        "<br>" +    "<b>Kraj: </b>" + region.options[country.selectedIndex].value +
        "<br>" +    "<b>Okres: </b>" + district.options[country.selectedIndex].value +
        "<br>" +    "<b>Adresa: </b>" + address.value +
        "<br>" +    "<b>Počitač: </b>" + computer.options[computer.selectedIndex].value;


    if (validatePhone(phone)){
        message +=  "<br>" + "<b>Telefón: </b>" + phone.value;
    }

    if (gender !== ""){
        message +=  "<br>" + "<b>Pohlavie: </b>" + gender;
    }

    message +=  "<br>" + "<b>Extra: </b>";

    if(rgb.checked){
        message +=  "<br>" + " " + rgb.name;
    }

    if(xStorage.checked){
        message +=  "<br>" + " " + xStorage.name;
    }

    if(xRam.checked){
        message +=  "<br>" + " " + xRam.name;
    }

    if(other.checked){
        message +=  "<br>" + "<b>Ostatné inštrukcie: </b>" + textArea.value;
    }

    message += "</p>"

    let summary = document.getElementById('summary');
    summary.innerHTML = summaryHeader + message + summaryCancel + summarySubmit;
    summary.classList.remove('hidden');
    let form = document.getElementById('form');
    form.classList.add('hidden');

    document.getElementById('cancel').addEventListener('click', goBackToForm);
    document.getElementById('send').addEventListener('click', sendEmail);

    sendAddress = email.value;
}

function goBackToForm(){
    let summary = document.getElementById('summary');
    summary.innerHTML = "";
    summary.classList.add('hidden');
    let form = document.getElementById('form');
    form.classList.remove('hidden');
    cleanUp();
}

function sendEmail(){
    emailjs.send("service_2024fsw","template_smtfp4j",{
        to_email: sendAddress,
        message: message,
        html: true
    }).then(function() {
        cleanUp();
        console.log('SUCCESS!');
        window.location.replace("https://webte1.fei.stuba.sk/~xtothg/Zadanie2-f1Pd5tBBRcCq/success.html");
    }, function(error) {
        cleanUp();
        console.log('FAILED...', error);
        window.location.replace("https://webte1.fei.stuba.sk/~xtothg/Zadanie2-f1Pd5tBBRcCq/fail.html");
    });
}

function cleanUp(){
    message = "";
    sendAddress = "";
    document.getElementById('cancel').removeEventListener('click', goBackToForm);
    document.getElementById('send').removeEventListener('click', sendEmail);
}