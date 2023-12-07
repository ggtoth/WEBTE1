let employees = [];
let employeeElements = [];
let clickedZobraz = false;
let maxId;

function handleZobraz(){
    if(!clickedZobraz){
        fillEmployees();
    }
    clickedZobraz = true;
}

function handleElementClick(event){
    let text;
    let button;
    employeeElements.forEach(function(elem){
        if (elem.element === event.currentTarget){
            text = elem.span;
            button = elem.button;
        }
    });

    text.style.textDecoration = 'line-through';
    button.style.display = "block";
}

function handleRemove(event){
    event.stopPropagation();
    let employee;
    let toRemove;
    employeeElements.forEach(function(elem){
        if (elem.button === event.currentTarget){
            employee = elem.employee;
            toRemove = elem;
        }
    });

    let index = employees.indexOf(employee);
    if (index !== -1) {
        employees.splice(index, 1);
    }

    try{
        document.getElementById('small-salary').removeChild(toRemove.element);
    }
    catch (e){

    }
    try{
        document.getElementById('big-salary').removeChild(toRemove.element);
    }
    catch (e){

    }

    employeeElements.splice(employeeElements.indexOf(toRemove), 1);
}

function fillEmployees(){
    let lowPay = document.getElementById('small-salary');
    let highPay = document.getElementById('big-salary');
    for (let element of employees){
        let employeeElement = document.createElement('div');
        employeeElement.classList.add('employee-element');

        let employeeText = document.createElement('span');
        employeeText.innerText = `${element.id}. ${element.name} ${element.surname} -- datum nar.: ${element.birthday} - plat: ${element.salary} Eur.`;

        let removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.style.display = 'none';
        removeButton.innerText = 'Remove';

        removeButton.addEventListener('click', handleRemove);

        employeeElement.appendChild(employeeText);
        employeeElement.appendChild(removeButton);
        employeeElements.push({
           "employee": element,
           "element": employeeElement,
           "span": employeeText,
           "button": removeButton
        });

        employeeElement.addEventListener('click', handleElementClick);

        if (element.salary >= 2000){
            highPay.appendChild(employeeElement);
        }
        else{
            lowPay.appendChild(employeeElement);
        }
    }
}

function addEmployee(){
    let name = document.getElementById('name-input');
    let datum = document.getElementById('date-input');
    let salary = document.getElementById('salary-input');

    if (name.value === "" || datum.value === "" || salary.value === ""){
        return
    }

    let element = {"id" : maxId + 1,
        "name" : name.value,
        "surname" : "",
        "birthday": datum.value,
        "salary": salary.value
}
    maxId++;
    employees.push(element
      );

    let lowPay = document.getElementById('small-salary');
    let highPay = document.getElementById('big-salary');
        let employeeElement = document.createElement('div');
        employeeElement.classList.add('employee-element');

        let employeeText = document.createElement('span');
        employeeText.innerText = `${element.id}. ${element.name} ${element.surname} -- datum nar.: ${element.birthday} - plat: ${element.salary} Eur.`;

        let removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.style.display = 'none';
        removeButton.innerText = 'Remove';

        removeButton.addEventListener('click', handleRemove);

        employeeElement.appendChild(employeeText);
        employeeElement.appendChild(removeButton);
        employeeElements.push({
            "employee":  element,
            "element": employeeElement,
            "span": employeeText,
            "button": removeButton
        });

        employeeElement.addEventListener('click', handleElementClick);

        if (element.salary >= 2000){
            highPay.appendChild(employeeElement);
        }
        else{
            lowPay.appendChild(employeeElement);
        }
        name.value = ""; datum.value = ""; salary.value = "";
}

window.onload = function (){
    fetch('./employees.json')
        .then(response => response.json())
        .then(content => {
            employees = content.employees;
            document.getElementById('show-button').addEventListener('click', handleZobraz);
            maxId = employees.length;
        })
        .catch(error => console.error('Error fetching JSON:', error));

    document.getElementById('append-button').addEventListener('click', addEmployee)
}