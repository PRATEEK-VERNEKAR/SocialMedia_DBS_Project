const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getstories = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) {
        console.log("Not logged in");
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Invalid, sorry cannot retrieve");
        }

        const q = `SELECT s.*, u.name
            FROM stories AS s
            JOIN new_table AS u ON u.id = s.userid
            JOIN relationships AS r ON s.userid = r.followingid
            WHERE r.followersid = ?
           
            LIMIT 4`;

        pool.getConnection((err, connection) => {
            if (err) {
                return res.json("Sorry, some glitch");
            }
            connection.query(q, [userInfo.id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                return res.json(data);
            });
        });
    });
};



const addstories = (req,res)=>{

    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        console.log("Sorry");
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            return res.status(403).json("Sorry");


        }

        const q = "INSERT INTO stories(`img`,`userid`) VALUES (?, ?)";
 

        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry Some Glitch");
            }
            const values = [req.body.img,userInfo.userid];
            connection.query(q,values,(err,data)=>{
                if(err){
                    return res.json(err);
                }
                else{
                    return res.status(200).json("Post is Created")
                }
            })
        })
    })

}


const deletestories = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            return res.status(403).json("Sorry");
        }

        const q = "DELETE FROM stories WHERE `id` = ? AND `userid` = ?"
        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry Some glitch");

            }

            
            else{
                const values = [req.params.id,userInfo.id];
                connection.query(q,values,(err,data)=>{
                    if(err){
                        return res.json("Sorry some Glitch");
                    }
                    else{
                        return res.json("Posts deleted");
                    }
                })
            }
        })
    })

}



module.exports = {getstories,addstories,deletestories};