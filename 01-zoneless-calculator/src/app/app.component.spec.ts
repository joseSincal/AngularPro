import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        compiled = fixture.nativeElement as HTMLElement;
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it("should be 3", () => {
        const num1 = 1;
        const num2 = 2;

        const result = num1 + num2;
        expect(result).toBe(3);
    });

    it(`should have the 'zoneless-calculator' title`, () => {
        const app = fixture.componentInstance;
        expect(app.title).toEqual("zoneless-calculator");
    });

    it("should render router-outlet", () => {
        expect(compiled.querySelector("router-outlet")).not.toBeNull();
    });

    it("should render router-outlet wrapped with css clases", () => {
        const divElement = compiled.querySelector("div");
        const mustHaveClasses =
            "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(
                " "
            );
        const divClasses = divElement?.classList.value.split(" ");
        expect(divElement).not.toBeNull();
        // divElement?.classList.forEach((cssClass) => {
        //     expect(mustHaveClasses).toContain(cssClass);
        // });
        mustHaveClasses.forEach((className) => {
            expect(divClasses).toContain(className);
        });
    });

    it("should contain the 'buy me a beer' link", () => {
        const anchorElement = compiled.querySelector("a");
        const title = "Buy me a beer";
        const href = "https://www.buymeacoffee.com/scottwindon";

        expect(anchorElement).not.toBeNull();
        expect(anchorElement?.title).toBe(title);
        expect(anchorElement?.href).toBe(href);
        expect(anchorElement?.getAttribute("href")).toBe(href);
    });
});
