import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { WarehouseService } from '../../../warehouse.service';
import { Category } from '../../../models/Category';

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.scss']
})

export class CategoryItemComponent implements OnInit {

    @Input() category: Category;
    @Input() editableId: string;
    @Output() onUpdate = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onEditStart = new EventEmitter();
    @ViewChild('editField') editField;

    newValue: string = '';
    nameError: string = '';
    saveInProgress: boolean = false;

    constructor(private warehouse: WarehouseService) {
    }

    ngOnInit() {
    }

    onDeleteClick() {
        this.saveInProgress = true;
        this.warehouse.deleteCategory(this.category._id).subscribe(
            () => {
                this.saveInProgress = true;
                this.onDelete.emit(this.category._id);
            },
            () => this.saveInProgress = false
        );
    }

    onEditClick() {
        this.onEditStart.emit(this.category._id);
        this.newValue = this.category.name;
        // Allow field to render
        setTimeout(
            () => this.editField.nativeElement.focus(),
            0
        );
    }

    nameIsValid() {
        const val = this.newValue.trim();
        return val && val !== this.category.name;
    }

    onCancelClick() {
        this.onEditStart.emit(null);
        this.newValue = '';
        this.clearNameError();
    }

    clearNameError() {
        this.nameError = '';
    }

    onSaveClick() {
        this.saveInProgress = true;
        const data = {
            name: this.newValue,
        };
        this.warehouse.updateCategory(this.category._id, data).subscribe(
            category => {
                this.saveInProgress = false;
                this.onEditStart.emit(null);
                this.onUpdate.emit(category);
            },
            err => {
                this.saveInProgress = false;
                if (err.status === 409) {
                    this.nameError = err.error;
                } else {
                    alert(err.error);
                }
            }
        );
    }

}
