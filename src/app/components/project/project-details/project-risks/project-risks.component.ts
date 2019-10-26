import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RiskService } from '../../../../services/risk.service';
import { Risk } from '../../../../models/risk';
import { faTrashAlt, faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { SpinnerService } from '../../../../services/spinner.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-project-risks',
  templateUrl: './project-risks.component.html',
  styleUrls: ['./project-risks.component.scss']
})
export class ProjectRisksComponent implements OnInit {
  @Input() projectId: string;
  risks$: Observable<Risk[]>;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  message: string;

  riskForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    status: new FormControl(''),
    type: new FormControl('')
  });

  constructor(private toastService: ToastService,
    private spinnerService: SpinnerService,
    private riskService: RiskService) { }

  ngOnInit() {
    this.risks$ = this.riskService.getByProject(this.projectId);
  }

  initRiskForm(riskObj: Risk) {
    this.riskForm.controls.id.setValue(riskObj ? riskObj.id : null);
    this.riskForm.controls.description.setValue(riskObj ? riskObj.description : '');
    this.riskForm.controls.status.setValue(riskObj ? riskObj.status : '');
    this.riskForm.controls.type.setValue(riskObj ? riskObj.type : '');
  }

  async onDelete(riskId: string) {
    this.spinnerService.show();
    try {
      await this.riskService.delete(riskId);
      this.toastService.show('Risk delete successfully !!!');
      this.risks$ = this.riskService.getByProject(this.projectId);
    } catch (error) {
      this.message = 'Failed to delete Risk';
    }
    this.spinnerService.hide();
  }

  async onSubmit() {
    this.message = '';
    if (this.riskForm.valid) {
      this.spinnerService.show();
      try {
        const risk = new Risk(
          this.riskForm.controls.description.value,
          this.riskForm.controls.status.value,
          this.riskForm.controls.type.value
        );
        await this.riskService.addEdit(this.projectId, risk, this.riskForm.controls.id.value);
        this.toastService.show('Risk data saved successfully !!!');
        (window as any).jQuery('#addEditRiskModal').modal('hide');
        this.risks$ = this.riskService.getByProject(this.projectId);
      } catch (error) {
        this.message = 'Failed to save risk data';
      }
    } else {
      if (this.riskForm.controls.description.errors) {
        this.message = 'Valid description is required';
      }
    }
    this.spinnerService.hide();
  }
}
