Configuración de tests:

1. Instalar dependencias: (si no estás usando yarn, usa npm)

yarn add @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom vitest 

2. Configurar vite.config.ts:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    exclude: [
      ...configDefaults.exclude,
    ],
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx'
    ]
  },
});

```

3. Crear setup.ts:

```ts
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

vi.mock('global', () => ({
  fetch: vi.fn()
}));

```

4. Crear archivo de test en /tests/App.test.tsx:

```tsx
import {  describe, expect, test } from 'vitest';

describe('App Component', () => {
  test('debería verse el nombre del pokemon cuando se cargan los datos', async () => {
   
  });
});

```

