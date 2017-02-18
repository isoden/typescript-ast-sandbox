'use strict'

import { Component } from '@angular/core'

/**
 * @example
 * ```html
 * <app-button (click)="save()">Save</app-button>
 * ```
 */

@Component({
  selector: 'app-button',
  template: `
    <button>
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {}
