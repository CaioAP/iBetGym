import Email from "../src/domain/entity/Email";

test('Must create a valid email', function () {
    const email = new Email('teste@gmail.com');
    expect(email.getValue()).toBe('teste@gmail.com');
});

test('Must throw an error if email invalid', function () {
    expect(() => new Email('teste@gmail')).toThrow(new Error('Invalid email'));
});