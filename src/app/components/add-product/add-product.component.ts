import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../shared/product-servive/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  public addProductForm!: FormGroup;
  public base64Image: string | null = null; // Store the Base64 image string
  public isAdmin!:any

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      fuel: ['', Validators.required],
      model: ['', Validators.required],
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      seats: [null, [Validators.required, Validators.min(1)]],
      transmission: ['', Validators.required],
      image: ['', Validators.required], // Image field in the form group
    });
  }

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
  this.isAdmin = role === 'admin';
  }

  public async onFileSelected(event: any): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 500;
          const maxHeight = 500;

          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL(file.type);
          this.base64Image = resizedBase64;
        };
      };

      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  public onSubmit(): void {
    if (this.addProductForm.valid) {
      const product: Product = this.addProductForm.value;
      this.productService
        .addProduct(product, this.base64Image)
        .then(() => {
          console.log('Product added successfully!');
          this.router.navigate(['/dashboard']);
          this.addProductForm.reset();
        })
        .catch((error) => {
          console.error('Error adding product: ', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }

  // If you have a method to update products, define it here
  public updateProduct() {}
}
