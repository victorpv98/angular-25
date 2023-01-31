import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { reto26array } from 'src/app/models/reto26';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Reto26DataSource, Reto26Item } from './reto26-datasource';

@Component({
  selector: 'app-reto26',
  templateUrl: './reto26.component.html',
  styleUrls: ['./reto26.component.css']
})
export class Reto26Component implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<Reto26Item>;
  dataSource: reto26array=[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','username','email','phone','website'];

  constructor(private userService: UserserviceService) {
  }
  listado: reto26array = []
  ngOnInit() {
    console.log("asdasd")
    this.userService.getReto26All().subscribe({
      next: (userAll:reto26array) => {
        this.dataSource = userAll
      }
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
