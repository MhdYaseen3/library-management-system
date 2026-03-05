const express = require('express');
const {user} = require('../data/user.json');
const router = express.Router();


router.get('/',(req,res)=>{
    res.status(200).json({
        success :true,
        data : user
    })
})

router.get('/:id',(req,res)=>{
    
    const {id}= req.params;
    const founduser = user.find((each) => each.id === Number(id))

    if(!founduser){
       return res.status(404).json({
            success:false,
            message : `user not found or id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : founduser

    })
})

router.post('/', (req,res)=>{
    const {id, name, email, subscriptionType, subscrptionDate} = req.body;
    if (!id || !name || !email || !subscriptionType || !subscrptionDate){
        return res.status(400).json({
            success:false,
            message : "please provide all the required fields"
        })
    }

    const userExist = user.find((each) => each.id === Number(id));
    if (userExist){
        return res.status(400).json({
            success:false,
            message : `user already exist with id ${id}`
        })
    }

    user.push({id, name, email, subscriptionType, subscrptionDate});
    res.status(201).json({
        success : true,
        message : "user created successfully"
    })
})


router.put('/:id',(req,res)=>{

    const {id} = req.params;
    const {data} = req.body;
    const userExist = user.find((each) => each.id === Number(id));
    if (!userExist){
        return res.status(404).json({
            success:false,
            message : `user cannot found by id : ${id}`
        })
    }

    const updateuser = user.map((each)=>{
        if(each.id === Number(id)){
            return {...each, ...data}

        }
        return each;
    })


res.status(200).json({
    success : true,
    data : updateuser,

    message : "user updated successfully"
})
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const userExist = user.find((each) => each.id === Number(id));
    if (!userExist){
        return res.status(404).json({
            success:false,
            message : `user cannot found by id : ${id}`
        })
    }

    const updateuser = user.filter((each)=> each.id !== Number(id));
    res.status(200).json({
        success : true,
        data : updateuser,
        message : "user deleted successfully"
    })
})

module.exports = router;