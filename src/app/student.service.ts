import { Injectable, APP_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  async insertAttendance(data) {
    try {

      let result = await this.http.post<any>('http://localhost:3000/attendance', data).toPromise()
      return result
    }
    catch (err) {
      return false

    }
  }
   getStudent(key) {

      // await this.http.get('http://localhost:3000/attendance/' + key).subscribe(result => {
      //   return JSON.stringify(result)
      // })
      // return this.http.get('http://localhost:3000/attendance/' + key);

      // endpoint API
      return this.http.get<any>('http://localhost:3000/student/' + key).pipe()
     
  }
   getAttendance() {
    // endpoint API

    return this.http.get<any>('http://localhost:3000/attendance').pipe()
  }

  getOverview(data){
      // endpoint API
      console.log(data);
      
      return this.http.get<any>('http://localhost:3000/attendanceResult?subId='+data.subId+'&group='+
      data.group+'&term='+data.term).pipe()


  }

  async ledStatus(status){
    let data = {
      status:status
    }
    try {
      let result = await this.http.post<any>('http://localhost:3000/ledStatus', data).toPromise()
      return result
    }catch (err) {
      return false

    }
  }

}





