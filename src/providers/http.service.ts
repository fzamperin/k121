import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private _http: HttpClient
  ) {
    console.log(environment)
  }

  getAllAmigos() {
    return this._http.get(environment.url + '/amigo/getall').toPromise();
  }

  createAmigo(amigo) {
    return this._http.post(environment.url + '/amigo/create', amigo).toPromise();
  }

  atualizarAmigo(amigo) {
    return this._http.post(environment.url + '/amigo/update', amigo).toPromise();
  }

  deletarAmigo(id) {
    return this._http.delete(environment.url + '/amigo/delete/' + id).toPromise();
  }

  sortear() {
    return this._http.post(environment.url + '/sortear/', {}).toPromise();
  }

}
