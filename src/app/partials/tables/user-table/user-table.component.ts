import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiUserService } from 'src/app/services/api-user.service';
import { LoginService } from 'src/app/services/login.service';
import { CreateUserComponent } from '../../modals/create/create-user/create-user.component';


import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditUserModalComponent } from '../../modals/edit/edit-user-modal/edit-user-modal.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild('createUser') private createUser!: CreateUserComponent
  @ViewChild('editUser') private editUser!: EditUserModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent

  allUserData
  userSearchBar
  sessionData

  page = 1
  pageSize = 5
  UserPagination: Location[]

  constructor(
    private api_user: ApiUserService ,
    private modalService: NgbModal,
    private api_session: LoginService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getUserData()
    this.UserTablePagination()
    this.getSessionData()
  }

  getUserData(){
    this.api_user.getUser().subscribe(res => {
      this.allUserData = res['data'];
    })
  } 

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  openUserEditModal(id: number, name: string, email: string, phone: number, admin: boolean, address: string){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.editUser.open(id, name, email, phone, admin, address);
    }
  }

  openUserCreateModal(){
    this.createUser.open()
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        this.api_user.deleteUser(id).subscribe(res => {
          window.location.reload()
        })
      });
    }
  }

  UserTablePagination(){
    this.UserPagination = this.allUserData && this.allUserData
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

}
