import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: "root",
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes("/connect/token")) {
      this.loaderService.show();
    }
    const token: string = sessionStorage.getItem("access_token");

    if (token) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
    }
    if (!req.headers.has("enctype") && !req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json"),
      });
    } else {
      req = req.clone({
        headers: req.headers.delete("enctype"),
      });
    }
    req = req.clone({ headers: req.headers.set("Accept", "application/json") });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      }),
      finalize(() => {
        if (!req.url.includes("/connect/token")) {
          this.loaderService.hide();
        }
      })
    );
  }
}
