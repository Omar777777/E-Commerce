import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { AllCategories, CategoryDetailes } from '../../models/category';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() category!: CategoryDetailes
  @Output() categoryId = new EventEmitter<{categoryId:string , categoryName:string}>()

  OnCategoryClick(categoryId: string, categoryName:string) {
    this.categoryId.emit({ categoryId, categoryName })
    
  }

}
