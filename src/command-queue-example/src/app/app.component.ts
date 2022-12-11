import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddPetCommand} from "./command-queue-dm-parts/commands/add-pet-command";
import {PetsViewModel} from "./command-queue-dm-parts/pets-view-model";
import { v4 as uuid } from 'uuid';
import {Subscription} from "rxjs";
import {CommandQueueDataManagerService, ConcurrencyVersionMismatchError} from "@jcachay/command-queue";
import {DeveloperNotificationsService} from "./notifications/developer-notifications.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private dm: CommandQueueDataManagerService,
    private developerNotifications: DeveloperNotificationsService
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe;
  }

  ngOnInit(): void {
    this.dm.readViewModel().subscribe();
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.dm.onViewModelChanged
      .subscribe(() => {
        this.developerNotifications.notify("View model changed");
      }));
    this.subscriptions.add(this.dm.onViewModelReadFromServer
      .subscribe(() => {
        this.developerNotifications.notify("View model was READ from the server");
      }));

    this.subscriptions.add(
      this.dm.onWriteErrorOccurred.subscribe(error => {
        if (error instanceof ConcurrencyVersionMismatchError) {
          this.developerNotifications.notify("Concurrency version mismatch. The local model version did not " +
            "match the remote version. Data will be reloaded", true);
        }
      })
    );
  }

  private subscriptions: Subscription | null = null;

  inputValue = '';

  get dataLoaded(): boolean {
    return this.dm.viewModel != null;
  }

  get viewModel(): PetsViewModel {
    return this.dm.viewModel! as PetsViewModel;
  }

  onAddClick(): void {
    if (this.inputValue != '') {
      const cmd = new AddPetCommand(uuid(), this.inputValue);
      this.dm.executeCommand(cmd);
    }
  }
}
