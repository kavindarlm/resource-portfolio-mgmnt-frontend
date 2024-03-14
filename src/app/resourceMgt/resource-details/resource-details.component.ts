import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrl: './resource-details.component.css'
})
export class ResourceDetailsComponent {
  sharedData: any;
  showResourceEditForm: boolean = false;//first not to show the form
  selectedResource: any;///////////////////////////

  constructor(private resourceService: ResourceService) {
    this.sharedData = this.resourceService.getData();
    this.selectedResource = this.resourceService.getData();
  }

  onEdit() {
    this.showResourceEditForm = true; // Show the AddFormComponent
  }

}


