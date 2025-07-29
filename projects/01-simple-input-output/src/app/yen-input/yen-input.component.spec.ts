import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YenInputComponent } from './yen-input.component';

describe('YenInputComponent', () => {
  let component: YenInputComponent;
  let fixture: ComponentFixture<YenInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YenInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YenInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct data-test-id attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[data-test-id="yen-value"]');
    expect(input).toBeTruthy();
  });

  it('should emit valueChanged when input changes', () => {
    spyOn(component.valueChanged, 'emit');
    const input = fixture.nativeElement.querySelector('input');

    input.value = '11000';
    input.dispatchEvent(new Event('input'));

    expect(component.valueChanged.emit).toHaveBeenCalledWith('11000');
  });

  it('should display empty string when value is null', () => {
    component.value = null;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
  });

  it('should display the value when value is set', () => {
    component.value = 11000;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('11000');
  });
});
