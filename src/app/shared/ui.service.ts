import { Injectable } from '@angular/core'
import { InjectSetupWrapper } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subject } from 'rxjs'

@Injectable()

export class UIService {
    loadingStateChanged = new Subject<boolean>()

    constructor( private snackbar : MatSnackBar) {}

    showSnackbar(message, action, duration) {
        this.snackbar.open(message, action , {
            duration : duration
        }) 
    }
}