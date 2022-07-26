import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocationModule } from 'src/app/modules/location.module';
import { ApiLocationService } from 'src/app/services/api-location.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateLocationComponent implements OnInit {

  @ViewChild('createLocation') private createLocation!: CreateLocationComponent

  locationModule :LocationModule = new LocationModule

  locationFormValue !:FormGroup

  checked: boolean = true

  user_errors

  constructor(
    private formBuilder: FormBuilder,
    private modalLocation: NgbModal,
    private api_location: ApiLocationService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.locationFormValue = this.formBuilder.group({
      address: [''],
      status: [''],
      notes: ['']
    })
  }

  addLocation(){
    this.locationModule.address = this.locationFormValue.value.address;
    this.locationModule.status = this.locationFormValue.value.status;
    this.locationModule.notes = this.locationFormValue.value.notes;
    this.api_location.createLocation(this.locationModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.locationFormValue.reset()
      window.location.reload()
    },
    err => {
      this.user_errors = err.error.errors
      console.log(this.user_errors)
    })
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

  open(){
    this.modalLocation.open(this.createLocation, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalLocation.dismissAll();
  }

}
