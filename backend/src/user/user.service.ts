import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { createUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { };

    async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    async createUser(createUserDTO: createUserDTO): Promise<User> {
        const user = this.userRepo.create(createUserDTO);
        const emailExist = await this.userRepo.findOne({ where: { email: createUserDTO.email } })

        if (emailExist) {
            throw new HttpException("Email is already in use", HttpStatus.BAD_REQUEST);
        }

        return this.userRepo.save(user);
    }

    async findUserByName(search: string): Promise<User[]> {
        const [part1, part2] = search.trim().split(/\s+/, 2); 

        if (part2) {
            return this.userRepo.find({
                where: [
                    { firstname: ILike(`%${part1}%`), lastname: ILike(`%${part2}%`) },
                    { firstname: ILike(`%${part2}%`), lastname: ILike(`%${part1}%`) }
                ]
            });
        } else {
            return this.userRepo.find({
                where: [
                    { firstname: ILike(`%${part1}%`) },
                    { lastname: ILike(`%${part1}%`) }
                ]
            });
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        if (!email) return null;

        console.log(email)

        return await this.userRepo.findOne({
            where: { email: email },
        });
    }
}
