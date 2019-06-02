let img;
let img1;
let frame;
let s;
let k;
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

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img1 = loadImage(file.data);
    console.log(img1);
    loaded = 10;
  } else {
    img = null;
  }
}

function start(a) {
  step = 0;
  frame = 0;
  lmax1 = -800;
  lmax = 0;
  done = false;
  loaded = -1;
  type = round(random(1));
  createnails();
}

function setup() {
  createCanvas(min(windowWidth, windowHeight) - 60, min(windowWidth, windowHeight) - 60);
  canv = createCanvas(min(windowWidth, windowHeight) - 60, min(windowWidth, windowHeight) - 60);
  img = createImage(min(windowWidth, windowHeight) - 60, min(windowWidth, windowHeight) - 60);
  canv.parent('logo');
  input = createFileInput(handleFile);
  input.class('inputImg');
  input.parent('btnh');
  smooth(8);
  step = 0;
  frame = 4000;
  lmax1 = -800;
  lmax = 0;
  done = true;
  type = round(random(1));
}

function createnails() {
  if (type == 0) {
    let k = 0;
    for (let i = 0; i < (n / 4); i++) {
      a[i] = round(i * (img.height - 1) * 4 / n);
      a[i + n] = 0;
      a[i + n / 4] = round(img.height - 1);
      a[i + n / 4 + n] = round(i * (img.height - 1) * 4 / n);
      a[i + n / 2] = round(img.height - i * (img.height - 1) * 4 / n - 1);
      a[i + n / 2 + n] = round(img.height - 1);
      a[i + 3 * n / 4] = 0;
      a[i + 3 * n / 4 + n] = round(img.height - i * (img.height - 1) * 4 / n - 1);
    }
  }
  if (type == 1) {
    for (let i = 0; i < n; i++) {
      a[i] = round(img.height / 2 + (sin(TWO_PI * i / n) * (img.height / 2 - 1)));
      a[i + n] = round(img.height / 2 - (cos(TWO_PI * i / n) * (img.height / 2 - 1)));
    }
  }
}

function draw() {
  if (loaded>0) {
    loaded--;
  } else if (loaded==0) {
      start();
  }
  if (frame < 1) {
    image(img1, 0,0, img.width, img.height);
  }
  strokeWeight(0.7);
  fill(0, 128);
  stroke(0, 128);
  let i = 0;
  if (frame == 0) {
    loadPixels();
    const d = pixelDensity();
    s = 0.0;
    pix = [];
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        const i = 4 * d * (y * d * img.width + x);
        pix[y * img.width + x] = 255 - red(get(x, y));
        if (pix[y * img.width + x] < 1) {
          pix[y * img.width + x] = 0;
        }
        s += 1.0 * pix[y * img.width + x] / (img.width * img.height);
      }
    }
    SIMPVAL = int(s * 0.4);
    NEGVAL = int(3 * s * 0.4);
    eps = 2 * s;
    done = false;
    updatePixels();
    background(240);
    for (let i = 0; i < n; i++) {
      canv.ellipse(a[i], a[i + n], 2, 2);
    }
    np = int(random(n));
  }
  if (!done) {
    go(depth);
  }
  frame++;
}

function go(k) {
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
        done = true;
      }
    }
    canv.line(a[i], a[i + n], a[j], a[j + n]);
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
        s += pix[x0 + y0 * img.height];
      }
      if (m == 1) {
        if (pix[x0 + y0 * img.height] > 1) {
          pix[x0 + y0 * img.height] -= SIMPVAL;
        } else if (pix[x0 + y0 * img.height] <= 1) {
          pix[x0 + y0 * img.height] = -NEGVAL;
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
