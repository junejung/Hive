function findHexWithWidthAndHeight() {
  var width = 100;
  var height = 86;


  var y = height / 2.0;

  //solve quadratic
  var a = -3.0;
  var b = (-2.0 * width);
  var c = (Math.pow(width, 2)) + (Math.pow(height, 2));

  var z = (-b - Math.sqrt(Math.pow(b, 2) - (4.0 * a * c))) / (2.0 * a);

  var x = (width - z) / 2.0;

  var contentDiv = document.getElementById("hexStatus");


  HT.Hexagon.Static.WIDTH = width;
  HT.Hexagon.Static.HEIGHT = height;
  HT.Hexagon.Static.SIDE = z;
}

function drawHexGrid() {
  grid = new HT.Grid(800, 600);
  var canvas = document.getElementById("hexCanvas");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 800, 600);
  for(var h in grid.Hexes) {
    grid.Hexes[h].draw(ctx);
  }
}

function getHexGridZR() {
  findHexWithSideLengthZAndRatio();
  drawHexGrid();
}

function getHexGridWH() {
  findHexWithWidthAndHeight();
  drawHexGrid();
}

function changeOrientation() {

  HT.Hexagon.Static.ORIENTATION = HT.Hexagon.Orientation.Rotated;

  drawHexGrid();
}

function debugHexZR() {
  findHexWithSideLengthZAndRatio();
  addHexToCanvasAndDraw(20, 20);
}

function debugHexWH() {
  findHexWithWidthAndHeight();
  addHexToCanvasAndDraw(20, 20);
}

function addHexToCanvasAndDraw(x, y) {
  HT.Hexagon.Static.DRAWSTATS = true;
  var hex = new HT.Hexagon(null, x, y);

  var canvas = document.getElementById("hexCanvas");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 800, 600);
  hex.draw(ctx);
}

hexCanvas = document.getElementById("hexCanvas")
hexCanvas.addEventListener("click", hexOnClick, false);

function hexOnClick(e) {
  var cell = getCursorPosition(e);

}

function getCursorPosition(e) {
  var x;
  var y;
  if(e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  console.log(x, y)
  globalPoint = new HT.Point(x, y)
  console.log(grid.GetHexAt(globalPoint).Id)
  console.log(grid.GetHexAt(globalPoint))
  // grid.GetHexAt(globalPoint).selected = true;
  console.log(grid.GetHexAt(globalPoint))
}
