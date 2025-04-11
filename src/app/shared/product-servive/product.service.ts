import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product, Reservation } from '../../models/product';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public uploadedFileURL!: string;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  //Add product
  public addProduct(product: Product, imageUrl: string | null) {
    const id = this.afs.createId();
    return this.afs.doc(`Products/${id}`).set({
      ...product,
      imageUrl,
      id,
    });
  }

  public getProductById(id: string): Observable<any> {
    return this.afs.collection('Products').doc(id).valueChanges();
  }

  //Get all products
  public getAllProducts() {
    return this.afs.collection('Products').snapshotChanges();
    // return of (cars)
  }

  //Delete product
  public deleteProduct(product: Product) {
    return this.afs.doc(`Products/${product.id}`).delete();
  }

  //Update product
  updateProduct(
    id: string,
    product: Product,
    imageBase64: string | null
  ): Promise<void> {    
    return this.afs
      .collection('Products')
      .doc(id)
      .update({ ...product, imageUrl: imageBase64 || product.imageUrl });
  }

  public addReservation(reservation: Reservation) {
    const id = this.afs.createId();
    if (!reservation.status) {
      reservation.status = 'pending';
    }
    return this.afs.doc(`reservations/${id}`).set({
      ...reservation,
      id,
    });
  }

  // Get all reservations
  public getAllReservations(): Observable<Reservation[]> {
    return this.afs
      .collection<Reservation>('reservations')
      .valueChanges({ idField: 'id' });
  }

  // Update reservation status (e.g., confirm or cancel)
  public updateReservationStatus(id: string, status: string): Promise<void> {
    return this.afs.doc(`reservations/${id}`).update({ status });
  }

  // Delete a reservation
  public deleteReservation(id: string): Promise<void> {
    return this.afs.doc(`reservations/${id}`).delete();
  }
}
