import { Router, ActivatedRoute } from '@angular/router';
import { OsService } from './../../../../services/os.service';
import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Cliente } from './../../../../models/cliente';
import { Tecnico } from './../../../../models/tecnico';
import { OS } from './../../../../models/os';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: '',
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteServce: ClienteService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')!
    this.listarTecnicos()
    this.listarClientes()
    this.findById()
  }

  update(): void {
    this.service.update(this.os).subscribe(resposta => {
      this.router.navigate(['os'])
      this.service.message('Ordem de serviço atualizada com sucesso', 'green-snackbar')
    })
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe(resposta => {
      //console.log(resposta)
      this.os = resposta
      this.converteDados()
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

  converteDados(): void {
    if (this.os.status == "ABERTO") {
      this.os.status = 0;
    } else if (this.os.status == "ANDAMENTO") {
      this.os.status = 1;
    } else {
      this.os.status = 2
    }

    if (this.os.prioridade == "BAIXA") {
      this.os.prioridade = 0;
    } else if (this.os.prioridade == "MEDIA") {
      this.os.prioridade = 1;
    } else {
      this.os.prioridade = 2
    }
  }
}

