import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-location-modal',
  templateUrl: './edit-location-modal.component.html',
  styleUrls: ['./edit-location-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditLocationModalComponent implements OnInit {

  @ViewChild('editLocation') private editLocationModal!: TemplateRef<EditLocationModalComponent>

  locationForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}

  open(id: number, address: string, status: boolean, notes: string){
    this.locationForm = this.formBuilder.group({
      address: address,
      status: status,
      notes: notes
    })
    this.modalService.open(this.editLocationModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
