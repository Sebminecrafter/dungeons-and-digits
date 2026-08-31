export class Sprite {
  constructor(src, height, width, x, y) {
    this.src = src;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }
  height() {
    return this.height;
  }
  width() {
    return this.width;
  }
  x() {
    return this.x;
  }
  y() {
    return this.y;
  }
  x(set) {
    x = set;
    return this.x;
  }
  y(set) {
    y = set;
    return this.y;
  }
}

export default { Sprite };
