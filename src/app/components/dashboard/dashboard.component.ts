import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth-service/auth.service';
import { Product } from '../../models/product';
import { ProductService } from '../../shared/product-servive/product.service';
import { HeaderComponent } from '../header/header.component';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FontAwesomeModule,
    FooterComponent,
    AddProductComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public productList: Product[] = [];
  id: string = '';
  name: string = '';
  model: string = '';
  year: Date = new Date();
  seats: number = 0;
  transmission: string = '';
  fuel: string = '';
  price: number = 0;
  image!: File;
  public faHeart = faHeart;
  public faDelete = faTrash;
  public isModalVisible = false;
  public isAdmin!: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    const role = localStorage.getItem('userRole');
    this.isAdmin = role === 'admin';
  }

  public signOut() {
    this.authService.signOut();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.map((e) => {
          const product = e.payload.doc.data() as any;
          return {
            id: e.payload.doc.id,
            ...product,
          };
        });
        console.log(this.productList);
      },
    });
  }

  public goToBooking() {
    this.router.navigate(['/booking']);
  }

  public addProduct() {
    this.router.navigate(['/add']);
  }

  public deleteProduct(product: Product) {
    this.productService
      .deleteProduct(product)
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }
}
