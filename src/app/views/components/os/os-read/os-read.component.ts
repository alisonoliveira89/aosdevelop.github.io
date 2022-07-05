import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { OS } from './../../../../models/os';
import { ClienteService } from './../../../../services/cliente.service';
import { OsService } from './../../../../services/os.service';
import { TecnicoService } from './../../../../services/tecnico.service';

interface Status {
  status: string;
}

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista: OS[] = [];

  status: Status[] = [
    { status: '' },
    { status: 'ABERTO' },
    { status: 'ANDAMENTO' },
    { status: 'ENCERRADO' },
  ];

  selectStat = ''

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) { }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.lista = []
    this.service.findAll().subscribe((resposta) => {
      //this.lista = resposta;
      resposta.forEach(x => {
        if(x.status == this.selectStat && this.selectStat != "") {
          console.log(x.status)
          this.lista.push(x)
        } else if(this.selectStat == "")  {
          this.lista.push(x)
        }
      })
      //console.log(this.tecnicos);
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['os/create']);
  }

  listarTecnico(): void {
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  listarCliente(): void {
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  prioridade(x: String) {
    return x.toLowerCase()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*filtrar(palavraChave: string) {
    if (palavraChave) {
      palavraChave = palavraChave.toUpperCase();

      this.lista = this.lista.filter(a =>
            a.status.toUpperCase().indexOf(palavraChave) >= 0
        );
    }
  }*/
  filtrar() {
    //let filterSel = this.form.get('status')?.value
    console.log('xx teste ' + this.selectStat)

    this.lista = this.lista.filter(a =>
      a.status.toUpperCase().indexOf(this.selectStat.trim().toUpperCase()) >= 0
    );

    /*this.lista.forEach(x =>{
      if(x.status == this.selectStat) {
        this.lista.push(x)
      }
      //console.log(" STATUS => "+x.status)
    })*/


  }
}

