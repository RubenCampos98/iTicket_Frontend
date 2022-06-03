import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { LoginService } from 'src/app/services/login.service';
import { CreateServiceComponent } from '../../modals/create/create-service/create-service.component';

import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditServiceModalComponent } from '../../modals/edit/edit-service-modal/edit-service-modal.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent implements OnInit {

  @ViewChild('createService') private createService!: CreateServiceComponent
  @ViewChild('editService') private editService!: EditServiceModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent

  allServiceData
  serviceSearchBar
  sessionData

  page = 1
  pageSize = 5
  ServicePagination: Location[]

  constructor(
    private api_service: ApiServiceService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private api_session: LoginService
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getServiceData()
    this.ServiceTablePagination()
    this.getSessionData()
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  getServiceById(id){
    this.api_service.getServiceById(id).subscribe(res => {
      this.allServiceData = res['data'];   
    })
  }

  openCreateServiceModal(){
    this.createService.open();
  }

  openServiceEditModal(id: number, name: string, notes:string, status: boolean) {
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      console.log(id, name, notes, status)
      this.editService.open(id, name, notes, status);
    }
  }

  ServiceTablePagination(){
    this.ServicePagination = this.allServiceData && this.allServiceData
      .map((service, i) => ({id: i + 1, ...service}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        this.api_service.deleteService(id).subscribe(res => {
          window.location.reload()
        })
      });
    }
  }

}
