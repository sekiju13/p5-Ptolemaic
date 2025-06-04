let t = 0;
let observer;

const observerRadius = 200;
const mercuryRadius  = 70;
const venusRadius    = 100;
const marsRadius     = 300;

// 公転角速度 (TWO_PI / 日数)
const observerSpeed = TWO_PI / 365.0;
const mercurySpeed  = TWO_PI / 88.0;
const venusSpeed    = TWO_PI / 225.0;
const marsSpeed     = TWO_PI / 687.0;

function setup() {
  createCanvas(1000, 800);
  background(255);
  frameRate(60);
  observer = createVector(0, 0);
}

function draw() {
  // 観測者（視点）の円運動
  const obsX = observerRadius * cos(t * observerSpeed);
  const obsY = observerRadius * sin(t * observerSpeed);
  observer.set(obsX, obsY);

  translate(width / 2, height / 2);

  // 太陽
  const sun = createVector(0, 0);

  // 惑星
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
  stroke(200, 0, 0, 10);     line(sunApp.x, sunApp.y, marsApp.x, marsApp.y);
  stroke(0, 100, 255, 10);   line(sunApp.x, sunApp.y, venusApp.x, venusApp.y);
  stroke(100, 100, 100, 10); line(sunApp.x, sunApp.y, mercuryApp.x, mercuryApp.y);

  // 太陽↔視点
  stroke(255, 255, 255, 10);
  line(0, 0, sunApp.x, sunApp.y);

  // 点
  strokeWeight(2);
  stroke(255, 165, 0);   point(sunApp.x, sunApp.y);
  stroke(100, 100, 100); point(mercuryApp.x, mercuryApp.y);
  stroke(0, 100, 255);   point(venusApp.x, venusApp.y);
  stroke(200, 0, 0);     point(marsApp.x, marsApp.y);

  t += 1;        // 時間更新
}
