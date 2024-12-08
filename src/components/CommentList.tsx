import { format } from 'date-fns';
import type { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{comment.name}</h3>
            <time className="text-sm text-gray-500">
              {format(new Date(comment.createdAt), 'PPp')}
            </time>
          </div>
          <p className="mt-2 text-gray-700">{comment.message}</p>
        </div>
      ))}
    </div>
  );
}