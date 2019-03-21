import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


const URL = 'https://api.cloudinary.com/v1_1/opticloset/auto/upload';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
    
})
export class Tab2Page {

  currentImage:any;
  uploadedImage:any;
  test: any;
  response: any;
  
  constructor(private camera: Camera, private http: HttpClient, private apiService: ApiService, private router: Router) { }
  
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.router.navigateByUrl('attribute');

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      return this.currentImage;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    })
      .then((picture) => {
        this.http.post('https://api.cloudinary.com/v1_1/opticloset/image/upload', { 
          file: picture,
          upload_preset: "opticloset",
        }).subscribe((response) => {
            console.log(response);
            return response;
          });
        })
      .then((cloudResponse) => {
        let url = cloudResponse
        this.http.post('http://localhost:8080/clothingImage/1', {
          cloudinaryUrl: url,
        }, { responseType: 'text' }).subscribe((response) => {
          localStorage.setItem('response', response);
          console.log(response);
        })
      })
      
  }

  upload() {
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
    this.uploadedImage  = 'data:image/jpeg;base64,' + imageData;
    return this.uploadedImage;
    }, (err) => {
      // Handle error
      }).then((picture) => {
        this.http.post('https://api.cloudinary.com/v1_1/opticloset/image/upload', {
          file: picture,
          upload_preset: "opticloset",
        }).subscribe((response) => {
          console.log(response);
          return response;
        });
      })
      .then((cloudResponse) => {
        let url = cloudResponse
        this.http.post('http://localhost:8080/clothingImage/1', {
          cloudinaryUrl: url,
        }, { responseType: 'text' }).subscribe((response) => {
          console.log(response);
          localStorage.setItem('response', response);
        })
      })
  }


  // Tester
  // sendToCloud() {
  //     this.http.post('http://localhost:8080/clothingImage/1', {
  //       "response": {
  //         "url": "https://res.cloudinary.com/opticloset/image/upload/v1552924048/longSkirt.png"
  //       }
  //     }, { responseType: 'text' }).subscribe((response) => {
  //       console.log(JSON.parse(response), 'server response');
  //       localStorage.setItem('response', response);
  //     })
  //   }
  
}
