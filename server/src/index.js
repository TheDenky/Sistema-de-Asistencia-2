const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const express = require('express');
const app = express();

const poolDB = require('./database');

const helpers = require('./helpers');
//const consultas = require('./consultas');

const refreshTokens = {};
//const SECRET = 'VERY_SECRET_KEY!';
const SECRET = 'ULTRASECRET_VIVE';
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

passport.use(
  new JwtStrategy(passportOpts, function (jwtPayload, done) {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
      return done(null, false);
    }
    done(null, jwtPayload);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

app.post('/login', async function (req, res, done) {
  const { username, password } = req.body;
  //console.log(username);
  //const user = await consultas.getOne(username);
  const usuario = await poolDB.query(
    'SELECT * FROM usuario WHERE usuaUsua = ?',
    [username]
  );
  const user = usuario[0];
  console.log(user);
  if (user === undefined) {
    return done(undefined, false, {
      message: `username ${username} not found.`,
    });
    // res.json({
    //   error: 'Error, email or password not found'
    // })
  } else {
    const equals = await helpers.matchPassword(password, user.passUsua);
    if (!equals) {
      return done({ message: `password ${user.password} incorrect.` });
      // res.json({
      //   error: 'Error, username or password not found'
      // });
    } else {
      const token = jwt.sign({ user }, SECRET, { expiresIn: 600 });
      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = username;
      res.json({ jwt: token, refreshToken: refreshToken });
    }
  }
  //////////////////////////

  // const user = {
  //     'username': username,
  //     'role': 'UGEL'
  // };
  // const token = jwt.sign(user, SECRET, { expiresIn: 600 })
  // const refreshToken = randtoken.uid(256);
  // refreshTokens[refreshToken] = username;
  // res.json({jwt: token, refreshToken: refreshToken});
});

app.post('/register', async function (req, res) {
  const { username, password, estado, tipo } = req.body;

  const encriptada = await helpers.encryptPassword(password);
  //console.log(encriptada);

  const reg = await poolDB.query(
    'INSERT INTO usuario(usuaUsua,estaUsua,tipoUsua,passUsua) values(?,?,?,?)',
    [username, estado, tipo, encriptada]
  );
  // if(!reg){
  //   console.log('Error');
  // }else{
  //   console.log('Usuario guardado');
  // }

  // console.log(username);
  // console.log(estado);
  // console.log(tipo);
  //console.log(password);
  // const user = {
  //     'username': username,
  //     'role': 'admin'
  // };
  // const token = jwt.sign(user, SECRET, { expiresIn: 600 })
  // const refreshToken = randtoken.uid(256);
  // refreshTokens[refreshToken] = username;
  // res.json({jwt: token, refreshToken: refreshToken});
});

app.post('/logout', function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});

app.post('/refresh', function (req, res) {
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const user = {
      username: refreshTokens[refreshToken],
      role: 'admin',
    };
    const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    res.json({ jwt: token });
  } else {
    res.sendStatus(401);
  }
});

app.get('/home', passport.authenticate('jwt'), function (req, res) {
  res.json({ value: Math.floor(Math.random() * 100) });
  // res.json({text: "Bienvenido al sistema de UGEL"});
});

app.listen(3000);
