import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0
  timer:number
  exercise = ''
  exerciseURL = 'https://flabfix.com/wp-content/uploads/2019/05/Side-Crunch-Leg-Raise.gif'
  constructor( private dialog : MatDialog, private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer()
    
    
  }
  
  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000
    this.exercise = this.trainingService.getRunningExercise().name
    if(this.exercise == 'Bird Dogs'){this.exerciseURL = 'https://i.pinimg.com/originals/17/e6/42/17e642120d1470540aed8bb765d10727.gif'}
    else if(this.exercise == 'Split Squat Press'){this.exerciseURL = 'https://i.pinimg.com/originals/d0/54/1b/d0541bb653319a56a5d876e3eabb319a.gif'}
    else if(this.exercise == 'Ankle Tap Push Ups'){this.exerciseURL = 'https://i.pinimg.com/originals/6a/b6/c3/6ab6c3120fc3b1fc83151e26f6d49216.gif'}
    else if(this.exercise == 'Sumo Side Bends'){this.exerciseURL = 'https://i.pinimg.com/originals/10/4c/5f/104c5f7ea76d834b4a7c730de66cb580.gif'}
    else{this.exerciseURL = 'https://i.pinimg.com/originals/75/90/9d/75909d3c7bc61a35eef41f129edae1b3.gif'}

    console.log(this.exercise)


    this.timer = setInterval( () => {
      this.progress = this.progress + 1
      if(this.progress >= 100){
        this.trainingService.completeExercise()
        clearInterval(this.timer)
      }
    }, step)

  }

  onStop(){
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data : {
        progress : this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingService.cancelExercise(this.progress)
      }
      else{
        this.startOrResumeTimer()
      }
    })
  }

}
