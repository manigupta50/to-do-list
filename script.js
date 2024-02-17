let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function showNotification(e) {
    alert(e);
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.done ? 'checked' : ''}>
        <label for="${task.id}">${task.text}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function(task) {
        return task.id === taskId;
    });

    if(task.length > 0) {
        const currTask = task[0];
        currTask.done = !currTask.done;
        renderList();
        showNotification('Task Toggled Successfully');
        return;
    }

    showNotification('Was not Able to Toggle the Task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    tasks = newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
}

function addTask(task) {
    if(task) {
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }

    showNotification('Task can not be Added');
    
}

function handleInputKeypress(e) {

    if(e.key === 'Enter') {
        const text = e.target.value;
        // console.log('text: ' + text);

        if(!text) {
            showNotification('Task Text Cannot be Empty');
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleOnClick(e) {
    const target = e.target;

    if(target.className === 'delete') {

        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if(target.className === 'custom-checkbox') {

        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleOnClick);
}

initializeApp();

