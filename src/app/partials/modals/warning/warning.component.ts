import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class WarningComponent implements OnInit {

  @ViewChild('warningModal') private warningModal!: TemplateRef<WarningComponent>

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
  }

  open(){
    this.modalService.open(this.warningModal, {centered: true,  size: 'md' });
  }

  closeModal() {
    this.modalService.dismissAll()
  }

}
