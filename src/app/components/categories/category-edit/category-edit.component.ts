import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WarehouseService } from '../../../warehouse.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})

export class CategoryEditComponent implements OnInit {

    @Input() id: string;
    @Output() onCreate = new EventEmitter();

    saveInProgress: boolean = false;
    nameError: string;
    newCategoryName: string = '';

    constructor(private warehouse: WarehouseService) {
    }

    ngOnInit() {
    }

    clearNameError() {
        this.nameError = '';
    }

    onSaveClick() {
        this.saveInProgress = true;

        const category = {
            name: this.newCategoryName,
        };

        this.warehouse.saveCategory(category).subscribe(
            response => {
                this.newCategoryName = '';
                this.saveInProgress = false;
                this.onCreate.emit(response);
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
