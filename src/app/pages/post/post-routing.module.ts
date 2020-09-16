import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: 'show',
        component: ShowPostComponent
      },
      {
        path: 'create',
        component: CreatePostComponent,
      },
      {
        path: 'update/:id',
        component: UpdatePostComponent
      },
      {
        path: '',
        redirectTo: 'show',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
