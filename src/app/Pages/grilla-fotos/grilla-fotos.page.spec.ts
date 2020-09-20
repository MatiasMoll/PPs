import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrillaFotosPage } from './grilla-fotos.page';

describe('GrillaFotosPage', () => {
  let component: GrillaFotosPage;
  let fixture: ComponentFixture<GrillaFotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaFotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrillaFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
