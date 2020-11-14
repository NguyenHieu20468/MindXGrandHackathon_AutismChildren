var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

// middleware
var multer = require('multer');
var upload = multer({});

// utils
var MyUtil = require("../utils/MyUtil.js");
const session = require('express-session');
const { validationResult } = require('express-validator');
const { ObjectID } = require('mongodb');

// daos
var pathDAO = "../daos/mongoose";
var phuhuynhDAO = require(pathDAO + "/phuhuynhDAO.js");
var treemDAO = require(pathDAO + "/treemDAO.js");

router.get('/', async (req, resp) => {
    resp.render('../views/trangchu.ejs');
});


router.get('/dangnhap', async (req, resp) => {
    if (!req.session.phuhuynh) {
        resp.render('../views/dangnhap.ejs');
    } else {
        resp.redirect('/');
    }
});


router.post('/dangnhap', async (req, resp) => {
    try{
        var email = req.body.email;
        var password = req.body.password;
        // var pwdhashed = MyUtil.md5(password);
        // var phuhuynh = await phuhuynhDAO.selectByEmailAndPassword(email, pwdhashed);
        // if (phuhuynh) {
        //     console.log('abc');
        //     req.session.phuhuynh = phuhuynh;
            // resp.redirect('/');
        // } else {
        //     MyUtil.showAlertAndRedirect(resp, 'Invalid login!', './dangnhap');
        // }
    
        var crypto = require('crypto');
        var pwdHashed = crypto.createHash('md5').update(password).digest('hex');
        //connect mongodb
        var MongoClient = require('mongodb').MongoClient;
        var uri = "mongodb+srv://admin:Ws63LIR0qnhtCPb1@cluster0.j4ajr.mongodb.net/AutismChildren";
    
        let conn = await MongoClient.connect(uri);
    
        //if(err) throw err;
        var db = conn.db('AutismChildren');
        var query = {email: email, matkhau: pwdHashed};
        let result = await db.collection('phuhuynh').findOne(query)
        
        console.log(result)
        
    
        if(result) {
            req.session.phuhuynh = result;
            console.log('logged in')
            console.log("Complete render")
            // resp.redirect('http://localhost:1234/');
            // resp.render('../views/redirect.ejs');
             resp.render("gioithieu.ejs",{
                 TITLE: "Welcome tho EJS Home page 1111"
             });
            // resp.render('../views/trangchu.ejs');
        } else {
            console.log('invalid');
            resp.render('dangnhap');
        }
        conn.close();
    }
    catch(err)
    {
        console.log(err)
    }
    
});

router.get('/abc', async (req, resp) =>{
    try{
        console.log(req.query);
        var email = req.query.email;
        var password = req.query.password;
    
        var crypto = require('crypto');
        var pwdHashed = crypto.createHash('md5').update(password).digest('hex');
        //connect mongodb
        var MongoClient = require('mongodb').MongoClient;
        var uri = "mongodb+srv://admin:Ws63LIR0qnhtCPb1@cluster0.j4ajr.mongodb.net/AutismChildren";
    
        let conn = await MongoClient.connect(uri);
    
        //if(err) throw err;
        var db = conn.db('AutismChildren');
        var query = {email: email, matkhau: pwdHashed};
        let result = await db.collection('phuhuynh').findOne(query)
        
        console.log(result)
        
    
        if(result) {
            // req.session.phuhuynh = result;
            console.log('logged in')
            console.log("Complete render abc")
            resp.send({data: 'ok'})
        } else {
            console.log('invalid');
            resp.send({data: 'error'})
        }
        conn.close();
    }
    catch(err)
    {
        console.log(err)
        resp.send({data: 'error'})
    }
})



router.get('/dangxuat', (req, resp) => {
    delete req.session.phuhuynh;
    resp.redirect('/');
});

router.get('/dangky', async (req, resp) => {
    resp.render('../views/dangky.ejs');
});

router.get('/baigiang', async (req, resp) => {
    if(req.session.phuhuynh)
        resp.render('../views/baigiang.ejs');
    else
        resp.render('dangnhap');
});

router.get('/gioithieu', async (req, resp) => {
    resp.render('../views/gioithieu.ejs');
});

router.get('/lamkiemtra', async (req, resp) => {
    if(req.session.phuhuynh)
       resp.render('../views/lamkiemtra.ejs');
    else
        resp.render('dangnhap');
});

router.get('/lienhe', async (req, resp) => {
    resp.render('../views/lienhe.ejs');
});

router.get('/themhosotre', async (req, resp) => {
    if(req.session.phuhuynh)
        resp.render('../views/themhosotre.ejs');
    else 
        resp.render('dangnhap');
});

router.post('/themhosotre', async (req, resp) => {
    var ten = req.body.ten;
    var gioitinh = req.body.gioitinh === "Nam" ? false : true;
    var namsinh = req.body.namsinh;
    var tuansinh = req.body.tuansinh;
    var ketquachuandoan = "";
    var sothangtuoi = 0;
    var noichuandoan = "";
    var nguoichuandoan = "";
    if(req.body.ketquachuandoan) ketquachuandoan = req.body.ketquachuandoan;
    if(req.body.sothangtuoi) sothangtuoi = parseInt(req.body.sothangtuoi);
    if(req.body.noichuandoan) noichuandoan = req.body.noichuandoan;
    if(req.body.nguoichuandoan) nguoichuandoan = req.body.nguoichuandoan;

    var idPhuHuynh = "";
    if(req.session.phuhuynh) {
        idPhuHuynh = req.session.phuhuynh._id;
    }
    
    var hoso = { ten: ten, gioitinh: gioitinh, namsinh: namsinh, tuansinh: tuansinh, sothangtuoi: sothangtuoi, 
        ketquachuandoan: ketquachuandoan, noichuandoan: noichuandoan, nguoichuandoan: nguoichuandoan, idPhuHuynh: idPhuHuynh };


    var result = await treemDAO.insert(hoso);
    if(result) {
        MyUtil.showAlertAndRedirect(resp, "Thêm hồ sơ thành công", './');
    } else {
        resp.redirect('/themhosotre');
    }
});

router.get('/khoahoc', async (req, resp) => {
    resp.render('../views/khoahoc.ejs');
});

router.get('/blog', async (req, resp) => {
    resp.render('../views/blog-tre-tu-ky.ejs');
});

router.get('/nhatky', async (req, resp) => {
    if(req.session.phuhuynh)
        resp.render('../views/nhatky.ejs');
    else
        resp.render('dangnhap');
});

router.get('/chatbot', async (req, resp) => {
    if(req.session.phuhuynh)
        resp.render('../views/chatbot.ejs');
    else
        resp.render('dangnhap');
});
module.exports = router;