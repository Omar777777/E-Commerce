import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../categories/services/category.service';
import { CategoryDetailes } from '../../../categories/models/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-slider',
  imports: [NgFor, CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {

  private readonly categoryService = inject(CategoryService)

  categoryList: CategoryDetailes[] = []

  ngOnInit() {
    this.getCategories()
  }
  
  getCategories() {
    this.categoryService.getAllCetegory().subscribe({
      next: (res) => {
        this.categoryList = res.data
      }
    })
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
