import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageboxComponent } from './message.component';

describe('MessageboxComponent', () => {
  let component: MessageboxComponent;
  let fixture: ComponentFixture<MessageboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
