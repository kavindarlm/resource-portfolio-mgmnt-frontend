import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-added-resource-list',
  templateUrl: './added-resource-list.component.html',
  styleUrl: './added-resource-list.component.css'
})
export class AddedResourceListComponent {


  @Input() HeadArray: any[] = [];
  @Input() tablecontents: any[] = [];

}
