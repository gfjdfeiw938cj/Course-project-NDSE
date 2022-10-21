import UserModule from '../module/UserModule.js';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';

const userModule = new UserModule();

export const signup = function (passport) {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        const findOrCreateUser = async function () {
          const user = await userModule.findByEmail(email).catch((err) => {
            console.log('Ошибка при регистрации', err);
            return done(err);
          });

          const name = req.body.name;
          const contactPhone = req.body.contactPhone;

          console.log(`name ${name} phone ${contactPhone}`);

          if (user) {
            console.log('Пользователь с таким email уже существует: ', email);
            return done(
              null,
              false,
              req.flash(
                'signup-message',
                'Пользователь с таким email уже существует'
              )
            );
          } else {
            const newUser = await userModule.create({
              name: name,
              passwordHash: createHash(password),
              email: email,
              contactPhone: contactPhone,
            });

            return done(null, newUser);
          }
        };

        process.nextTick(findOrCreateUser);
      }
    )
  );

  const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
};
