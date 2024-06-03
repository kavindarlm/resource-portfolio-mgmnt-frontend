import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../dashboard-model/userModel';
import { FunctionModel } from '../dashboard-model/functionModel';
import { UsersFunctionModel } from '../dashboard-model/usersFunctionModel';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: HttpClient) { }

    //Add users
    createUser(user: UserModel) {
        return this.http.post<UserModel>('http://localhost:3000/api/register', user).pipe(
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
        return await this.http.get<UserModel[]>('http://localhost:3000/api/findAll');
    }

    //Get All users
    async getAllUsers() {
        return await this.http.get<UserModel[]>('http://localhost:3000/api/findAllUsers');
    }

    //Get All admins
    async getAllAdmins() {
        return await this.http.get<UserModel[]>('http://localhost:3000/api/findAllAdmins');
    }

    //Get single user
    getSingleUser(id: number) {
        return this.http.get<UserModel>('http://localhost:3000/api/find/' + id);
    }

    //Edit user
    editUser(id: number, user: UserModel) {
        return this.http.patch<UserModel>('http://localhost:3000/api/' + id, user);
    }

    //Delete user
    deleteUser(id: number) {
        return this.http.delete<UserModel>('http://localhost:3000/api/' + id);
    }

    //Get all functions
    getFunction() {
        return this.http.get<FunctionModel[]>('http://localhost:3000/functions/getAllFunctions');
    }

    //add user functions
    addUserFunction(userFunction: UsersFunctionModel) {
        return this.http.post<UsersFunctionModel>('http://localhost:3000/users-function/registerUsersFunction', userFunction);
    }

    //get user functions
    getUserFunction(id: number) {
        return this.http.get<UsersFunctionModel>('http://localhost:3000/users-function/getUserFunction/' + id);
    }

    //edit user functions
    editUserFunction(id: number, userFunction: UsersFunctionModel) {
        return this.http.patch<UsersFunctionModel>('http://localhost:3000/users-function/updateUserFunction/' + id, userFunction);
    }

    searchUser(username: string) {
        const params = new HttpParams().set('s', username);
        return this.http.get<UserModel[]>("http://localhost:3000/api/searchUserName/search", {params});
    }

    //is admin
    isAdmin(id: number) {
        return this.http.get<UserModel>('http://localhost:3000/api/isAdmin/' + id);
    }

    //get admin count
    getAdminCount() {
        return this.http.get('http://localhost:3000/api/adminCount');
    }
}