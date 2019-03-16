import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { HttpClient } from '@angular/common/http';




@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page]
})



export class Tab4PageModule { 
  
  
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080', {responseType: 'text'}).subscribe((response) => {
      // console.log(response);
    });
  }
  

  

}