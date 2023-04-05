import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const books: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    price: 12,
    amount: 6,
  },
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    price: 15,
    amount: 5,
  },
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    price: 20,
    amount: 4,
  },
];

const MatDialogMock = {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('@CardComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [
        BookService,
        CartComponent,
        { provide: MatDialog, useValue: MatDialogMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    service = fixture.debugElement.injector.get(BookService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(service, 'getBooksFromCart').and.callFake(() => books); // ngOnInit
  });

  // fit('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('#should create', inject([CartComponent], (testComponent: CartComponent) => {
    expect(testComponent).toBeTruthy();
  }))

  // TEST: METODOS CON RETURN
  it('#should be call getTotalPrice for return an amount', () => {
    const totalPrice = component.getTotalPrice(books);
    expect(totalPrice).toBeGreaterThan(0);
    // expect(totalPrice).not.toBe(0);
    // expect(totalPrice).not.toBeNull();
  });

  // TEST: METODOS VOIDS
  it('#should be call onInputNumberChange when increments correctly', () => {
    const action = 'plus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      description: '',
      price: 12,
      amount: 6,
    };

    /*
      //! NO RECOMENDADO
      Obtener metodos del componente => component.service (debe ser publico)
      const service = (component as any)._bookService;
      const service = component['_bookService'];
      const service = fixture.debugElement.injector.get(BookService); -- recomendado
    */
    const spy = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(6);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(7);

    expect(spy).toHaveBeenCalled();
    expect(spyComponent).toHaveBeenCalled();
  });

  it('#should be call onInputNumberChange when decrements correctly', () => {
    const action = 'minus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      description: '',
      price: 12,
      amount: 7,
    };

    const spy = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(7);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(6);
    expect(spy).toHaveBeenCalled();
    expect(spyComponent).toHaveBeenCalled();
  });

  it('#should be call onClearBooks when works correctly', () => {
    const spy = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spyService = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
    component.listCartBook = books;
    component.onClearBooks();
    expect(component.listCartBook.length).toBe(0);
    expect(spy).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });

  it('#should be call _clearListCartBook when works correctly', () => {
    const spy = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
    component.listCartBook = books;
    component['_clearListCartBook']();
    expect(component.listCartBook.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  // TEST DE INTEGRACIÓN
  it('The title "The cart is empty" is not displayed when there is a list', () => {
    component.listCartBook = books;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeFalsy();
  });

  it('The title "The cart is empty" is displayed when the list is empty', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeTruthy();
    if(debugElement) {
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toContain("The cart is empty");
    }
  });
});
