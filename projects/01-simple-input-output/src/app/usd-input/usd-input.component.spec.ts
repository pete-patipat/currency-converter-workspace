import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsdInputComponent } from './usd-input.component';

describe('UsdInputComponent', () => {
  let component: UsdInputComponent;
  let fixture: ComponentFixture<UsdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsdInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct data-test-id attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[data-test-id="usd-value"]');
    expect(input).toBeTruthy();
  });

  it('should emit valueChanged when input changes', () => {
    spyOn(component.valueChanged, 'emit');
    const input = fixture.nativeElement.querySelector('input');

    input.value = '100';
    input.dispatchEvent(new Event('input'));

    expect(component.valueChanged.emit).toHaveBeenCalledWith('100');
  });

  it('should display empty string when value is null', () => {
    component.value = null;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
  });

  it('should display the value when value is set', () => {
    component.value = 100;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('100');
  });
});
