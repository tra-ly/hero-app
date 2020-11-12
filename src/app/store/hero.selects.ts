import { AppState } from './hero.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SeclectStore {
    getList = (id) => store => store.hero.list.find(h => h.id === id);
    getLists = store => store.hero.list;
    getError = store => store.hero.error;
    getLoading = store => store.hero.loading;
}