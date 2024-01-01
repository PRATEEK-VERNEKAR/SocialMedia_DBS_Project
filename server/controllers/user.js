const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getuser = (req,res)=>{
    const userId = req.params.id;
    const token = req.cookies.accessToken;
    if(!token){
        return res.json("Please Login so you can access the content");
    }
   
    pool.getConnection((err,connection)=>{
        if(err){
            return res.status(403).json("Sorry some problem");
        }
        const q = "SELECT * FROM new_table WHERE `id` = ?"
        connection.query(q,[userId],(err,data)=>{
            if(err){
                console.log(err);
                return res.json("Sorry Some issue");
            }
            else{
                const {password,...info} = data[0]|| {};
                return res.json(info);
            }
        })
    })
}


const updateuser = (req,res)=>{
    const userId = req.params.id;
    const token = req.cookies.accessToken;
    if(!token){
        return res.json("Please login");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(401).json("Some error");
        }
        else{
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(403).json("some glitch , some issue sorry for inconveince");
                }
                else{
                    const q = "UPDATE new_table SET `name`= ?,`city` = ?,`website` = ?,`profilepic` = ?,`coverpic` = ? WHERE `id` = ?";
                    const values = [
                        req.body.name,
                        req.body.city,
                        req.body.website,
                        req.body.profilepic,
                        req.body.coverpic,
                        userInfo.id
                    ]
                    connection.query(q,values,(err,data)=>{
                        if(err){
                            console.log(err);
                            return res.json("Some error sorry wait for some time or call the helpline number");
                        }
                        else{
                            if(data.affectedRows > 0){
                                return res.json("Updated");
                            }
                            else{
                                return res.json("You Can update only your post");
                            }
                        }
                    })
                }
            })
        }                                           
    })
}



const protectedRoute = (req,res)=>{
    const token=req.cookies.accessToken;    
    console.log(token);
    if(!token){
        return res.json("Please login");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(401).json({"success":false});
        }
        else{
            return res.status(200).json({"success":"Verified"});
        }
    })
  
}

module.exports = {getuser,updateuser,protectedRoute}