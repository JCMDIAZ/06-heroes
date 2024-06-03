import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { env } from '../../../env/env.prod';

@Injectable({providedIn: 'root'})
export class HeroesServices {
    private baseUrl: string = env.baseUrl;

    constructor(private http: HttpClient) { }
    
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }
}