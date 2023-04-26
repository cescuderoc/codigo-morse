import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


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
    return this.http.post('https://example.com/api/data', params);
  }
}
