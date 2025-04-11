export interface Product {
    id: string;
    name: string;
    model: string;
    year: number;
    seats: number;
    transmission: string;
    fuel: string;
    price: number;
    imageUrl:string;
  }

  export interface Reservation {
    id?: string;
    name: string;
    age:number;
    email: string;
    phone: string;
    address:string;
    pickUpDate: string;
    dropOffDate: string;
    pickUpLocation: string;
    dropOffLocation: string;
    status: string; 
  }