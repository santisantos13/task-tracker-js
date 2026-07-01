let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function show() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    li.textContent = tasks[i].text;

    if (tasks[i].done) {
      li.classList.add("done");
    }

    li.onclick = function () {
      tasks[i].done = !tasks[i].done;
      save();
      show();
    };

    let btn = document.createElement("button");
    btn.innerText = "x";

    btn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(i, 1);
      save();
      show();
    };

    li.appendChild(btn);
    list.appendChild(li);
  }
}

function add() {
  let input = document.getElementById("task");

  if (input.value === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  save();
  show();
}

show();