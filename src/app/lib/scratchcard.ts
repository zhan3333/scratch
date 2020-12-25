/*刮刮卡*/
export class ScratchCard {
  private canvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private img!: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public start(): boolean {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    if (this.canvas.getContext !== null) {
      const ctx = this.canvas.getContext('2d');
      if (ctx === null) {
        return false;
      } else {
        this.ctx = ctx;
      }
      this.img = new Image();
      this.img.src = 'assets/images/background.jpeg';
      this.img.onload = () => {
        this.draw();
      };
    }
    return true;
  }

  private draw(): void {
    let flag = 0;
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    this.canvas.addEventListener('touchstart', (ev) => {
      const touchC = ev.changedTouches[0];

      const x = touchC.clientX - this.canvas.offsetLeft;
      const y = touchC.clientY - this.canvas.offsetTop;

      this.ctx.lineWidth = 40;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + 1, y + 1);
      this.ctx.stroke();
      this.ctx.restore();
    });

    this.canvas.addEventListener('touchmove', (ev) => {
      const touchC = ev.changedTouches[0];

      const x = touchC.clientX - this.canvas.offsetLeft;
      const y = touchC.clientY - this.canvas.offsetTop;

      this.ctx.save();
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.restore();
    });

    this.canvas.addEventListener('touchend', () => {
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const allPx = imgData.width * imgData.height;
      for (let i = 0; i < allPx; i++) {
        if (imgData.data[i * 4 + 3] === 0) {
          flag++;
        }
      }
      if (flag >= allPx / 2) {
        this.canvas.style.opacity = '0';
      }
    });

    this.canvas.addEventListener('transitionend', () => {
      console.log('remove');
      // this.remove();  // 自杀，删除canvas
    });
  }
}
