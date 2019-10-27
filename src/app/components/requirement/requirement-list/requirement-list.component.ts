import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { RequirementService } from '../../../services/requirement.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { Requirement } from '../../../models/requirement';
import * as ROUTES from '../../../helpers/routes';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.scss']
})
export class RequirementListComponent implements OnInit, OnDestroy {
  @Input() addEvent: Observable<void>;
  @Input() projectId: string;
  requirements$: Observable<Requirement[]>;
  private eventsSubscription: Subscription;
  message: string;
  ROUTES = ROUTES;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEye = faEye;

  requirementForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    type: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private toastService: ToastService,
    private spinnerService: SpinnerService,
    private requirementService: RequirementService) { }

  ngOnInit() {
    this.eventsSubscription = this.addEvent.subscribe(() => {
      this.initRequirementForm();
    });
    this.requirements$ = this.requirementService.getByProject(this.projectId);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe()
  }

  initRequirementForm(requirementObj?: Requirement) {
    this.requirementForm.controls.id.setValue(requirementObj ? requirementObj.id : null);
    this.requirementForm.controls.description.setValue(requirementObj ? requirementObj.description : '');
    this.requirementForm.controls.type.setValue(requirementObj ? requirementObj.type : '');
  }

  async onSubmit() {
    this.message = '';
    if (this.requirementForm.valid) {
      this.spinnerService.show();
      try {
        const requirement = new Requirement(
          this.requirementForm.controls.description.value,
          this.requirementForm.controls.type.value
        );
        await this.requirementService.addEdit(this.projectId, requirement, this.requirementForm.controls.id.value);
        this.toastService.show('Requirement data saved successfully !!!');
        (window as any).jQuery('#addEditRequirementModal').modal('hide');
        this.requirements$ = this.requirementService.getByProject(this.projectId);
      } catch (error) {
        this.message = 'Failed to save requirement data';
      }
    } else {
      if (this.requirementForm.controls.description.errors) {
        this.message = 'Valid description is required';
      } else if (this.requirementForm.controls.type.errors) {
        this.message = 'Valid type should be selected';
      }
    }
    this.spinnerService.hide();
  }

  async onDelete(reqId: string) {
    this.spinnerService.show();
    try {
      await this.requirementService.delete(reqId);
      this.toastService.show('Requirement delete successfully !!!');
      this.requirements$ = this.requirementService.getByProject(this.projectId);
    } catch (error) {
      this.message = 'Failed to delete Requirement';
    }
    this.spinnerService.hide();
  }
}
