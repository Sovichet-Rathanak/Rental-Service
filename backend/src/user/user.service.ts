import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { createUserDTO } from './dto/create-user.dto';
import { UpdateUserDto  } from './dto/update-user.dto';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { MinioService } from 'nestjs-minio-client';
import { UserRole } from './user_role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        private readonly minioClient: MinioService,
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

    async uploadPfp(userId: string, file: Express.Multer.File) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found");

        const bucket = 'romdoul';
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${fileExtension}`;
        const ogFile = "pfp_original/" + filename;
        const thumbnailFile = `pfp_thumbnail/thumb-${filename}`;

        await this.minioClient.client.putObject(
            bucket,
            ogFile,
            file.buffer,
            file.buffer.length,
            {
                "Content-Type": file.mimetype
            }
        );

        const resizedImageBuffer = await sharp(file.buffer).resize({ width: 300, height: 240, withoutEnlargement: true }).toBuffer();
        await this.minioClient.client.putObject(
            bucket,
            thumbnailFile,
            resizedImageBuffer,
            resizedImageBuffer.length,
            {
                'Content-Type': file.mimetype
            }
        )

        // If user already have a pfp, clean it from minio
        if (user.pfp_original_url) {
            await this.minioClient.client.removeObject(bucket, user.pfp_original_url);
        }
        if (user.pfp_thumbnail_url) {
            await this.minioClient.client.removeObject(bucket, user.pfp_thumbnail_url);
        }

        user.pfp_original_url = ogFile;
        user.pfp_thumbnail_url = thumbnailFile;
        await this.userRepo.save(user);

        return {
            pfp_original_url: ogFile,
            pfp_thumbnail_url: thumbnailFile
        }
    }

    async switchUserRole(userId: string, newRole: UserRole): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        user.role = newRole
        return await this.userRepo.save(user);
    }

    async deleteUser(userId: string): Promise<string> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        await this.userRepo.remove(user);
        return "User Deleted Successfuly";
    }
async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updateData);

    return this.userRepo.save(user);
}
}


