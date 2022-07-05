import { OsService } from './../../../../services/os.service';
import { OS } from './../../../../models/os';
import { Router } from '@angular/router';
import { Cliente } from './../../../../models/cliente';
import { Tecnico } from './../../../../models/tecnico';
import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteServce: ClienteService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos()
    this.listarClientes()
  }

  create(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.router.navigate(['os'])
      this.service.message('Ordem de serviço criado com sucesso', 'green-snackbar')
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteServce.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

}
