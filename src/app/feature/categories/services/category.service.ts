import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly httpClient = inject(HttpClient)


  getAllCetegory(): Observable<any>{
    return this.httpClient.get(enviroments.baseUrl+'categories')
  }

    getAllSubCetegoriesOnCategory(categoryId:string): Observable<any>{
    return this.httpClient.get(enviroments.baseUrl+`categories/${categoryId}/subcategories`)
  }
}
