import { Injectable, Pipe } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, pipe } from 'rxjs';
import { AuthServices } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

    constructor( 
        private authServices: AuthServices,
        private router: Router
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean>  {
        return this.authServices.checkAuthentication()
            .pipe(
                tap( isAuthenticad => console.log( 'Autenticated:', isAuthenticad )),
                tap( isAuthenticated => {
                    if( !isAuthenticated ) this.router.navigate(['./auth/login'])
                }),
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