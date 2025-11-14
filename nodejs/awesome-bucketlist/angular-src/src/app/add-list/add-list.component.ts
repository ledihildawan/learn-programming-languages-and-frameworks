import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss',
  standalone: true,
})
export class AddListComponent {
  readonly #listService = inject(ListService);

  readonly addList = output<List>();

  newList: List = {
    _id: '',
    title: '',
    category: '',
    description: '',
  };

  onSubmit() {
    this.#listService.addList(this.newList).subscribe((response) => {
      if (response.success == true) this.addList.emit(this.newList);
    });
  }
}
