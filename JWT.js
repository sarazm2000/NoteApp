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

 