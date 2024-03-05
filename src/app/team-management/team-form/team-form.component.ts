import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css'
})
export class TeamFormComponent implements OnInit{

teamForm!: FormGroup;
accessList: any;

  ngOnInit(){
    this.teamForm = new FormGroup({
    team: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
    })
  }

  //get inputs form the teamForm
  OnFormSubmitted(){
    console.log(this.teamForm);
  }


}
