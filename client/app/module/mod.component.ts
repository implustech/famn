import {
  Component,
  ViewEncapsulation,
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
import { Media } from '../../vendor/ng2-material'
import { MdPeekaboo } from '../../vendor/ng2-material'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'

@Component({
  templateUrl: 'mod.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModComponent implements OnInit, OnDestroy, AfterViewInit {
  // constructor(public appStore: AppStore) {
  static SIDE_MENU_BREAKPOINT: string = 'gt-md'

  site: string = 'im Admin Seed'
  version: string
  modules: ModuleMeta[] = []

  private _isDev: boolean = ENV === 'development' ? true : false
  private _subscription = null

  @ViewChild(MdSidenav) private menu: MdSidenav


  constructor(private http: Http,
    private changeDetectorRef: ChangeDetectorRef,
    private navigation: NavigationService,
    private media: Media,
    element: ElementRef,
    renderer: Renderer,
    private _modules: ModuleService) {
    // Remove loading class to unset default styles
    renderer.setElementClass(element.nativeElement, 'loading', false)
  }


  ngAfterViewInit(): any {
    let query = Media.getQuery(ModComponent.SIDE_MENU_BREAKPOINT)
    this._subscription = this.media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.menu.mode = mql.matches ? 'side' : 'over'
      this.menu.toggle(mql.matches).catch(() => undefined)
      this.changeDetectorRef.detectChanges()
    });
  }

  get pushed(): boolean {
    return this.menu && this.menu.mode === 'side'
  }

  get over(): boolean {
    return this.menu && this.menu.mode === 'over' && this.menu.opened
  }


  getScrollTop(scroller: MdPeekaboo): string {
    return scroller.top + 'px'
  }

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

  ngOnDestroy(): any {
    this._subscription.unsubscribe()
  }
}
