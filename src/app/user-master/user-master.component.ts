import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  dogApiList: any;
  dogList: any;
  imageURL: any;
  selectedDog: any;
  selectedDogURL: any;

  constructor(private httpClient: HttpClient) {
   this.dogApiList = [];
   this.dogList = [];
   this.imageURL = "";
   this.selectedDog = "";
   this.selectedDogURL = "";
   }

  ngOnInit(): void {
  this.getDogApiList()
  }

getDogApiList(){
  this.httpClient.get('https://dog.ceo/api/breeds/list/all').subscribe((result:any) =>
  {
  this.dogApiList = result;

  for (var i in this.dogApiList.message) {
    this.dogList.push(i);
  }
  })
}

selectedBreed = '';
	onSelected(value:any): void {
		this.selectedBreed = value.target.value;
		this.getImages(this.selectedBreed);
	}

getImages(selectedBreed: any){
this.httpClient.get('https://dog.ceo/api/breed/' + selectedBreed + '/images').subscribe((resultImg:any) =>
  {
  this.imageURL = resultImg.message[0];
  this.selectedDog = selectedBreed;
  this.selectedDogURL = 'https://en.wikipedia.org/wiki/'+this.selectedDog;
  })
}
}
