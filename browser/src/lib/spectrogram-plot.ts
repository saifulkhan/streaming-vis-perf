const PHASE_NORM_FACTOR = 360;

export class SpectrogramPlot {
  canvas;
  context;
  width: number;
  height: number;
  len: number = 0;
  h: number;
  x: number;
  init: boolean;

  data = [];

  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  draw(data) {
    if (!this.init) {
      this.context.fillStyle = "hsl(0, 0%, 100%)";
      this.context.fillRect(0, 0, this.width, this.height);
      this.x = this.width - 1;

      this.init = true;
    }

    if (this.len !== data.length) {
      this.len = data.length;
      this.h = this.height / this.len;
    }

    this.data = data;
    // console.log("SpectrogramPlot:draw: data = ", this.data);

    // window.requestAnimationFrame(this.loop.bind(this));
    this.loop();
  }

  loop() {
    const imgData = this.context.getImageData(
      1,
      0,
      this.width - 1,
      this.height,
    );
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.putImageData(imgData, 0, 0);

    // console.log("SpectrogramPlot:loop: data = ", this.data);

    for (let i = 0; i < this.len; i++) {
      const rat = this.data[i] / PHASE_NORM_FACTOR; // 0-1 normalise
      const hue = Math.round(rat * 360); // hsl normalise
      const sat = "100%";
      const lit = "50%";

      // prettier-ignore
      // console.log(`rat = ${rat}, hue = ${hue}, sat = ${sat}, lit = ${lit}`);
      // prettier-ignore
      // console.log(`SpectrogramPlot:loop: width = ${this.width}, height = ${this.height}, h = ${this.h}`);

      this.context.beginPath();
      this.context.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
      this.context.moveTo(this.x, this.height - i * this.h);
      this.context.lineTo(this.x, this.height - (i * this.h + this.h));
      this.context.stroke();
    }
  }
}
