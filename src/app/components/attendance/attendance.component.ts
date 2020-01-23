import * as socketIo from 'socket.io-client'
import {Router} from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../../student.service'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  angForm: FormGroup;

  title = 'rod-web';
  subjectID: any
  subjectName: any
  subjectGroup: any
  classroom: any
  term: any

  readonlyStatus = false
  startAtten = false
  showBtn = true

  student = []

  constructor(private http: HttpClient, private fb: FormBuilder, private stuService: StudentService ,private router : Router) {
  }





  async onClickSubmit(formData) {
    this.subjectID = formData.subjectID
    this.subjectName = formData.subjectName
    this.subjectGroup = formData.subjectGroup
    this.classroom = formData.classroom
    this.term = formData.term
    this.startAtten = true
    this.readonlyStatus = true
    this.showBtn = false
    try {
      if(this.showBtn == false ){
        await this.stuService.ledStatus('on')
      }
       
    } catch (err) {
      console.log(err);
    }
  }
  async stopAtten() {
    let date = new Date()
    var dateTime = date.toLocaleString();
    let data = {
      subjectID: this.subjectID,
      subjectName: this.subjectName,
      subjectGroup: this.subjectGroup,
      classroom: this.classroom,
      term: this.term,
      student: this.student,
      dateTime: dateTime
    }
    try {
      this.showBtn = true
      await this.stuService.insertAttendance(data)
      await this.stuService.ledStatus('off')
    } catch (err) {
      console.log(err);
    }

    this.router.navigateByUrl('history')

  }

  ngOnInit() {
    const socket = socketIo('http://localhost:3000')
    socket.on('studentData', async (data) => {
      console.log(data)
      if (this.startAtten) {
        // (await this.stuService.getStudent(key)).subscribe(res => {
        //   this.student.push(res.name)
        // });
        this.getStuName(data.key, data.resDress)
      }
      
    })
  }


  async getStuName(k, r) {
    (await this.stuService.getStudent(k)).subscribe(res => {
      let stu = {
        name: res.name,
        resDress: r
      }
      this.student.push(stu)
    });
  }


}


