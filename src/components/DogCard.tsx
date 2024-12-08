import type { DogBreed } from '../types';

interface DogCardProps {
  breed: DogBreed;
}

export function DogCard({ breed }: DogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={breed.imageUrl}
        alt={breed.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{breed.name}</h3>
        <p className="mt-2 text-gray-600">{breed.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {breed.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}