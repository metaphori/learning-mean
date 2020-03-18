import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyComponentData } from './my-component/my-component.component';

@Injectable({
  providedIn: 'root'
})
export class MysService {

  constructor(private http: HttpClient) {

  }

  public getData(): Promise<MyComponentData> {
    var url = 'http://localhost:3000/api/posts/4';
    return this.http.get(url).toPromise()
      .then((res:any) => {
        console.log(res);
        return {
          title: res.title,
          content: res.content,
          elements: res.comments.map(s => s.title)
        } as MyComponentData
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
