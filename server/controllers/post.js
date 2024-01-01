const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const multer = require('multer');
const upload = multer();


const { connection } = require('mongoose');


const getposts = (req,res)=>{
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


        const q = `SELECT p.*, u.id AS userid, u.name, u.profilepic FROM posts AS p 
        JOIN new_table AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followingid) WHERE p.userid = ? OR r.followersid = ?
        ORDER BY p.createddate DESC`;
        
        
        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry SOme glitch");
            }
           connection.query(q,[userInfo.id,userInfo.id,userInfo.id],(err,data)=>{
                if(err){
                    console.log(err);
                }
                return res.json(data);
           })
        })

    })
}



const addposts = (req,res)=>{

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


        const q = "INSERT INTO posts(`desc`, `img`, `createddate`, `userid`) VALUES (?, ?, ?, ?)";
 

        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry Some Glitch");
            }

            upload.fields([{ name: 'img', maxCount: 1 }, { name: 'desc' }])(req,res,(err)=>{
                // const img=req.files.img;
                // console.log(img);
                // console.log(req.body.desc)

                const desc=req.body.desc;
                const img=req.files.img[0].buffer;
                console.log(req.files.img[0].buffer);
                const values = [desc, img, moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"), userInfo.id];
                
                console.log(desc);
                console.log(img);
                
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                        return res.json(err);
                    }
                    else{
                        return res.status(200).json("Post is Created")
                    }
                })


                // upload.none()(req, res, (err) => {
                //     // const values = [req.body.desc,,moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),userInfo.id];
                //     const desc = req.body.desc;
                //     // const img = req.body.img;
                    
                //     console.log(req.body);
                //     const values = [desc, img, moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"), userInfo.id];
                    
                //     console.log(desc);
                //     console.log(img);
                    
                //     connection.query(q,values,(err,data)=>{
                //         if(err){
                //             console.log(err);
                //             res.json(err);
                //         }
                //         else{
                //             res.status(200).json("Post is Created")
                //         }
                //     })
                // })
            })
        })
    })

}



const deleteposts = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            return res.status(403).json("Sorry");
        }

        const q = "DELETE FROM posts WHERE `postid` = ? AND `userid` = ?"

        // console.log(token);
        pool.getConnection((err,connection)=>{
            if(err){
                return res.json("Sorry Some glitch");
            }

            
            else{
                const values = [req.body.postid,userInfo.id];
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err)

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



module.exports = {getposts,addposts,deleteposts}