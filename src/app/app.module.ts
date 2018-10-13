import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoryItemComponent } from './components/categories/category-item/category-item.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CategoriesListComponent,
        CategoryItemComponent,
        ProductFormComponent,
        ProductsListComponent,
        CategoryEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
