import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    text: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  async createPost(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const post = await this.postService.create(this.form.value);
      console.log('[POST COMPONENT] post: ', post.id);
      this.showSuccessOperationMessage('created');
      this.form.reset();
    } catch (e) {
      console.log('[POST COMPONENT] error code: ', e.code);
      this.showErrorOperationMessage(e.code);
    }
  }

  showSuccessOperationMessage(code: string): void {
    const messages = {
      created: 'Post creado con exito!',
      updated: 'Post actualizado con exito',
    };

    Swal.fire(
      'Éxito!',
      messages[code],
      'success'
    );
  }

  showErrorOperationMessage(code: string): void {
    const errorMessages = {
      default: 'Ocurrio un error! intenta nuevamente.'
    };

    Swal.fire(
      'Error!',
      errorMessages[code] || errorMessages.default,
      'error'
    );
  }
}
