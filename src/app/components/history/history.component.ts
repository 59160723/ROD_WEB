
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  title = 'rod-web';
  attendance =[]

  constructor(private stuService: StudentService,private router : Router ) { }

  async ngOnInit() {
    (await this.stuService.getAttendance()).subscribe(res => {
      this.attendance = res
    });
  }
  
  goDetail(stu){
    let name = []
    let resDress = []
    console.log(stu);
    stu.forEach(element => {
      name.push(element.name)
      resDress.push(element.resDress)
    });

    
  this.router.navigate(['/historyDetail',{name:name,resDress:resDress}])

  }


}
