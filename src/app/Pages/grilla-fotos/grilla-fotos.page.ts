import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FotosApp } from '../../interfaces/fotos-app';
const FOTOSAPP = 'fotosApp';


@Component({
  selector: 'app-grilla-fotos',
  templateUrl: './grilla-fotos.page.html',
  styleUrls: ['./grilla-fotos.page.scss'],
})
export class GrillaFotosPage implements OnInit {

  
  listadoFotos: Array<FotosApp> = [];
  tipoFotos: string;
  flag:string; 
  constructor(
	  private activeRoute:ActivatedRoute,
	  private router:Router,
	  private baseDatos:AngularFirestore
	 ) { }


  ngOnInit() {
	this.flag = this.activeRoute.snapshot.paramMap.get('flag');
	console.log(this.flag);
    if(this.flag == 'Lindas'){
		//TODO: Consumir servicio de fotos Lindas
		this.listadoFotos = [
			{urlFoto: '../../assets/PruebaLindas/testl1.jpg',autor: "Mati Test 1",votos: 0,isLindo:true},
			{urlFoto: '../../assets/PruebaLindas/testl2.jpg',autor: "Mati Test 2",votos: 0,isLindo:true},
			{urlFoto: '../../assets/PruebaLindas/testl3.jpg',autor: "Mati Test 3",votos: 0,isLindo:true}
        ];
        this.baseDatos.collection(FOTOSAPP).get().subscribe((querySnapShot)=>{
            querySnapShot.forEach((data)=>{
                this.listadoFotos.push(data.data() as FotosApp)
            });
        }); 
    }else{
		//TODO: Consumir servicio de fotos Feas
		this.listadoFotos = [
			{urlFoto: '../../assets/PruebaFeas/test1.jpg',autor: "Mati Test Feo 1",votos: 0,isLindo:false},
			{urlFoto: '../../assets/PruebaFeas/test2.jpg',autor: "Mati Test Feo 2",votos: 0,isLindo:false},
			{urlFoto: '../../assets/PruebaFeas/test3.jpg',autor: "Mati Test Feo 3",votos: 0,isLindo:false}
		]; 
		this.baseDatos.collection(FOTOSAPP).get().subscribe((querySnapShot)=>{
            querySnapShot.forEach((data)=>{
                this.listadoFotos.push(data.data() as FotosApp)
            });
        });
	}
  }
  volverHome(){
	  this.router.navigate(['home']);
  }
  sumarVoto(foto){
    foto.votos++;
  }
  tomarFoto(){
	let isNice = this.flag == 'Lindas' ? true : false; 
	this.baseDatos.collection(FOTOSAPP).add({
		urlFoto: '../../assets/PruebaLindas/testBadeDatos.jpg',
		autor: 'Mati Test Base de Datos',
		votos: 100,
		isLindo: isNice
	});
	this.listadoFotos.push(
		{
			urlFoto: '../../assets/PruebaLindas/testBadeDatos.jpg',
			autor: 'Mati Test Base de Datos',
			votos: 100,
			isLindo: isNice
		}
	);
	console.log("TOME UNA FOTO!");
  }
  
}
