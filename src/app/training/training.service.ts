import { Exercise } from './exercise.model';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs'
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>()
    availableExercises : Exercise[] = []
    runningExercise : Exercise
    exercisesChanged = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()
    fbSubs : Subscription[] = []

    constructor(private db : AngularFirestore, private uiService : UIService) {}

    fetchAvailabeExercises() {
        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
        return docArray.map(doc => {
            return {
            id : doc.payload.doc['id'],
            name : doc.payload.doc.data()['name'],
            duration : doc.payload.doc.data()['duration'],
            calories : doc.payload.doc.data()['calories'],
            }
        })
        // throw(new Error())
        }).subscribe((exercises : Exercise[]) =>{
            this.availableExercises = exercises
            this.exercisesChanged.next([...this.availableExercises])
        }, error => {
            this.uiService.loadingStateChanged.next(false)
            this.uiService.showSnackbar(
            'Something went wrong ! Check your connectivity and Try again later !',
            null, 
            3000)
            this.exercisesChanged.next(null)
        }))
    }

    startExercise(selectedId : string) {
        this.runningExercise = this.availableExercises.find( ex => {
            return ex.id == selectedId
        })
        this.exerciseChanged.next({...this.runningExercise})
    }

    getRunningExercise(){
        return {...this.runningExercise}
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,    
            date : new Date(), 
            state : 'completed'
        })
        this.runningExercise = null
        this.exerciseChanged .next(null) 
    }

    cancelExercise(progress : number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration : this.runningExercise.duration * (progress/100),
            calories : this.runningExercise.calories * (progress/100),    
            date : new Date(), 
            state : 'cancelled'
        })
        this.runningExercise = null
        this.exerciseChanged .next(null) 
    }
    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe( (exercises:Exercise[]) => {
            this.finishedExercisesChanged.next(exercises)
        }))
    }

    private addDataToDatabase(exercise : Exercise) {
        this.db.collection('finishedExercises').add(exercise)
    }

    cancelSubscriptions() {
        this.fbSubs.forEach( sub => sub.unsubscribe())
    }

}