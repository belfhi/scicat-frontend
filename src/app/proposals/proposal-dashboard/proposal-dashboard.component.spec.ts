import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProposalDashboardComponent } from "./proposal-dashboard.component";
import { ProposalSearchComponent } from "proposals/proposal-search/proposal-search.component";

describe("ProposalDashboardComponent", () => {
  let component: ProposalDashboardComponent;
  let fixture: ComponentFixture<ProposalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalDashboardComponent, ProposalSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
