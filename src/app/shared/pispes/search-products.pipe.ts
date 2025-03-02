import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../feature/product/models/products';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {
  transform(productList: Product[], searchInput: string) {
    return productList.filter((item) => item.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
  }

}
