import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookingsdisallowed',
  templateUrl: './bookingsdisallowed.component.html',
  styleUrls: ['./bookingsdisallowed.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class BookingsdisallowedComponent implements OnInit {

  @ViewChild('bookingsDisallowed') private bookingsDisallowed!: BookingsdisallowedComponent

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}

  open(){
    this.modalService.open(this.bookingsDisallowed, {centered: true, size: 'md'});
  }

  closeModal() {
    this.modalService.dismissAll();
      //window.location.reload()
  }

}
