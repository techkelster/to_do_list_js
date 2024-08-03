const button = document.getElementById("add_but");

button.addEventListener("click", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = document.getElementById("task").value;

  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
    document.getElementById("task").value = ""; // Clear the input field after adding
  }
});

function displayTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const listParent = document.getElementById("list_parent");
  listParent.innerHTML = ""; // Clear the list before re-rendering

  tasks.forEach((taskContent, index) => {
    const addedTask = document.createElement("div");
    addedTask.classList.add("added_task");

    const theTask = document.createElement("p");
    theTask.classList.add("the_task");
    theTask.textContent = taskContent;

    addedTask.appendChild(theTask);

    const controls = document.createElement("div");
    controls.classList.add("controls");

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.classList.add("edit");
    deleteButton.classList.add("delete");

    editButton.addEventListener("click", () => taskEdit(index));
    deleteButton.addEventListener("click", () => taskDelete(index));

    controls.appendChild(editButton);
    controls.appendChild(deleteButton);

    addedTask.appendChild(controls);
    listParent.appendChild(addedTask);
  });
}

function taskEdit(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = prompt("Input the new note", tasks[index]);

  if (newTask) {
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Note Successfully edited");
    displayTask();
  } else {
    alert("You submitted nothing");
  }
}

function taskDelete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask();
}

displayTask();
