import { Injectable, ComponentRef, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private dialogComponentRef!: ComponentRef<ConfirmDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(message: string): Subject<boolean> {
    const subject = new Subject<boolean>();

    const factory = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
    this.dialogComponentRef = factory.create(this.injector);

    this.dialogComponentRef.instance.message = message;
    this.dialogComponentRef.instance.confirm.subscribe(() => {
      subject.next(true);
      this.close();
    });
    this.dialogComponentRef.instance.cancel.subscribe(() => {
      subject.next(false);
      this.close();
    });

    this.appRef.attachView(this.dialogComponentRef.hostView);
    const domElem = (this.dialogComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Add Bootstrap modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop show';
    document.body.appendChild(backdrop);

    return subject;
  }

  private close() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();

    // Remove Bootstrap modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      document.body.removeChild(backdrop);
    }
  }
}
