import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  opened = true;
  isLoading = new Subject<boolean>();
  activeLoading: { [key: number]: boolean } = {};
  activeLoadingCount = 0;
  title = new BehaviorSubject<string>('');
  searching = new BehaviorSubject<string>(null);
  tabChange = new BehaviorSubject<MatTabChangeEvent>(null);

  private loaderIsDisabled = false;
  private testEnvironment: string = null;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (localStorage.getItem('test-environment')) {
      this.testEnvironment = localStorage.getItem('test-environment');
    }
  }

  showLoader(index: number): void {
    if (this.loaderIsDisabled) {
      this.loaderIsDisabled = false;
      this.activeLoadingCount++;
      return;
    }
    this.activeLoading[index] = true;
    this.activeLoadingCount++;
    setInterval(() => {
      if (this.activeLoading[index]) {
        this.isLoading.next(true);
      }
    }, 500);
  }

  hideLoader(index: number): void {
    delete this.activeLoading[index];
    this.activeLoadingCount--;
    if (this.activeLoadingCount === 0) {
      this.isLoading.next(false);
    }
  }

  getTestEnvironment(): string {
    return this.testEnvironment;
  }

}
