import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class WarehouseService {

    baseUrl: string = 'http://localhost:4000';

    httpOptions: object = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
    }

    // === CATEGORIES

    getCategories() {
        return this.http.get(`${this.baseUrl}/categories`);
    }

    saveCategory(category) {
        const body = JSON.stringify(category);
        return this.http.post(`${this.baseUrl}/categories/add`, body, this.httpOptions);
    }

    updateCategory(categoryId, category) {
        const body = JSON.stringify(category);
        return this.http.put(`${this.baseUrl}/categories/update/${categoryId}`, body, this.httpOptions);
    }

    deleteCategory(categoryId) {
        return this.http.delete(`${this.baseUrl}/categories/delete/${categoryId}`);
    }

    // === PRODUCTS

    getProducts() {
        return this.http.get(`${this.baseUrl}/products`);
    }

    getProduct(id) {
        return this.http.get(`${this.baseUrl}/products/${id}`);
    }

    addProduct(product) {
        const body = JSON.stringify(product);
        return this.http.post(`${this.baseUrl}/products/add`, body, this.httpOptions);
    }

    updateProduct(id, product) {
        const body = JSON.stringify(product);
        return this.http.put(`${this.baseUrl}/products/update/${id}`, body, this.httpOptions);
    }

    deleteProduct(id) {
        return this.http.delete(`${this.baseUrl}/products/delete/${id}`);
    }

}
