import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  posts$ = this.postService.getAll();

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.posts$.subscribe(posts => console.log('[SHOW POST] posts', posts));
  }

  async eliminarPost(id: string): Promise<void> {
    try {
      await this.postService.delete(id);
      console.log('[SHOW POST] post deleted: ', id);
      this.showSuccessOperationMessage('post/delete');
    } catch (e) {
      console.log('[SHOW POST] error deleting', e);
    }
  }

  showSuccessOperationMessage(code): void {
    const messages = {
      'post/delete': 'Se ha eliminado el post correctamente'
    };

    Swal.fire('Exito!', messages[code], 'success');
  }
}
