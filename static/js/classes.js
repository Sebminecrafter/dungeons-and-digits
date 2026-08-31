export class Sprite {
  constructor(
    img,
    width,
    height,
    x,
    y,
    frameCount,
    animation,
    row,
    rows,
    columns,
  ) {
    this.img = new Image();
    this.img.src = img;

    this.width = width || 0;
    this.height = height || 0;
    this.x = x || 0;
    this.y = y || 0;

    this.frameCount = frameCount || 1;
    this.currentAnimation = animation || 0;

    this.row = row || 0;
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

  getRow() {
    return this.row;
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

  setRow(set) {
    this.row = set;
    return this.row;
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
    const frameWidth = this.img.width / this.columns;
    const frameHeight = this.img.height / this.rows;

    // Position of the selected sprite
    const sourceX = this.currentAnimation * frameWidth;
    const sourceY = this.row * frameHeight;

    ctx.drawImage(
      this.img,

      // Source rectangle
      sourceX,
      sourceY,
      frameWidth,
      frameHeight,

      // Destination rectangle
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export default { Sprite };
