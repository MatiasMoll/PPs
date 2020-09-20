import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  splash = true;
  //secondPage = SecondPagePage;

  constructor(
    public navCtrl: NavController,
    private router:Router  
  ) {

  }

  ionViewDidEnter() {
    setTimeout(()=>{
      this.splash = false;
      this.router.navigate(['login']);
    } , 4000);
   
    
  }
}
