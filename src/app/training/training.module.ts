import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

@NgModule({
    declarations : [
        TrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        StopTrainingComponent
    ],
    imports : [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        AngularFirestoreModule,
        TrainingRoutingModule
    ],
    exports : [],
   entryComponents:[StopTrainingComponent]

})
export class TrainingModule {}

