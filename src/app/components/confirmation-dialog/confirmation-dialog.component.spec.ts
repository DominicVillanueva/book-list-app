import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const MatDialogRefMock = {
  close: () => null,
}

describe(('@ConfirmationDialogComponent'), () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: MatDialogRefMock,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should be create', () => {
    expect(component).toBeTruthy();
  });

  it('#should be call onConfirm when send value true', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('#should be call onDismiss when send value false', () => {
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);
  });
})
