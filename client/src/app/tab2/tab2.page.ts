import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { LogService } from 'app/services/log/log.service';

const exampleData = JSON.parse(`
      {"categories":[{"id":"ai_V0WFhmCF","name":"pattern","value":0.9943732,"app_id":"main"},{"id":"ai_phDKFgpM","name":"textile","value":0.99300545,"app_id":"main"},{"id":"ai_L92T2QtK","name":"decoration","value":0.9916602,"app_id":"main"},{"id":"ai_MkcRJRjB","name":"fabric","value":0.98865557,"app_id":"main"},{"id":"ai_87Z9fCb7","name":"cotton","value":0.9838859,"app_id":"main"},{"id":"ai_JBPqff8z","name":"art","value":0.9797507,"app_id":"main"},{"id":"ai_wZCn67qV","name":"style","value":0.9797402,"app_id":"main"},{"id":"ai_J50Tm7NJ","name":"texture","value":0.9733018,"app_id":"main"},{"id":"ai_1p2zMmqb","name":"retro","value":0.9717443,"app_id":"main"},{"id":"ai_pZCcDdmx","name":"tribal","value":0.9690703,"app_id":"main"},{"id":"ai_MKSwLDhD","name":"print","value":0.96896344,"app_id":"main"},{"id":"ai_XclQc6bP","name":"traditional","value":0.967233,"app_id":"main"},{"id":"ai_cMfj16kJ","name":"design","value":0.95592403,"app_id":"main"},{"id":"ai_Tmkhmvx1","name":"embroidery","value":0.9520859,"app_id":"main"},{"id":"ai_psff54bp","name":"handmade","value":0.9502452,"app_id":"main"},{"id":"ai_hS0cvZDj","name":"ornate","value":0.9340418,"app_id":"main"},{"id":"ai_cQkZTSJn","name":"handicraft","value":0.92621124,"app_id":"main"},{"id":"ai_Dm5GLXnB","name":"illustration","value":0.92275614,"app_id":"main"},{"id":"ai_2Bh4VMrb","name":"artistic","value":0.92263335,"app_id":"main"},{"id":"ai_RSdbFzLw","name":"silk","value":0.92174745,"app_id":"main"}],"colorsOptions":[{"label":"Gray","color":"#8C888C"},{"label":"Blue","color":"#544B5C"},{"label":"Green","color":"#5F6473"},{"label":"Purple","color":"#7B4353"},{"label":"Pink","color":"#CBBBBF"},{"label":"White","color":"#FDFDFD"},{"label":"Brown","color":"#745B64"}],"cleanUrl":"http://d2f1mfcynop4j.cloudfront.net/999181/20190322/457837518/f833a94bc4ea4b97b612ce060b5cdf21_RES.png","idOfTheImg":"48"}
    `);

const URL = 'https://api.cloudinary.com/v1_1/opticloset/auto/upload';
const wait = (ms = 6000) => new Promise(res => setTimeout(res, ms));
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
  
  constructor(
    public camera: Camera, 
    private http: HttpClient, 
    private apiService: ApiService,
    private router: Router,
    private logService: LogService,
  ) { }
  
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    type CloudinaryResposne = {
      url: string;
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      return this.currentImage;
    }, (err) => {
      this.logService.log(err);
    })
      .then((picture) => {
        // this.logService.log('heyyyyyyyyyy');
        return this.http.post('https://api.cloudinary.com/v1_1/opticloset/image/upload', { 
          file: picture,
          upload_preset: "opticloset",
        }).toPromise();
      })
      .then((cloudResponse: CloudinaryResposne) => {
        const { url } = cloudResponse;
        // this.logService.log(cloudResponse);
        return this.http.post('http://172.24.0.217:8080/clothingImage/1', { 
          "response": {
            "url": url,
          }
        }, { responseType: 'text' }).toPromise();
      })
      .then((response) => {
        localStorage.setItem('response', response);
      })
      .then(() => {
        this.router.navigate(['/attribute']);
      })
      .catch((err) => {
        this.logService.log(err);
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

    type CloudinaryResposne = {
      url: string;
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      return this.currentImage;
    }, (err) => {
      // Handle error
      this.logService.log(err);
      // console.logService.log("Camera issue:" + err);
    })
      .then((picture) => {
        // this.logService.log('heyyyyyyyyyy');
        return this.http.post('https://api.cloudinary.com/v1_1/opticloset/image/upload', {
          file: picture,
          upload_preset: "opticloset",
        }).toPromise();
      })
      .then((cloudResponse: CloudinaryResposne) => {
        const { url } = cloudResponse;
        // this.logService.log(cloudResponse);
        return this.http.post('http://172.24.0.217:8080/clothingImage/1', {
          "response": {
            "url": url,
          }
        }, { responseType: 'text' }).toPromise();
      })
      .then((response) => {
        localStorage.setItem('response', response);
      })
      .then(() => {
        this.router.navigate(['/attribute']);
      })
      .catch((err) => {
        this.logService.log(err);
      })
  }


  // Tester
  // sendToCloud() {
  //     this.http.post('http://localhost:8080/clothingImage/1', {
  //       "response": {
  //         "url": "https://res.cloudinary.com/opticloset/image/upload/v1553352508/goto9ueliv6gl2nqvsa6.jpg"
  //       }
  //     }, { responseType: 'text' }).subscribe((response) => {
  //       console.logService.log(JSON.parse(response), 'server response');
  //       localStorage.setItem('response', response);
  //     })
  //   }
  
}
