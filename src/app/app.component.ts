import { Component,AfterViewInit } from '@angular/core';
import * as Chart from'chart.js';
import {GithubService} from './services/github.service'
import { error } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  username:string;
  projecName:string;
  project_issue;
  closed_issue;
  
  PieChart:any;
  

  constructor(private _githubService:GithubService){
    
  }

  search(){

    this._githubService.updateURL(this.projecName,this.username);

    
    this._githubService.getOpen().subscribe(project_issue=>{
      this.project_issue=project_issue;
        //console.log(users.open_issues);
        //this.project_issue=project_issue;
        
        
        //console.log('open issue')
        
        //this.closed_issue=project_issue;
        //console.log(this.project_issue)
        
        },error=>{
          alert('Please Enter Valid User Name or Project Name');
        }
    );

    this._githubService.getClosed().subscribe(project_issue=>{
      //console.log(users.open_issues);
      //this.project_issue=project_issue;
      //console.log('Closed Issue')
      //this.project_issue=project_issue;
      this.closed_issue=project_issue;
      //console.log(this.closed_issue)

  }/* ,error=>{
    alert('Please Enter Valid UserName or Project Name');
  } */
);
}


showPie(){
  this.PieChart = new Chart('pieChart', {
    type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:['Open issues', 'Closed Issues'],
      datasets:[{
        label:'Issues',
        data:[
          this.project_issue.open_issues,
          this.closed_issue.total_count
          
        ],
       
        backgroundColor:[
      
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000'
      }]
    },
    options:{
      title:{
        display:true,
        text:'Open and Closed Issues',
        fontSize:25
      },
      responsive:false,
      display:true,
    
    }
  });
}

  
}
