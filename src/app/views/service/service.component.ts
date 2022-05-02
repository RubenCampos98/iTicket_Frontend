import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  allServiceData: any
  faCirclePlus = faCirclePlus

  constructor(
    private api_service: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getServiceData()
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

}
