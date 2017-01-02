import { Component, OnInit } from '@angular/core'
import { NavigationService } from '../navigation.service'

@Component({
  selector: 'footer-cmp',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private navigation: NavigationService) { }

  ngOnInit() { }
}
