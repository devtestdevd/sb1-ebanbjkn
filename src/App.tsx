import React, { useEffect, useState } from 'react';
import { HeartIcon, DogIcon } from 'lucide-react';
import { CommentForm } from './components/CommentForm';
import { CommentList } from './components/CommentList';
import { DogCard } from './components/DogCard';
import { dogBreeds } from './data/dogs';
import { fetchComments, postComment } from './lib/utils';
import type { Comment } from './types';

function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchComments();
      setComments(fetchedComments);
    };
    loadComments();
  }, []);

  const handleCommentSubmit = async (name: string, message: string) => {
    await postComment(name, message);
    const updatedComments = await fetchComments();
    setComments(updatedComments);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <DogIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">DogLovers Hub</h1>
          </div>
          <p className="mt-2 text-center text-blue-100">Celebrating our furry friends, one paw at a time</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <HeartIcon className="h-6 w-6 text-red-500 mr-2" />
            Featured Dog Breeds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogBreeds.map((breed) => (
              <DogCard key={breed.name} breed={breed} />
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Dog Story</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <CommentForm onSubmit={handleCommentSubmit} />
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Stories</h3>
              <CommentList comments={comments} />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 DogLovers Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;