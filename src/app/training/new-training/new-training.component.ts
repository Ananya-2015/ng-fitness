import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription} from 'rxjs';
import 'rxjs/add/operator/map'

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  exercises : Exercise[]
  exerciseSubscription : Subscription
  isLoading : boolean = true

  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.isLoading = false
        this.exercises = exercises}
    )
    this.trainingService.fetchAvailabeExercises()
  }

  onStartTraining(form : NgForm) { 
    this.trainingService.startExercise(form.value.exercise)

  }

  ngOnDestroy(){
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe()
    }
  }

  fetchExercises () {
    this.trainingService.fetchAvailabeExercises()
  }

}
