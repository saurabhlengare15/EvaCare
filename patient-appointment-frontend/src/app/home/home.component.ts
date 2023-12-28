import { Component } from '@angular/core';
import { DoctorserviceService } from '../services/doctorservice.service';
import { AppointmentserviceService } from '../services/appointmentservice.service';
import * as echarts from 'echarts';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _doctorservice:DoctorserviceService, private _appointmentservice:AppointmentserviceService, private _patientservice:PatientService, private _loginservice:LoginService) { }
  doctorCount!:number;
  appointmentCount!:number;
  patientName!:string;

  ngOnInit(): void {

    this._patientservice.getPatientByUsername(this._loginservice.getPatient().username).subscribe(result=>{
      this.patientName = result.name;
      console.log("result",result);

      console.log("patient",this.patientName);
    this._appointmentservice.getAppointmentCountByPatientName(this.patientName).subscribe(result=>{
      this.appointmentCount = result;
    })
    });

    //for doctor count
    this._doctorservice.getDoctorsCount().subscribe(result=>{
      this.doctorCount = result;
      // console.log(this.doctorCount);
    });

    // console.log("patient",this.patientName);
    // this._appointmentservice.getAppointmentCountByPatientName("Jill Morgan").subscribe(result=>{
    //   this.appointmentCount = result;
    // })


    //for 
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('icon-doctors')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ["#fff"],
      xAxis: [{
        type: 'category',
        axisLabel:{
          color:"rgba(255,255,255,1)"
        },
        name:"Days of Week",
        nameLocation:"middle",
        nameTextStyle:{color:"rgba(255,255,255,1)", verticalAlign:"top",lineHeight:60,fontSize:14},
        axisLine:{show:true,lineStyle:{color:"rgba(255,255,255,1)"}},
        data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        // data: [{
        //   value: 'Mon',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Tue',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Wed',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Thu',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Fri',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Sat',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }, {
        //   value: 'Sun',
        //   textStyle: {
        //     color: "rgba(255,255,255,1)"
        //   }
        // }]
      }],
      yAxis: [{
        type: 'value',
        nameTextStyle: {
          color: "rgba(255,255,255,1)"
        }, axisLabel: {
          color: "rgba(255,255,255,1)",
        },
        axisPointer:{
          show:true
        }
      }],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 760],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);

    //for book apt
    var chartDom = document.getElementById('icon-book-apt')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ["#fff"],
      xAxis: [{
        type: 'category',
        axisLabel:{
          color:"rgba(255,255,255,1)"
        },
        name:"Days of Week",
        nameLocation:"middle",
        nameTextStyle:{color:"rgba(255,255,255,1)", verticalAlign:"top",lineHeight:60,fontSize:14},
        axisLine:{show:true,lineStyle:{color:"rgba(255,255,255,1)"}},
        data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      }],
      yAxis: [{
        type: 'value',
        nameTextStyle: {
          color: "rgba(255,255,255,1)"
        }, axisLabel: {
          color: "rgba(255,255,255,1)",
        },
        axisPointer:{
          show:true
        }
      }],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 760],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);

    //for total apt
    var chartDom = document.getElementById('icon-total-apt')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ["#fff"],
      xAxis: [{
        type: 'category',
        axisLabel:{
          color:"rgba(255,255,255,1)"
        },
        name:"Days of Week",
        nameLocation:"middle",
        nameTextStyle:{color:"rgba(255,255,255,1)", verticalAlign:"top",lineHeight:60,fontSize:14},
        axisLine:{show:true,lineStyle:{color:"rgba(255,255,255,1)"}},
        data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      }],
      yAxis: [{
        type: 'value',
        nameTextStyle: {
          color: "rgba(255,255,255,1)"
        }, axisLabel: {
          color: "rgba(255,255,255,1)",
        },
        axisPointer:{
          show:true
        }
      }],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 760],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);
  }
}

