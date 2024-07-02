import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../dashboard-model/userModel';
import { FunctionModel } from '../dashboard-model/functionModel';
import { UsersFunctionModel } from '../dashboard-model/usersFunctionModel';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    private apiUrl = environment.baseUrl // Global api URL

    constructor(private http: HttpClient) { }

    //Add users
    createUser(user: UserModel) {
        return this.http.post<UserModel>(`${this.apiUrl}/api/register`, user).pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 400 && error.error.message === 'Email already exists') {
          return throwError('Email already exists');
        }
        return throwError('An error occurred');
    }

    //Get All
    async getUser() {
        return await this.http.get<UserModel[]>(`${this.apiUrl}/api/findAll`);
    }

    //Get All users
    async getAllUsers() {
        return await this.http.get<UserModel[]>(`${this.apiUrl}/api/findAllUsers`);
    }

    //Get All admins
    async getAllAdmins() {
        return await this.http.get<UserModel[]>(`${this.apiUrl}/api/findAllAdmins`);
    }

    //Get single user
    getSingleUser(id: number) {
        return this.http.get<UserModel>(`${this.apiUrl}/api/find/${id}`);
    }

    //Edit user
    editUser(id: number, user: UserModel) {
        return this.http.patch<UserModel>(`${this.apiUrl}/api/${id}`, user);
    }

    //Delete user
    deleteUser(id: number) {
        return this.http.delete<UserModel>(`${this.apiUrl}/api/${id}`);
    }

    //Get all functions
    getFunction() {
        return this.http.get<FunctionModel[]>(`${this.apiUrl}/functions/getAllFunctions`);
    }

    //add user functions
    addUserFunction(userFunction: UsersFunctionModel) {
        return this.http.post<UsersFunctionModel>(`${this.apiUrl}/users-function/registerUsersFunction`, userFunction);
    }

    //get user functions
    getUserFunction(id: number) {
        return this.http.get<UsersFunctionModel>(`${this.apiUrl}/users-function/getUserFunction/${id}`);
    }

    //edit user functions
    editUserFunction(id: number, userFunction: UsersFunctionModel) {
        return this.http.patch<UsersFunctionModel>(`${this.apiUrl}/users-function/updateUserFunction/${id}`, userFunction);
    }

    searchUser(username: string) {
        const params = new HttpParams().set('s', username);
        return this.http.get<UserModel[]>(`${this.apiUrl}/api/searchUserName/search`, {params});
    }

    //is admin
    isAdmin(id: number) {
        return this.http.get<UserModel>(`${this.apiUrl}/api/isAdmin/${id}`);
    }

    //get admin count
    getAdminCount() {
        return this.http.get(`${this.apiUrl}/api/adminCount`);
    }
}