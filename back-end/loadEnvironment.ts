import dotenv from 'dotenv';

type EnvType = 'development' | 'production' | 'test';
type EnvConfig = {
  [key in EnvType]: string;
};

const _envResult = dotenv.config();

if (_envResult.error) {
  throw _envResult.error;
}

console.log(_envResult.parsed);
