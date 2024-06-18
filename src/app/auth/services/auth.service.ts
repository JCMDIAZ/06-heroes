import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env/env';
import { User } from '../interfaces/user.interface';
import { Observable, of, tap, map, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthServices {
    private baseUrl = env.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }
    
    get currenUser(): User|undefined {
        if( !this.user ) return undefined;

        return structuredClone(this.user);
    }

    login( email: string, password: string):Observable<User> {
        // http.post('login', { email, password });

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user ),
                tap( user => localStorage.setItem('token', 'AS1isdfsclr543dFEs.sf2rasdfs.444wedw4')),
            )
    }

    checkAuthentication(): Observable<boolean> {
        if( !localStorage.getItem('token') ) return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user),
                map( user => !!user ),
                catchError( err => of(false))
            )
    }

    logout(): void {
        this.user = undefined;
        localStorage.clear();
    }
}