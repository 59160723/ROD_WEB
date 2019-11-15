import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  async insertAttendance(data) {
    try {

      let result = await this.http.post<any>('http://192.168.1.2:3000/attendance', data).toPromise()
      return result
    }
    catch (err) {
      return false

    }
  }
  async getStudent(key) {

      // await this.http.get('http://192.168.1.2:3000/attendance/' + key).subscribe(result => {
      //   return JSON.stringify(result)
      // })
      // return this.http.get('http://192.168.1.2:3000/attendance/' + key);

      return this.http.get<any>('http://192.168.1.2:3000/student/' + key).pipe()
     
  }
  async getAttendance() {
    return this.http.get<any>('http://192.168.1.2:3000/attendance/').pipe()
}
}





