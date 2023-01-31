import { NgLocalization } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})


// ********** Compoentente tabla Angular Material ***********


export class VistaComponent {


  // ************ //
  listado: Users[] = [];
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellido','Correo',"eliminar","actualizar"];
  dataSource: any;
  clickedRows = new Set<Users>();

  // ************ //

  constructor(private userService: UserserviceService,
    public dialog: MatDialog){}

  datos: Users[] = [{Id: '', Nombre: '', Apellido:'',Correo:""}];
  ngOnInit(){
    // this.actualizar()
 
    this.userService.getUsersAll().subscribe({
      next: (UserAll: Users[]) => 
        {
          this.listado = UserAll,
          this.dataSource = this.listado
        },
      error: (e) => console.error(e),
      complete: () => console.info("La API devolvio todos los registros")
    });


    // Ejecutar el metogo getUsersAllInterceptor

    /*
    this.userService.getUsersAllInterceptor().subscribe({
      next: (response: any) => {this.listado = response.body},
      error: (e) => console.error(e),
      complete: () => console.info("La API devolvio todos los registros")
    });
    */
    
  }
  eliminar(id:string){
    this.userService.deleteUser(id).subscribe(
      {
        next: () => location.reload(),
        error: (e) => location.reload(),
      }
    )
  }
  abrirdialog(usuarios:Users){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{
      data: usuarios
    })
    dialogRef.afterClosed().subscribe((resultado:Users|undefined) => {
      if(typeof resultado === 'undefined'){

      }else{
        this.actualizar(resultado)
        location.reload()
      }
    })
  }
  actualizar(datos:Users){
    this.userService.postActualizar(datos).subscribe();
  }
  abrirdialogcrear(){
    const dialogRef = this.dialog.open(Crearnuevousuario,{
      data: this.datos[0]
    })
    dialogRef.afterClosed().subscribe((resultado:Users|undefined)=>{
      if(typeof resultado === 'undefined'){

      }else{
        this.nuevousuario(resultado)
        location.reload()
      }
    })
  }
  nuevousuario(datos:Users){
    this.userService.postUser(datos).subscribe();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
  ) {}
  ngOnInit(){
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-crearnuevousuario.html',
})
export class Crearnuevousuario {
  constructor(
    public dialogRef: MatDialogRef<Crearnuevousuario>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
  ) {}
  ngOnInit(){
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

