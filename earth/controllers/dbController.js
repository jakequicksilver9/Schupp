const axios = require('axios');
const qs = require('querystring')

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}

exports.signUp = async (req,res,next) => {
    try {
        axios.post('http://localhost:3001/signup', qs.stringify(req.body), config )
        .then(response => res.user = response.data)
        .catch(error => res.user = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
}

exports.login = async (req,res,next) => {
    try {
        axios.post('http://localhost:3001/login', qs.stringify(req.body), config )
        .then(response => res.user = response.data)
        .catch(error => res.user = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
    
}

exports.users = async (req,res,next) => {
    try {
        config.headers['x-access-token'] = req.session.user.accessToken
        axios.get('http://localhost:3001/users', config)
        .then(response => res.users = response.data)
        .catch(error => res.users = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
}

exports.delete = async (req,res,next) => {
    try {
        config.headers['x-access-token'] = req.session.user.accessToken
        axios.delete('http://localhost:3001/user/' + req.body.id, config)
        .then(response => res.users = response.data)
        .catch(error => res.users = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
}

exports.approve = async (req,res,next) => {
    try {
        config.headers['x-access-token'] = req.session.user.accessToken
        axios.get('http://localhost:3001/approve/' + req.body.id, config)
        .then(response => res.users = response.data)
        .catch(error => res.users = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
}

exports.upload = async (req,res,next) => {
    try {
        axios.post('http://localhost:3001/upload/' + req.session.user.data.id, qs.stringify(req.body), config )
        .then(response => res.message = response.data)
        .catch(error => res.error = error)
        .then(function (){
            next()
        })
    }catch (e){
        console.log(e)
    }
    
}

