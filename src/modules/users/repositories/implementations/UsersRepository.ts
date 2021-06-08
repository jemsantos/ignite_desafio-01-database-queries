import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    // receber ID do usuário
    // retornar os dados do usuário E os dados dos seus GAMES.
    return await this.repository.findOneOrFail({
      relations: ['games'],
      where: {
        id: user_id,
      }
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query

    // retornar lista dos usuários em orde ASC.
    return this.repository.query(
      'select * from users order by first_name ASC'
    );
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query

    // receber first_name e last_name
    // retornar o usuário //despresar tipo de caixa (usar LOWER)

    return this.repository.query(
      `select * from users where first_name ilike $1 and last_name ilike $2`,
      [first_name, last_name]
    );
  }

}
