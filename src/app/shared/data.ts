// Copyright (C) 2023 Helmar Hutschenreuter
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Observable, Subscription } from 'rxjs';
import { Interaction } from './interaction';

export interface IDataItem {
  id: number | string;
}

export class DataList<D extends IDataItem> {
  constructor(public items: D[] = []) {}

  addItem(item: D): void {
    this.items.push(item);
  }

  updateItem(item: D): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      this.items[index] = item;
    }
  }

  removeItem(item: D): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  syncInteractions(interactions$: Observable<Interaction<D>>): Subscription {
    return interactions$.subscribe((interaction) => {
      switch (interaction.action) {
        case 'create':
          this.addItem(interaction.item);
          break;
        case 'update':
          this.updateItem(interaction.item);
          break;
        case 'delete':
          this.removeItem(interaction.item);
          break;
      }
    });
  }
}
