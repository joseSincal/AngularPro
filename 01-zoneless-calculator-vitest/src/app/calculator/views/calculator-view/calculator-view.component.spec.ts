import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';
import { Component } from '@angular/core';

@Component({
    selector: 'calculator',
    template: '<div>Mock Calculator Component</div>',
})
class MockCalculatorComponent {}

describe('CalculatorViewComponent', () => {
    let component: CalculatorViewComponent;
    let fixture: ComponentFixture<CalculatorViewComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [CalculatorViewComponent],
        }).overrideComponent(CalculatorViewComponent, {
            set: {
                imports: [MockCalculatorComponent],
            },
        });

        fixture = TestBed.createComponent(CalculatorViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        compiled = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the calculator component', () => {
        // console.log(compiled.innerHTML);
        const calculatorElement = compiled.querySelector('calculator');
        expect(calculatorElement).toBeTruthy();
    });

    it('should contain the specific CSS classes in the wrapper div', () => {
        const divElement = compiled.querySelector('div');
        expect(divElement).toBeTruthy();

        const expectedClasses =
            'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
                ' ',
            );
        expectedClasses.forEach((cls) => {
            expect(divElement?.classList).toContain(cls);
        });
    });
});
