import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';
import { ProgressEnum } from 'src/app/share/enum/ProgressEnum';
import { CategoryEnum } from 'src/app/share/enum/CategoryEnum';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild('categoryChartCanvas') categoryChartCanvas!: ElementRef;
  @ViewChild('progressChartCanvas') progressChartCanvas!: ElementRef;

  private categoryColors: string[] = [
    '#ff6384',   // Category 1
    '#36a2eb',   // Category 2
    '#ffce56',   // Category 3
    '#4bc0c0',   // Category 4
    '#9966cc',   // Category 5
    '#ff8c00'    // Category 6
  ];

  constructor(private goalService: GoalService) { }

  ngOnInit() {
    this.goalService.getAllGoals().subscribe((goals: IGoalModelAngular[]) => {
      this.createCategoryChart(goals);
      this.createProgressChart(goals);
    });
  }

  createCategoryChart(goals: IGoalModelAngular[]) {
    const chartData = this.getChartDataByCategory(goals);
    const chartOptions = {
      responsive: true,
      aspectRatio: 3.5,
      plugins: {
        legend: {
          display: true,
          labels: {
            filter: (legendItem: { index: number; }, chartData: any) => legendItem.index !== 0  // Filter out the first label
          } 
        }
      }
    };
    this.createPieChart(this.categoryChartCanvas.nativeElement, chartData.labels, chartData.data, this.categoryColors, chartOptions);
  }

  createProgressChart(goals: IGoalModelAngular[]) {
    const chartData = this.getChartDataByProgress(goals);
    const progressColors = [
      '#ff6384',   // Not Started
      '#36a2eb',   // In Progress
      '#4bc0c0'   // Completed
    ];
    const chartOptions = {
      responsive: true,
      aspectRatio: 3.5,
      plugins: {
        legend: {
          display: true, 
        }
      }
    };

    this.createPieChart(this.progressChartCanvas.nativeElement, chartData.labels, chartData.data, progressColors, chartOptions);
  }

  createPieChart(canvas: HTMLCanvasElement, labels: string[], data: number[], backgroundColor: string[], options: any): Chart<keyof ChartTypeRegistry, (number | null)[]> {
    const chartConfig: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }]
      },
      options: options
    };

    return new Chart(canvas, chartConfig as any);
  }


  getChartDataByCategory(goals: IGoalModelAngular[]): { labels: string[], data: number[], backgroundColor: string[] } {
    const categories: CategoryEnum[] = Object.values(CategoryEnum);
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];

    categories.forEach((category: CategoryEnum) => {
      const goalsInCategory = goals.filter(goal => goal.category === category);
      const count = goalsInCategory.length;

      labels.push(category);
      data.push(count);
      backgroundColor.push(...this.categoryColors.slice(0, labels.length));
    });

    return { labels, data, backgroundColor };
  }

  getChartDataByProgress(goals: IGoalModelAngular[]): { labels: string[], data: number[], backgroundColor: string[] } {
    const progressValues: string[] = Object.values(ProgressEnum);
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];

    progressValues.forEach((progress: string) => {
      const goalsInProgress = goals.filter(goal => goal.progress === progress);
      const count = goalsInProgress.length;

      labels.push(progress);
      data.push(count);
    });

    return { labels, data, backgroundColor };
  }

}
