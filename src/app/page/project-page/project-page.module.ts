import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote2uComponent } from './vote2u/vote2u.component';
import { ArtzologyComponent } from './artzology/artzology.component';
import { CameliaActiveComponent } from './camelia-active/camelia-active.component';
import { ProjectPageComponent } from './project-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToggleButtonComponent } from '../../shared/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    Vote2uComponent,
    ArtzologyComponent,
    CameliaActiveComponent,
  ],
  imports: [CommonModule, ToggleButtonComponent],
  exports: [ProjectPageComponent],
  providers: [provideAnimationsAsync()],
  bootstrap: [ProjectPageComponent],
})
export class ProjectPageModule {}
