import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertUsers();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.userRepository.deleteMany();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(user as any);
    });

    const dbUsers = await this.userRepository.insertMany(seedUsers);

    return 'Seed executed';
  }
}
