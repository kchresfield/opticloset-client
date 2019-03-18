import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
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
  imgTxt: Text;
  test: any;

  public uploader: FileUploader = new FileUploader({ url: URL });
  
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
      this.imgTxt = imageData;
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
        this.http.post('http://localhost:8080/clothingImage', {
          cloudinaryUrl: url,
        }, { responseType: 'text' }).subscribe((response) => {
          console.log(response);
        })
      })
      
  }


  // Tester
  // sendToCloud() {
  //   this.http.post('https://api.cloudinary.com/v1_1/opticloset/image/upload', {
  //     file: "data:image/png;base64,",
  //     upload_preset: "opticloset",
  //   }).subscribe((response) => {
  //     console.log(response, 'cloudinary', response);
  //     this.http.post('http://localhost:8080/clothingImage/:UserId', {
  //       response: response,
  //     }, { responseType: 'text' }).subscribe((response) => {
  //       console.log(response, 'server response');
  //     })
  //   })
  // }
  
}
