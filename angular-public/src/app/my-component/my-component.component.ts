import { Component, OnInit } from '@angular/core';
import { MysService } from '../mys.service';

export class MyComponentData {
  title: string;
  content: string;
  elements: string[];
}

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  constructor(private mys: MysService) { }

  // title = 'my-component'
  // content = 'my-component works???'

  /*
  data: MyComponentData = {
    title: 'my-component',
    content: 'my-component works!!!',
    elements: ['elem1','elem2']
  };
  */
  data: MyComponentData = { title: '', content: '', elements: [] };

  private getData(): void { this.mys.getData().then(d => this.data = d ); }

  ngOnInit(): void { this.getData(); }

}
