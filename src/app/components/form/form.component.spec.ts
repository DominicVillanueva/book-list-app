import { FormComponent } from './form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('@FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [FormComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should be create', () => {
    expect(component).toBeTruthy();
  });

  it('#should have name field when is required', () => {
    const nameField = component.form.get('name');
    nameField.setValue('');
    expect(nameField.valid).toBeFalse();
  });

  it('#should name field has an error when more than 5 characters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('test name');
    expect(nameField.valid).toBeFalse();
  });

  it('#should name field is correct when less than 5 characters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('test');
    expect(nameField.valid).toBeTrue();
  });

  it('#should have email field when is required', () => {
    const emailField = component.form.get('email');
    emailField.setValue('');
    expect(emailField.valid).toBeFalse();
  });

  it('#should have email field when pattern must be valid', () => {
    const emailField = component.form.get('email');
    emailField.setValue('test@');
    expect(emailField.valid).toBeFalse();
    emailField.setValue('test@test.com');
    expect(emailField.valid).toBeTrue();
  });

  it('#should be call form when is valid patch data', () => {
    const nameField = component.form.get('name');
    const emailField = component.form.get('email');
    nameField.setValue('test');
    emailField.setValue('test@test.com');
    expect(component.form.valid).toBeTrue();
  })
})
