const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let paths = [];
let currentPath = [];

// Set initial canvas size and redraw on resize
function resizeCanvas() {
  // Save current drawing as image to restore after resize
  // (Optional: skip saving image and just redraw paths)
  
  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 2; // taller for scrolling
  
  redraw();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

ctx.strokeStyle = 'white';
ctx.lineWidth = 2;
ctx.lineCap = 'round';

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function getTouchPos(touch) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

// Mouse Events
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  currentPath = [];
  const pos = getMousePos(e);
  currentPath.push(pos);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const pos = getMousePos(e);
  currentPath.push(pos);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  if (currentPath.length > 0) {
    paths.push([...currentPath]);
  }
});

canvas.addEventListener('mouseleave', () => drawing = false);

// Touch Events
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  drawing = true;
  currentPath = [];
  const pos = getTouchPos(e.touches[0]);
  currentPath.push(pos);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!drawing) return;
  const pos = getTouchPos(e.touches[0]);
  currentPath.push(pos);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  drawing = false;
  if (currentPath.length > 0) {
    paths.push([...currentPath]);
  }
});

// Redraw all paths
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  for (const path of paths) {
    ctx.beginPath();
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();
  }
}

// Undo last stroke
function undoDraw() {
  if (paths.length > 0) {
    paths.pop();
    redraw();
  }
}

// Clear entire board
function clearBoard() {
  paths = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save to PDF
async function saveAsPDF() {
  const { jsPDF } = window.jspdf;

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportCtx = exportCanvas.getContext('2d');

  exportCtx.fillStyle = 'black';
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  exportCtx.drawImage(canvas, 0, 0);

  const imageData = exportCanvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('chalkboard.pdf');
}
