let img;
let s;
let a = [];
let type = 1;
let done;
let SIMPVAL;
let NEGVAL;
let i = 0;
let n = 200;
let eps;
let depth = 10;
let np;
let lmax;
let lmax1;
let step;
let pix = [];
let canv;
let loaded = -1;
let croped = false;
var canvwidth = 1440;
let dx, dy;
let dx1 = 0;
let dy1 = 0;
let rdx = [];
let rdy = [];
var crop_button;
var load_button;
let rx = [];
let ry = [];
let rx0;
let ry0;
let rx1;
let ry1;
let resized;
let m = [];
let changed;
let w1;
let scale1;
let scale = 0.9;

function mouseWheel(event) {
  scale -= 0.004 * event.delta;
}

function setup() {
  createCanvas(windowWidth, windowHeight * 0.9);
  canv = createCanvas(windowWidth, windowHeight * 0.8);
  canv.parent('logo');
  smooth(8);
  step = 0;
  lmax1 = -800;
  lmax = 0;
  done = 1;
  rectMode(CORNERS);
  type = round(random(1));
  load_button = createButton('LOAD');
  load_button.mousePressed(handleFile);
  load_button.class('inputImg btn');
  load_button.parent('btnh');
  crop_button = createButton('CROP');
  crop_button.mousePressed();
  crop_button.class("btn");
  crop_button.parent('buttons');
  crop_button.mousePressed(crop);

  input = createFileInput(handleFile);
  input.class('inputImg');
  input.parent('btnh');
  frameRate(60);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    //background(240, 240, 240);
    background(255);

    img = loadImage(file.data);
    console.log("loaded image = ", img);
    rx[0] = (canv.width - 0.9 * min(canv.width, canv.height)) / 2;
    ry[0] = (canv.height - 0.9 * min(canv.width, canv.height)) / 2;
    rx[1] = (canv.width + 0.9 * min(canv.width, canv.height)) / 2;
    ry[1] = (canv.height + 0.9 * min(canv.width, canv.height)) / 2;
    rx0 = rx[0];
    ry0 = ry[0];
    rx1 = rx[1];
    ry1 = ry[1];
    w1 = int(0.9 * min(canv.width, canv.height));
    console.log(w1);
    scale = 1;
    loaded = 10;
    resized = false;
    croped = false;
  } else {
    img = null;
  }
  file = null;
}


function mouseDragged() {
  if (mouseX < 5) mouseX = 5;
  if (mouseY < 5) mouseY = 5;
  for (let i = 0; i < 2; i++) {
    for (let j = 2; j < 4; j++) {
      if ((abs(mouseX - m[i]) < 40) && (abs(mouseY - m[j]) < 20)) {
        rx[i] = mouseX;
        ry[j - 2] = mouseY;
        changed = 100;
      }
    }
  }
  if (changed == 0) {
    dx += mouseX - pmouseX;
    dy += mouseY - pmouseY;
  }
}

function drawrect(x1, y1, x2, y2) {
  noStroke();
  fill(240, 240, 240, 80);
  m[0] = min(x1, x2);
  m[1] = max(x1, x2);
  m[2] = min(y1, y2);
  m[3] = max(y1, y2);
  rx[0] = m[0];
  rx[1] = m[1];
  ry[0] = m[2];
  ry[1] = m[3];
  rect(0, 0, m[0], windowHeight);
  rect(m[0], 0, windowWidth, m[2]);
  rect(m[1], m[2], windowWidth, m[3]);
  rect(m[0], m[3], windowWidth, windowHeight);
  stroke(0);
  fill(0);
  strokeWeight(2);
  let mr = 6;
  rect(m[0], m[2], m[0] + mr, m[2] + mr);
  rect(m[0], m[3], m[0] + mr, m[3] - mr);
  rect(m[1], m[2], m[1] - mr, m[2] + mr);
  rect(m[1], m[3], m[1] - mr, m[3] - mr);
  noFill();
  rect(x1, y1, x2, y2);
  strokeWeight(1);
  if (changed > 0) {
    changed--;
    if (changed > 10) {
      if (changed <= 40) {
        strokeWeight((changed - 30) / 30);
        if (m[1] - m[0] > m[3] - m[2]) {
          ry[0] -= 0.24 * (m[1] - m[0] - (m[3] - m[2]));
          ry[1] += 0.24 * (m[1] - m[0] - (m[3] - m[2]));
        }
        if (m[3] - m[2] > m[1] - m[0]) {
          rx[0] -= 0.24 * (m[3] - m[2] - (m[1] - m[0]));
          rx[1] += 0.24 * (m[3] - m[2] - (m[1] - m[0]));
        }
      }
      line(m[0] + 1 * (m[1] - m[0]) / 3, m[2], m[0] + 1 * (m[1] - m[0]) / 3, m[3]);
      line(m[0] + 2 * (m[1] - m[0]) / 3, m[2], m[0] + 2 * (m[1] - m[0]) / 3, m[3]);
      line(m[0], m[2] + 1 * (m[3] - m[2]) / 3, m[1], m[2] + 1 * (m[3] - m[2]) / 3);
      line(m[0], m[2] + 2 * (m[3] - m[2]) / 3, m[1], m[2] + 2 * (m[3] - m[2]) / 3);
    }
    if (changed == 10) {
      rdx[0] = rx[0];
      rdy[0] = ry[0];
      rdx[1] = rx[1];
      rdy[1] = ry[1];
      w1 = rx[1] - rx[0];
      scale1 = pow(((rx1 - rx0) / w1), 0.1);
    }
    if (changed < 10) {
      scale *= scale1;
      rx[0] -= (rdx[0] - rx0) * 0.1;
      ry[0] -= (rdy[0] - ry0) * 0.1;
      rx[1] += (rx1 - rdx[1]) * 0.1;
      ry[1] += (ry1 - rdy[1]) * 0.1;
      dx1 -= scale * ((rx[0] + rx[1] - rx0 - rx1) / 2) * 0.1;
      dy1 -= scale * ((ry[0] + ry[1] - ry0 - ry1) / 2) * 0.1;
    }
  }
}

function start(a) {
  step = 0;
  lmax1 = -800;
  lmax = 0;
  done = 1;
  loaded = -1;
  type = 0;
  i = 0;
  createnails();
}


function crop() {
  if (!croped) {
    image(img, dx + dx1 + (canv.width - img.width * scale) / 2, dy + dy1 + (canv.height - img.height * scale) / 2,
      img.width * scale, img.height * scale);
    start();
    croped = true;
    loadPixels();
    const d = pixelDensity();
    s = 0.0;
    pix = [];
    rx[0] = int(rx[0]);
    rx[1] = int(rx[1]);
    ry[0] = int(ry[0]);
    ry[1] = int(ry[1]);
    w1 = rx1 - rx0;
    for (let x = rx0; x < rx1; x++) {
      for (let y = ry0; y < ry1; y++) {
        pix[(y - ry0) * w1 + (x - rx0)] = 255 - red(get(x, y));
        if (pix[(y - ry0) * w1 + (x - rx0)] < 1) {
          pix[(y - ry0) * w1 + (x - rx0)] = 0;
        }
        s += 1.0 * pix[(y - ry0) * w1 + (x - rx0)] / (w1 * w1);
      }
    }
    SIMPVAL = int(s * 0.4);
    NEGVAL = int(3 * s * 0.4);
    eps = 2 * s;
    updatePixels();
    background(240);
    stroke(0);
    fill(0);
    for (let i = 0; i < n; i++) {
      ellipse(rx0 + a[i], ry0 + a[i + n], 2, 2);
    }
    np = 49;
  }
}

function createnails() {
  w1 = rx1 - rx0;
  if (type == 0) {
    let k = 0;
    for (let i = 0; i < (n / 4); i++) {
      a[i] = round(i * (w1 - 1) * 4 / n);
      a[i + n] = 0;
      a[i + n / 4] = round(w1 - 1);
      a[i + n / 4 + n] = round(i * (w1 - 1) * 4 / n);
      a[i + n / 2] = round(w1 - i * (w1 - 1) * 4 / n - 1);
      a[i + n / 2 + n] = round(w1 - 1);
      a[i + 3 * n / 4] = 0;
      a[i + 3 * n / 4 + n] = round(w1 - i * (w1 - 1) * 4 / n - 1);
    }
  }
  if (type == 1) {
    for (let i = 0; i < n; i++) {
      a[i] = round(w1 / 2 + (sin(TWO_PI * i / n) * (w1 / 2 - 1)));
      a[i + n] = round(w1 / 2 - (cos(TWO_PI * i / n) * (w1 / 2 - 1)));
    }
  }
}

function draw() {
  if (done == 0) {
    background(240, 240, 240);
  }
  if (loaded > 0) {
    tint(255, 255, 255, max(0, 25 * (8 - loaded)));
    image(img, dx, dy);
    img.resize(0, min(canv.width, canv.height));
    dx = (canv.width - img.width) / 2;
    dy = (canv.height - img.height) / 2;
    loaded--;
  } else if (loaded == 0) {
    noTint();
    start();
    dx = 0;
    dy = 0;
    changed = 0;
    resized = true;
  }
  if (!croped) {
    if (resized) {
      image(img, dx + dx1 + (canv.width - img.width * scale) / 2, dy + dy1 + (canv.height - img.height * scale) / 2,
        img.width * scale, img.height * scale);
    }
    drawrect(rx[0], ry[0], rx[1], ry[1]);
  } else {
    strokeWeight(0.7);
    fill(0, 128);
    stroke(0, 128);
    if (done != 2) {
      go(depth);
    }
  }
}

function go(k) {
  w1 = rx1 - rx0;
  if (k != 0) {
    let f = false;
    let j = 0;
    let max = -16000;
    for (let j1 = 0;
      (j1 < ((2 * n) + 1)) && !f; j1++) {
      if (i != j1) {
        let q = (j1 % 2 === 0) ? (n + 1 + np + (j1 / 2)) % n : (n + 1 + np - ((j1 + 1) / 2)) % n;
        let c = p(i, q, 0);
        if (abs(c - lmax) < eps) {
          j = q;
          f = true;
        } else if (c > max) {
          j = q;
          max = c;
        }
      }
    }
    if ((!f) || (max > lmax) || (step > 2100)) {
      lmax = max;
      if (lmax > lmax1) {
        lmax1 = lmax;
      }
      if ((lmax < eps) && (!done)) {
        done = 2;
      }
    }
    line(rx0 + a[i], ry0 + a[i + n], rx0 + a[j], ry0 + a[j + n]);
    step++;
    if (i != j) {
      i = (p(i, j, 1));
    }
    np = i;
    i = j;
    go(k - 1);
  }
}

function p(x, y, m) {
  if (x != y) {
    let s = 0;
    let x0 = a[x];
    let y0 = a[x + n];
    let dx = abs(a[y] - a[x]);
    let dy = abs(a[y + n] - a[x + n]);
    let sx = a[x] < a[y] ? 1 : -1;
    let sy = a[x + n] < a[y + n] ? 1 : -1;
    let err = dx - dy;
    let e2;
    let f = false;
    while (f != true) {
      if (x0 === a[y] && y0 === a[y + n]) {
        f = true;
      }
      if (m != 1) {
        s += pix[x0 + y0 * w1];
      }
      if (m == 1) {
        if (pix[x0 + y0 * w1] > 1) {
          pix[x0 + y0 * w1] -= SIMPVAL;
        } else if (pix[x0 + y0 * w1] <= 1) {
          pix[x0 + y0 * w1] = -NEGVAL;
        }
      }
      e2 = 2 * err;
      if (e2 > -dy) {
        err = err - dy;
        x0 = x0 + sx;
      }
      if (e2 < dx) {
        err = err + dx;
        y0 = y0 + sy;
      }
    }
    return s;
  } else {
    return 0;
  }
}
