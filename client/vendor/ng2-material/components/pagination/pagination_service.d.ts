import { Subject } from 'rxjs/Subject';
import { IPaginationModel, IPaginationChange } from './pagination';
export declare class PaginationService {
    onChange: Subject<IPaginationChange>;
    constructor();
    change(name: string, pagination: IPaginationModel): void;
}
