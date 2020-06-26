'use strict';

(()=> {


  class Wave {
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      // Wave
      this.xAxis = this.height - 50;
      this.yAxis = -100;

    }

    draw(t,unit) {
      this.ctx.clearRect(0,0,this.width,this.height);

      // Wave color
      const color = this.ctx.createLinearGradient(this.width / 2 ,this.xAxis-200, this.width / 2,this.height);
      color.addColorStop(0, 'rgb(202,236,244,0.6)');
      color.addColorStop(1, 'rgb(98,208,238,0.6)');

      // drawwave
      this.drawwave(this.xAxis,this.yAxis - 10,3,color,t,unit);
      this.drawwave(this.xAxis + 10,this.yAxis - 5,3,color,t,unit);
      this.drawwave(this.xAxis + 5,this.yAxis,4.5,color,t,unit);

      // drawbubble
      bubbles.push(this.addbubble());
      this.drawbubble(this.xAxis,t,100);

      // Update the time , height and draw again
      this.xAxis-=0.3;
      seconds = seconds + .009;
      t = seconds*Math.PI;

      const timeoutId = setTimeout(() => {
        this.draw(t,unit);
      },15);

    }

    drawwave(xAxis,yAxis,zoom,color,t,unit) {

      this.ctx.save();

      this.ctx.fillStyle = color;

      this.ctx.beginPath();
      this.drawSine(xAxis,yAxis,zoom,t,unit);
      this.ctx.lineTo(this.width+200, this.height+200);
      this.ctx.lineTo(-100, this.height+200);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    }

    drawSine(xAxis,yAxis,zoom,t,unit) {
      var x = t;
      var y = Math.sin(x);
      this.ctx.moveTo(yAxis, unit*y+xAxis);

      for (var i = yAxis; i <= this.width + 200; i += 10) {
       x = t+(-yAxis+i)/unit/zoom - 100;
       y = Math.sin(x);
       this.ctx.lineTo(i, unit*y+xAxis);
     }
    }
    addbubble() {
      const xGap = Math.floor(Math.random() * 20) + 1;
      const yGap = (Math.floor(Math.random() * 30) + 1) * (seconds*100);
      const circle = (Math.floor(Math.random() * 10) + 1) + 3;
      return [xGap, yGap, circle];
    }

    drawbubble(xAxis,t,delay) {
      this.ctx.strokeStyle = 'rgb(255,255,255,0.6)';

      bubbles.forEach((bubble, bubbleindex) => {
        this.ctx.beginPath();
        this.ctx.arc(Math.sin(t)*10+bubble[0]*30, xAxis + bubble[1] + delay, bubble[2], 0, 2*Math.PI);
        this.ctx.stroke();
      });
    }

  }

  const canvas = document.querySelector('canvas');

  if (typeof canvas.getContext === 'undefined') {
    return;
  }

  var t = 0;
  var seconds = 0;
  var unit = 50;
  const bubbles = [];

  const wave = new Wave(canvas);
  wave.draw(t,unit);


})();
