import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { Router } from 'express';

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.scss',
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class OauthComponent implements OnInit {
  type: any;
  form: FormGroup | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.type = this.data.type;
    // this.constructForm();
  }

  constructForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pass: new FormControl(null, Validators.required)
    })
  }

}
