import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import DiceBox from '@3d-dice/dice-box';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  diceBox: any;
  diceBoxInitPromise: Promise<void> | undefined;

  characteristicsForm = new FormGroup({
    might: new FormControl<number>(0, { nonNullable: true }),
    agility: new FormControl<number>(0, { nonNullable: true }),
    reason: new FormControl<number>(0, { nonNullable: true }),
    intuition: new FormControl<number>(0, { nonNullable: true }),
    presence: new FormControl<number>(0, { nonNullable: true }),
  });

  rollOptionsForm = new FormGroup({
    characteristic: new FormControl<string | undefined>(undefined),
    numEdges: new FormControl<number>(0, { nonNullable: true }),
    numBanes: new FormControl<number>(0, { nonNullable: true }),
  });

  subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      this.characteristicsForm.valueChanges.subscribe((value) => {
        if (this.characteristicsForm.valid) {
          sessionStorage.setItem('characteristics', JSON.stringify(value));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    const html = document.querySelector('html')!;
    let theme = sessionStorage.getItem('theme');
    if (theme) {
      html.dataset['theme'] = theme;
    } else {
      sessionStorage.setItem('theme', html.dataset['theme'] || 'light');
    }

    let characteristics = sessionStorage.getItem('characteristics');
    if (characteristics) {
      this.characteristicsForm.setValue(JSON.parse(characteristics));
    }
  }

  ngAfterViewInit(): void {
    new DiceBox({
      assetPath: '/assets/', // include the trailing backslash
      container: '.dice-box',
      scale: 9,
    })
      .init()
      .then((diceBox: any) => (this.diceBox = diceBox));
  }

  toggleTheme(): void {
    const html = document.querySelector('html')!;

    html.dataset['theme'] = html.dataset['theme'] === 'dark' ? 'light' : 'dark';
    sessionStorage.setItem('theme', html.dataset['theme']);
  }

  toggleEdge(count: number): void {
    if (this.rollOptionsForm.value.numEdges === count) {
      this.rollOptionsForm.patchValue({ numEdges: 0 });
    } else {
      this.rollOptionsForm.patchValue({ numEdges: count });
    }
  }

  toggleBane(count: number): void {
    this.rollOptionsForm.patchValue({ numBanes: count });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.diceBox) {
      return;
    }

    let modifier = 0;
    let tierModifier = 0;
    let { characteristic, numEdges, numBanes } = this.rollOptionsForm.value;
    if (characteristic) {
      let key = characteristic as keyof typeof this.characteristicsForm.value;
      modifier += this.characteristicsForm.getRawValue()[key];
    }

    if (numEdges === 1) {
      modifier += 2;
    }

    if (numEdges === 2) {
      if (numBanes === 1) {
        modifier += 4;
      } else {
        tierModifier += 1;
      }
    }

    if (numBanes === 1) {
      modifier -= 2;
    }

    if (numBanes === 2) {
      if (numEdges === 1) {
        modifier -= 4;
      } else {
        tierModifier -= 1;
      }
    }

    const result = (await this.diceBox.roll(`2d10`)) as any[];
    const naturalResult = result.reduce((s, r) => (s += r.value), 0);
    const sum = naturalResult + modifier;

    const naturalCrit = naturalResult >= 19;
    if (naturalCrit) {
      alert(`Critical Roll result: ${sum}. Power Tier 3`);
    } else {
      let tier = (sum <= 11 ? 1 : sum <= 16 ? 2 : 3) + tierModifier;
      tier = tier < 1 ? 1 : tier > 3 ? 3 : tier; // make sure tier didn't get out of bounds
      alert(`Roll result: ${sum}. Power Tier ${tier}`);
    }
  }
}
