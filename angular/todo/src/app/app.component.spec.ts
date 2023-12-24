import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Todo } from './todo';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  it('should create the AppComponent', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should have a newTodo todo', () => {
    expect(appComponent.newTodo instanceof Todo).toBeTruthy();
  });
});
