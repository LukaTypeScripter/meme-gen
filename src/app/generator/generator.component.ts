import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FormsModule } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, ColorChromeModule, ColorSketchModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
})
export class GeneratorComponent {
  @ViewChild('memeCanvas', { static: false }) myCanvas: any;
  topTexts:string = ''
  bottomText:string = ''
  fileE:any;
  textColor:string = '#000000'
  bgColor:string = '#f9f9fb'
  previvew(e: any) {
    this.fileE = e
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = function (event) {
      const img = new Image();
      img.src = event?.target?.result as string;
      img.onload = function () {
        ctx.drawImage(img, 50, 150, 600, 500);
      };
    };
  }
  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.fillStyle = this.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.textColor
  
    this.previvew(this.fileE)
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topTexts,canvas.width / 2,100);
    ctx.fillText(this.bottomText,canvas.width / 2,750)
  }
  canvasTextColor(e:ColorEvent) {
      this.textColor = e.color.hex
      this.drawText()
  }
  canvasBgColor(e:ColorEvent) {
    this.bgColor = e.color.hex
    this.drawText()
  }
  downloadImg() {
    let canvas = this.myCanvas.nativeElement
    let img = canvas.toDataURL('image/png')
    let link = document.createElement('a');
    link.download = 'memeImg.png';
    link.href = img
    link.click()
  }
}
