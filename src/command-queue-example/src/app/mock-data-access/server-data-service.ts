import { Injectable, Version } from '@angular/core';
import { ConcurrencyVersionMismatchError } from '@jcachay/command-queue';
import { Observable, of, delay, Subscriber } from 'rxjs';
import { Pet, PetsViewModel } from '../command-queue-dm-parts/pets-view-model';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  constructor() {
    this._dataSource = new DataSource();
  }
  private _dataSource: DataSource;

  /**
   * Gets the view model from the "server"
   */
  getPets(): Observable<PetsViewModel> {
    return of(this._dataSource.data).pipe(delay(this.randomNumber(500, 3000))); // The delay simulates server latency
  }

  /**
   * Adds a pet. Receives the Optimistic Concurrency Value as parameter,
   * returns an observable that resolves to the updated Optimistic Concurrency Value.
   * If the version parameter does not match the current model version an
   * error of type  ConcurrencyVersionMismatchError (from the command-queue library)
   * will be thrown
   */
  addPet(version: number, id: string, name: string): Observable<number> {
    return new Observable<number>((obs) => {
      const data = this._dataSource.data;
      // return error if the version does not match if the versions do not match
      if (version != data.version) {
        
        obs.error(new ConcurrencyVersionMismatchError());
      } else {
        // Update the data
        data.pets.push({
          id: id,
          name: name,
        });
        // Increment the model version
        data.version++;

        // save
        this._dataSource.data = data;
        // Complete the observable so the next command in the queue runs
        obs.next(data.version);
        obs.complete();
      }
    }).pipe(delay(this.randomNumber(500, 3000))); // The delay simulates server latency
  }

  private randomNumber(min: number, max: number): number {
    const range = max - min;
    return Math.floor(Math.random() * range + min);
  }

  /**
   * Only used by the developer panel to spy on
   * the server model version value
   */
  get serverModelVersion():number
  {
    return this._dataSource.data.version;
  }

  /**
   * used by the developer panel only. 
   * Increments the server model version, 
   * which is like simulating another user
   * making a change that would cause an 
   * optimistic concurrency version mismatch
   */
  incrementModelVersion():void
  {
    const data = this._dataSource.data;
    data.version++;
    this._dataSource.data = data;
  }
}

/**
 * Acts as a database. The internal private data is a clone of the set value.
 * When you get the data, you receive a clone of the private data.
 * This way, the data is totally isolated and encapsulated from outside changes. It contains
 * the same information but is not the same reference.
 */
class DataSource {
  constructor() {
    this._data = {
      version: 0,
      pets: [],
    };
  }
  private _data: PetsViewModel;

  private clone(data: PetsViewModel): PetsViewModel {
    const pets = data.pets.map((p) => this.clonePet(p));
    return {
      version: data.version,
      pets: pets,
    };
  }

  private clonePet(pet: Pet): Pet {
    return {
      id: pet.id,
      name: pet.name,
    };
  }

  get data(): PetsViewModel {
    return this.clone(this._data);
  }
  set data(value: PetsViewModel) {
    this._data = this.clone(value);
  }
}
