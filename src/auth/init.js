import UserModule from '../module/UserModule.js';
import { signin } from './signin.js';
import { signup } from './signup.js';

const userModule = new UserModule();

export const initAuth = function (passport) {
  console.log('initAuth');
  passport.serializeUser(function (user, done) {
    console.log('serialize');
    console.log(`serializing user: ${user}`);
    console.log(null, user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    console.log('deserialize');

    await userModule
      .findById(id)
      .then((user) => {
        console.log(`deserializing user: ${user}`);
        done(false, user);
      })
      .catch((err) => {
        console.log(err);
        done(err, null);
        return;
      });
  });

  signin(passport);
  signup(passport);
};
