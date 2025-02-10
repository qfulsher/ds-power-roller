import { Component, computed, input } from '@angular/core';
import {RollResult} from '../../app.component'

@Component({
  selector: 'app-roll-card',
  imports: [],
  templateUrl: './roll-card.component.html',
  styleUrl: './roll-card.component.scss'
})
export class RollCardComponent {
  roll = input<RollResult>();
  baneEdgeMod = computed(() => this.roll() ? (-this.roll()!.numBanes) + this.roll()!.numEdges : 0);
  rollSummary = computed(() => {
    let r = this.roll();
    if(!r) {
      return '';
    }

    let summary = [r.roll1, r.roll2];
    if(r.characteristic) {
      summary.push(r.characteristicModifier);
    }

    if(this.baneEdgeMod() === 1) {
      summary.push(2);
    } else if(this.baneEdgeMod() === -1) {
      summary.push(-2);
    }

    let equation = summary.join(' + ');

    let tierSummary = [r.naturalTier]
    if (this.baneEdgeMod() === 2) {
      tierSummary.push(1);
    } else if (this.baneEdgeMod() === -2) {
      tierSummary.push(-1);
    }

    let tierEquation = tierSummary.join(' + ');

    return `Roll: ${equation} = ${r.sum}. Tier: ${tierEquation} = ${r.tier}`
  });
}
