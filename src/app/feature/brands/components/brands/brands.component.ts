import { Component, inject } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../models/brand';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  private readonly brandsService = inject(BrandsService)
  private readonly authService = inject(AuthService)
  allBrands:Brand = {} as Brand

  ngOnInit() {

    this.authService.verifyToken().subscribe({
      next: () => {
         this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res

      }
    })
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
   
  }

}
