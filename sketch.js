let t = 0;
let observer;
let observerRadius = 200;
let mercuryRadius = 70;
let venusRadius = 100;
let marsRadius = 300;

let observerSpeed = TWO_PI / 365.0;
let mercurySpeed = TWO_PI / 88.0;
let venusSpeed = TWO_PI / 225.0;
let marsSpeed = TWO_PI / 687.0;

function setup() {
  createCanvas(1000, 800);
  background(255);
  frameRate(60);
  observer = createVector(0, 0);
}

function draw() {
  let obsX = observerRadius * cos(t * observerSpeed);
  let obsY = observerRadius * sin(t * observerSpeed);
  observer.set(obsX, obsY);

  translate(width / 2, height / 2);

  let sun = createVector(0, 0);
  let mercury = createVector(mercuryRadius * cos(t * mercurySpeed), mercuryRadius * sin(t * mercurySpeed));
  let venus   = createVector(venusRadius * cos(t * venusSpeed), venusRadius * sin(t * venusSpeed));
  let mars    = createVector(marsRadius * cos(t * marsSpeed), marsRadius * sin(t * marsSpeed));

  let sunApp     = p5.Vector.sub(sun, observer);
  let mercuryApp = p5.Vector.sub(mercury, observer);
  let venusApp   = p5.Vector.sub(venus, observer);
  let marsApp    = p5.Vector.sub(mars, observer);

  strokeWeight(1);
  stroke(200, 0, 0, 10); line(sunApp.x, sunApp.y, marsApp.x, marsApp.y);
  stroke(0, 100, 255, 10); line(sunApp.x, sunApp.y, venusApp.x, venusApp.y);
  stroke(100, 100, 100, 10); line(sunApp.x, sunApp.y, mercuryApp.x, mercuryApp.y);

  stroke(255, 255, 255, 10);
  line(0, 0, sunApp.x, sunApp.y);

  strokeWeight(2);
  stroke(255, 165, 0); point(sunApp.x, sunApp.y);
  stroke(100, 100, 100); point(mercuryApp.x, mercuryApp.y);
  stroke(0, 100, 255); point(venusApp.x, venusApp.y);
  stroke(200, 0, 0); point(marsApp.x, marsApp.y);

  t += 1;
}
