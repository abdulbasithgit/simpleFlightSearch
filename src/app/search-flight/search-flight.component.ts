import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.sass']
})
export class SearchFlightComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['flightNumber', 'flightOrgin', 'flightDes', 'flightDate'];
  dataSource = [];
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService) { }
  ngOnInit() {
    this.onloadForm();
  }
  onloadForm(){
    this.dataSource = [];
    this.searchForm = this.formBuilder.group({
      flightNumber: [null, []],
      filghtOrgin: [null, []],
      flightDes: [null, []],
      flightDate: [null, []]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }
  onSearch() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
        return;
    }
    let formdataValue = this.searchForm.value;
    this.apiservice.getflight('flights').subscribe((res)=>{
      this.dataSource = [];
      let data = res;
      let filterData = [];
      if(formdataValue.flightNumber === null && formdataValue.filghtOrgin === null && formdataValue.flightDes === null && formdataValue.flightDate === null){
        filterData = data;
      }else if(formdataValue.flightNumber !== null && formdataValue.filghtOrgin === null && formdataValue.flightDes === null && formdataValue.flightDate === null){
        data.forEach(element => {
          if(element.flightNumber === formdataValue.flightNumber){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber === null && formdataValue.filghtOrgin !== null && formdataValue.flightDes !== null && formdataValue.flightDate === null){
        data.forEach(element => {
          if(element.flightOrgin === formdataValue.filghtOrgin && element.flightDes === formdataValue.flightDes){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber !== null && formdataValue.filghtOrgin === null && formdataValue.flightDes === null && formdataValue.flightDate !== null){
        data.forEach(element => {
          formdataValue.flightDate.setHours(0,0,0,0);
          let anotherdate = new Date(formdataValue.flightDate);
          let withouttime = new Date(element.flightDate);
          withouttime.setHours(0,0,0,0);
          if(element.flightNumber === formdataValue.flightNumber && withouttime.toDateString() == anotherdate.toDateString()){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber === null && formdataValue.filghtOrgin !== null && formdataValue.flightDes !== null && formdataValue.flightDate !== null){
        data.forEach(element => {
          formdataValue.flightDate.setHours(0,0,0,0);
          let anotherdate = new Date(formdataValue.flightDate);
          let withouttime = new Date(element.flightDate);
          withouttime.setHours(0,0,0,0);
          if(element.flightOrgin === formdataValue.filghtOrgin && element.flightDes === formdataValue.flightDes && withouttime.toDateString() == anotherdate.toDateString()){
            filterData.push(element);
          }
        });
      }
      this.dataSource = filterData;
    });
  }

}
