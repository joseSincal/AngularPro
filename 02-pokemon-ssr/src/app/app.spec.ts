import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    provideZonelessChangeDetection,
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { App } from "./app";
import { provideRouter } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

describe("App", () => {
    let fixture: ComponentFixture<App>;
    let compiled: HTMLDivElement;
    let app: App;

    @Component({
        selector: "app-navbar",
        template: "<div>Mock Navbar</div>",
    })
    class MockNavbarComponent {}

    beforeEach(async () => {
        // TestBed.overrideComponent(App, {
        //   set: {
        //     imports: [MockNavbarComponent],
        //     schemas: [CUSTOM_ELEMENTS_SCHEMA],
        //   },
        // })

        // !Recomendado
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideZonelessChangeDetection(), provideRouter([])],
        })
            .overrideComponent(App, {
                add: {
                    imports: [MockNavbarComponent],
                },
                remove: {
                    imports: [NavbarComponent],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(App);
        compiled = fixture.nativeElement;
        // app = fixture.componentInstance;
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;

        // console.log(fixture.nativeElement);
        // expect(true).toBeFalse();

        expect(app).toBeTruthy();
    });

    it('should render the navbar and router-outlet"', () => {
        expect(compiled.querySelector("app-navbar")).toBeTruthy();
        expect(compiled.querySelector("router-outlet")).toBeTruthy();
    });

    // it('should render title', () => {
    //   const fixture = TestBed.createComponent(App);
    //   fixture.detectChanges();
    //   const compiled = fixture.nativeElement as HTMLElement;
    //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
    // });
});
