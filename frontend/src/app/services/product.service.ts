import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';

  //URL FOR PRODUCT CATEGORIES
  private categoryUrl = 'http://localhost:8080/api/product-category';


  constructor(private httpClient:HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id - URL FOR RETREIVING A PRODUCT 
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
      //RETURNS AN OBSERVABLE (JSON DATA RETURN CAN BE CONVERTED DIRECYLY TO Product object)
      //NO NEED TO UNWRAP JSON FROM SPRING DATA REST .THERE IS no_embedded entry 
      //JSON DATA CAN BE CONVERTED DIRECTLY TO Product object ,
      //JSON PROPERTIES MAP DIRECTLY TO PROPERTIES TO Product class
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductCategories(): Observable<ProductCategory[]> {
//CALL REST API TO BACKEND
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
      //RETURNS AN OBSERVABLE (MAP THE JSON DATA FROM SPRING DATA REST RO ProductCategory ARRAY)
    );
  }

  //PASS IN PARAMETERS FOR PAGINATION 
  getProductListPaginate(thePage: number, 
    thePageSize: number, 
    theCategoryId: number): Observable<GetResponseProducts> {

// need to build URL based on category id, page and size 
//SPRING DATA REST SUPPORTS PAGINATION OUT OF BOX SO JUST SEND THE PARAMTERS FOR PAGE AND SIZE
const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
+ `&page=${thePage}&size=${thePageSize}`;


return this.httpClient.get<GetResponseProducts>(searchUrl);
}


  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword -URL FOR SEARCHING PRODUCTS
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
     //RETURNS AN OBSERVABLE (MAP THE JSON DATA FROM SPRING DATA REST RO Product ARRAY)
  }

  //ADDING PAGINATION SUPPORT TO ProductService
  searchProductsPaginate(thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

// need to build URL based on keyword, page and size 
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}



}

interface GetResponse{
  _embedded:{
    products:Product[];
  }
}

  interface GetResponseProductCategory {
    _embedded: {
      productCategory: ProductCategory[];
      //UNWRAPS THE JSON FROM SPRING DATA REST _embedded entry
    }
  }
  
  interface GetResponseProducts {
    _embedded: {
      products: Product[];
    },
    page: {
      //SIZE OF THE PAGE
      size: number,
      //GRAND TOTAL OF ALL ELEMENTS IN THE DATABASE 
      totalElements: number,
      //TOTAL PAGES AVAILABLE
      totalPages: number,
      //CURRENT PAGE NUMBER
      number: number
    }
  }
  
    