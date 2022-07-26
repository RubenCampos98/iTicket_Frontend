import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { LocationModule } from 'src/app/modules/location.module';

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

  locationModule: LocationModule = new LocationModule

  user_errors

  checked 

  constructor(
    private formBuilder: FormBuilder,
    private modalLocation: NgbModal,
    private api_location: ApiLocationService,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}

  updateLocation(){
    this.locationModule.address = this.locationForm.value.address
    this.locationModule.notes = this.locationForm.value.notes
    this.locationModule.status = this.locationForm.value.status
    this.api_location.updateLocation(this.locationModule, this.locationModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.locationForm.reset()
      window.location.reload()
    },
    err => {
      this.user_errors = err.error.errors
    })
  }

  open(id: number, address: string, status: boolean, notes: string){
    this.locationModule.id = id
    this.locationForm = this.formBuilder.group({
      address: address,
      status: status,
      notes: notes
    })
    this.modalLocation.open(this.editLocationModal, {centered: true,  size: 'lg' });
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
  }

  openDeleteModal(id: number){
    this.modalLocation.open(this.editLocationModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalLocation.dismissAll();
  }

}
