const tasks = [
    "Pray Fajr",
    "Pray Dhuhr",
    "Pray Asr",
    "Pray Maghrib",
    "Pray Isha",
    "Read Quran (10 minutes)",
    "Help a neighbor"
];

let dayRecords = {};

document.addEventListener("DOMContentLoaded", function () {
    initializeDays();
    loadTasks();
    updateDayRecord();
});

function initializeDays() {
    const daySelector = document.getElementById("daySelector");
    daySelector.innerHTML = ""; // Clear existing options
    for (let i = 1; i <= 30; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Day ${i}`;
        daySelector.appendChild(option);
    }
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} 
                        <button class="remove" onclick="removeTask(${index})">Remove</button>`;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText !== "") {
        tasks.push(taskText);
        loadTasks();
        input.value = "";
        updateDayRecord(); // Update day record to include the new task
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    loadTasks();
    updateDayRecord(); // Update day record after removing a task
}

function updateDayRecord() {
    let selectedDay = document.getElementById("daySelector").value;
    const recordContainer = document.getElementById("recordContainer");
    recordContainer.innerHTML = ""; // Clear existing content

    // Initialize day record if it doesn't exist
    if (!dayRecords[selectedDay]) {
        dayRecords[selectedDay] = {};
    }
    
    // Create the checkboxes for the selected day
    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task-item";
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = dayRecords[selectedDay][task] || false;
        checkbox.onchange = function() {
            dayRecords[selectedDay][task] = checkbox.checked;
        };

        div.appendChild(checkbox);
        div.appendChild(document.createTextNode(` ${task}`));
        recordContainer.appendChild(div);
    });
}