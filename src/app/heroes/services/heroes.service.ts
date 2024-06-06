import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { env } from '../../../env/env.prod';

@Injectable({providedIn: 'root'})
export class HeroesServices {
    private baseUrl: string = env.baseUrl;

    constructor(private http: HttpClient) { }
    
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id: string):Observable<Hero|undefined> {
        return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
            .pipe(
                catchError( error => of(undefined))
            );
    }

    getSuggestions( query: string ): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
    } // No funciono el json-serve nueva version

    /*getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
            .pipe(
                map(heroes => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())))
            );
    }*/ // Nueva version de json-serve
}