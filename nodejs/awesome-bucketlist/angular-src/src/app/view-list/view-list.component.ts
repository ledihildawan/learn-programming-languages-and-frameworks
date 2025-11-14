import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AddListComponent } from '../add-list/add-list.component';
import { List } from '../models/List';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-view-list',
  imports: [AddListComponent, CommonModule],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss',
  standalone: true,
})
export class ViewListComponent implements OnInit {
  readonly #listService = inject(ListService);

  readonly lists = signal<List[]>([]);

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.#listService.getAllLists().subscribe((lists) => {
      this.lists.set(lists);
    });
  }

  deleteList(id: string) {
    this.#listService.deleteList(id).subscribe(() => {
      this.loadLists();
    });
  }

  onAddList(newList: List) {
    this.lists.update((values) => [...values, newList]);
  }
}
