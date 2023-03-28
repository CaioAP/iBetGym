import UserRepository from "../src/application/repository/UserRepository";
import Login from "../src/application/usecase/Login";
import Signup from "../src/application/usecase/Signup";
import User from "../src/domain/entity/User";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjgwMDE1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.ln383kLW9ax5Hu3SjvDT9bkmdVoUQ0Ylm98VwKBaTtE';

test('Must create a new user account', async function () {
    const users: any = {};
    const userRepository: UserRepository = {
        async save (user: User): Promise<void> {
            users[user.email.getValue()] = user;
        },
        async get(email: string): Promise<User> {
            return users[email];
        }
    }
    const signup = new Signup(userRepository);
    const input = {
        name: 'João',
        email: 'joao@gmail.com',
        password: 'abc123',
        date: new Date('2023-03-28T12:00:00'),
    };
    await signup.execute(input);
    const login = new Login(userRepository);
    const output = await login.execute(input);
    expect(output.token).toBe(TOKEN);
});