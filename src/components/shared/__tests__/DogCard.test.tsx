import { render, screen } from '@testing-library/react';
import { DogCard } from '../DogCard';
import { DogCardViewModel } from '@/types/viewModels';

const mockDog: DogCardViewModel = {
  id: '123',
  name: 'Burek',
  breedName: 'Mieszaniec',
  size: 'medium',
  imageUrl: 'https://example.com/dog.jpg',
  matchPercentage: 85,
};

describe('DogCard', () => {
  it('should render dog information correctly', () => {
    render(<DogCard dog={mockDog} />);

    expect(screen.getByText('Burek')).toBeInTheDocument();
    expect(screen.getByText('Mieszaniec • medium')).toBeInTheDocument();
    expect(screen.getByText('Dopasowanie: 85%')).toBeInTheDocument();
  });

  it('should render image with correct attributes', () => {
    render(<DogCard dog={mockDog} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/dog.jpg');
    expect(image).toHaveAttribute('alt', 'Burek');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should render progress bar with correct width', () => {
    render(<DogCard dog={mockDog} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '85%' });
  });

  it('should link to correct dog details page', () => {
    render(<DogCard dog={mockDog} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dogs/123');
  });
});
