const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getcomments = (req,res)=>{
    
    // const q = `SELECT c.*, u.id AS userid, u.name, u.profilepic FROM comments AS c JOIN new_table AS u ON (u.id = c.userid)
    // WHERE c.postid = ? 
    // ORDER BY c.createdat DESC`;

    const q=`SELECT * FROM comments WHERE postid=?`
    console.log(req.query.postid);
    console.log("HELLO")

    pool.getConnection((err,connection)=>{
        if(err){
            return res.json("Sorry some glitch");
        }

        connection.query(q,[req.query.postid],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                return res.json(data);
            }
        })
    })
}


const addcomment = (req,res)=>{
    try{
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
            
            const q = "INSERT INTO comments(`desc`, `createdat`, `userid`,`postid`,`commenteduserid`) VALUES (?, ?, ?, ?,?)";
            
            
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.json("Sorry Some Glitch");
                }
                const values = [req.body.desc,moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),req.body.userid,req.body.postid,userInfo.id];
                connection.query(q,values,(err,data)=>{
                    if(err){
                        return res.json(err);
                    }
                    else{
                        return res.status(200).json("Comment is Created")
                    }
                })
            })
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({messasge:"Internal Server Error"})
    }

}

const deletecomm = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            return res.status(403).json("Sorry");
        }

        

        const q = "DELETE FROM comments WHERE `id` = ? AND `userid` = ?  "
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
                        return res.json("Comment deleted");
                    }
                })
            }
        })
    })

}


module.exports = {getcomments,addcomment,deletecomm};