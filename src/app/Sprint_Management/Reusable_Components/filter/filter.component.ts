
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() options1: string[] = [];
  @Input() options2: string[] = [];
  @Input() label1: string = '';
  @Input() label2: string = '';
  
  @Input() filter1: string = '';
  @Input() filter2: string = '';
  @Input() hArray: string[] = [];
  @Input() gArray: any[] = [];
  

  searchText: string = '';
  

  filteredContents: any[] = [];

  ngOnInit() {
    this.filterContents();
  }

  filterContents(){
    if (this.searchText.trim() === '') {
      this.filteredContents = this.gArray;
    } else {
      this.filteredContents = this.gArray.filter(tablec =>
        tablec[this.filter1].toLowerCase().includes(this.searchText.toLowerCase()) ||
        tablec[this.filter2].toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

}
}
