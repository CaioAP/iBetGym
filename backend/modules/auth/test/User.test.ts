import User from "../src/domain/entity/User"

const PWD_ENCRYPTED = 'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2';
const PWD_SALT = 'salt';

test('Must create a new user', async function () {
    const user = await User.create(
        'João', 
        'joao@gmail.com', 
        'abc123', 
        new Date('2023-03-28T12:00:00')
    );
    const isValidPwd = await user.validatePassword('abc123');
    expect(isValidPwd).toBeTruthy();
});

test('Must create a user from the database', async function () {
    const user = await User.buildExistingUser(
        'João',
        'joao@gmail.com',
        PWD_ENCRYPTED,
        PWD_SALT,
        new Date('2023-03-28T12:00:00')
    );
    const isValidPwd = await user.validatePassword('abc123');
    expect(isValidPwd).toBeTruthy();
});