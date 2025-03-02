import { Component, Input } from '@angular/core';
import { SubCategoriesDetailes } from '../../models/subcategory';

@Component({
  selector: 'app-sub-category',
  imports: [],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
@Input() subCategories!:SubCategoriesDetailes
}
