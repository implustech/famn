import {Component, Input} from '@angular/core';

@Component({
	selector: 'stats-cmp',
	templateUrl: './stats.html'
})
export class StatsComponent {
	@Input() public icon: string;
	@Input() public value: string;
	@Input() public text: string;
	@Input() public bgclass: string;
	@Input() public link: string;
	@Input() public progressValue: string;
}
