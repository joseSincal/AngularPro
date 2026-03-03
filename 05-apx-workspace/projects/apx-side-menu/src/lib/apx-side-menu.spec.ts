import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApxSideMenu } from './apx-side-menu';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('ApxSideMenu', () => {
  let component: ApxSideMenu;
  let fixture: ComponentFixture<ApxSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([])],
      imports: [ApxSideMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ApxSideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignIn when button is clicked', () => {
    spyOn(component.signIn, 'emit');
    fixture.componentRef.setInput('isAuthenticated', false);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-login]') as HTMLButtonElement;
    expect(button).toBeTruthy();

    button.click();
    expect(component.signIn.emit).toHaveBeenCalled();
  });

  it('should call onSignOut when button is clicked', () => {
    spyOn(component.signOut, 'emit');
    fixture.componentRef.setInput('isAuthenticated', true);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-logout]') as HTMLButtonElement;
    expect(button).toBeTruthy();

    button.click();
    expect(component.signOut.emit).toHaveBeenCalled();
  });
});
