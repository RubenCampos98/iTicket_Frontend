import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { ServiceModule } from 'src/app/modules/service.module';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class DeleteModalComponent implements OnInit {

  @Input() getServiceByID:any[]

  serviceModelObj :ServiceModule = new ServiceModule

  allServiceData
  data: any[]
  name = []

  serviceForm !:FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private api_service: ApiServiceService,
    private formBuilder: FormBuilder,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      name: [''],
      status: 0
    })
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      console.log(res)
      this.allServiceData = res['data'];      
    })
  }

  onEditService(data: any){
    this.serviceModelObj.id = data.id;
    this.serviceForm.controls['name'].setValue(data.name);
    this.serviceForm.controls['status'].setValue(data.status);
  }

}
