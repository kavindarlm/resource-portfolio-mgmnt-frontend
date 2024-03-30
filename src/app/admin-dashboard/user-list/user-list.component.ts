import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor (private router: Router){}
 userdetails = [
    {
      "userName": "JohnDoe",
      "userId": "001",
      "email": "johndoe@example.com"
    },
    {
      "userName": "JanyeeDoe",
      "userId": "002",
      "email": "janedoe@example.com"
    },
    {
      "userName": "MikeSmith",
      "userId": "003",
      "email": "mikesmith@example.com"
    },
    {
      "userName": "SaraJones",
      "userId": "004",
      "email": "sarajones@example.com"
    },
    {
      "userName": "WillBrown",
      "userId": "005",
      "email": "willbrown@example.com"
    },
    {
      "userName": "EmilyClark",
      "userId": "006",
      "email": "emilyclark@example.com"
    },
    {
      "userName": "DerekWard",
      "userId": "007",
      "email": "derekward@example.com"
    },
    {
      "userName": "AnnaPeterson",
      "userId": "008",
      "email": "annapeterson@example.com"
    },
    {
      "userName": "ChrisLee",
      "userId": "009",
      "email": "chrislee@example.com"
    },
    {
      "userName": "OliviaGarcia",
      "userId": "010",
      "email": "oliviagarcia@example.com"
    }
  
 ];
identifyUser(user: any){
  console.log(user.userId);
  this.router.navigate(['admin-dashboard/userDetail']);
}
}
