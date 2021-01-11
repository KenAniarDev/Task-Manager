// DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    // DOM LOAD EVENT 
    document.addEventListener('DOMContentLoaded', getTasks);
    // ADD TASK EVENT LISTENER
    form.addEventListener('submit', addTask);

    // ADD REMOVE TASK EVENT LISTENER
    taskList.addEventListener('click', removeTask);

    // ADD CLEAR TASK EVENT LISTENER
    clearBtn.addEventListener('click', clearTask);

    // FILTER TASK EVENT LISTENER
    filter.addEventListener('keyup', filterTask);
}

function addTask(e) {

    if(taskInput.value === ''){
        alert('Add a task');
    }else {
        // CREATE LI ELEMENT
        const li = document.createElement('li');
        // ADD CLASS
        li.className = 'collection-item';
        // CREATE TEXTNODE AND APPEND TO LI
        li.appendChild(document.createTextNode(taskInput.value));
        // CREATE NEW LINK ELEMENT
        const link = document.createElement('a');
        // ADD CLASS
        link.className = 'delete-item secondary-content';
        // ADD ICON HTML
        link.innerHTML = '<i class="fas fa-times"></i>';
        // APPEND THE LINK INTO LINK
        li.appendChild(link);
        // APPEND LI TO UL
        taskList.appendChild(li);
        // CLEAR TASK INPUTS
      
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }    
    

    e.preventDefault();
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        // ADD CLASS
        li.className = 'collection-item';
        // CREATE TEXTNODE AND APPEND TO LI
        li.appendChild(document.createTextNode(task));
        // CREATE NEW LINK ELEMENT
        const link = document.createElement('a');
        // ADD CLASS
        link.className = 'delete-item secondary-content';
        // ADD ICON HTML
        link.innerHTML = '<i class="fas fa-times"></i>';
        // APPEND THE LINK INTO LINK
        li.appendChild(link);
        // APPEND LI TO UL
        taskList.appendChild(li);
    });
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    console.log(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));   
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }




    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e) {


    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();

    e.preventDefault();
}
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value;  
    
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}