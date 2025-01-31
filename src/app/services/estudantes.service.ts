import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudantePaginado } from '../../models/estudante-paginado';
import { Estudante } from '../../models/estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {

  private readonly api = "http://localhost:3000/estudantes";

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Estudante> {
    const url = `${this.api}/${id}`;
    return this.http.get<Estudante>(url);
  }

  listar(pagina: number, itensPorPagina: number, campoDeOrdenacao: string): Observable<EstudantePaginado> {
    const params = new HttpParams()
      .set("_page", pagina)
      .set("_per_page", itensPorPagina)
      .set("_sort", campoDeOrdenacao);
    return this.http.get<EstudantePaginado>(this.api, { params });
  }

  criar(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(this.api, estudante);
  }

  atualizar(estudante: Estudante): Observable<Estudante> {
    const url = `${this.api}/${estudante.id}`;
    return this.http.put<Estudante>(url, estudante);
  }

  excluir(id: number): Observable<Estudante> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Estudante>(url);
  }

}
