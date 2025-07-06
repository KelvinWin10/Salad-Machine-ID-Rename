const list = document.getElementById("machine-list");
const addBtn = document.getElementById("add-btn");

function loadMachines() {
  chrome.storage.local.get("machines", ({ machines = {} }) => {
    showMachines(machines);
  });
}

function saveMachines(machines) {
  chrome.storage.local.set({ machines });
}

function showMachines(machines) {
  list.innerHTML = "";
  Object.entries(machines).forEach(([id, name]) => {
    const li = document.createElement("li");

    const idInput = document.createElement("input");
    idInput.type = "text";
    idInput.value = id;
    idInput.title = "Machine ID";
    idInput.addEventListener("change", () => {
      const newId = idInput.value.trim();
      if (!newId) return alert("Machine ID can't be empty");
      if (newId !== id) {
        delete machines[id];
        machines[newId] = nameInput.value;
        saveMachines(machines);
        loadMachines();
      }
    });

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = name;
    nameInput.title = "Machine name";
    nameInput.addEventListener("change", () => {
      machines[idInput.value] = nameInput.value;
      saveMachines(machines);
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑";
    delBtn.title = "Delete machine";
    delBtn.addEventListener("click", () => {
      delete machines[idInput.value];
      saveMachines(machines);
      loadMachines();
    });

    li.append(idInput, nameInput, delBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  chrome.storage.local.get("machines", ({ machines = {} }) => {
    let newId = "new_machine_id";
    let i = 1;
    while (machines[newId]) {
      newId = `new_machine_id_${i++}`;
    }
    machines[newId] = "New Machine Name";
    saveMachines(machines);
    loadMachines();
  });
});


loadMachines();
