import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent implements OnInit {
  @Input()
  name!: string;

  constructor() {}

  ngOnInit(): void {}
}
