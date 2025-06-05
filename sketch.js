let t = 0;
let observer;

/* ========== 基準値 ========== */
const AU = 140;            // 地球=1AU を 140px と想定
const R_OBS  = AU;         // observer
const R_MERC = AU * 0.39;  // Mercury
const R_VEN  = AU * 0.72;  // Venus
const R_MARS = AU * 1.52;  // Mars

let scaleF;                // 画面に合わせたスケール係数

let observerSpeed;
let mercurySpeed;
let venusSpeed;
let marsSpeed;

function setup() {
 const w = min(windowWidth, 1000);   // 上限1000
  const h = w * 0.8;                  // 800 : 1000 = 0.8
  createCanvas(w, h);
   background('#FAFAFA'); 
  frameRate(60);
   calcScale(); 
  observer = createVector(0, 0);

  observerSpeed = TWO_PI / 365.0;
  mercurySpeed  = TWO_PI / 88.0;
  venusSpeed    = TWO_PI / 225.0;
  marsSpeed     = TWO_PI / 687.0;
}

function windowResized(){
  const w = min(windowWidth, 1000);
  const h = w * 0.8;
   calcScale();   
  resizeCanvas(w, h);
}

function calcScale(){
  const margin = 40;                               // 四辺の余白(px)
  const maxLogicalRadius = R_OBS + R_MARS;         // ＝140+213=353
  const avail = (min(windowWidth, windowHeight) - margin) / 2;
  scaleF = avail / maxLogicalRadius;               // 係数(0〜1)
}

function draw() {
    /* ---- フェード背景 ---- */
  noStroke();
  fill(250, 250, 250, 3);  // 薄いオフホワイト
  rect(0, 0, width, height);
  
  // 観測者の円運動（論理半径×スケール）
  const obsX = R_OBS * scaleF * cos(t * observerSpeed);
  const obsY = R_OBS * scaleF * sin(t * observerSpeed);
  observer.set(obsX, obsY);

  translate(width / 2, height / 2);

  // 太陽と惑星
  const sun     = createVector(0, 0);
  const mercury = createVector(R_MERC*scaleF*cos(t*mercurySpeed),
                               R_MERC*scaleF*sin(t*mercurySpeed));
  const venus   = createVector(R_VEN *scaleF*cos(t*venusSpeed),
                               R_VEN *scaleF*sin(t*venusSpeed));
  const mars    = createVector(R_MARS*scaleF*cos(t*marsSpeed),
                               R_MARS*scaleF*sin(t*marsSpeed));

  // 観測者視点へ変換
  const sunApp     = p5.Vector.sub(sun, observer);
  const mercuryApp = p5.Vector.sub(mercury, observer);
  const venusApp   = p5.Vector.sub(venus, observer);
  const marsApp    = p5.Vector.sub(mars, observer);
  
const lineSpec = {
  mercury: { w: 0.9, col: color( 80,150,255, 90) }, // Lt-blue
  venus:   { w: 0.8, col: color(255,200,  0, 90) }, // Yellow
  mars:    { w: 0.5, col: color(230,  0,  0, 30) }  // Red
};


const pointSpec = {
  sun:     { w: 0.8, col: color(255) },
  mercury: { w: 1.5,   col: color(255) },
  venus:   { w: 1.5,   col: color(255) },
  mars:    { w: 1.5,   col: color(255) } 
};

  // 線分（太陽↔惑星）
strokeWeight(lineSpec.mars.w);    stroke(lineSpec.mars.col);    line(sunApp.x,sunApp.y, marsApp.x,marsApp.y);
strokeWeight(lineSpec.venus.w);   stroke(lineSpec.venus.col);   line(sunApp.x,sunApp.y, venusApp.x,venusApp.y);
strokeWeight(lineSpec.mercury.w); stroke(lineSpec.mercury.col); line(sunApp.x,sunApp.y, mercuryApp.x,mercuryApp.y);

  
  // 線分（太陽↔観測者）
  stroke(255,255,255,20);
  line(0, 0, sunApp.x, sunApp.y);

  push();
blendMode(ADD);      // ここから加算合成

  // 点
strokeWeight(pointSpec.sun.w);     stroke(pointSpec.sun.col);     point(sunApp.x, sunApp.y);
strokeWeight(pointSpec.mercury.w); stroke(pointSpec.mercury.col);     point(mercuryApp.x, mercuryApp.y);
strokeWeight(pointSpec.venus.w);    stroke(pointSpec.venus.col);    point(venusApp.x, venusApp.y);
strokeWeight(pointSpec.mars.w);   stroke(pointSpec.mars.col);     point(marsApp.x, marsApp.y);

pop();               // blendMode を元に戻す



  t += 1;
}
