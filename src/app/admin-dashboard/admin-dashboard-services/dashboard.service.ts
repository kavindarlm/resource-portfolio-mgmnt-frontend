import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../dashboard-model/userModel';



@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: HttpClient) { }

    createUser(user: UserModel) {
        return this.http.post<UserModel>('http://localhost:3000/api/register', user);
    }

    getUser() {
        return this.http.get<UserModel[]>('http://localhost:3000/api/findAll');
    }

    getSingleUser(id: number) {
        return this.http.get<UserModel>('http://localhost:3000/api/find/' + id);
    }

    editUser(id: number, user: UserModel) {
        return this.http.patch<UserModel>('http://localhost:3000/api/' + id, user);
    }

    deleteUser(id: number) {
        return this.http.delete<UserModel>('http://localhost:3000/api/' + id);
    }
}