import RPSAbi from '../../assets/RPSAbi.json';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { EthereumService } from './ethereum.service';

@Injectable({ providedIn: 'root' })
export class RpsService {
  private contractAddress = '0x429c37e4e662048cdd4df50b08cfcffb7d4b0009';
  private contractRead!: ethers.Contract;
  private contractWrite!: ethers.Contract;

  constructor(private eth: EthereumService) {}

  private getReadContract(): ethers.Contract {
    if (!this.contractRead) {
      this.contractRead = new ethers.Contract(this.contractAddress, RPSAbi, this.eth.provider);
    }
    return this.contractRead;
  }

  private getWriteContract(): ethers.Contract {
    if (!this.contractWrite) {
      this.contractWrite = new ethers.Contract(this.contractAddress, RPSAbi, this.eth.signer);
    }
    return this.contractWrite;
  }

  async getGamesCount(): Promise<number> {
    const contract = this.getReadContract();
    return Number(await contract['getGamesCount']());
  }

  async createGame(move: number, maxPlayers: number) {
    const contract = this.getWriteContract();
    const tx = await contract['createGame'](
      Number(move),
      Number(maxPlayers),
      { value: ethers.parseUnits('0.0001', 'ether') }
    );
    return await tx.wait();
  }


  async joinGame(gameId: number, move: number) {
    const contract = this.getWriteContract();
    const tx = await contract['joinGame'](gameId, move, { value: ethers.parseEther('0.0001') });
    return await tx.wait();
  }
  async getGame(gameId: number) {
    const contract = this.getReadContract();
    const game = await contract['getGame'](gameId);

    // Ethers.js v6 возвращает объект с именованными свойствами
    const players = game.players || game[0];          // players: address[]
    const betAmount = game.betAmount || game[1];      // uint256
    const maxPlayers = game.maxPlayers || game[2];    // uint8
    const finished = game.finished || game[3];        // bool
    const result = game.result || game[4];            // uint8

    return {
      players: Array.isArray(players) ? players : players.split(','), // Если вдруг приходит строка
      betAmount: Number(ethers.formatEther(betAmount)),               // в ETH
      maxPlayers,
      finished,
      result
    };
  }



  async getPlayerMove(gameId: number, player: string) {
    const contract = this.getReadContract();
    return await contract['getPlayerMove'](gameId, player);
  }
}
