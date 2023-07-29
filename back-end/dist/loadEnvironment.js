import dotenv from 'dotenv';
const _envResult = dotenv.config();
if (_envResult.error) {
    throw _envResult.error;
}
console.log(_envResult.parsed);
