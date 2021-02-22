import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../model/users';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  url: string = 'http://localhost:3000/Users';
  constructor(private _http: HttpClient) {}
  getUsers() {
    return this._http.get<Users[]>(this.url);
  }
}
