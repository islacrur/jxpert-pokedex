import { render, screen, waitFor } from '@testing-library/react';
import {  describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { App } from '../App';


describe('App Component', () => {
  beforeEach(() => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    // Primer fetch: lista de pokémon
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
        ],
      }),
    });

    // Segundo fetch: detalle del pokémon
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'bulbasaur',
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://someimage.url/',
            },
          },
        },
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
          { base_stat: 49, stat: { name: 'defense' } },
          { base_stat: 65, stat: { name: 'special-attack' } },
          { base_stat: 65, stat: { name: 'special-defense' } },
          { base_stat: 45, stat: { name: 'speed' } },
        ],
        types: [
          { type: { name: 'grass' } },
          { type: { name: 'poison' } },
        ],
      }),
    });
  

  mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 2,
        name: 'ivysaur',
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://someimage.url/',
            },
          },
        },
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
          { base_stat: 49, stat: { name: 'defense' } },
          { base_stat: 65, stat: { name: 'special-attack' } },
          { base_stat: 65, stat: { name: 'special-defense' } },
          { base_stat: 45, stat: { name: 'speed' } },
        ],
        types: [
          { type: { name: 'grass' } },
          { type: { name: 'poison' } },
        ],
      }),
    });
  });

  it('debería renderizar un nombre desde la API simulada', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });
  });

  it('debería renderizar el filtrado por nombre', async () => {
    render(<App />);
    const placeholder = screen.getByPlaceholderText('Search a Pokémon...')
    screen.debug(placeholder);
    await userEvent.type(placeholder, 'ivysaur')
  //expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument(); 
      expect(true).toBe(false)
     });
//not to be in document
});