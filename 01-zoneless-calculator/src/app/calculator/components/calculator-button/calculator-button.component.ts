import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    // HostBinding,
    input,
    output,
    signal,
    viewChild,
} from "@angular/core";

@Component({
    selector: "calculator-button",
    imports: [],
    templateUrl: "./calculator-button.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./calculator-button.component.css"],
    host: {
        class: "border-r border-b border-indigo-400",
        "[class.w-2/4]": "isDoubleSize()",
        "[class.w-1/4]": "!isDoubleSize()",
    },
    // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
    public isPressed = signal(false);

    public onClick = output<string>();
    public contentValue = viewChild<ElementRef<HTMLButtonElement>>("button");

    public isCommand = input(false, {
        transform: (value: boolean | string) =>
            typeof value === "string" ? value === "" : value,
    });

    public isDoubleSize = input(false, {
        transform: (value: boolean | string) =>
            typeof value === "string" ? value === "" : value,
    });

    // @HostBinding("class.is-command")
    // get command(): boolean {
    //     return this.isCommand();
    // }

    // @HostBinding("class.w-2/4")
    // get doubleSize(): boolean {
    //     return this.isDoubleSize();
    // }

    handleClick(): void {
        if (!this.contentValue()?.nativeElement) return;

        const value = this.contentValue()!.nativeElement.innerText;
        this.onClick.emit(value.trim());
    }

    public keyboardPressedStyle(key: string): void {
        if (!this.contentValue()) return;

        const value = this.contentValue()!.nativeElement.innerText;

        if (value.trim() !== key) return;

        this.isPressed.set(true);
        setTimeout(() => {
            this.isPressed.set(false);
        }, 100);
    }
}
