import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../dashboard-model/userModel';
import { FunctionModel } from '../dashboard-model/functionModel';



@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: HttpClient) { }

    //Add users
    createUser(user: UserModel) {
        return this.http.post<UserModel>('http://localhost:3000/api/register', user);
    }

    //Get all users
    getUser() {
        return this.http.get<UserModel[]>('http://localhost:3000/api/findAll');
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

}