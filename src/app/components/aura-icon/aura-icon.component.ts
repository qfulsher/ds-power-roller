import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-aura-icon',
  imports: [NgClass],
  template: `
  <div class="icon-aura" [ngClass]="{selected: selected()}">
    <img [src]="iconSrc()" [alt]="iconAlt()"/>
  </div>`,
  styles: `
    .icon-aura {
      user-select: none;
      display: flex;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
      border: 1px solid var(--pico-muted-border-color);
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
      
      >img {
        height: 1.5rem;
        width: 1.5rem;

        filter: grayscale(1);
      }

      &.selected {
        background-color: var(--pico-primary-background);
        border: 1px solid var(--pico-primary-border-color);
        transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
        >img {
          filter: unset;
        }
      }      
    }`
})
export class AuraIconComponent {
  selected = input(false);
  iconSrc = input('');
  iconAlt = input('');
}
