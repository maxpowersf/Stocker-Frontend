import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private _router: Router,
        private snackBar: MatSnackBar
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    this.blockUI.stop();

                    let errorMessage = '';
                    if (err.error instanceof ErrorEvent) {
                        //client-side error
                        errorMessage = 'Error: ' + err.error.message;
                    }
                    else {
                        //server-side error
                        errorMessage = 'Error ' + err.status + ': ' + err.message;
                    }

                    console.log(errorMessage);
                    this.snackBar.open(errorMessage, '', {
                        duration: 5000,
                        panelClass: 'btn-danger',
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });

                    return throwError(errorMessage);
                })
            )
    }
}