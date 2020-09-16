import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  postId: string;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    text: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setPost();
  }

  async setPost(): Promise<void> {
    this.postId = this.route.snapshot.params.id;
    const post = await this.postService.getById(this.postId);
    console.log('[UPDATE POST] post value', post.data());
    this.form.setValue(post.data());
  }

  async updatePost(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.postService.update(this.postId, this.form.value);
      console.log('[UPDATE POST] new value: ', this.form.value);
      this.showSuccessOperationMessage('post/updated');
    } catch (e) {
      console.log('[POST COMPONENT] error code: ', e.code);
      this.showErrorOperationMessage(e.code);
    }
  }

  showSuccessOperationMessage(code: string): void {
    const messages = {
      'post/updated': 'Post actualizado con exito',
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
