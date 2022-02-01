import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { Rectangle } from '../rectangle';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  constructor() { }

  @Input() currentRectangle: Subject<Rectangle>;
  @Input() imageToClip: any;

  ngOnInit() { }

  // the shape being just drawn
  rectangleDrawing: Rectangle;
  lastRectangleDrawn: Rectangle;


  startDrawing(evt: MouseEvent) {
    let coordinatesUpperLeft = {
      x: evt.offsetX,
      y: evt.offsetY
    };
    this.rectangleDrawing = {
      coordinatesUpperLeft: coordinatesUpperLeft,
      length: 0,
      height: 0
    };
  }

  keepDrawing(evt: MouseEvent) {
    if (this.rectangleDrawing) {
      this.rectangleDrawing.length = (evt.offsetX - this.rectangleDrawing.coordinatesUpperLeft.x);
      this.rectangleDrawing.height = (evt.offsetY - this.rectangleDrawing.coordinatesUpperLeft.y);
    }
  }

  stopDrawing() {
    this.currentRectangle.next(this.rectangleDrawing);
    this.lastRectangleDrawn = this.rectangleDrawing;
    this.rectangleDrawing = null;

  }

}
