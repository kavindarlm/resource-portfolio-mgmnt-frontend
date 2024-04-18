import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-function-button',
  templateUrl: './function-button.component.html',
  styleUrl: './function-button.component.css',
})
export class FunctionButtonComponent implements OnInit, OnDestroy {

  constructor(public sharedService: SharedService) { }

  @Input() buttonText: string = 'Add';
  isClicked = false;
  btnClass!: string;
  @Input() functionId!: number;
  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.sharedService.isAddNewUserClicked$.subscribe(isClicked => {
      if (!isClicked) {
        this.sharedService.functionIds1$.subscribe(ids => {
          this.processFunctionIds1(ids);
        });
      }
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  processFunctionIds1(ids: number[]) {
    if (ids) {
      // console.log(ids);
      const isIncluded = ids.includes(this.functionId);
      this.buttonText = isIncluded ? 'Done' : 'Add';
      isIncluded ? this.isClicked = true : this.isClicked = false;
      this.buttonClass;
    }
  }
  // This is the function that will be called when the button is clicked
  handleClicking() {
    this.isClicked = !this.isClicked;
    this.buttonText = this.isClicked ? 'Done' : 'Add';
  }

  get buttonClass() {
    return this.isClicked ? 'btn-success' : 'btn-outline-success';
  }


}
