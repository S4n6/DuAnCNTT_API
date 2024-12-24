import { Injectable } from '@nestjs/common';
import { Comment, Post } from './forum.schema';
import { db } from './firebaseAdmin.config';

@Injectable()
export class ForumService {
  private postsRef = db.ref('posts');

  async createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<string> {
    const newPostRef = this.postsRef.push();
    await newPostRef.set({
      ...post,
      createdAt: Date.now(),
    });
    return newPostRef.key;
  }

  async getPosts(): Promise<Post[]> {
    const snapshot = await this.postsRef.once('value');
    const posts: Post[] = [];
    snapshot.forEach((child) => {
      posts.push({ id: child.key, ...child.val() });
    });
    return posts;
  }

  async addComment(
    postId: string,
    comment: Omit<Comment, 'id' | 'createdAt'>,
  ): Promise<string> {
    const commentsRef = this.postsRef.child(postId).child('comments');
    const newCommentRef = commentsRef.push();
    await newCommentRef.set({
      ...comment,
      createdAt: Date.now(),
    });
    return newCommentRef.key;
  }

  async addReply(
    postId: string,
    commentId: string,
    reply: Omit<Comment, 'id' | 'createdAt'>,
  ): Promise<string> {
    const repliesRef = this.postsRef
      .child(postId)
      .child('comments')
      .child(commentId)
      .child('replies');
    const newReplyRef = repliesRef.push();
    await newReplyRef.set({
      ...reply,
      createdAt: Date.now(),
    });
    return newReplyRef.key;
  }

  async getComments(postId: string): Promise<Comment[]> {
    const snapshot = await this.postsRef
      .child(postId)
      .child('comments')
      .once('value');
    const comments: Comment[] = [];
    snapshot.forEach((child) => {
      comments.push({ id: child.key, ...child.val() });
    });
    return comments;
  }
}
