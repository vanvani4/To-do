import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    login(login: string, password: string) {
        return this.http.post('http://localhost:3000/login', { login, password })
            .map((data: Response) => {
                const user = data.json().user;
                this.saveToken(data.json().token);
                localStorage.setItem('currentUser', user);
            });
    }

    saveToken(token: string) {
        window.localStorage['jwtToken'] = token;
    }

    deleteToken() {
        window.localStorage.removeItem('jwtToken');
    }
}
