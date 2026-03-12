import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

import { vi } from 'vitest';

describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);

        vi.resetAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should set resultText, subResultText to "0" when C is pressed', () => {
        service.resultText.set('123');
        service.subResultText.set('456');
        service.lastOperator.set('-');

        service.constructNumber('C');

        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should update resultText with number input', () => {
        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('3');

        expect(service.resultText()).toBe('123');
    });

    it('should handle operators correctly', () => {
        const operators = ['+', '-', '*', '/', '÷'];

        operators.forEach((operator) => {
            service.resultText.set('12345');
            service.constructNumber(operator);

            expect(service.resultText()).toBe('0');
            expect(service.lastOperator()).toBe(operator);
        });
    });

    it('should calculate result correctly for addition', () => {
        service.constructNumber('1');
        service.constructNumber('+');
        service.constructNumber('2');
        service.constructNumber('=');

        expect(service.resultText()).toBe('3');
    });

    it('should calculate result correctly for subtraction', () => {
        service.constructNumber('5');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('=');

        expect(service.resultText()).toBe('3');
    });

    it('should calculate result correctly for multiplication', () => {
        service.constructNumber('3');
        service.constructNumber('*');
        service.constructNumber('4');
        service.constructNumber('=');

        expect(service.resultText()).toBe('12');
    });

    it('should calculate result correctly for division', () => {
        service.constructNumber('1');
        service.constructNumber('0');
        service.constructNumber('÷');
        service.constructNumber('2');
        service.constructNumber('=');

        expect(service.resultText()).toBe('5');
    });

    it('should handle decimal point correctly', () => {
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('5');
        expect(service.resultText()).toBe('1.5');

        service.constructNumber('.');
        expect(service.resultText()).toBe('1.5');
    });

    it('should handle decimal point starting with 0', () => {
        service.constructNumber('.');
        service.constructNumber('5');

        expect(service.resultText()).toBe('0.5');
    });

    it('should handle sign change +/-', () => {
        service.resultText.set('15');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-15');

        service.constructNumber('+/-');
        expect(service.resultText()).toBe('15');
    });

    it('should handle backspace', () => {
        service.resultText.set('123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
    });

    it('should handle backspace with negative numbers', () => {
        service.resultText.set('-123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('-12');
    });

    it('should handle max length', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {});

        for (let i = 0; i < 20; i++) {
            service.constructNumber('9');
        }
        expect(service.resultText()).toBe('9999999999');
        expect(service.resultText().length).toBe(10);

        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledTimes(10);

        service.constructNumber('9');
        service.constructNumber('9');
        service.constructNumber('9');
        expect(service.resultText()).toBe('9999999999');
        expect(service.resultText().length).toBe(10);
    });

    it('should handle invalid input', () => {
        const consoleSpy = vi.spyOn(console, 'log');

        service.resultText.set('123');
        service.constructNumber('A');
        
        expect(service.resultText()).toBe('123');
        expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'A');
    });

    it('should handle negative zero input correctly', () => {
        service.resultText.set('-0');
        service.constructNumber('0');
        expect(service.resultText()).toBe('-0');
    });
});
