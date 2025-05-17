let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from local storage

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to local storage
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onChange="toggleTaskComplete(${index})"/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./assets/img/edit.png" onClick="editTask(${index})"/>
                    <img src="./assets/img/bin.png" onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

window.onload = () => {
    updateTasksList();
    updateStats();
};
