import { Component, inject } from '@angular/core';
import { ProductListComponent } from "../../../product/components/product-list/product-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent, MainSliderComponent, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly authService = inject(AuthService)
  ngOnInit() {
    
  }

  checkForValidToken() {
    this.authService.verifyToken().subscribe({
      next: () => {
        
      }, error: () => {
        this.authService.logout()
      }
    })
  }

}
