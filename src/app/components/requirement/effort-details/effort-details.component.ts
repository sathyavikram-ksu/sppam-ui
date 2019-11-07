import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt, faEdit, faPlusSquare, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RequirementService } from '../../../services/requirement.service';
import { EffortService } from '../../../services/effort.service';
import { Requirement } from '../../../models/requirement';
import { Effort } from '../../../models/effort';
import * as ROUTES from '../../../helpers/routes';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-effort-details',
  templateUrl: './effort-details.component.html',
  styleUrls: ['./effort-details.component.scss']
})
export class EffortDetailsComponent implements OnInit {
  ROUTES = ROUTES;
  faArrowCircleLeft = faArrowCircleLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  message: string;
  projectId: string;
  reqId: string;
  requirement: Requirement;
  efforts$: Observable<Effort[]>;

  effortForm = new FormGroup({
    id: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    reqAnalysisHrs: new FormControl(0),
    designingHrs: new FormControl(0),
    codingHrs: new FormControl(0),
    testingHrs: new FormControl(0),
    projectManagementHrs: new FormControl(0)
  });

  constructor(private route: ActivatedRoute,
    private requirementService: RequirementService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private effortService: EffortService) { }

  async ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("projectId");
    this.reqId = this.route.snapshot.paramMap.get("reqId");
    this.requirement = await this.requirementService.getById(this.reqId);
    this.efforts$ = this.effortService.getByRequirement(this.reqId);
  }

  initEffortForm(effortObj: Effort) {
    this.effortForm.controls.id.setValue(effortObj ? effortObj.id : null);
    this.effortForm.controls.fromDate.setValue(effortObj ? effortObj.fromDate : new Date());
    this.effortForm.controls.toDate.setValue(effortObj ? effortObj.toDate : new Date());
    this.effortForm.controls.reqAnalysisHrs.setValue(effortObj ? effortObj.reqAnalysisHrs : 0);
    this.effortForm.controls.designingHrs.setValue(effortObj ? effortObj.designingHrs : 0);
    this.effortForm.controls.codingHrs.setValue(effortObj ? effortObj.codingHrs : 0);
    this.effortForm.controls.testingHrs.setValue(effortObj ? effortObj.testingHrs : 0);
    this.effortForm.controls.projectManagementHrs.setValue(effortObj ? effortObj.projectManagementHrs : 0);
  }

  getCount(effortList: Effort[], key: string) {
    let effortCount = 0;
    if (effortList && effortList.length > 0) {
      effortCount = effortList.reduce((accumulator: number, currentValue: Effort) => {
        return accumulator + currentValue[key];
      }, 0)
    }
    return effortCount;
  }

  async onDelete(effortId: string) {
    this.spinnerService.show();
    try {
      await this.effortService.delete(effortId);
      this.toastService.show('Effort delete successfully !!!');
      this.efforts$ = this.effortService.getByRequirement(this.reqId);
    } catch (error) {
      this.message = 'Failed to delete Effort';
    }
    this.spinnerService.hide();
  }

  async onSubmit() {
    this.message = '';
    if (this.effortForm.valid) {
      this.spinnerService.show();
      try {
        const effort = new Effort(
          Date.parse(this.effortForm.controls.fromDate.value),
          Date.parse(this.effortForm.controls.toDate.value),
          this.effortForm.controls.reqAnalysisHrs.value,
          this.effortForm.controls.designingHrs.value,
          this.effortForm.controls.codingHrs.value,
          this.effortForm.controls.testingHrs.value,
          this.effortForm.controls.projectManagementHrs.value,
        );
        await this.effortService.addEdit(this.reqId, effort, this.effortForm.controls.id.value);
        this.toastService.show('Effort data saved successfully !!!');
        (window as any).jQuery('#addEditEffortModal').modal('hide');
        this.efforts$ = this.effortService.getByRequirement(this.reqId);
      } catch (error) {
        this.message = 'Failed to save effort data';
      }
    } else {
      this.message = 'Please enter valid data';
    }
    this.spinnerService.hide();
  }
}
