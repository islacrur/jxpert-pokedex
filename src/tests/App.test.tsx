import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";
import { App } from "../App";

// 🔧 Utilidad para crear mocks de pokémon
function createMockPokemon({
  id,
  name,
  spriteUrl = "https://someimage.url/",
  types = ["grass", "poison"],
  stats = [
    { name: "hp", base_stat: 45 },
    { name: "attack", base_stat: 49 },
    { name: "defense", base_stat: 49 },
    { name: "special-attack", base_stat: 65 },
    { name: "special-defense", base_stat: 65 },
    { name: "speed", base_stat: 45 },
  ],
}) {
  return {
    id,
    name,
    sprites: {
      other: {
        "official-artwork": {
          front_default: spriteUrl,
        },
      },
    },
    stats: stats.map((stat) => ({
      base_stat: stat.base_stat,
      stat: { name: stat.name },
    })),
    types: types.map((type) => ({ type: { name: type } })),
  };
}

// 🔁 Utilidad para configurar el mock globalThis.fetch
function setupMockFetch(pokemonList, mockFetch) {
  // Mock inicial: lista de resultados
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: pokemonList.map((p) => ({
        name: p.name,
        url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
      })),
    }),
  });

  // Mocks siguientes: detalle por cada pokémon
  for (const p of pokemonList) {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createMockPokemon(p),
    });
  }
}

describe("App Component", () => {
  beforeEach(() => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
    setupMockFetch(
      [
        {
          id: 1,
          name: "bulbasaur",
          stats: [
            { name: "hp", base_stat: 40 },
            { name: "attack", base_stat: 40 },
            { name: "defense", base_stat: 40 },
            { name: "special-attack", base_stat: 40 },
            { name: "special-defense", base_stat: 40 },
            { name: "speed", base_stat: 40 },
          ],
        },
        {
          id: 2,
          name: "ivysaur",
          stats: [
            { name: "hp", base_stat: 99 },
            { name: "attack", base_stat: 99 },
            { name: "defense", base_stat: 99 },
            { name: "special-attack", base_stat: 99 },
            { name: "special-defense", base_stat: 99 },
            { name: "speed", base_stat: 99 },
          ],
        },
      ],
      mockFetch,
    );
  });

  it("debería renderizar un nombre desde la API simulada", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });
  });

  it("debería renderizar el filtrado por nombre", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search a Pokémon...");
    await userEvent.type(input, "ivysaur");

    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });

  it("debería filtrar según la región", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
    setupMockFetch([{ id: 1, name: "bulbasaur" }], mockFetch);
    setupMockFetch([{ id: 3, name: "charizard" }], mockFetch);

    render(<App />);

    expect(await screen.findByText("bulbasaur")).toBeVisible();

    const combobox = screen.getByRole("combobox", { name: /select reg/i });
    await userEvent.click(combobox);

    const opcion = await screen.findByText(/alola/i);
    await userEvent.click(opcion);

    // Aquí podrías agregar un nuevo setupMockFetch para mockear la nueva región si hace un nuevo fetch
    // expect(...) lo que esperas ver luego de aplicar el filtro
    expect(await screen.findByText("charizard")).toBeVisible();
  });

  it("debería renderizar el skeleton antes de las cards con la info", async () => {
    render(<App />);
    const skeleton = await screen.findAllByTestId("skeleton");
    expect(skeleton).toHaveLength(6);
  });

  it("debería ordenar las cartas por distintas características", async () => {
    render(<App />);

    const combobox = screen.getByRole("combobox", { name: /sort by/i });
    await userEvent.click(combobox);
    const option = screen.getAllByLabelText("Health points");
    await userEvent.click(option[0]);
    const bulbasaur = screen.getByText("bulbasaur");
    const ivysaur = screen.getByText("ivysaur");

    expect(ivysaur.compareDocumentPosition(bulbasaur)).toBe(4);
  });
});
