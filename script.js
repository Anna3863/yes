// simple graph (you'll expand this later)
const graph = {
  "101": { next: ["102"], svg: "room-101" },
  "102": { next: ["101", "103"], svg: "room-102" },
  "103": { next: ["102"], svg: "room-103" },
  "stairs": { next: ["101"], svg: "stairs-middle" },
  "music": { next: ["stairs"], svg: null }
};

const startRoom = "101";

function findRoute() {
  const target = document.getElementById("roomInput").value.trim();
  if (!graph[target]) {
    document.getElementById("instructions").innerText = "Room not found.";
    return;
  }

  const queue = [[startRoom]];
  const visited = new Set([startRoom]);

  while (queue.length) {
    const path = queue.shift();
    const last = path[path.length - 1];

    if (last === target) {
      showInstructions(path);
      drawPath(path);
      return;
    }

    for (const n of graph[last].next) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push([...path, n]);
      }
    }
  }
}

function showInstructions(path) {
  document.getElementById("instructions").innerText =
    "Go through: " + path.join(" → ");
}

function drawPath(path) {
  const coords = path
    .map(p => graph[p].svg)
    .filter(id => id)
    .map(id => {
      const el = document.getElementById(id);
      const x = el.x.baseVal.value + el.width.baseVal.value / 2;
      const y = el.y.baseVal.value + el.height.baseVal.value / 2;
      return `${x},${y}`;
    });

  document.getElementById("routePath")
    .setAttribute("d", "M " + coords.join(" L "));
}
