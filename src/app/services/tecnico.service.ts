import { Tecnico } from './../models/tecnico';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Tecnico[]> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  findById(id : any):Observable<Tecnico> {
    const url = `${this.baseUrl}/tecnicos/${id}`;
    //const url = this.baseUrl + "/tenicos/" + id;
    return this.http.get<Tecnico>(url)
  }

  create(tecnico: Tecnico):Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url, tecnico);
  }

  update(tecnico: Tecnico):Observable<Tecnico> {
    const url = `${this.baseUrl}/tecnicos/${tecnico.id}`;
    return this.http.put<Tecnico>(url, tecnico);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/tecnicos/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String, className: string): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: [className]
    });
  }
}
