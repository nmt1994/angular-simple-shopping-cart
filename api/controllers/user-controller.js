const User = require('./../model/user');

function preCreateOwner(req, res) {
    let newUser = new User();

    newUser.username = 'admin';
    newUser.password = 'iamadmin';
    newUser.type = 1;

    newUser.save((err) => {
        console.log('User.preCreate', err);
        if (err) throw err;
        return res.status(200).send(newUser);
    })
}

function preCreateCustomer(req, res) {
    let newUser = new User();

    newUser.username = 'customer';
    newUser.password = 'iamcustomer';
    newUser.type = 3;

    newUser.save((err) => {
        console.log('User.preCreate', err);
        if (err) throw err;
        return res.status(200).send(newUser);
    })
}

function preCreateEmployee(req, res) {
    let newUser = new User();

    newUser.username = 'employee';
    newUser.password = 'iamemployee';
    newUser.type = 2;

    newUser.save((err) => {
        console.log('User.preCreate', err);
        if (err) throw err;
        return res.status(200).send(newUser);
    })
}
function login(req, res) {
    User.findOne({
        $and: [
            { 'username': req.body.username }, { 'password': req.body.password }
        ]
    }).then((user) => {
        console.log(' It is a user ', user);

        if (user !== null) res.status(200).send(user);
        else res.status(403).send('You shall not pass !');
    }).catch(err => {
        console.log('login err', err);
        res.status(400).send(err);
    })
}

export default { preCreateOwner, preCreateCustomer, preCreateEmployee, login };