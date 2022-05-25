import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiUserService } from 'src/app/services/api-user.service';


import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { EditUserModalComponent } from '../../modals/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild('editUser') private editUser!: EditUserModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent

  allUserData
  userSearchBar

  page = 1
  pageSize = 5
  UserPagination: Location[]

  constructor(
    private api_user: ApiUserService ,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getUserData()
    this.UserTablePagination()
  }

  getUserData(){
    this.api_user.getUser().subscribe(res => {
      this.allUserData = res['data'];
    })
  } 

  openUserEditModal(id: number, name: string, email: string, phone: number, admin: boolean){
    console.log(id, name, email, phone, admin);
    this.editUser.open(id, name, email, phone, admin);
  }

  UserTablePagination(){
    this.UserPagination = this.allUserData && this.allUserData
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(id: number){
    this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
      this.api_user.deleteUser(id).subscribe(res => {
        window.location.reload()
      })
    });
  }

}
