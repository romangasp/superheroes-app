import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperherosListComponent } from './features/superheros/superheros-list/superheros-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuperherosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'superheroes-challenge';
}
