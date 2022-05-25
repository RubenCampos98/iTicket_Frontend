import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-service-modal',
  templateUrl: './edit-service-modal.component.html',
  styleUrls: ['./edit-service-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditServiceModalComponent implements OnInit {

  @ViewChild('editService') private editServiceModal!: TemplateRef<EditServiceModalComponent>

  serviceForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  open(id: number, name: string, status: boolean){
    this.serviceForm = this.formBuilder.group({
      name: name,
      status: status
    })
    this.modalService.open(this.editServiceModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
