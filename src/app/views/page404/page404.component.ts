import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(
    private modalService: NgbModal,
    private location: Location ,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;   
  }

  ngOnInit(): void {}

  back(){
    this.location.back()
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
