import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostComponent } from './post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';

@NgModule({
  declarations: [
    PostComponent,
    ShowPostComponent,
    CreatePostComponent,
    UpdatePostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
