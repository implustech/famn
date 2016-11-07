import { EventEmitter, ElementRef, AfterContentInit } from "@angular/core";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { MdDataTable } from './data_table';
export interface ITableSelectableRow {
    selectableValue: string;
    onChange: EventEmitter<ITableSelectableRowSelectionChange>;
    isActive: boolean;
    change: (event: any) => void;
    ngAfterContentInit: () => void;
}
export interface ITableSelectableRowSelectionChange {
    name: string;
    target: ITableSelectableRow;
    isActive: boolean;
    selectableValue: string;
}
export declare abstract class AbstractMdDataTableSelectableRow implements AfterContentInit, ITableSelectableRow {
    table: MdDataTable;
    protected _element: ElementRef;
    selectableValue: string;
    onChange: EventEmitter<ITableSelectableRowSelectionChange>;
    isActive: boolean;
    constructor(table: MdDataTable, _element: ElementRef);
    change(event: any): void;
    ngAfterContentInit(): void;
}
export declare class MdDataTableHeaderSelectableRow extends AbstractMdDataTableSelectableRow {
    table: MdDataTable;
    protected _element: ElementRef;
    constructor(table: MdDataTable, _element: ElementRef);
    _bindListener(): void;
    ngAfterContentInit(): void;
}
export declare class MdDataTableSelectableRow extends AbstractMdDataTableSelectableRow {
    table: MdDataTable;
    protected _element: ElementRef;
    constructor(table: MdDataTable, _element: ElementRef);
    _getIndex(element: any): string;
    _bindListener(): void;
    ngAfterContentInit(): void;
}
