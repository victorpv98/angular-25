import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { reto26array } from 'src/app/models/reto26';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private autenticacion: AutenticacionService,
     private router: Router,
     private userService: UserserviceService){}
  
  redireccion = '';
  usurio = ""
  password = ""
  login(){
    this.autenticacion.login();
    this.redireccion = this.autenticacion.urlUsuarioIntentaAcceder;
    this.autenticacion.urlUsuarioIntentaAcceder = '';
    this.router.navigate(["reto26"]);
  }
  onSubmit(){
    this.listado.some(elemento => {
      let user = elemento.username
      let pass = elemento.email
      if(user === this.usurio && pass === this.password){
        this.login()
        console.log("si existe")
        return true
      }else{
        console.log("NO existe")
        return false
      }
    })
  }
  listado: reto26array = []
  ngOnInit() {
    console.log("asdasd")
    this.userService.getReto26All().subscribe({
      next: (userAll:reto26array) => {
        this.listado = userAll
      }
    })
  }

}
