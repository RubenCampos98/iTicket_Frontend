import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ServiceModule } from 'src/app/modules/service.module';

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

  checked: boolean = true

  serviceModule :ServiceModule = new ServiceModule

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
    this.serviceForm = this.formBuilder.group({
      name: [''],
      notes: [''],
      status:['']
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

  updateService(){
    this.serviceModule.name = this.serviceForm.value.name;
    this.serviceModule.notes = this.serviceForm.value.notes;
    this.serviceModule.status = this.serviceForm.value.status;
    this.api_service.updateService(this.serviceModule, this.serviceModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.serviceForm.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
      this.user_errors = err.error.errors
      console.log(this.user_errors)
    })
  }

  open(id: number, name: string, notes:string, status: boolean){
    this.serviceModule.id = id
    this.serviceForm = this.formBuilder.group({
      name: name,
      notes: notes,
      status: status
    })
    this.modalService.open(this.editServiceModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
