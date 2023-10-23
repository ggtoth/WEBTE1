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
    // You can add more PCs with properly formatted keys and values as needed
};

window.onload = function (){
    let countriesSelect = document.getElementById("Countries");
    let regionSelect = document.getElementById("Regions");
    let districtSelect = document.getElementById("Districts");
    for (let dataKey in data) {
        let newOption = new Option(dataKey, dataKey);
        countriesSelect.add(newOption);
    }
    let computersSelect = document.getElementById("Computers");
    for (let dataKey in pcs) {
        let newOption = new Option(dataKey, dataKey);
        computersSelect.add(newOption);
    }
}

function countries_onchange(selectElement){
    let regions = document.getElementById("Regions");
    let districts = document.getElementById("Districts");
    regions.selectedIndex = 0;
    while (regions.options.length > 1){
        regions.options.remove(1);
    }
    districts.selectedIndex = 0;
    while (districts.options.length > 1){
        districts.options.remove(1);
    }
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

function computers_onchange(selectElement){
    let specsClassStyle = document.querySelector(".pc-specifications").style;
    if (selectElement.selectedIndex === 0) {
        specsClassStyle.visibility = 'hidden';
        specsClassStyle.width = '0';
        specsClassStyle.height = '0';
        return;
    }
    specsClassStyle.visibility = 'visible';
    specsClassStyle.width = '100%';
    specsClassStyle.height = 'max-content';
    let pcSpecs = pcs[selectElement.value];
    document.getElementById("spec-brand").innerText = pcSpecs["Brand"];
    document.getElementById("spec-processor").innerText = pcSpecs["Processor"];
    document.getElementById("spec-ram").innerText = pcSpecs["RAM"];
    document.getElementById("spec-storage").innerText = pcSpecs["Storage"];
    document.getElementById("spec-graphics").innerText = pcSpecs["Graphics"];
    document.getElementById("spec-price").innerText = pcSpecs["Price"];
}