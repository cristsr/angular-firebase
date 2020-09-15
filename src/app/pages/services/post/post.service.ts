import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Post {
  title: string;
  description: string;
  category: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  async create(post: Post): Promise<any> {
    return await this.firestore.collection<Post>('post').add(post);
  }
}
