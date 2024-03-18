import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { dataModel } from '../team-form/team-form.model';
import { GeneralService } from '../shared/general.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public dataid!: number;
  public teamData: dataModel = { id:'', teamName: '', description: '', selectedResources: [] }; // Adjust the model based on your API response structure
  showResourceTable = false;

  constructor(
    private activatedroute: ActivatedRoute,
     private router: Router, 
     private api: ApiService,
     public generalservice: GeneralService
     ) 
     { 
    this.showResourceTable = false;
    }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id'); // Use 'get' instead of '[]' to get the parameter value

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;
      });
    });

  }

//edit team data
  edit() {
    this.api.editTeams(this.teamData, this.dataid).subscribe(
      (_res: any) => { // Change the type of '_res' to 'any'
        // Assuming 'res' is of type 'dataModel'
        // Your logic here
        this.router.navigate(['/']); // Navigate to the desired route
      },
      (error: any) => { // Define error type as 'any' or specify the error type if known
        // Handle errors if necessary
      }
    );
  }

  //delete team data
 
}
  
  
  

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, Params } from '@angular/router';
// import { ApiService } from '../shared/api.service';
// import { dataModel } from '../team-form/team-form.model';

// @Component({
//   selector: 'app-update',
//   templateUrl: './update.component.html',
//   styleUrls: ['./update.component.css']
// })
// export class UpdateComponent implements OnInit {
//   public dataid!: number;
//   public teamData: dataModel = { id:'', teamName: '', description: '', resorceId: 0, resourceName: '', role: '', OrgUnit: '' };
//   selectedResources: any;

//   constructor(private activatedroute: ActivatedRoute, private router: Router, private api: ApiService) { }

//   ngOnInit(): void {
//     this.activatedroute.paramMap.subscribe((params: Params) => {
//       this.dataid = params['get']('id');

//     });
//     this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
//       this.teamData = data;
//     });
//   }
// }


// use this if you want to move team to team with refreshing
// ngOnInit(): void {
  //     this.activatedroute.paramMap.subscribe((params: Params) => {
  //       this.dataid = params['get']('id');
  
  //     });
  //     this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
  //       this.teamData = data;
  //     });
