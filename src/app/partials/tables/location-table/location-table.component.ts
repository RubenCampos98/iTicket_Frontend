import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { LoginService } from 'src/app/services/login.service';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';

import { EditLocationModalComponent } from '../../modals/edit-location-modal/edit-location-modal.component';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent implements OnInit {

  @ViewChild('editLocation') private editLocation!: EditLocationModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent

  allLocationData
  locationSearchBar

  page = 1
  pageSize = 5
  locationsPagination: Location[]

  constructor(
    private api_location: ApiLocationService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getLocationData()
    this.LocationTablePagination()
  }

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
    })
  } 

  deleteLocation(data: any){
    this.api_location.deleteLocation(data.id).subscribe(res => {
      window.location.reload()
    })
  } 

/*   onEditLocation(data: any){
    this.locationModelObj.id = data.id;
    this.locationForm.controls['address'].setValue(data.address);
    this.locationForm.controls['status'].setValue(data.status);
    this.locationForm.controls['notes'].setValue(data.notes);
  } */

  openLocationEditModal(id: number, address: string, status: boolean, notes: string) {
    console.log(id, address, status, notes)
    this.editLocation.open(id, address, status, notes);
  }

  openDeleteModal(id: number){
    this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
      this.api_location.deleteLocation(id).subscribe(res => {
        window.location.reload()
      })
    });
  }

  LocationTablePagination(){
    this.locationsPagination = this.allLocationData && this.allLocationData
      .map((location, i) => ({id: i + 1, ...location}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

}
