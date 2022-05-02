import { Component, OnInit } from '@angular/core';
import { ApiWaitingListService } from '../../services/api-waiting-list.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {

  allWaitingListData

  constructor(
    private api_waitingList: ApiWaitingListService
  ) { }

  ngOnInit(): void {
    this.getWaitingListData()
  }

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];      
    })
  }

}
