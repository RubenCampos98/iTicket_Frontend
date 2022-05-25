import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApiServiceService } from 'src/app/services/api-service.service';

import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { EditServiceModalComponent } from '../../modals/edit-service-modal/edit-service-modal.component';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent implements OnInit {

  @ViewChild('editService') private editService!: EditServiceModalComponent

  allServiceData
  serviceSearchBar

  page = 1
  pageSize = 5
  ServicePagination: Location[]

  constructor(
    private api_service: ApiServiceService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getServiceData()
    this.ServiceTablePagination()
    
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

/*   onEditService(data: any){
    this.serviceModelObj.id = data.id;
    this.serviceForm.controls['name'].setValue(data.name);
    this.serviceForm.controls['status'].setValue(data.status);
  } */

  getServiceById(id){
    this.api_service.getServiceById(id).subscribe(res => {
      console.log(res.data)
      this.allServiceData = res['data'];   
    })
  }

  openServiceEditModal(id: number, name: string, status: boolean) {
    console.log(id, name, status)
    this.editService.open(id, name, status);
  }

  ServiceTablePagination(){
    this.ServicePagination = this.allServiceData && this.allServiceData
      .map((service, i) => ({id: i + 1, ...service}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(){
    this.modalService.open(DeleteModalComponent, {centered: true});
  }

}
