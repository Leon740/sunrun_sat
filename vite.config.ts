import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@/assets': path.resolve(__dirname, 'src/assets/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/components/main': path.resolve(__dirname, 'src/components/main'),
      '@/constants': path.resolve(__dirname, 'src/constants/'),
      '@/contexts': path.resolve(__dirname, 'src/contexts/'),
      '@/hooks': path.resolve(__dirname, 'src/hooks/'),
      '@/types': path.resolve(__dirname, 'src/types/')
    }
  }
});
