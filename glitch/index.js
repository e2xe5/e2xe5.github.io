function listFileNames(dir) {
  let file = new File(dir);
  if (file.isDirectory())
    return file.list();
  else
    return null;
}
let a;
let action;

function preload() {
  a = ['data/a_GlobusOblique.TTF', 'data/bedrockc.ttf', 'data/HeatherScriptOne.ttf', 'data/GardensC.otf', 'data/data.pde', 'data/aksent.Ttf', 'data/camp.TTF', 'data/a_BighausTitul.TTF', 'data/Archive.otf', 'data/quake.TTF', 'data/bagira.ttf', 'data/delph.TTF', 'data/20_db.otf'];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  action = true;
  for (let i = 0; i < a.length; i++)
    a[i] = loadFont(a[i]);
}

function mouseClicked() {
  action = !action;
}

function draw() {
  if (random(1) < 0.60) background(0);
  if (action) {
    if (random(1) < 0.10) fill(0, 2, 242, 255);
    else if (random(1) < 0.10) fill(255, 84, 0, 255);
    if (random(1) < 0.40) textFont(a[Math.round(random(5))]);
    textSize(160);
    textAlign(CENTER, BOTTOM);
    text("Посвят ФПМИ", width / 2, height * 0.45);
    textSize(120);
    textAlign(CENTER, TOP);
    text("07.10.19", width / 2, height * 0.65);
  }
  if (random(1) < 0.8)
    for (let i = 0; i < int(random(20) + 10); i++) {
      let x0 = random(0.9 * width);
      let x1 = random(0.2 * width);
      let y0 = (height * 0.3 + random(0.4 * height));
      let y1 = (random(30) + 10);
      push();
      translate(random(6) - 3, random(6) - 3);
      fill(0);
      if (random(1) < 0.70) rect(x0 + Math.round(random(5) - 2.5) * random(40) - 20, y0 + random(40) - 20, x1, y1);
      copy(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1),
        Math.round(x0 + random(5) - 2.5 * random(40) - 20), Math.round(y0 + random(40) - 20), Math.round(x1), Math.round(y1));
      pop();
    }
  stroke(10);
  let step = Math.round(random(3) + 2);
  for (let i = 0; i < height / step; i++)
    line(0, frameCount % step + i * step, width, frameCount % step + i * step);
  fill(255, 255, 255);
  noStroke();

  if ((!action) || (random(1) < 0.1)) {
    fill(0, 2, 242, Math.round(10));
    let div = Math.round(random(12) + 2);
    let sx = random(8) + 1;
    let sy = random(1) + 1;
    for (let x = 0; x < width; x += div)
      for (let y = 0; y < height; y += div) {
        rect(x, y, sx, sy);
        if (random(1) < 0.1) fill(0, 2, 242, Math.round(random(20) + 10));
        else if (random(1) < 0.1) fill(255, 84, 0, Math.round(random(20) + 10));
        else if (random(1) < 0.1) fill(0, 0, 0, 20);
      }
    fill(255);
  }

}
