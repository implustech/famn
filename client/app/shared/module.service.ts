import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

export interface ModuleMeta {
  id: string
  readme?: string
  name: string
  sources: string[]
}

@Injectable()
export class ModuleService {
  public modules: any = null

  private _promise: Promise<void>

  constructor(http: Http) {
    this._promise = new Promise<void>((resolve) => {
      http.get('meta.json').subscribe((res: Response) => {
        this.modules = res.json()
        resolve()
      })

    })
  }

  getModules(): Promise<ModuleMeta[]> {
    return this._promise.then(() => { return this.modules })
  }

  getModule(id: string): Promise<ModuleMeta> {
    return this._promise.then(() => {
      let pick = null
      this.modules.forEach((m: ModuleMeta) => {
        if (m.id === id) {
          pick = m
        }
      });
      return pick
    });
  }
}
