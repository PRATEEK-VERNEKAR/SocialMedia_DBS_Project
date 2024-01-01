const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getallrelationship = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token){
        return res.json("Sorry No token");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        const q = "SELECT `followingid` FROM relationships WHERE `followersid` = ?";
        console.log(userInfo.id)

        pool.getConnection((err,connection)=>{
            if(err){
                return res.json(err);
            }
            connection.query(q,[userInfo.id],(err,data)=>{
                console.log(userInfo.id)
                return res.status(200).json(data.map(r=>r.followingid));
            })
        })
    })  
}



const addfollowing = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token){
        console.log("Sorry");
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            return res.status(403).json("Invalid,sorry cannot retrive");
        }


        const q = "INSERT INTO relationships(`followersid`,`followingid`) VALUES(?,?)";
        const values = [userInfo.id,req.body.followingid];

        
        
        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry SOme glitch");
            }
           connection.query(q,values,(err,data)=>{
                if(err){
                    console.log(err);
                }
                return res.json(data);

           
           })
        })

    })
}


const deleterelationship = (req,res)=>{
    
        const userId = req.query.userId;
        const token = req.cookies.accessToken;
        console.log(token);
        if(!token){
            console.log("Sorry");
            return res.status(401).json("Not logged in");
        }
        jwt.verify(token,"secretkey",(err,userInfo)=>{
            if(err){
                return res.status(403).json("Invalid,sorry cannot retrive");
            }
    
    
            const q = "DELETE FROM relationships WHERE `followingid` = ? AND `followersid` = ?";
            const values = [req.body.followingid, userInfo.id]
            
            console.log(values);
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.json("Sorry SOme glitch");
                }
               connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    return res.json(data);
    
               
               })
            })
    
        })
    
}
module.exports = {getallrelationship,addfollowing,deleterelationship};