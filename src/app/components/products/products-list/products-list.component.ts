import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../warehouse.service';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

    private categories: Category[];
    private products: Product[];
    private saveInProgress: boolean = false;

    constructor(private warehouse: WarehouseService) {
    }

    ngOnInit() {
        this.warehouse.getCategories().subscribe(
            (categories: Category[]) => {
                this.categories = categories;
                this.warehouse.getProducts().subscribe(
                    (products: Product[]) => this.products = products,
                    err => alert(err.error)
                );
            },
            err => alert(err.error)
        );
    }

    formatPrice(price) {
        return price.toFixed(2) + ' EUR';
    }

    getCategoryById(id) {
        return this.categories.find(x => x._id === id)
    }

    onDeleteClick(id) {
        this.saveInProgress = true;
        this.warehouse.deleteProduct(id).subscribe(
            () => {
                this.saveInProgress = false;
                const itemToRemove = this.products.find(x => x._id === id);
                this.products.splice(this.products.indexOf(itemToRemove), 1);
                const idx = this.products.indexOf
            },
            err => {
                this.saveInProgress = false;
                alert(err.error);
            }
        );
    }

}
