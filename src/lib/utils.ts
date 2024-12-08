import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchComments(): Promise<Comment[]> {
  const response = await fetch('/.netlify/functions/get-comments');
  return response.json();
}

export async function postComment(name: string, message: string): Promise<void> {
  await fetch('/.netlify/functions/post-comment', {
    method: 'POST',
    body: JSON.stringify({ name, message }),
  });
}