import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }
stuName:any
stuRes:any
students = []

  ngOnInit() {
  //   this.router.params.subscribe(params => {
  //     // console.log(params[0]);
  //     this.students = params
  // })

  this.router.params.subscribe(params => {
    // console.log(params.resDress.split(','));

    this.stuName = params.name.split(',')
    this.stuRes = params.resDress.split(',')
    
    let i = 0
    this.stuName.forEach(element => {
      let g = {
        name:element,
        res:this.stuRes[i]
      }
      this.students.push(g)
      i++
    });


  })

  }

}
