import { UserModel } from '../model/User.js';

export default class UserModule {
    async create(data) {
        try {
            const newUser = new UserModel(data);

            return newUser.save();
        } catch (e) {
            console.log(e);
        }
    }

    async findByEmail(email) {
        try {

            console.log(email);
            const user = await UserModel.findOne({ email: email }).select('-__v');

            console.log('user', user);

            if (!user) {
                return null;
            }

            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async findById(id) {
        try {
            const user = await UserModel.findById(id).select('-__v');

            console.log(user);
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}
