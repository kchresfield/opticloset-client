import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  imgTxt: Text;
  constructor(
    private camera: Camera,
    private http: HttpClient,
    private apiService: ApiService
  ) {}
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then(
        imageData => {
          this.currentImage = 'data:image/jpeg;base64,' + imageData;
          this.imgTxt = imageData;
          return this.currentImage;
        },
        err => {
          // Handle error
          console.log('Camera issue:' + err);
        }
      )
      .then(picture => {
        this.http
          .post(
            'http://localhost:8080/clothingImage',
            { picture },
            { responseType: 'text' }
          )
          .subscribe(response => {
            console.log(response);
          });
      });
  }
  addItem() {
    this.apiService.addClothingItem((data) => {
      // console.log(data);
    });
  }
}
