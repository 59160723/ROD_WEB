import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service'

import {ActivatedRoute} from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Chart from 'chart.js'
import { groupBy } from 'rxjs/internal/operators/groupBy';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  chart:any
  ctx:any

  angForm: FormGroup;

  subjectID: any
  subjectGroup: any
  term: any
  students = []
  stuName:any
  attenQty = []
  trueDress = []
  totalAtten:any

  showGraph = false

  constructor(private stuService: StudentService,private router : ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

  }

  onClickSubmit(formData) {
    this.subjectID = formData.subjectID
    this.subjectGroup = formData.subjectGroup
    this.term = formData.term
    console.log(formData);
    
    let data = {
      subId: this.subjectID,
      group: this.subjectGroup,
      term: this.term

    }

    this.stuService.getOverview(data).subscribe(res => {
      this.totalAtten = res.length

      res.forEach(element => {

          let arr1 = []
          let arr2 = []
          arr1 = this.students
          arr2 = element.student
          this.students = arr1.concat(arr2)
     
      });

      let groupBy = this.groupBy(this.students,'name')
      this.stuName = Object.keys(groupBy)
      let objArr = Object.values(groupBy)
      objArr.forEach(element => {
        let rDress:any
        rDress = element
        let num = rDress.length
        this.attenQty.push(num)

        let trueNum = rDress.filter(e => e.resDress == "ถูกระเบียบ").length
        this.trueDress.push(trueNum)
      });

      console.log('total: '+this.totalAtten);
      console.log(this.stuName);
      console.log(groupBy);
      console.log(this.attenQty);
      






      if(res == undefined || res == '' || res == [] || res == null){
        alert('ไม่พบข้อมูลที่ต้องการ')
      }else{
        this.createChart()
      }
      
    });
    
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
  };

  createChart(){
    this.ctx = document.getElementById('myChart')
    this.chart = new Chart(this.ctx,{
      type: 'horizontalBar',
      data: {
        labels: this.stuName,
        datasets:[{
          label:"ความถูกระเบียบ",
          backgroundColor: 'rgb(125,152,152)' ,
          data:this.trueDress,

        },
        {
          label:"การเข้าเรียน",
          data:this.attenQty,
          backgroundColor: 'rgb(111,152,1)',
        }
      ]

      },
      options: {
        scales: {
          xAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
      }  
    })
    this.showGraph = true
  }



  

}
