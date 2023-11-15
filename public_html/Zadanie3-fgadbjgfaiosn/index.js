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

function getGradeDataByGrade(data){
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

function getGradeDataByYear(data){
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
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    }
}

function addChart(container, chartData){
    let canvas = document.createElement('canvas');
    canvas.classList.add('chart-canvas');

    const ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, chartData);

    if(currentChartType === 'pie'){
        let individualContainer = document.createElement('div');
        individualContainer.classList.add('individual-container');
        individualContainer.appendChild(canvas);
        container.appendChild(individualContainer);
        return chart;
    }
    container.appendChild(canvas);
    return chart;
}

let currentChartType;

let chartContainer;
let data;
let axis = 'x'

function loadBar(){
    chartContainer.innerHTML = '';
    let gradeData = getGradeDataByGrade(data);
    let chartConfig = {
        type: 'bar',
        data: {
            labels: data.map(entry => entry.year),
            datasets: gradeData,
        },
        options: {
            responsive: true,
            indexAxis: axis,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
        }
    }
    addChart(chartContainer, chartConfig);
}

function loadPie(){
    if (currentChartType === 'pie') return;
    currentChartType = 'pie';
    chartContainer.innerHTML = '';
    let gradeData = getGradeDataByYear(data);
    console.log(data);
    console.log(gradeData);
    for (const index in gradeData){
        let chartConfig = getChartConfig(Object.keys(data[index].grades), [gradeData[index]], 'pie');
        addChart(chartContainer, chartConfig);
    }
}

function loadLine(){
    if (currentChartType === 'line') return;
    currentChartType = 'line';
    chartContainer.innerHTML = '';
    let gradeData = getGradeDataByGrade(data);
    let chartConfig = getChartConfig(data.map(entry => entry.year), gradeData, 'line');
    addChart(chartContainer, chartConfig);
}

function createButton(value){
    let button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    return button;
}

function createChartDiv(){
    let div = document.createElement('div');

    chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container')

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let barButton = createButton('Bar chart');
    let pieButton = createButton('Pie chart');
    let lineButton = createButton('Line chart');

    buttonContainer.appendChild(barButton);
    buttonContainer.appendChild(pieButton);
    buttonContainer.appendChild(lineButton);

    div.appendChild(chartContainer);
    div.appendChild(buttonContainer);

    barButton.addEventListener('click', loadBar);
    pieButton.addEventListener('click', loadPie);
    lineButton.addEventListener('click', loadLine);

    currentChartType = 'bar';
    loadBar();

    return div
}

let trigChart;

function createSinusGraph(container){
    container.innerHTML = '';
    let chartConfig = getChartConfig([], serverData, 'line');
    trigChart = addChart(container, chartConfig);
}

const serverUrl = 'https://old.iolab.sk/evaluation/sse/sse.php'
let stopped = false;
let serverData = [
    {
        label: "Sine",
        data: []
    },
    {
        label: "Cosine",
        data: []
    }
];

var eventSource = new EventSource(serverUrl);

eventSource.onmessage = function(event) {
    // Process the received data
    if (!stopped) {
        let responseData = JSON.parse(event.data);
        serverData[0].data.push(responseData.y1 * amplitude);
        serverData[1].data.push(responseData.y2 * amplitude);
        trigChart.data.labels.push(serverData[0].data.length - 1);
        trigChart.update();
    }
}

eventSource.onerror = function(event) {
    console.error("Error occurred:", event);
};

let absoluteStop = false;
function fullStop(){
    stop();
    absoluteStop = true;

    trigChart.options.plugins.zoom.zoom.wheel.enabled = true;
    trigChart.options.plugins.zoom.zoom.pinch.enabled = true;

    trigChart.update();
}

function stop(){
    stopped = true;
}

function start(){
    if (absoluteStop) return;
    stopped = false;
}

let amplitude = 1;
function changeAmplitude(event){
    amplitude = event.detail.value;
}

let currentSine = false;
function handleSine(){
    currentSine = !currentSine;
    trigChart.data.datasets[0].hidden = currentSine;
    trigChart.update();
}

let currentCosine = false;
function handleCosine(){
    currentCosine = !currentCosine;
    trigChart.data.datasets[1].hidden = currentCosine;
    trigChart.update();
}

function createCheckboxEntry(labelText, checked){
    let container = document.createElement('div');
    container.classList.add('checkbox-entry');

    let sineCheck = document.createElement('input');
    sineCheck.type = 'checkbox';
    sineCheck.checked = checked;
    sineCheck.id = labelText;

    let label = document.createElement('label');
    label.innerText = labelText;
    label.setAttribute('for', sineCheck.id);

    container.appendChild(sineCheck);
    container.appendChild(label);

    return container;
}

function createSinusDiv(){
    let div = document.createElement('div');

    let sinusContainer = document.createElement('div');
    sinusContainer.classList.add('sinus-container')

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let stopButton = createButton('Stop');

    let slider = document.createElement('range-slider');
    slider.addEventListener('valueChange', changeAmplitude);

    let checkboxContainer = document.createElement('div');

    let sineCheck = createCheckboxEntry('Sine', true);
    let cosineCheck = createCheckboxEntry('Cosine', true);

    sineCheck.addEventListener('change', handleSine);
    cosineCheck.addEventListener('change', handleCosine);

    checkboxContainer.appendChild(sineCheck);
    checkboxContainer.appendChild(cosineCheck);

    buttonContainer.appendChild(stopButton);
    buttonContainer.appendChild(slider);
    buttonContainer.appendChild(checkboxContainer);

    div.appendChild(sinusContainer);
    div.appendChild(buttonContainer);

    stopButton.addEventListener('click', fullStop);

    createSinusGraph(sinusContainer);
    return div;
}

function cleanDiv(){
    if (currentMode === 'trig'){
        mainDiv.getElementsByTagName('range-slider')[0].clearShadowRoot();
    }
    appRoot.removeChild(mainDiv);
}

function handleGradeMode(){
    if (currentMode === 'grade') return;
    gradesLink.classList.add('active');
    trigLink.classList.remove('active');
    cleanDiv();
    mainDiv = gradeModeDiv;
    appRoot.appendChild(mainDiv);

    currentMode = 'grade';
}

function handleTrigMode(){
    if (currentMode === 'trig') return;
    trigLink.classList.add('active');
    gradesLink.classList.remove('active');
    cleanDiv();
    mainDiv = sinusModeDiv;
    appRoot.appendChild(mainDiv);
    currentMode = 'trig';
}

let appRoot;
let mainDiv;
let gradeModeDiv;
let sinusModeDiv;
let currentMode;
let smallScreen = false;
let gradesLink;
let trigLink;

window.onload = function () {
    let xmlDOM = parseXMLFile("./z03.xml");
    data = organizeXMLData(xmlDOM);

    appRoot = document.getElementById("appRoot");

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    gradesLink = document.getElementById('grades-link');
    trigLink = document.getElementById('trig-link');
    gradesLink.addEventListener('click', handleGradeMode);
    trigLink.addEventListener('click', handleTrigMode);

    smallScreen = window.innerWidth < 500;
    if (smallScreen){
        axis = 'y';
    }

    gradeModeDiv = createChartDiv();
    sinusModeDiv = createSinusDiv();
    mainDiv = gradeModeDiv;

    appRoot.appendChild(mainDiv);
    currentMode = 'grade';
    start();
}

function changeOrientation(){
    if (currentChartType === 'bar'){
        currentChartType = 'horizontalBar';
        axis = 'y';
        loadBar();
    }
    else if (currentChartType === 'horizontalBar'){
        currentChartType = 'bar';
        axis = 'x';
        loadBar();
    }
    else {

    }
}

window.onresize = function (){
    let old = smallScreen;
    smallScreen = window.innerWidth < 500;
    if (old !== smallScreen){
        changeOrientation();
    }
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}