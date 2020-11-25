import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs'

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,OnDestroy, AfterViewInit{

  displayedColumns = ['date', 'name','calories','duration','state']
  dataSource = new MatTableDataSource<Exercise>()
  private exchangedSubscription : Subscription

  @ViewChild(MatSort) sort : MatSort
  @ViewChild(MatPaginator) paginator : MatPaginator

  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.exchangedSubscription = this.trainingService.finishedExercisesChanged.subscribe( (exercises) => {
      this.dataSource.data = exercises
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngOnDestroy() {
    if(this.exchangedSubscription){
      this.exchangedSubscription.unsubscribe()
    }
  }

}
