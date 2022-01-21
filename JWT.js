<<<<<<< HEAD
const {sign, verify} = require('jsonwebtoken')
const express = require('express')

const createTokens = (user) => {
    const accessToken = sign({username: user}, "youknowwhat");
    return accessToken
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken)
        return res.status(400).json({error:'jhfjks'})

    try{
        const validToken = verify (accessToken, 'youknowwhat')
        if (validToken){
            req.authenticated = true
            return next()
        }
    } catch(err) {

        return res.status(400).json({error:err})
    }
}


module.exports = {createTokens, validateToken};

=======
const {sign, verify} = require('jsonwebtoken')
const express = require('express')

const createTokens = (user) => {
    const accessToken = sign({username: user}, "youknowwhat");
    return accessToken
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken)
        return res.status(400).json({error:'jhfjks'})

    try{
        const validToken = verify (accessToken, 'youknowwhat')
        if (validToken){
            req.authenticated = true
            return next()
        }
    } catch(err) {

        return res.status(400).json({error:err})
    }
}


module.exports = {createTokens, validateToken};

>>>>>>> 29a8a1a6826dfb5b5ef1e483573e1740bca2dd5e
 