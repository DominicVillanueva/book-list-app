import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';

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

const book: Book = {
  name: '',
  author: '',
  isbn: '',
  description: '',
  price: 12,
  amount: 6,
};

describe('@BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => storage[key] = value);
  });

  afterEach(() => {
    /**
     * RESUELVE PRIMERO UN TEST, Y LUEGO LLAMA AL OTRO CUANDO TERMINA DE HACER
     * LA PETICIÓN HTTP.
     */
    httpMock.verify();
  });

  it('#should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#shoul be call getBook return list of book when does a get method', () => {
    service.getBooks().subscribe((res: Book[]) => {
      expect(res).toEqual(books);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + '/book');
    expect(req.request.method).toBe('GET');
    req.flush(books);
  });

  it('#should be call getBooksFromCart return empty array when localstorage is empty', () => {
    const listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(0);
  });

  it('#should be call addBookToCart added a book successfully when the list does not exist in the localstorage', () => {
    const toast = {
      fire: () => null,
    } as any;
    const spy = spyOn(swal, 'mixin').and.callFake(() => toast);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    service.addBookToCart(book);
    expect(spy).toHaveBeenCalled();
  });

  it('#should be call removeBooksFromCart remove the list when have value from the localstorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });
});
