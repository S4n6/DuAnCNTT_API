import { Schema, Document, model } from 'mongoose';
import { CommentDocument, CommentSchema } from './comment.schema';

export interface PostDocument extends Document {
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  comments?: CommentDocument[];
  isVerify?: boolean;
  avatar?: string;
  fullName?: string;
}

export const PostSchema = new Schema<PostDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avatar: { type: String },
  fullName: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  isVerify: { type: Boolean, default: false },
});

export const PostModel = model<PostDocument>('Post', PostSchema);
