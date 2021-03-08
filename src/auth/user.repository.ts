import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async SignUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = AuthCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            const err = error.code; // Adicionar o error code nos logs de uma tabela no MongoDB
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            }
        }
    }

    private async hashPassword(
        password: string,
        salt: string
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto
    ): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            return null;
        }
    }
}
