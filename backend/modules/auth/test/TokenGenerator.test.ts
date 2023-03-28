import TokenGenerator from "../src/domain/entity/TokenGenerator";
import User from "../src/domain/entity/User";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc5OTQ5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.RxJLrF6VmCpCJEKHV3wAxZwogM08EWl6p-fWIt4uS08';
const INVALID_TOKEN = 'eyJhbGciOiJIUzCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21IiwiaWF0IjoxNjc5OTQ5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.RxJLrF6VmCpCJEKHV3wAxZwogM08EWl6p-fWIt4uS08';

test('Must generate a user token', async function () {
    const user = await User.create(
        'João', 
        'joao@gmail.com', 
        'abc123', 
        new Date('2023-03-28T12:00:00')
    );
    const expiresIn = 1000000;
    const issueDate = new Date('2023-03-27 17:40:00');
    const tokenGenerator = new TokenGenerator('key');
    const token = tokenGenerator.generate(user, expiresIn, issueDate);
    expect(token).toBe(TOKEN);
});

test('Must validate a user token', function () {
    const token = TOKEN;
    const tokenGenrator = new TokenGenerator('key');
    const payload = tokenGenrator.verify(token);
    expect(payload).toBeDefined();
    expect(payload.email).toBe('joao@gmail.com');
});

test('Must try to validate a invalid token', function () {
    const invalidToken = INVALID_TOKEN;
    const tokenGenerator = new TokenGenerator('key');
    expect(() => tokenGenerator.verify(invalidToken)).toThrow(new Error('invalid token'));
})