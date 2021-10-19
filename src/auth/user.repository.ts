import { ConflictException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');
    async SignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, email } = authCredentialsDto;

        const user = new User();
        user.email = email;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        const found = await this.findOne({ email: user.email });

        if (!found) {
            throw new ConflictException('email already registered');
        }

        await user.save();
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
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({ email });

        if (user && (await user.validatePassword(password))) {
            return user.email;
        } else {
            return null;
        }
    }
}
