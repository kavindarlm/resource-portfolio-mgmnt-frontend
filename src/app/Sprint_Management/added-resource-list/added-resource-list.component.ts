import { Component, Input } from '@angular/core';
import { AvailableResourceListComponent } from '../available-resource-list/available-resource-list.component';

@Component({
  selector: 'app-added-resource-list',
  templateUrl: './added-resource-list.component.html',
  styleUrl: './added-resource-list.component.css'
})
export class AddedResourceListComponent {


  @Input() HeadArray: any[] = [];
  @Input() tablecontents: any[] = [];



}
