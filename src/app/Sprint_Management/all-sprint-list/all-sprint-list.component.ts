import { Component, OnInit } from '@angular/core';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-sprint-list',
  templateUrl: './all-sprint-list.component.html',
  styleUrl: './all-sprint-list.component.css'
})
export class AllSprintListComponent implements OnInit {
  Seachtext!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

  }



  onSearchChange() {
  
  }

  getPaginatedSprints() {
    
  }

  changePage(page: number) {
  }

  onClick(){
  //  this.router.navigate(['/pages-body/projectlist/createproject']); 
  }

  onClickNavigateTo(projectId: string){
    // this.router.navigate(['/pages-body/projectlist/updatePoject/'+projectId]);

  }
}
