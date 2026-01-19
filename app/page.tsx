"use client";

import { useState } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, useAccount } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  initialChain: sepolia,
  ssr: true, // If your dApp uses server side rendering (SSR)
});

import * as Counter from '@/src/generated';

const queryClient = new QueryClient();

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwitchChain } from 'wagmi';

function CounterComponent() {
  const { isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const [increaseX, setIncreaseX] = useState('');
  const [increaseY, setIncreaseY] = useState('');
  const [swapAmount, setSwapAmount] = useState('');

  const { data: counter, isLoading: loading, refetch } = Counter.useReadCounterGetReserves();

  const { writeContract: addLiquidity } = Counter.useWriteCounterAdd();
  const { writeContract: swapXForY } = Counter.useWriteCounterSwapXForY();
  const { writeContract: swapYForX } = Counter.useWriteCounterSwapYForX();

  const handleIncrease = () => {
    addLiquidity(
      { args: [BigInt(increaseX), BigInt(increaseY)] }
    );
  };

  const handleSwapXForY = () => {
    swapXForY({ args: [BigInt(swapAmount || '1')] });
  };

  const handleSwapYForX = () => {
    swapYForX({ args: [BigInt(swapAmount || '1')] });
  }

  return (
    <div>
      {isConnected && (
        <div>
          <h1>Current Reserves</h1>
          <p>X: {counter?.[0]?.toString() || '0'}</p>
          <p>Y: {counter?.[1]?.toString() || '0'}</p>

          <h1>Add X</h1>
          <input
            type="number"
            value={increaseX}
            onChange={(e) => setIncreaseX(e.target.value)}
            placeholder="Amount"
          />

          <h1>Add Y</h1>
          <input
            type="number"
            value={increaseY}
            onChange={(e) => setIncreaseY(e.target.value)}
            placeholder="Amount"
          />

          <button onClick={handleIncrease}>Add Liquidity</button>

          <h1>Swap Tokens</h1>
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="Input Amount"
          />
          <button onClick={handleSwapXForY} style={{ marginRight: '10px' }}>Input X</button>
          <button onClick={handleSwapYForX}>Input Y</button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
          <CounterComponent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
