import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

const routes: Routes = [{
    path: 'categories',
    component: CategoriesListComponent
}, {
    path: 'products',
    component: ProductsListComponent
}, {
    path: 'products/edit/:id',
    component: ProductFormComponent
}, {
    path: 'products/add',
    component: ProductFormComponent
}, {
    path: '**',
    redirectTo: 'categories'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
