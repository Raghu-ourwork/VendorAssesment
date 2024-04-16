import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any = null;

  constructor(private http: HttpClient, private router: Router,) { }


  public getUser() {
    return localStorage.getItem("email");
  }

  public loginUser(email, password) {
    return this.http.post(environment.apiUrl + "auth/login", { email, password }, { responseType: 'json' });
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    this.user = null;

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    this.http.get(environment.apiUrl + "logout", { headers: headers });
    this.router.navigate([""]);
  }
  getUserDetails() {
    let userDetails = { email: "", role: "" }
    userDetails.email = localStorage.getItem("email");
    userDetails.role = localStorage.getItem("role");
    return userDetails
  }
  getMenu() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    return this.http.get(environment.apiUrl + 'get-menus',{ headers: headers })
  }
  getEmbedToken(reportId: string,pageName:string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    return this.http.post(environment.apiUrl + "reports/embed-token", { reportId,pageName }, { headers: headers });
  }
}
