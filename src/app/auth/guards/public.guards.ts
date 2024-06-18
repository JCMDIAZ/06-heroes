import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanMatch } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthServices } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate  {

    constructor( 
        private authServices: AuthServices,
        private router: Router
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean>  {
        return this.authServices.checkAuthentication()
            .pipe(
                tap( isAuthenticad => console.log( 'Autenticated:', isAuthenticad )),
                tap( isAuthenticated => {
                    if( isAuthenticated ) this.router.navigate(['./'])
                }),
                map( isAuthenticated => !isAuthenticated)
            );
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        //console.log('Can Match')
        //console.log( { route, segments });
        
        //return true;
        return this.checkAuthStatus();
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        //console.log('Can Activate')
        //console.log({ route, state });
        
        //return true;
        return this.checkAuthStatus();
    }
    
}