function parseXMLFile(filename) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filename, false);
    xhr.send();

    if (xhr.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xhr.responseText, 'application/xml');
        return xmlDoc;
    } else {
        console.error('Error fetching the XML file. Status:', xhr.status);
        return null;
    }
}

function organizeXMLData(dom) {
    const zaznamElements = dom.getElementsByTagName('zaznam');
    const data = [];

    for (let i = 0; i < zaznamElements.length; i++) {
        const zaznam = zaznamElements[i];
        const rok = zaznam.querySelector('rok').textContent;
        const hodnotenie = {};

        const hodnotenieElements = zaznam.querySelectorAll('hodnotenie > *');
        hodnotenieElements.forEach(element => {
            hodnotenie[element.tagName] = parseInt(element.textContent);
        });

        const zaznamData = {
            year: rok,
            grades: hodnotenie
        };

        data.push(zaznamData);
    }

    return data;
}

const gradeColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(128, 128, 128, 0.7)', // Add more colors as needed
];

function getGradeData(data){
    let gradeData = [];

    let i = 0;
    for (const key of Object.keys(data[0].grades)){
        let helper = [];
        for (const element of data){
            helper.push(element.grades[key]);
        }
        gradeData.push({
            label: key,
            data: helper,
        })
    }

    return gradeData;
}

function getGradeDataOpposite(data){
    let gradeData = [];
    let i = 0;
    for(const element of data){
        let helper = [];
        for (const key of Object.keys(data[0].grades)){
            helper.push(element.grades[key]);
        }
        gradeData.push({
            label: element.year,
            data: helper,
        })
    }

    return gradeData;
}

function getChartConfig(labels, datasets, type){
    return {
        type: type,
        data: {
            labels: labels,
            datasets: datasets,
            options: {
                responsive: true,
            }
        },
    }
}

function addChart(container, chartData){
    let canvas = document.createElement('canvas');
    canvas.classList.add('chart-canvas');
    canvas.id = 'chart';

    const ctx = canvas.getContext('2d');
    new Chart(ctx, chartData);

    container.appendChild(canvas);
}

let currentChartType;

let container;
let chartConfig;
let data;
let gradeData;

function loadBar(){
    if (currentChartType === 'bar') return;
    container.innerHTML = '';
    chartConfig = getChartConfig(data.map(entry => entry.year), gradeData, 'bar');
    chartConfig.options['indexAxis'] = 'y';
    currentChartType = 'bar';
    addChart(container, chartConfig);
}

function loadPie(){
    if (currentChartType === 'pie') return;
    container.innerHTML = '';
    chartConfig = getChartConfig(gradeData.map(entry => entry.label), getGradeDataOpposite(data), 'pie');
    currentChartType = 'pie';
    addChart(container, chartConfig);
}

function loadLine(){
    if (currentChartType === 'line') return;
    container.innerHTML = '';
    chartConfig = getChartConfig(data.map(entry => entry.year), gradeData, 'line');
    currentChartType = 'line';
    addChart(container, chartConfig);
}

window.onload = function () {
    let xmlDOM = parseXMLFile("./z03.xml");
    data = organizeXMLData(xmlDOM);
    gradeData = getGradeData(data);
    container = document.getElementById('chart-container');

    let barButton = document.getElementById('bar-button');
    let pieButton = document.getElementById('pie-button');
    let lineButton = document.getElementById('line-button');

    barButton.addEventListener('click', loadBar);
    pieButton.addEventListener('click', loadPie);
    lineButton.addEventListener('click', loadLine);
    console.log(gradeData)
    loadBar();
}

window.onresize = function (){
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}