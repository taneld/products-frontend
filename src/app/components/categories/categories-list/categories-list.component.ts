import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../warehouse.service';
import { Category } from '../../../models/Category';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent implements OnInit {

    categories: Category[];
    editableId: string;

    constructor(private warehouse: WarehouseService) {
    }

    ngOnInit() {
        this.warehouse.getCategories().subscribe(
            (categories: Category[]) => this.categories = categories,
            err => alert(err.error)
        );
    }

    updateCategory(category) {
        let oldCategory = this.categories.find(x => x._id === category._id);
        this.categories[this.categories.indexOf(oldCategory)] = category;
    }

    deleteCategory(id) {
        let oldCategory = this.categories.find(x => x._id === id);
        this.categories.splice(this.categories.indexOf(oldCategory), 1);
    }

    onItemEditStart(id) {
        this.editableId = id;
    }

    onCategoryCreate(category) {
        this.categories.push(category);
    }

}
