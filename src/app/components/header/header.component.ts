import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faHeart,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  public faCart = faShoppingCart;
  public faHeart = faHeart;
  public faSearch = faSearch;
  public faLogOut = faArrowRightFromBracket
  public userDetails = this.authService.userDetails
  public userName!:any
 constructor( private authService: AuthService){}
  ngOnInit(): void {
    this.userName=this.userDetails().multiFactor.user.displayName;    
  }
 

}
