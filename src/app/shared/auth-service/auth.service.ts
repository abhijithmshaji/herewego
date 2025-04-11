import { Injectable, signal} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userDetails = signal<any>(null);
  constructor(private fireAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore,) {
    this.fireAuth.authState.subscribe((user: any) => {
      this.userSubject.next(user);
    });
  }

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isAuthenticated$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(
      map((user) => !!user) // Returns true if user is not null (authenticated)
    );

  //Login
  public login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      async (res) => {
        if (res.user?.emailVerified) {
          localStorage.setItem('token', 'true');
  
          // ✅ Fetch the user role from Firestore
          const userDoc = await this.afs.collection('users').doc(res.user.uid).get().toPromise();
          const userData: any = userDoc?.data();
  
          if (userData?.role) {
            localStorage.setItem('userRole', userData.role); // Store the role for access checks
          }
  
          this.userDetails.set(res.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  //Register
  public register(email: string, password: string, role: string = 'user') {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user) {
          // Save role in Firestore
          this.afs.collection('users').doc(res.user.uid).set({
            email: res.user.email,
            role: role
          });

          this.sendEmailForVerification(res.user);
          alert('Registration successful');
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        alert(err.messsge);
        this.router.navigate(['/register']);
      }
    );
  }

  //Sign out
  public signOut() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.messsge);
      }
    );
  }

  //Forgot Password
  public forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //Email varification
  public sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/varify-email']);
      },
      (err: any) => {
        alert('Something went wrong');
      }
    );
  }

  //Sign in with google
  public googleSignIn() {
    const provider = new GoogleAuthProvider();
    
    return this.fireAuth.signInWithPopup(provider).then(
      async (res) => {
        const user = res.user;

        if (user?.emailVerified) {
          localStorage.setItem('token', JSON.stringify(user?.uid)); 
          
          this.afs.collection('users').doc(user.uid).get().subscribe((userDoc) => {
            const userData: any = userDoc.data();
            if (userData?.role) {
              localStorage.setItem('userRole', userData.role);
            } else {
              localStorage.setItem('userRole', 'user'); 
            }

           
            this.userDetails.set(user);
            this.router.navigate(['/dashboard']); 
          });
        } else {
          
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert(err.message); 
      }
    );
  }

  public getUserRole(): Promise<string | null> {
    return this.fireAuth.currentUser.then((user) => {
      if (user) {
        return this.afs.collection('users').doc(user.uid).get().toPromise().then(doc => {
          const data: any = doc?.data();
          return data?.role || null;
        });
      } else {
        return null;
      }
    });
  }
} 