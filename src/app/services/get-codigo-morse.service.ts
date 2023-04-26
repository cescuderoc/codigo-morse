import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetCodigoMorseService {

  constructor(private http: HttpClient) {}

  /**
   * Funcion encargada de obtener codigo morse en base a un texto.
   * 
   * @param texto 
   * @returns 
   */
  getData(texto:string) {
    const params = {
      'texto':texto
    };
    //se consulta al servicio
    return this.http.get('http://localhost:3000/api');
  }
}
