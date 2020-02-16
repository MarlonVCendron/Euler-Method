let bound;
// The amount of zoom to the graph
let zoomFactor = 50;
let slider;
let step;

function setup(){
  createCanvas(800,800);
  background(240);
  bound = width / zoomFactor;

  slider = createSlider(0.01, 3, 1, 0.01);
}

function draw(){
  background(240);
  step = slider.value();

  translate(width/2, height/2)
  scale(1,-1);

  drawTheFunction();

  let euler = Euler();

  stroke(200, 0, 50)
  for(let i = 1; i < euler.length; i++){
    line(euler[i-1][0], euler[i-1][1], euler[i][0], euler[i][1]);
  }
}

function Euler(){
  let points = [];
  // Takes a known value of the function (Could be any value)
  let prevY = theFunction(-bound/2);

  for (let i = -bound/2; i < bound; i+=step) {
    let slope = derivative(inverseFunction(prevY));
    let nextY = prevY + step * slope;

    points.push([i * zoomFactor, prevY * zoomFactor]);

    prevY = nextY;
  }

  return points;
}

function drawTheFunction(){
  strokeWeight(2);
  stroke(0);

  let prevX = -width/2 / zoomFactor;
  let prevY = theFunction(prevX);

  for (let i = -width/2; i < width/2; i+=0.1) {
    // Actual X and Y values
    let x = i / zoomFactor ;
    let y = theFunction(x);

    // X and Y values resized to fit the screen
    let displayX = x * zoomFactor;
    let displayY = y * zoomFactor;

    // Draw the graph
    point(displayX, displayY);
    // Makes a line between the previous values and the current values to avoid gaps
    line(prevX * zoomFactor, prevY * zoomFactor, displayX, displayY)

    prevX = x;
    prevY = y;
  }
}

function theFunction(x){
  return pow(Math.E, x);
}

function derivative(x){
  return pow(Math.E, x);
}

function inverseFunction(y){
  return Math.log(y);
}

// function theFunction(x){
//   return 1/x;
// }
//
// function derivative(x){
//   return -1 * Math.pow(x, -2);
// }
//
// function inverseFunction(y){
//   return 1/y;
// }

// function theFunction(x){
//   return Math.log(x);
// }
//
// function derivative(x){
//   return 1/x;
// }
//
// function inverseFunction(y){
//   return pow(Math.E, y);
// }

// function theFunction(x){
//   return Math.tan(x);
// }
//
// function derivative(x){
//   return pow(1/cos(x), 2);
// }
//
// function inverseFunction(y){
//   return Math.atan(y);
// }
