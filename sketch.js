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
  
const lineSpec = {
  mercury: { w: 1.0,  col: color(30, 30, 30,  80) },   // 太め・濃いグレイ
  venus:   { w: 0.9,  col: color(60, 60, 60,  60) },
  mars:    { w: 0.5,  col: color(120,120,120,40) }      // 細く・薄い
};

const pointSpec = {
  sun:     { w: 4, col: color(255,120,0 ,150) },        // アクセントの強色
  mercury: { w: 2, col: color(50)            },         // グレイ
  venus:   { w: 2, col: color(80)            },
  mars:    { w: 2, col: color(120)           }
};
  
  // 線分（太陽→惑星）
strokeWeight(lineSpec.mars.w);     stroke(lineSpec.mars.col);     line(sunApp.x, sunApp.y, marsApp.x, marsApp.y);
strokeWeight(lineSpec.venus.w);    stroke(lineSpec.venus.col);    line(sunApp.x, sunApp.y, venusApp.x, venusApp.y);
strokeWeight(lineSpec.mercury.w);  stroke(lineSpec.mercury.col);  line(sunApp.x, sunApp.y, mercuryApp.x, mercuryApp.y);

  // 線分（太陽↔観測者）
  stroke(255,255,255,15);
  line(0, 0, sunApp.x, sunApp.y);

  // 点
//strokeWeight(pointSpec.sun.w);     stroke(pointSpec.sun.col);     point(sunApp.x, sunApp.y);
strokeWeight(pointSpec.mercury.w); stroke(100,100,100); point(mercuryApp.x, mercuryApp.y);
strokeWeight(pointSpec.venus.w);     stroke(0,100,255);   point(venusApp.x, venusApp.y);
strokeWeight(pointSpec.mars.w);    stroke(200,0,0);     point(marsApp.x, marsApp.y);


  t += 1;
}
