import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceModule } from 'src/app/modules/service.module';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateServiceComponent implements OnInit {

  @ViewChild('createService') private createService!: CreateServiceComponent

  serviceModule :ServiceModule = new ServiceModule

  serviceFormValue !:FormGroup

  checked: boolean = true;

  user_errors

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_service: ApiServiceService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.serviceFormValue = this.formBuilder.group({
      name: [''],
      status: [''],
      notes: ['']
    })
  }

  addService(){
    this.serviceModule.name = this.serviceFormValue.value.name;
    this.serviceModule.status = this.serviceFormValue.value.status;
    this.serviceModule.notes = this.serviceFormValue.value.notes;
    this.api_service.createService(this.serviceModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.serviceFormValue.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
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
    this.modalService.open(this.createService, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
