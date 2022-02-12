export class SpectrumPlotCanvas {
  canvas;
  minX;
  minY;
  maxX;
  maxY;
  unitsPerTickX;
  unitsPerTickY;

  // constants
  padding = 10;
  tickSize = 10;
  axisColor = "#555";
  pointRadius = 5;
  font = "12pt Calibri";

  fontHeight = 12;

  // relationships
  ctx;
  rangeX;
  rangeY;
  numXTicks;
  numYTicks;
  x;
  y;
  width;
  height;
  scaleX;
  scaleY;

  constructor(con) {
    // user defined properties
    this.canvas = document.getElementById(con.canvasId);
    this.minX = con.minX;
    this.minY = con.minY;
    this.maxX = con.maxX;
    this.maxY = con.maxY;
    this.unitsPerTickX = con.unitsPerTickX;
    this.unitsPerTickY = con.unitsPerTickY;

    // constants
    this.padding = 10;
    this.tickSize = 10;
    this.axisColor = "#555";
    this.pointRadius = 5;
    this.font = "12pt Calibri";

    this.fontHeight = 12;

    // relationships
    this.ctx = this.canvas.getContext("2d");
    this.rangeX = this.maxX - this.minY;
    this.rangeY = this.maxY - this.minY;
    this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
    this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
    this.x = this.getLongestValueWidth() + this.padding * 2;
    this.y = this.padding * 2;
    this.width = this.canvas.width - this.x - this.padding * 2;
    this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;

    this.drawAxis();
  }

  drawAxis() {
    this.drawXAxis();
    this.drawYAxis();
  }

  drawXAxis() {
    var ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // draw tick marks
    for (var n = 0; n < this.numXTicks; n++) {
      ctx.beginPath();
      ctx.moveTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height,
      );
      ctx.lineTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height - this.tickSize,
      );
      ctx.stroke();
    }

    // draw labels
    ctx.font = this.font;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (var n = 0; n < this.numXTicks; n++) {
      var label = Math.round(((n + 1) * this.maxX) / this.numXTicks);
      ctx.save();
      ctx.translate(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height + this.padding,
      );
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  drawYAxis() {
    var ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // draw tick marks
    for (var n = 0; n < this.numYTicks; n++) {
      ctx.beginPath();
      ctx.moveTo(this.x, (n * this.height) / this.numYTicks + this.y);
      ctx.lineTo(
        this.x + this.tickSize,
        (n * this.height) / this.numYTicks + this.y,
      );
      ctx.stroke();
    }

    // draw values
    ctx.font = this.font;
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (var n = 0; n < this.numYTicks; n++) {
      var value = Math.round(this.maxY - (n * this.maxY) / this.numYTicks);
      ctx.save();
      ctx.translate(
        this.x - this.padding,
        (n * this.height) / this.numYTicks + this.y,
      );
      ctx.fillText(value, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  drawLine(data, color = "#3366CC", width = 1.5) {
    let x = data.channels,
      y = data.power;

    var ctx = this.ctx;
    ctx.save();
    this.transformContext();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x[0] * this.scaleX, y[0] * this.scaleY);
    ctx.lineJoin = "miter";
    ctx.lineCap = "round";

    for (var n = 0; n < x.length; n++) {
      var point = { x: x[n], y: y[n] };

      // draw segment
      ctx.lineTo(point.x * this.scaleX, point.y * this.scaleY);
      ctx.stroke();
      ctx.closePath();
      // ctx.beginPath();
      // ctx.arc(
      //   point.x * this.scaleX,
      //   point.y * this.scaleY,
      //   this.pointRadius,
      //   0,
      //   2 * Math.PI,
      //   false,
      // );
      // ctx.fill();
      // ctx.closePath();

      // position for next segment
      ctx.beginPath();
      ctx.moveTo(point.x * this.scaleX, point.y * this.scaleY);
    }
    ctx.restore();
  }

  drawArea(data, color = "#1f77b4 ", width = 1.5) {
    let x = data.channels,
      y = data.power,
      y1 = data.sdU,
      y2 = data.sdL;

    var ctx = this.ctx;
    ctx.save();
    this.transformContext();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x[0] * this.scaleX, y[0] * this.scaleY);

    for (var n = 0; n < x.length - 1; n++) {
      // var point = { x: x[n], y: y[n] };
      ctx.strokeRect(x[n] * this.scaleX, y[n] * this.scaleY, 10, 10);
      // ctx.strokeRect(y1[n], y1[n + 1], y2[n], y2[n + 1]);

      // // draw segment
      // ctx.lineTo(point.x * this.scaleX, point.y * this.scaleY);
      // ctx.stroke();
      // ctx.closePath();
      // ctx.beginPath();
      // ctx.arc(
      //   point.x * this.scaleX,
      //   point.y * this.scaleY,
      //   this.pointRadius,
      //   0,
      //   2 * Math.PI,
      //   false,
      // );
      ctx.fill();
      ctx.closePath();

      // position for next segment
      ctx.beginPath();
      ctx.moveTo(x[n] * this.scaleX, y[n] * this.scaleY);
    }
    ctx.restore();
  }

  getLongestValueWidth() {
    this.ctx.font = this.font;
    var longestValueWidth = 0;
    for (var n = 0; n <= this.numYTicks; n++) {
      var value = this.maxY - n * this.unitsPerTickY;
      longestValueWidth = Math.max(
        longestValueWidth,
        this.ctx.measureText(value).width,
      );
    }
    return longestValueWidth;
  }

  transformContext() {
    var ctx = this.ctx;

    // move ctx to center of canvas
    this.ctx.translate(this.x, this.y + this.height);

    // invert the y scale so that that increments
    // as you move upwards
    ctx.scale(1, -1);
  }
}
