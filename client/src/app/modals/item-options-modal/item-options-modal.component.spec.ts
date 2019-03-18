import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOptionsModalPage } from './item-options-modal.page';

describe('ItemOptionsModalPage', () => {
  let component: ItemOptionsModalPage;
  let fixture: ComponentFixture<ItemOptionsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOptionsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOptionsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
