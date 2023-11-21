
const User= require('../models/user')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
// const {addUser, getUser} = require('../controllers/userctrl')
const route = require('express').Router();

route.post('/register',(req,res)=>{
    let register = new User(req.body)
    register.save()
    .then((err,docs)=>{
        if(err)
        res.send(err)
        else
        res.send("You Registered Successfully!!")
    })
})

//Login route
route.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
    .then(found=>{
        console.log("User Already Exists");
        if(found.password==req.body.password){
            res.send("1")
        }else{
            res.send("0")
        }
    })
    .catch(err=>res.send("User Not Found"))
})
// route.post('/navigate');
route.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)


module.exports = route