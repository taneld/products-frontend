import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../../../warehouse.service';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

    id: string;
    categories: Category[];
    product: Product;
    editableProduct: Product;
    saveInProgress: boolean = false;

    constructor(private warehouse: WarehouseService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.id = params.id;
                this.warehouse.getProduct(params.id).subscribe(
                    (product: Product) => {
                        this.product = product;
                        this.resetForm();
                    },
                    err => alert(err.error)
                );
            } else {
                this.product = {
                    name: '',
                    description: '',
                    price: null,
                    categories: [],
                };
                this.resetForm();
            }
        });
        this.warehouse.getCategories().subscribe(
            (categories: Category[]) => this.categories = categories,
            err => alert(err.error)
        );
    }

    onCategoryClick(id: string) {
        const idx = this.editableProduct.categories.indexOf(id);

        if (idx > -1) {
            this.editableProduct.categories.splice(idx, 1);
        } else {
            this.editableProduct.categories.push(id);
        }
    }

    resetForm() {
        this.editableProduct = Object.assign({}, this.product);
        this.editableProduct.categories = Object.assign([], this.product.categories);
    }

    formIsValid() {
        return this.editableProduct.name &&
            this.editableProduct.description &&
            this.editableProduct.price &&
            this.editableProduct.price > 0;
    }

    onSaveClick() {
        this.saveInProgress = true;

        const operation = this.id ?
            this.warehouse.updateProduct(this.id, this.editableProduct) :
            this.warehouse.addProduct(this.editableProduct);

        operation.subscribe(
            () => this.router.navigateByUrl('/products'),
            err => {
                this.saveInProgress = false;
                alert(err.error);
            }
        );
    }

    onResetClick() {
        this.resetForm();
    }

    onCancelClick() {
        this.router.navigateByUrl('/products');
    }

}
