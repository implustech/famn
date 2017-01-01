import { Injectable } from '@angular/core'
import { ModuleMeta } from './module.service'

export interface INavigationLink {
  /**
   * Brief description of no more than a few words
   */
  brief: string
  /**
   * Value to bind to routeLink.
   */
  routeLink: string
}

@Injectable()
export class NavigationService {
  public currentTitle: string = null
  public nextLink: INavigationLink = null
  public prevLink: INavigationLink = null

  moduleLink(mod: ModuleMeta): INavigationLink {
    return { brief: mod.name, routeLink: '/module/' + mod.id }
  }
}
