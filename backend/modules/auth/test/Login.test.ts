import UserRepository from "../src/application/repository/UserRepository";
import Login from "../src/application/usecase/Login";
import User from "../src/domain/entity/User";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjgwMDE1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.ln383kLW9ax5Hu3SjvDT9bkmdVoUQ0Ylm98VwKBaTtE';

test('Must log in a user', async function () {
    const users: any = {
        'joao@gmail.com': await User.create(
            'João', 
            'joao@gmail.com', 
            'abc123', 
            new Date('2023-03-28T12:00:00')
        )
    };
    const userRepository: UserRepository = {
        async save (user: User): Promise<void> {
            users[user.email.getValue()] = user;
        },
        async get(email: string): Promise<User> {
            return users[email];
        }
    }
    const login = new Login(userRepository);
    const input = {
        email: 'joao@gmail.com',
        password: 'abc123',
        date: new Date('2023-03-28T12:00:00'),
    }
    const output = await login.execute(input);
    expect(output.token).toBe(TOKEN);
});

test('Must throw error if password is invalid', async function () {
    const users: any = {
        'joao@gmail.com': await User.create(
            'João', 
            'joao@gmail.com', 
            'abc123', 
            new Date('2023-03-28T12:00:00')
        )
    };
    const userRepository: UserRepository = {
        async save (user: User): Promise<void> {
            users[user.email.getValue()] = user;
        },
        async get(email: string): Promise<User> {
            return users[email];
        }
    }
    const login = new Login(userRepository);
    const input = {
        email: 'joao@gmail.com',
        password: 'cba321',
        date: new Date('2023-03-28T12:00:00'),
    }
    expect(async () => await login.execute(input))
        .rejects
        .toThrow(new Error('Invalid password'));
});

test('Must throw error if user not found', async function () {
    const users: any = {};
    const userRepository: UserRepository = {
        async save (user: User): Promise<void> {
            users[user.email.getValue()] = user;
        },
        async get(email: string): Promise<User> {
            return users[email];
        }
    }
    const login = new Login(userRepository);
    const input = {
        email: 'joao@gmail.com',
        password: 'abc123',
        date: new Date('2023-03-28T12:00:00'),
    }
    expect(async () => await login.execute(input))
        .rejects
        .toThrow(new Error('User not found'));
});