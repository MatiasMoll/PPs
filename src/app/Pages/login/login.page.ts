import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public usrName:string;
	public usrPass:string;

	constructor(private fireAuth: AngularFireAuth,private toast:ToastController,private router:Router) {
			
	}

	ngOnInit() {
	}
	login(){
		this.fireAuth.signInWithEmailAndPassword(
			this.usrName,this.usrPass
		)
		.then(()=>{
			this.showToast('Login was successfull','success',2000);
			this.router.navigate(['home']);
		})
		.catch((res:any)=> this.showToast(res,'danger',2000))
		this.clearInputs();
	} 
	
	signIn(){
		this.fireAuth.createUserWithEmailAndPassword(
			this.usrName, this.usrPass
		)
		.then((res:any) =>{
			this.showToast('Cuenta creada correctamente','success',2000);
			this.router.navigate(['login']);
		})
		.catch((res:any)=> this.showToast(res,'danger',2000));
		this.clearInputs();
	}
	
	clearInputs(){
		this.usrName = "";
		this.usrPass = "";
	}
	volverHome(){
		this.router.navigate(['']);
	}
	loginAdmin(){
		this.usrName = "admin@gmail.com";
		this.usrPass = "admin20";
	}
	loginUsuario1(){
		this.usrName = "usuario1@gmail.com";
		this.usrPass = "usuario1";
	}
	loginUsuario2(){
		this.usrName = "usuario2@gmail.com";
		this.usrPass = "usuario2";
	}
	async showToast(message:string,color:string,duration:number){
		const toast = await this.toast.create({
			color: color,
			duration: duration,
			message: message,
			position: 'top',
		});
		await toast.present();
	}
}
