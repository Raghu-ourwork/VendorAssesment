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

  public setUser(user) {
    localStorage.setItem("access-token", user);
    this.user = user;
  }
  public getUser() {
    return localStorage.getItem("access-token");

  }

  public loginUser(emailId, password) {
    return this.http.post(environment.apiUrl + "api/Account", { emailId, password }, { responseType: 'text' });
  }

  public forgotPassword(emailId) {
    return this.http.get(environment.apiUrl + "api/Account/ForgotPassword/"+emailId );
  }
  
  logoutUser() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("sectionName");
    localStorage.removeItem("reportName");
    this.user = null;
    this.router.navigate(["/"]);
  }
  getUserDetails() {
    let userDetails = {userName:"",userId:"",userEmail:""}
    userDetails.userName = localStorage.getItem("userName");
    userDetails.userId = localStorage.getItem("userId");
    userDetails.userEmail = localStorage.getItem("userEmail");
    return userDetails
  }
  async setUserDetails() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUser());
    let userData: any = await this.http.get(environment.apiUrl + 'api/Account/', { headers: headers }).toPromise();
    localStorage.setItem("userName", userData.userName);
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("userEmail", userData.loginId);

  }
  getSidebar() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUser());

    return this.http.get(environment.apiUrl + 'api/Navigation/', { headers: headers })

  }
  getReport(reportId) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUser());
    return this.http.get(environment.apiUrl + 'api/PowerBiEmbed?ReportId=' + reportId, { headers: headers })

  }

  /************Update 14-9-2022********** */
  public resetPasswordCheckId(CheckId) {
    return this.http.get(environment.apiUrl + "api/Account/CheckId/"+CheckId );
  }

  public savepassword(emailId,password,id)
  {
    return this.http.post(environment.apiUrl + "api/Account/SavePassword", { emailId, password,id }, { responseType: 'json' });
  }
}
