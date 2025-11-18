import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class EthereumService {
  provider!: ethers.BrowserProvider;
  signer!: ethers.Signer;
  userAddress: string | null = null;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) throw new Error('MetaMask not found');

    this.provider = new ethers.BrowserProvider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    this.userAddress = await this.signer.getAddress();

    return this.userAddress;
  }
}
