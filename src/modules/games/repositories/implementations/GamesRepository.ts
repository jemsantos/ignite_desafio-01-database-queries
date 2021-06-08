import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder

    // receber parte do título de um jogo OU título inteiro
    // retornar um OU mais jogos que deram mathc
    // ignorar caixa
    // usar o ILIKE
    return this.repository.createQueryBuilder()
      .where('title ilike :title', { title: `%${param}%` })
      .getMany();

  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query

    // retornar total de games
    return this.repository.query('select count(id) from games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder

    // receber o ID de um game
    // retornar lista dos user que possuem o game

    return this.repository.createQueryBuilder()
      .relation(Game, "users").of(id).loadMany();
  }
}
