import { NavComponent } from './nav.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

// class ComponentTestRoute {}
const routerMock = {
  navigate() {}
}

describe('@NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes([
        //   { path: 'home', component: ComponentTestRoute},
        //   { path: 'cart', component: ComponentTestRoute},
        // ])
      ],
      providers: [{
        provide: Router, useValue: routerMock,
      }],
      declarations: [NavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should be created', () => {
    expect(component).toBeTruthy();
  });

  // ANCHOR: RECOMENDADO PARA EL MANEJO DE ROUTERS
  // it('#should be call navigate when patch value home', () => {
  //   const router = TestBed.inject(Router);
  //   const spy = spyOn(router, 'navigate');
  //   component.navTo('home');
  //   expect(spy).toHaveBeenCalledWith(['/home']);
  //   component.navTo('cart');
  //   expect(spy).toHaveBeenCalledWith(['/cart']);
  // });

  it('#should be call navigate when patch value home', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navTo('');
    expect(spy).toHaveBeenCalled();
  });
})
