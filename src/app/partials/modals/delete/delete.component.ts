import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ServiceModule } from 'src/app/modules/service.module';
import { ApiUserService } from 'src/app/services/api-user.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class DeleteModalComponent implements OnInit {

  @Input() confirm_function: any;
  @Input() cancel_function: any;
  @ViewChild('deleteModal') private deleteModal!: TemplateRef<DeleteModalComponent>

  allServiceData
  data: any[]
  name = []
  deleteForm

  confirmation_msg: string

  serviceForm !:FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private api_user: ApiUserService,
    private router: Router,
    private login: LoginService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() { }

  closeModal() {
    this.modalService.dismissAll()
  }
  
  open(message: string, yesFn: () => void){
    this.confirm_function = yesFn
    this.confirmation_msg = message
    this.modalService.open(this.deleteModal, {centered: true,  size: 'lg' });
  }

  confirm(){
    console.log(this.confirm_function)
    this.confirm_function
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
        this.router.navigate([url]);
    });
  }

}
