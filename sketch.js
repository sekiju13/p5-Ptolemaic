let t = 0;
let observer;

const AU = 140;           // 地球＝1=140px
const observerRadius = AU;
const mercuryRadius  = AU * 0.39;   // 55
const venusRadius    = AU * 0.72;   // 101
const marsRadius     = AU * 1.52;   // 213

let observerSpeed;
let mercurySpeed;
let venusSpeed;
let marsSpeed;

function setup() {
  createCanvas(1000, 800);
  background(255);
  frameRate(60);
  observer = createVector(0, 0);

  observerSpeed = TWO_PI / 365.0;
  mercurySpeed  = TWO_PI / 88.0;
  venusSpeed    = TWO_PI / 225.0;
  marsSpeed     = TWO_PI / 687.0;
}

function draw() {
  // 観測者の円運動
  const obsX = observerRadius * cos(t * observerSpeed);
  const obsY = observerRadius * sin(t * observerSpeed);
  observer.set(obsX, obsY);

  translate(width / 2, height / 2);

  // 太陽と惑星
  const sun     = createVector(0, 0);
  const mercury = createVector(mercuryRadius * cos(t * mercurySpeed),
                                mercuryRadius * sin(t * mercurySpeed));
  const venus   = createVector(venusRadius   * cos(t * venusSpeed),
                                venusRadius   * sin(t * venusSpeed));
  const mars    = createVector(marsRadius    * cos(t * marsSpeed),
                                marsRadius    * sin(t * marsSpeed));

  // 観測者視点へ変換
  const sunApp     = p5.Vector.sub(sun, observer);
  const mercuryApp = p5.Vector.sub(mercury, observer);
  const venusApp   = p5.Vector.sub(venus, observer);
  const marsApp    = p5.Vector.sub(mars, observer);

  // 線分
  strokeWeight(1);
  stroke(200, 0, 0, 10);   line(sunApp.x, sunApp.y, marsApp.x, marsApp.y);
  stroke(0, 100, 255, 10); line(sunApp.x, sunApp.y, venusApp.x, venusApp.y);
  stroke(100, 100, 100,10);line(sunApp.x, sunApp.y, mercuryApp.x, mercuryApp.y);

  // 太陽↔観測者
  stroke(255,255,255,10);
  line(0, 0, sunApp.x, sunApp.y);

  // 点
  strokeWeight(2);
  stroke(255,165,0);   point(sunApp.x, sunApp.y);
  stroke(100,100,100); point(mercuryApp.x, mercuryApp.y);
  stroke(0,100,255);   point(venusApp.x, venusApp.y);
  stroke(200,0,0);     point(marsApp.x, marsApp.y);

  t += 1;
}
