import { render, screen, waitFor } from '@testing-library/react';
import {  describe, expect, test } from 'vitest';
import { UserEvent } from '@testing-library/user-event';
import { App } from '../App';

/*describe('App Component', () => {
  test('debería verse el nombre del pokemon cuando se cargan los datos', async () => {
    const mockFetch = vi.fn();
        globalThis.fetch = mockFetch;
    
        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({
              results: [
                {
                  name: "bulbasaur",
                  url: "https://pokeapi.co/api/v2/pokemon/1/",
                },
              ]
            }),
          })
          
    
    render(<App />);
   const nombrePokemon = await screen.findByText('bulbasaur');

   expect(nombrePokemon).toBeInTheDocument();
  });
});*/

describe('App', () => {
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
  });

  it('debería renderizar Bulbasaur desde la API simulada', async () => {
    render(<App />);

    // Espera hasta que se muestre "bulbasaur"
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });
});