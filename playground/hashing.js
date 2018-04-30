const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        bcrypt.compare(password, hash, (err, result) => {
            console.log(result);
        });
    })
})

/*var data = {
    id:4
}

var token = jwt.sign(data, 'secret');
console.log(token);

var decoded = jwt.verify(token, 'secret');
console.log('decoded', decoded);

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id:4
}

var token = {
    data,
    hash:SHA256(JSON.stringify(data) + 'somesecret').toString()
}

token.data.id = 6
token.hash = SHA256(JSON.stringify(token.data) + 'don\'t know the secret').toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
}
else {
    console.log('Data was changed. Don\'t trust')
}*/