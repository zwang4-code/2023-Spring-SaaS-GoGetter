import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{
  public chart: any;
  ngOnInit() {
    const chartData = [
      {
        label: 'Health',
        value: 20,
        backgroundColor: 'rgb(204, 204, 255)'
      },
      {
        label: 'Career',
        value: 30,
        backgroundColor: 'rgb(128, 0, 128)'
      },
      {
        label: 'School',
        value: 50,
        backgroundColor: 'rgb(173, 216, 224 )'
      }
    ];

    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: chartData.map(data => data.label),
        datasets: [{
          data: chartData.map(data => data.value),
          backgroundColor: chartData.map(data => data.backgroundColor)
        }]
      },
      options: {
        responsive: true,
        aspectRatio:3.5
      }
    });
  }

}
