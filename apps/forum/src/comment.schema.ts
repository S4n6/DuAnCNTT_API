import { Schema, Document, model, ObjectId } from 'mongoose';

export interface CommentDocument extends Document {
  content: string;
  authorId: string;
  createdAt: Date;
  postId?: ObjectId;
  replies?: CommentDocument[];
}

export const CommentSchema = new Schema<CommentDocument>({
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const CommentModel = model<CommentDocument>('Comment', CommentSchema);
