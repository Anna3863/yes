// Rooms per floor (example for floor 0 and 1)
const floors = {
  0: ["01","02","03","04","05","06","music"],
  1: ["101","102","103","104","105","106"]
};
let currentFloor = 0;
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

  floors[currentFloor]
    .filter(r => r.includes(value))
    .forEach(r => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.innerText = r;
      div.onclick = () => selectRoom(r);
      box.appendChild(div);
    });
}

// Floor switching
function prevFloor() {
  if(currentFloor > 0) {
    currentFloor--;
    document.getElementById("currentFloor").innerText = "Floor " + currentFloor;
    loadFloor(currentFloor);
  }
}

function nextFloor() {
  if(currentFloor < Object.keys(floors).length - 1) {
    currentFloor++;
    document.getElementById("currentFloor").innerText = "Floor " + currentFloor;
    loadFloor(currentFloor);
  }
}

// Load rooms for current floor (simplified)
function loadFloor(floor) {
  const svg = document.getElementById("map");
  svg.innerHTML = '<rect x="50" y="140" width="800" height="20" class="hallway"/>';
  floors[floor].forEach((room, i) => {
    const x = 60 + i*80;
    const y = 60;
    const g = document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("class","room");
    g.setAttribute("onclick",`selectRoom('${room}')`);

    const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute("x",x);
    rect.setAttribute("y",y);
    rect.setAttribute("width",60);
    rect.setAttribute("height",40);
    g.appendChild(rect);

    const text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x",x+30);
    text.setAttribute("y",y+20);
    text.setAttribute("dominant-baseline","middle");
    text.setAttribute("text-anchor","middle");
    text.textContent = room;
    g.appendChild(text);

    svg.appendChild(g);
  });
}

// Initialize first floor
loadFloor(currentFloor);
