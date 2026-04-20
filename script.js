window.onload = function () {
    loadTasks();
};

function addTask() {
    let task = document.getElementById("taskInput").value;
    let desc = document.getElementById("descInput").value;
    let detail = document.getElementById("detailInput").value;

    if (task === "") return;

    let taskObj = { task, desc, detail };

    createTaskElement(taskObj);
    saveTask(taskObj);

    document.getElementById("taskInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("detailInput").value = "";
}

function createTaskElement(taskObj) {
    let li = document.createElement("li");

    li.innerHTML = `
        <div class="task-title">${taskObj.task}</div>
        <div class="task-subtitle">${taskObj.desc}</div>
        <div class="task-detail">${taskObj.detail}</div>
    `;

    // complete
    li.onclick = function () {
        li.style.textDecoration = "line-through";
    };

    // delete
    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        removeTask(taskObj);
    };

    li.appendChild(btn);

    document.getElementById("taskList").appendChild(li);
}

// Save
function saveTask(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Remove
function removeTask(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t =>
        t.task !== taskObj.task ||
        t.desc !== taskObj.desc ||
        t.detail !== taskObj.detail
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}