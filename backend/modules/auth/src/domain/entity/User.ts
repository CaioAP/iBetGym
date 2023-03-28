import Email from "./Email";
import Password from "./Password";

export default class User {

    constructor (readonly name: string, readonly email: Email, readonly pwd: Password, date: Date) {}

    static async create (name: string, email: string, password: string, date: Date) {
        return new User(name, new Email(email), await Password.create(password), date);
    }

    static async buildExistingUser (name: string, email: string, hash: string, salt: string, date: Date) {
        return new User(name, new Email(email), new Password(hash, salt), date);
    }

    async validatePassword (password: string) {
        return this.pwd.validate(password);
    }
}