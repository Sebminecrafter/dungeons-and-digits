export class Sprite {
  constructor(img, width, height, x, y, frameCount, animation, rows, columns) {
    this.img = new Image();
    this.img.src = img;

    this.width = width || 0;
    this.height = height || 0;
    this.x = x || 0;
    this.y = y || 0;

    this.frameCount = frameCount || 1;
    this.currentAnimation = animation || 0;

    this.rows = rows || 1;
    this.columns = columns || 1;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getAnimation() {
    return this.currentAnimation;
  }

  getRows() {
    return this.rows;
  }

  getColumns() {
    return this.columns;
  }

  setHeight(set) {
    this.height = set;
    return this.height;
  }

  setWidth(set) {
    this.width = set;
    return this.width;
  }

  setX(set) {
    this.x = set;
    return this.x;
  }

  setY(set) {
    this.y = set;
    return this.y;
  }

  setAnimation(set) {
    this.currentAnimation = set;
    return this.currentAnimation;
  }

  setRows(set) {
    this.rows = set;
    return this.rows;
  }

  setColumns(set) {
    this.columns = set;
    return this.columns;
  }

  draw(ctx) {
    if (!(ctx instanceof CanvasRenderingContext2D)) return;

    // Size of one sprite on the spritesheet
    const frameWidth = Math.round(this.img.width / this.columns);
    const frameHeight = Math.round(this.img.height / this.rows);

    let row = 0;

    if (this.currentAnimation >= this.rows * this.columns) {
      this.currentAnimation = this.rows * this.columns - 1;
    }

    let relCol = this.currentAnimation % this.columns;

    if (this.currentAnimation >= this.columns) {
      row = Math.floor(this.currentAnimation / this.columns);
    }

    // Position of the selected sprite
    const sourceX = relCol * frameWidth;
    const sourceY = row * frameHeight;

    ctx.drawImage(
      this.img,

      // Source rectangle
      sourceX,
      sourceY,
      frameWidth,
      frameHeight,

      // Destination rectangle
      Math.round(this.x),
      Math.round(this.y),
      Math.round(this.width),
      Math.round(this.height),
    );
  }
}

export default { Sprite };
