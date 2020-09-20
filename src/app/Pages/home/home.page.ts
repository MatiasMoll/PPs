import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }
  irTablaLinda(){
    this.router.navigate(['grilla-fotos','Lindas']);
  }
  irTablaFea(){
    this.router.navigate(['grilla-fotos','Feas']);
  }
}
