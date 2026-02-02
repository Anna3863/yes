alert("JS LOADED");


const rooms = ["101", "102", "103", "104", "105", "music"];
let selected = null;

function selectRoom(room) {
  document.querySelectorAll(".room").forEach(r =>
    r.classList.remove("selected")
  );

  const el = [...document.querySelectorAll(".room")]
    .find(g => g.textContent.trim() === room);

  if (el) el.classList.add("selected");

  selected = room;
  document.getElementById("info").innerText =
    "Selected classroom: " + room;

  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("search").value = room;
}

function updateSuggestions() {
  const value = document.getElementById("search").value.toLowerCase();
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  if (!value) return;

  rooms
    .filter(r => r.includes(value))
    .forEach(r => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.innerText = r;
      div.onclick = () => selectRoom(r);
      box.appendChild(div);
    });
}

