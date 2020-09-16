import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Post {
  id: any;
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

  getAll(): Observable<Post[]> {
    return this.firestore.collection<Post>('post').valueChanges({idField: 'id'});
  }

  async getById(id: string): Promise<any> {
    return this.firestore.collection<Post>('post').doc(id).get().toPromise();
  }

  async update(id: string, post: Partial<Post>): Promise<void> {
    const postRef = this.firestore.collection('post').doc(id);
    return await postRef.update(post);
  }

  async delete(id: string): Promise<any> {
    return await this.firestore.collection('post').doc(id).delete();
  }
}
