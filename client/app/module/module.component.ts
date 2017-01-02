import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  Renderer,
  ElementRef
} from '@angular/core'
import { MdSidenav } from '@angular/material'
import { ModuleMeta, ModuleService } from '../shared/module.service'
import { Http, Response } from '@angular/http'
import { NavigationService } from '../shared/navigation.service'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'

@Component({
  templateUrl: 'module.component.html',
  styleUrls: ['./module.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class ModComponent implements OnInit, OnDestroy, AfterViewInit {
  static SIDE_MENU_BREAKPOINT: string = 'gt-md'

  site: string = 'FAMN'
  version: string
  modules: ModuleMeta[] = []

  @ViewChild('menu') private menu: MdSidenav

  private _isDev: boolean = ENV === 'development' ? true : false
  private _subscription = null


  constructor(private http: Http,
    // private changeDetectorRef: ChangeDetectorRef,
    private navigation: NavigationService,
    // private media: Media,
    element: ElementRef,
    renderer: Renderer,
    private _modules: ModuleService) {
    // Remove loading class to unset default styles
    renderer.setElementClass(element.nativeElement, 'loading', false)
  }


  // get pushed(): boolean {
  //   return this.menu && this.menu.mode === 'side'
  // }

  // get over(): boolean {
  //   return this.menu && this.menu.mode === 'over' && this.menu.opened
  // }


  // getScrollTop(scroller: MdPeekaboo): string {
  //   return scroller.top + 'px'
  // }

  ngOnInit() {
    // this.http.get('version.json').subscribe((res: Response) => {
    //   const json = res.json();
    //   this.version = json.version;
    //   this.angularVersion = json['@angular/core'];
    //   this.linkTag = this.angularVersion.replace(/[>=^~]/g, '');
    // });
    this._modules.getModules().then((mods) => {
      this.modules = mods
      let title = 'famn'
      document.title = title
      this.navigation.currentTitle = title
    })
  }

  ngAfterViewInit(): any {
    // let query = Media.getQuery(ModComponent.SIDE_MENU_BREAKPOINT)
    // this._subscription = this.media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
    //   this.menu.mode = mql.matches ? 'side' : 'over'
    //   this.menu.toggle(mql.matches).catch(() => undefined)
    //   this.changeDetectorRef.detectChanges()
    // })
  }

  ngOnDestroy(): any {
    // this._subscription.unsubscribe()
  }
}
