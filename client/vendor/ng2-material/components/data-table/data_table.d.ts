/// <reference types="core-js" />
import { EventEmitter, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/share';
import { MdDataTableHeaderSelectableRow, MdDataTableSelectableRow, ITableSelectableRowSelectionChange } from './data_table_selectable_tr';
export * from './data_table_selectable_tr';
export interface ITableSelectionChange {
    name: string;
    allSelected: boolean;
    values: any[];
}
export declare class MdDataTable implements AfterContentInit, OnDestroy {
    selectable: boolean;
    onSelectableAll: EventEmitter<any>;
    onSelectableChange: EventEmitter<any>;
    _masterRow: MdDataTableHeaderSelectableRow;
    _rows: QueryList<MdDataTableSelectableRow>;
    _listeners: EventEmitter<any>[];
    selected: Array<string>;
    constructor();
    change(event: ITableSelectableRowSelectionChange): void;
    _getRowsValues(): any[];
    _unsubscribeChildren(): void;
    _updateChildrenListener(list: QueryList<MdDataTableSelectableRow>): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
export declare class MdDataTableModule {
}
