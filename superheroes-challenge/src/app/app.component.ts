import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperherosPageComponent } from './features/superheros/pages/superheros-page/superheros-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuperherosPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'superheroes-challenge';
}
