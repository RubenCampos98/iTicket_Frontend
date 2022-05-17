import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationModule } from 'src/app/modules/location.module';
import { ApiLocationService } from '../../services/api-location.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  disabled = false;
  postData: any
  showNotes = true;
  faCirclePlus = faCirclePlus

  formValue !:FormGroup
  locationModelObj :LocationModule = new LocationModule
  allLocationData
  allLocationBYData

  constructor(
    private formBuilder: FormBuilder,
    private api_location: ApiLocationService) { }

  ngOnInit(): void{
    this.getLocationsData()
    this.formValue = this.formBuilder.group({
      address: [''],
      status:[''],
      notes: ['']
    })
  }

  addLocation(){
    this.locationModelObj.address = this.formValue.value.address;
    this.locationModelObj.notes = this.formValue.value.notes;

    this.api_location.postLocation(this.locationModelObj).subscribe(res=>{
      console.log("Lá pra dentro", res)
      let ref = document.getElementById('clear')
      ref?.click()
      this.formValue.reset()
      this.getLocationsData()
    },
    err =>{
      alert("Nopeeeee")
    })
  }

  getLocationsData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
    })
  } 

  getLocationById(data:any){
    this.locationModelObj.id = data.id
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['notes'].setValue(data.notes);
  }

  deleteLocation(data:any){
    this.api_location.deleteLocation(data.id).subscribe(res => {
      this.getLocationsData()
    })
  }

  updateLocation(){
    this.locationModelObj.address = this.formValue.value.address;
    this.locationModelObj.notes = this.formValue.value.notes;

    this.api_location.updateLocation(this.locationModelObj, this.locationModelObj.id).subscribe(res => {
      alert("Updated")
      let ref = document.getElementById('clear')
      ref?.click()
      this.formValue.reset()
      this.getLocationsData()
    })
  }

}
