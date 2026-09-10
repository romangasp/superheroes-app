import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SuperherosListComponent } from '../../superheros-list/superheros-list.component';

@Component({
  selector: 'app-superheros-page',
  imports: [SuperherosListComponent],
  templateUrl: './superheros-page.component.html',
  styleUrl: './superheros-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosPageComponent {}
