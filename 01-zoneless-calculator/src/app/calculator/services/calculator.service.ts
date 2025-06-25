import { Injectable, signal } from "@angular/core";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "X", "÷"];
const specialOperators = ["+/-", "%", ".", "=", "C", "Backspace"];

@Injectable({
    providedIn: "root",
})
export class CalculatorService {
    public resultText = signal("0");
    public subResultText = signal("0");
    public lastOperator = signal("+");

    public constructNumber(value: string): void {
        // Validate input
        if (![...numbers, ...operators, ...specialOperators].includes(value)) {
            console.log(`Invalid input: ${value}`);
            return;
        }

        // =
        if (value === "=") {
            this.calculateResult();
            return;
        }

        // Limpiar Resultados
        if (value === "C") {
            this.resultText.set("0");
            this.subResultText.set("0");
            this.lastOperator.set("+");
            return;
        }

        // Backspace
        // TODO: revisar cuando tengamos números negativos
        if (value === "Backspace") {
            if (this.resultText() === "0") return;
            if (
                this.resultText().includes("-") &&
                this.resultText().length === 2
            ) {
                this.resultText.set("0");
                return;
            }

            if (this.resultText().length === 1) {
                this.resultText.set("0");
                return;
            }

            this.resultText.update((currentValue) => currentValue.slice(0, -1));
            return;
        }

        // aplicar operador
        if (operators.includes(value)) {
            this.calculateResult();

            this.lastOperator.set(value);
            this.subResultText.set(this.resultText());
            this.resultText.set("0");
            return;
        }

        // Limitar numero de caracteres
        if (this.resultText().length >= 10) {
            console.log("Número máximo de caracteres alcanzado");
            return;
        }

        // Validar punto decimal
        if (value === "." && !this.resultText().includes(".")) {
            // Si el número actual no tiene punto decimal, lo agregamos
            if (this.resultText() === "0" || this.resultText() === "") {
                this.resultText.set("0.");
                return;
            }

            this.resultText.update((currentValue) => currentValue + value);
            return;
        }

        // Manejo de el cero inicial
        if (
            value === "0" &&
            (this.resultText() === "0" || this.resultText() === "-0")
        ) {
            return;
        }

        // Cambiar signo
        if (value === "+/-") {
            if (this.resultText().includes("-")) {
                this.resultText.update((currentValue) => currentValue.slice(1));
                return;
            }

            this.resultText.update((currentValue) => "-" + currentValue);
            return;
        }

        // Números
        if (numbers.includes(value)) {
            if (this.resultText() === "0") {
                this.resultText.set(value);
                return;
            }

            if (this.resultText() === "-0") {
                this.resultText.set("-" + value);
                return;
            }

            this.resultText.update((currentValue) => currentValue + value);
        }
    }

    public calculateResult(): void {
        const number1 = parseFloat(this.subResultText());
        const number2 = parseFloat(this.resultText());
        console.log(number1, number2);
        let result = 0;

        switch (this.lastOperator()) {
            case "+":
                result = number1 + number2;
                break;
            case "-":
                result = number1 - number2;
                break;
            case "X":
                result = number1 * number2;
                break;
            case "÷":
                if (number2 === 0) {
                    console.error("Error: División por cero");
                    return;
                }
                result = number1 / number2;
                break;
        }

        this.resultText.set(result.toString());
        this.subResultText.set("0");
    }
}
