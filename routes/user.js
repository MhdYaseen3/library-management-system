const express = require('express');
const {user} = require('../data/user.json');
const router = express.Router();

const { getAllUsers , getUserById , createUser , updateUserById , deleteUserById , getsubscriptionDetails} = require('../controller/user-controller');


router.get('/', getAllUsers);

router.get('/:id', getUserById);

// router.get('/:id',(req,res)=>{
    
//     const {id}= req.params;
//     const founduser = user.find((each) => each.id === Number(id))

//     if(!founduser){
//        return res.status(404).json({
//             success:false,
//             message : `user not found or id ${id}`
//         })
//     }

//     res.status(200).json({
//         success : true,
//         data : founduser

//     })
// })

// router.post('/', (req,res)=>{
//     const {id, name, email, subscriptionType, subscrptionDate} = req.body;
//     if (!id || !name || !email || !subscriptionType || !subscrptionDate){
//         return res.status(400).json({
//             success:false,
//             message : "please provide all the required fields"
//         })
//     }

//     const userExist = user.find((each) => each.id === Number(id));
//     if (userExist){
//         return res.status(400).json({
//             success:false,
//             message : `user already exist with id ${id}`
//         })
//     }

//     user.push({id, name, email, subscriptionType, subscrptionDate});
//     res.status(201).json({
//         success : true,
//         message : "user created successfully"
//     })
// })


router.post('/', createUser);


// router.put('/:id',(req,res)=>{

//     const {id} = req.params;
//     const {data} = req.body;
//     const userExist = user.find((each) => each.id === Number(id));
//     if (!userExist){
//         return res.status(404).json({
//             success:false,
//             message : `user cannot found by id : ${id}`
//         })
//     }

//     const updateuser = user.map((each)=>{
//         if(each.id === Number(id)){
//             return {...each, ...data}

//         }
//         return each;
//     })


// res.status(200).json({
//     success : true,
//     data : updateuser,

//     message : "user updated successfully"
// })
// })

router.put('/:id',updateUserById);

// router.delete('/:id',(req,res)=>{
//     const {id} = req.params;
//     const userExist = user.find((each) => each.id === Number(id));
//     if (!userExist){
//         return res.status(404).json({
//             success:false,
//             message : `user cannot found by id : ${id}`
//         })
//     }

//     const updateuser = user.filter((each)=> each.id !== Number(id));
//     res.status(200).json({
//         success : true,
//         data : updateuser,
//         message : "user deleted successfully"
//     })
// })

router.delete('/:id',deleteUserById);


// router.get('/subscription-details/:id', (req, res) => {
//     const { id } = req.params;

//     // Find the user by ID
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: `User Not Found for id: ${id}`
//         });
//     }

//     // Extract the subscription details
//     const getDateInDays = (data = '') =>{
//         let date;
//         if(data){
//             date = new Date(data);
//         }else{
//             date = new Date();
//         }
//         let days = Math.floor( date/ (1000 * 60 * 60 * 24));
//         return days;
//     }

//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "Basic"){
//             date = date + 90
//         }else if(user.subscriptionType === "Standard"){
//             date = date + 180
//     }else if(user.subscriptionType === "Premium"){
//             date = date + 365
//         }
//         return date;
//     }

//     // Subscription Expiration Calculation 
//     // January 1, 1970 UTC // milliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration - currentDate,
//         daysLeftForExpiration: returnDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success: true,
//         data
//     });
// });

router.get('/subscription-details/:id',getsubscriptionDetails);

module.exports = router;