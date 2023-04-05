import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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

const bookServiceMock = {
  getBooks: () => of(books),
}

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
  transform() {
    return '';
  }
}

describe('@HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ReduceTextPipeMock],
      providers:[
        // BookService,
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
        {
          provide: Document,
          useExisting: DOCUMENT,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    service = fixture.debugElement.injector.get(BookService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should be create', () => {
    expect(component).toBeTruthy();
  });

  // public getBooks(): void {
  //   this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
  //     this.listBook = resp;
  //   });
  // }
  // TEST: manejo de subcripciones y observables
  it('#should be call getBook when get books from the subscribe', () => {
    // const books: Book[] = [];
    // const spy = spyOn(service, 'getBooks').and.returnValue(of(books));
    component.getBooks();
    // expect(spy).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
  });

  // test windows
  fit('#should be call aler when have data window', () => {
    const documentService = TestBed.inject(Document);
    const windowAngular = documentService.defaultView;
    const spy = spyOn(windowAngular, 'alert').and.callFake(() => null);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
