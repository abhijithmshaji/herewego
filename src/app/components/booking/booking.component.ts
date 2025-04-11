import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../shared/product-servive/product.service';
import { Reservation } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  public name: string = ''; // Initialize properties
  public age: number = 18;
  public phone: string = '';
  public email: string = '';
  public address: string = '';
  public pickUpDate: string = '';
  public dropOffDate: string = '';
  public pickUpLocation: string = '';
  public dropOffLocation: string = '';
  public status: string = '';

  isModalVisible: boolean = false;
  userForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.minLength(3)]],
      age: [this.age, [Validators.required, Validators.min(18)]],
      phone: [
        this.phone,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      email: [this.email, [Validators.required, Validators.email]],
      address: [this.address, [Validators.required, Validators.minLength(10)]],
      pickUpDate: [this.pickUpDate, Validators.required],
      dropOffDate: [this.dropOffDate, Validators.required],
      pickUpLocation: [this.pickUpLocation, Validators.required],
      dropOffLocation: [this.dropOffLocation, Validators.required],
      status: [this.status],
    });
  }

  // Open modal method
  openModal() {
    this.isModalVisible = true;
  }

  // Close modal method
  closeModal() {
    this.isModalVisible = false;
  }

  onCloseModal() {
    this.isModalVisible = false;
    this.router.navigate(['/dashboard']);
  }

  public onSubmit() {
    const reservation: Reservation = this.userForm.value;
    // Save reservation to Firebase
    this.productService
      .addReservation(reservation)
      .then(() => {
        this.openModal();
      })
      .catch((error) => console.error('Error adding reservation: ', error));
  }
}
