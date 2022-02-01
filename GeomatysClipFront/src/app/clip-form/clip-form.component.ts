import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {Rectangle} from "../rectangle";
import Config from '../../assets/config.json';


@Component({
  selector: 'app-clip-form',
  templateUrl: './clip-form.component.html',
  styleUrls: ['./clip-form.component.css']
})
export class ClipFormComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.currentRectangle.subscribe(rectangleDrawn =>
      this.setLastRectangleDrawn(rectangleDrawn)
    );
  }

  clipForm = new FormGroup({
    imageToClipInput: new FormControl(''),
  })

  currentRectangle = new BehaviorSubject<Rectangle>(null);

  //image converted from api return (final result displayed)
  imageClipped: any = null;
  //file uploaded & sent to api
  fileUploaded: any = null;
  //image converted from fileuploaded (used in canvas's background)
  imageToClip: any= null;
  //last rectangle drawn
  lastRectangleDrawn: Rectangle = null;

  //Options for API Call
  httpOptions: Object = {
    headers: new HttpHeaders({ 'Accept': '*/*'} ),
    responseType: "blob"
  };

  /**
   * On file upload
   * @param event
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileUploaded = event.target.files[0];
      //we read the file to set it in background
      let reader = new FileReader();
      reader.readAsDataURL(this.fileUploaded);
      reader.onload = (_event) => {
        //image ready to use
        this.imageToClip = reader.result;
        //set in canvas's background
        document.getElementById("imageCanvas").setAttribute("href",this.imageToClip);
      }
    }
  }

  /**
   * Form Submit : ready to clip
   */
  submit() {
      const formData = new FormData();
      formData.append('rectangleToKeep', JSON.stringify(this.lastRectangleDrawn));
    formData.append('imageToClip', this.fileUploaded);

      return this.http.post<any>(Config.backendUrl + Config.clipActionUrl, formData, this.httpOptions)
        .pipe(
          catchError(this.handleError<any>('clipApiCall', []))
        )
        .subscribe(data => {
          // Process blob returned by API Call to display it as an image
          this.createImageFromBlob(data);
        });
  }

  /**
   * Create an image from a blob and display it
   * @param image
   * @private
   */
  private createImageFromBlob(image: Blob) {
    if (image) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        //image ready, we display it
        this.imageClipped = reader.result;
      }, false);
      reader.readAsDataURL(image);
    }
  }

  /**
   * We keep track of the rectangle just drawn and convert properties x,y,lenght,height to percent
   * @param rectangleDrawn
   * @private
   */
  private setLastRectangleDrawn(rectangleDrawn: Rectangle){
    //We need to keep rectangleDrawn untouched , so we make a copy
    if (rectangleDrawn!== undefined && rectangleDrawn!== null) {
      this.lastRectangleDrawn =JSON.parse(JSON.stringify(rectangleDrawn))

      //Set number to percent
      //This could be improve : we add +3pixels to coordinates because thats the size of canvas border
      this.lastRectangleDrawn.coordinatesUpperLeft.x = (this.lastRectangleDrawn.coordinatesUpperLeft.x+3) / 800 *100;
      this.lastRectangleDrawn.coordinatesUpperLeft.y = (this.lastRectangleDrawn.coordinatesUpperLeft.y+3) / 800 *100;
      this.lastRectangleDrawn.length = this.lastRectangleDrawn.length / 800 *100;
      this.lastRectangleDrawn.height = this.lastRectangleDrawn.height / 800 *100;
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

