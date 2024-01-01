const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');


const getpostlikes = (req,res)=>{
    console.log("getlikes");
    const q = "SELECT userid FROM likes WHERE postid = ?";
    pool.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            return res.json("Some error sorry");
        }

        // console.log(req.query.postid)

        connection.query(q,[28],(err,data)=>{
            if(err){
                console.log(err);
                return res.json("Sorry some glitch")

            }
            else{
                return res.status(200).json(data.map(like=>like.userid))
            }
        })
    })
}

const addlike = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){ 
        return res.json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(401).json("Sorry Some glitch");
        }
        else{
            const q = "INSERT INTO likes(`userid`,`postid`) VALUES (?, ?)";
            const values = [userInfo.id,req.body.postid];
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(403).json("Sorry Some glitch");
                }
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                        return res.json("Sorry SOme glitch");
                    }
                    else{
                        return res.status(200).json("Your post has been liked");
                    }
                })
            })
        }

    })
}


const dislike = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        
        return res.json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(401).json("Sorry Some glitch");
        }
        else{
            const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
            const values = [userInfo.id,req.body.postid];
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(403).json("Sorry Some glitch");
                }
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                        return res.json("Sorry SOme glitch");
                    }
                    else{
                        return res.status(200).json("Your post has been disliked");
                    }
                })
            })
        }

    })
}

module.exports = {getpostlikes,addlike,dislike}