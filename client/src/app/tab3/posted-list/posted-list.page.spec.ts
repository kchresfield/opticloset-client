import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedListPage } from './posted-list.page';

describe('PostedListPage', () => {
  let component: PostedListPage;
  let fixture: ComponentFixture<PostedListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostedListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});