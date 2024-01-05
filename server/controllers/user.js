const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const multer = require('multer');
const upload = multer();

const getuser = (req,res)=>{
    // const userId = req.params.id;
    const token = req.cookies.accessToken;
    if(!token){
        return res.json("Please Login so you can access the content");
    }

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(404).json({message:"Some error dude"});
        }

        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(403).json("Sorry some problem");
            }
            const q = "SELECT * FROM new_table WHERE `id` = ?"
            console.log(userInfo.id)
            connection.query(q,[userInfo.id],(err,data)=>{
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
    })
}

const getSearchedUser = (req,res)=>{
    const userId = req.params.userid;
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token){
        return res.json("Please Login so you can access the content");
    }

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            return res.status(404).json({message:"Some error dude"});
        }

        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(403).json("Sorry some problem");
            }
            const q = "SELECT * FROM new_table WHERE `id` = ?"
            console.log(userInfo.id)
            console.log(userId);
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
    })
}




const getAllUser = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err){
            return res.status(403).json("Sorrry some problem");
        }
        const q="SELECT * FROM new_table ";
        connection.query(q,(err,data)=>{
            if(err){
                console.log(err);
                return res.json("Sorry some issue");
            }
            else{
                const {password,...info}=data || {};
                return res.json(info);
            }
        })
    })
}

const updateuser = (req, res) => {
    const userId = req.params.id;
    const token = req.cookies.accessToken;

    if (!token) {
        return res.json("Please login");
    }


    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            console.log(err);
            return res.status(401).json("Some error");
        } else {
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.status(403).json("Some glitch, some issue sorry for inconvenience");
                } else {
                    const q = "UPDATE new_table SET `city` = ?, `website` = ? WHERE `id` = ?";

                    const values = [
                        req.body.city,
                        req.body.website,
                        userInfo.id
                    ];

                    console.log(values);

                    connection.query(q, values, (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json("Some error, sorry wait for some time or call the helpline number");
                        } else {
                            if (data.affectedRows > 0) {
                                return res.json("Updated");
                            } else {
                                return res.json("You can update only your post");
                            }
                        }
                    });
                }
            });
        }
    });
};



const updateCover = (req, res) => {
    const userId = req.params.id;
    const token = req.cookies.accessToken;

    if (!token) {
        return res.json("Please login");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            console.log(err);
            return res.status(401).json("Some error");
        } else {
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.status(403).json("Some glitch, some issue sorry for inconvenience");
                } else {
                    const q = "UPDATE new_table SET  `coverpic` = ? WHERE `id` = ?";

                    upload.fields([{ name: 'coverpic', maxCount: 1 }, { name: 'profilepic' }])(req, res, (err) => {
                        if (err) {
                            console.log(err);
                            return res.json("Error uploading files");
                        }

                        const coverpic = req.files?.coverpic?.[0]?.buffer;
                        const profilepic = req.files?.profilepic?.[0]?.buffer;

                        const values = [
                            coverpic,
                        ];

                        connection.query(q, values, (err, data) => {
                            if (err) {
                                console.log(err);
                                return res.json("Some error, sorry wait for some time or call the helpline number");
                            } else {
                                if (data.affectedRows > 0) {
                                    return res.json("Updated");
                                } else {
                                    return res.json("You can update only your post");
                                }
                            }
                        });
                    });
                }
            });
        }
    });
};

const updateProfile = (req, res) => {
    const userId = req.params.id;
    const token = req.cookies.accessToken;

    if (!token) {
        return res.json("Please login");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            console.log(err);
            return res.status(401).json("Some error");
        } else {
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.status(403).json("Some glitch, some issue sorry for inconvenience");
                } else {
                    const q = "UPDATE new_table SET `profilepic` = ? WHERE `id` = ?";

                    upload.fields([ { name: 'profilepic' }])(req, res, (err) => {
                        if (err) {
                            console.log(err);
                            return res.json("Error uploading files");
                        }

                        // const coverpic = req.files?.coverpic?.[0]?.buffer;
                        const profilepic = req.files?.profilepic?.[0]?.buffer;

                        const values = [
                            profilepic,
                            userInfo.id
                        ];

                        console.log(profilepic)

                        connection.query(q, values, (err, data) => {
                            if (err) {
                                console.log(err);
                                return res.json("Some error, sorry wait for some time or call the helpline number");
                            } else {
                                if (data.affectedRows > 0) {
                                    console.log("updated");
                                    return res.json("Updated");
                                } else {
                                    return res.json("You can update only your post");
                                }
                            }
                        });
                    });
                }
            });
        }
    });
};

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

module.exports = {getuser,updateuser,protectedRoute,getAllUser,updateCover,updateProfile,getSearchedUser}