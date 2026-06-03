import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb { label: string; link?: string; }

@Component({
  selector: 'app-page-header',
  imports: [RouterLink],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  @Input() eyebrow?:    string;
  @Input() title:       string = '';
  @Input() subtitle?:   string;
  @Input() breadcrumbs: Breadcrumb[] = [];
}
