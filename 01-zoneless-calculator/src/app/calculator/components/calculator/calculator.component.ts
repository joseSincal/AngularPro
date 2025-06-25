import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    viewChildren,
} from "@angular/core";
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from "@/calculator/services/calculator.service";

@Component({
    selector: "calculator",
    imports: [CalculatorButtonComponent],
    templateUrl: "./calculator.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "(document:keyup)": "handleKeyboardEvent($event)",
    },
    // styles: `
    //   @reference "tailwindcss";

    //   .is-command {
    //       @apply bg-indigo-700/10 hover:bg-indigo-700/20;
    //   }
    // `,
})
export class CalculatorComponent {
    private calculatorService = inject(CalculatorService);

    public calculatorButtons = viewChildren(CalculatorButtonComponent);

    public resultText = computed(() => this.calculatorService.resultText());
    public subResultText = computed(() =>
        this.calculatorService.subResultText()
    );
    public lastOperator = computed(() => this.calculatorService.lastOperator());
    // get resultText() {
    //     return this.calculatorService.resultText;
    // }

    handleClick(key: string): void {
        // console.log({ key });
        this.calculatorService.constructNumber(key);
    }

    // @HostListener("document:keyup", ["$event"])
    handleKeyboardEvent(event: KeyboardEvent): void {
        const keyEquivalents: Record<string, string> = {
            Escape: "C",
            Delete: "C",
            "*": "X",
            "/": "÷",
            Enter: "=",
        };
        const key = event.key;
        const keyValue = keyEquivalents[key] ?? key;
        this.handleClick(keyValue);

        this.calculatorButtons().forEach((button) => {
            button.keyboardPressedStyle(keyValue);
        });
    }
}
