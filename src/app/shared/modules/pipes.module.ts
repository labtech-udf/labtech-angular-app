import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TruncatePipe } from '../Utils/truncate.pipe';

@NgModule({
  declarations: [TruncatePipe],
  imports: [CommonModule],
  exports: [TruncatePipe]
})
export class Pipemodules { }
