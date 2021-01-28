import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platillo } from '../models/platillo';
import { PlatillosService } from '../services/platillos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public myForm: FormGroup;
  public saurce: Platillo;
  public saurces: Platillo[];
  constructor(private studentService: PlatillosService, private fb: FormBuilder) { }

  ngOnInit() {

    this.myForm = this.fb.group(
      {
        name: [''],
        image: [''],
        description: [''],
        price: [0],
        ingredients: [''],
      });
  }

  create() {

    this.saurce = {
      name: this.myForm.controls.name.value,
      image: this.myForm.controls.image.value,
      description: this.myForm.controls.description.value,
      price: this.myForm.controls.price.value,
      ingredients: this.myForm.controls.ingredients.value,
    };

    this.studentService.createPlatillo(this.saurce);
    this.cleanInputs();

  }

  private cleanInputs(): void {
    const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.myForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      image: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(300)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(300)])],
      ingredients: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(300)])],
      price: [0, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      active: [true, Validators.compose([Validators.required])],
    });

  }

}