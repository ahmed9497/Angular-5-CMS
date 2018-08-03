import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { single, multi,bubble } from './charts.data';

@Component({
  selector: 'app-inspection-chart',
  templateUrl: './inspection-chart.component.html',
  styleUrls: ['./inspection-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InspectionChartComponent implements OnInit {

    public single: any[];
    public multi: any[];

    public showXAxis = true;
    public showYAxis = true;
    public gradient = false;
    public showLegend = false;
    public showXAxisLabel = true;
    public xAxisLabel = 'Customer name';
    public showYAxisLabel = true;
    public yAxisLabel = 'Inspection';
    public colorScheme = {
        domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
    };

  constructor() {
      Object.assign(this, {single, multi,bubble});
  }

  ngOnInit() {
  }

    public onSelect(event) {
        console.log(event);
    }

}
