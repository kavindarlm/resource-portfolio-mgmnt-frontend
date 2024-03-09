import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent  implements OnInit{
      public dataid!: string;
      public projectdata!:datamodel;
    constructor(private activatedroute: ActivatedRoute, private router: Router, private api: ApiService) { }

    ngOnInit(): void {
      this.activatedroute.paramMap.subscribe((param: Params) => {
        this.dataid = param['get']('id'); 
        // console.log(this.dataid);
      })
      this.api.fetchProject(this.dataid).subscribe((data: datamodel) => {
        this.projectdata = data;
        // console.log(this.projectdata);
      })
    }
    editProjectDetails(){
      this.api.updateProject(this.projectdata,this.dataid).subscribe((res:datamodel)=>{
        this.router.navigate(['/']); 
      })
    }
}
