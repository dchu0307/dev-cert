import { defineConfig } from '@wagmi/cli';
import { react, hardhat } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    react(),
    hardhat({
      project: './',
      deployments: { 
        Counter: { 
          11155111: '0x71688a2868d6f2deaac942068462A1252CDCE6Df', 
        }, 
      }, 
    }),
  ],
})
