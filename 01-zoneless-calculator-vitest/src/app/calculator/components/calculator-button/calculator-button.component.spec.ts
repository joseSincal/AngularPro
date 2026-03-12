import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
    imports: [CalculatorButtonComponent],
    template: `
        <calculator-button>
            <span class="projected-content"> 7 </span>
        </calculator-button>
    `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
    let component: CalculatorButtonComponent;
    let fixture: ComponentFixture<CalculatorButtonComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [CalculatorButtonComponent],
        });

        fixture = TestBed.createComponent(CalculatorButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        compiled = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply w-1/4 double size is false', () => {
        const hostCss = compiled.classList.value;
        expect(hostCss).toContain('w-1/4');
    });

    it('should apply w-2/4 double size is true', () => {
        fixture.componentRef.setInput('isDoubleSize', true);
        fixture.detectChanges();

        const hostCss = compiled.classList.value;
        expect(hostCss).toContain('w-2/4');
    });

    it('should apply is-command class when isCommand is true', () => {
        fixture.componentRef.setInput('isCommand', true);
        fixture.detectChanges();

        const buttonElement = compiled.querySelector('button');
        expect(buttonElement).toBeTruthy();
        expect(buttonElement?.classList.value).toContain('is-command');
    });

    it('should emit onClick when handleClick is called', () => {
        const spy = vi.spyOn(component.onClick, 'emit');
        const buttonElement = compiled.querySelector('button');
        expect(buttonElement).toBeTruthy();

        buttonElement!.innerText = ' 5 ';
        buttonElement?.click();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('5');
    });

    it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async (done) => {
        // const buttonElement = compiled.querySelector('button');
        // buttonElement!.innerText = ' 5 ';

        component.contentValue()!.nativeElement.innerText = '5';
        component.keyboardPressedStyle('5');

        expect(component.isPressed()).toBe(true);

        await new Promise((resolve) => setTimeout(resolve, 101));
        expect(component.isPressed()).toBe(false);

        // setTimeout(() => {
        //     expect(component.isPressed()).toBe(false);
        //     done();
        // }, 101);
    });

    it('should NOT set isPressed if key does not match', () => {
        component.contentValue()!.nativeElement.innerText = '5';
        component.keyboardPressedStyle('3');

        expect(component.isPressed()).toBe(false);
    });

    it('should display projected content', () => {
      const fixtureHost = TestBed.createComponent(TestHostComponent);
      fixtureHost.detectChanges();

      const projectedContent = fixtureHost.nativeElement.querySelector('.projected-content');
      expect(projectedContent).toBeTruthy();
      expect(projectedContent.textContent?.trim()).toBe('7');
    });
});
