import { Component, OnInit } from '@angular/core';

export class MyComponentData {
  title: string;
  content: string;
  elements: string[];
  something: number;
}

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  constructor() { }

  // title = 'my-component'
  // content = 'my-component works???'

  data: MyComponentData = {
    title: 'my-component',
    content: 'my-component works!!!',
    elements: ['elem1','elem2']
  };

  ngOnInit(): void {
  }

}
