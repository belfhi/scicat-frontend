import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Dataset, DerivedDataset } from "shared/sdk/models";
import {
  selectOpenwhiskResult,
  selectDatasets,
  selectCurrentDataset,
} from "state-management/selectors/datasets.selectors";
import {
  reduceDatasetAction,
  fetchDatasetsAction,
} from "state-management/actions/datasets.actions";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "reduce",
  templateUrl: "./reduce.component.html",
  styleUrls: ["./reduce.component.scss"],
})
export class ReduceComponent implements OnInit, OnChanges, OnDestroy {
  dataset: Dataset | undefined;
  derivedDatasets$ = this.store.select(selectDatasets).pipe(
    map((datasets) =>
      datasets
        .filter((dataset) => dataset.type === "derived")
        .map((dataset: unknown) => dataset as DerivedDataset)
        .filter((dataset) =>
          dataset["inputDatasets"].includes(this.dataset?.pid)
        )
    )
  );

  derivedDatsetsSubscription: Subscription = new Subscription();
  derivedDatasets: DerivedDataset[] = [];

  result$ = this.store.select(selectOpenwhiskResult);

  actionsForm = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.formBuilder.group({
        actionForm: new FormControl("", Validators.required),
      }),
      this.formBuilder.group({
        scriptForm: new FormControl("", Validators.required),
      }),
    ]),
  });

  actions: string[] = ["Analyze", "Reduce"];

  analyzeScripts: Record<string, unknown>[] = [
    {
      value: "Plot",
      description: "Create plot.",
    },
  ];

  reduceScripts: Record<string, unknown>[] = [
    {
      value: "Noise Reduction",
      description: "Remove background noise.",
    },
  ];

  columnsToDisplay: string[] = ["timestamp", "name", "pid", "software"];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  reduceDataset(dataset: Dataset): void {
    this.store.dispatch(reduceDatasetAction({ dataset }));
  }

  onRowClick(dataset: Dataset): void {
    const pid = encodeURIComponent(dataset.pid);
    this.router.navigateByUrl("/datasets/" + pid);
  }

  get formArray() {
    return this.actionsForm.get("formArray");
  }

  get selectedAction() {
    return this.formArray?.get([0])?.get("actionForm");
  }

  get selectedScript() {
    return this.formArray?.get([1])?.get("scriptForm");
  }

  ngOnInit() {
    this.store.dispatch(fetchDatasetsAction());
    this.store.select(selectCurrentDataset).subscribe((dataset) => {
      this.dataset = dataset;
    });
    this.derivedDatsetsSubscription = this.derivedDatasets$.subscribe(
      (datasets) => {
        if (datasets) {
          this.derivedDatasets = datasets;
        }
      }
    );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName === "dataset") {
        this.dataset = changes[propName].currentValue;
        this.derivedDatasets$ = this.store.select(selectDatasets).pipe(
          map((datasets) =>
            datasets
              .filter((dataset) => dataset.type === "derived")
              .map((dataset: unknown) => dataset as DerivedDataset)
              .filter((dataset) =>
                dataset["inputDatasets"].includes(this.dataset?.pid)
              )
          )
        );
      }
    }
  }

  ngOnDestroy() {
    this.derivedDatsetsSubscription.unsubscribe();
  }
}
