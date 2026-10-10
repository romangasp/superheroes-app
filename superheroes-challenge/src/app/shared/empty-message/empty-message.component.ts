import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-message',
  imports: [MatIcon, MatIconModule],
  templateUrl: './empty-message.component.html',
  styleUrl: './empty-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyMessageComponent {}
