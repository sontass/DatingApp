import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),

    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  exports: [
    BsDropdownModule,
    TabsModule,
    ToastrModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule,
    ButtonsModule,
    PaginationModule,
    TimeagoModule

  ]
})
export class SharedModule { }
