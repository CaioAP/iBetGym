import Password from "../src/domain/entity/Password";

const PWD_ENCRYPTED = 'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2';
const PWD_SALT = 'salt';

test('Must create a password', async function () {
    const password = await Password.create('abc123', 'salt');
    expect(password.value).toBe(PWD_ENCRYPTED);
    expect(password.salt).toBe(PWD_SALT);
});

test('Must validate a password', async function () {
    const password = new Password(PWD_ENCRYPTED, PWD_SALT);
    const isValid = await password.validate('abc123');
    expect(isValid).toBeTruthy();
})