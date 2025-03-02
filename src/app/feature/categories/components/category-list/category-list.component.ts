import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AllCategories } from '../../models/category';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { SubCategory } from '../../models/subcategory';
import { SubCategoryComponent } from "../sub-category/sub-category.component";
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, SubCategoryComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  private readonly categoryservice = inject(CategoryService)
  private readonly authService = inject(AuthService)
  allcategory: AllCategories = {} as AllCategories
  subCategory: SubCategory = {} as SubCategory
  categoryId!: string
  categoryName!: string
  

  ngOnInit() {
    this.getallcategorie()
  }

  getallcategorie() {

        this.authService.verifyToken().subscribe({
      next: () => {
       this.categoryservice.getAllCetegory().subscribe({
      next: (res) => {
        this.allcategory = res
        
      }
    })
        
      }, error: () => {
        this.authService.logout()
        
      }
    })


 
  }

  getCategoryId(categoryId: string, categoryName:string) {
    this.categoryId = categoryId
    this.categoryName = categoryName + " SubCategories"
    this.getSubCategoriesOfCategory()
  }

  getSubCategoriesOfCategory() {

         this.authService.verifyToken().subscribe({
      next: () => {
        this.categoryservice.getAllSubCetegoriesOnCategory(this.categoryId).subscribe({
      next: (res) => {
        this.subCategory = res
    }
  })
        
      }, error: () => {
        this.authService.logout()
        
      }
    })


   
}

}
