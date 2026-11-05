let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function show() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    let texto = document.createElement("span");
    texto.textContent = tasks[i].text;
    li.appendChild(texto);

    if (tasks[i].done) {
      li.classList.add("done");
    }

    li.onclick = function () {
      tasks[i].done = !tasks[i].done;
      save();
      show();
    };

    let btn = document.createElement("button");
    btn.textContent = "✕";
    btn.title = "Remover tarefa";
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
  let texto = input.value.trim();

  if (texto === "") return;

  tasks.push({
    text: texto,
    done: false
  });

  input.value = "";
  input.focus();
  save();
  show();
}

document.getElementById("task").addEventListener("keydown", function (e) {
  if (e.key === "Enter") add();
});

show();