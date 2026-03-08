const {userModel , bookModel} = require("../model/mix.js");



exports.getAllUsers = async (req, res) => {
       const users = await userModel.find();

       if(!users || users.length === 0  ){
        return res.status(404).json({
            success:false,
            message : `no user found`
        })
    
    }
    res.status(200).json({
        success : true,
        data : users,
        message : "all users found"
    })
}

exports.getUserById = async (req, res) => {

    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message : `user not found with id ${id}`
        })
    }
    res.status(200).json({
        success : true,
        data : user,
        message : "user found"
    })

}

exports.createUser = async (req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new user"
        })
    }

    await userModel.create(data);
    const users = await userModel.find();
    res.status(201).json({
        success: true,
        data: this.getAllUsers,
        message: "User added successfully"
    });
}

exports.updateUserById = async (req, res) => {
    
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the user"
        })
    }


    const user = await userModel.findByIdAndUpdate(id, data, {new : true});
    // const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message : `user not found with id ${id}`
        })
    }

    const updateuser = await userModel.findByIdAndUpdate(id,data, {new : true});
    res.status(200).json({
        success : true,
        data : updateuser,
        message : "user updated successfully"
    })
}

exports.deleteUserById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message : `user not found with id ${id}`
        })
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message : "user deleted successfully"
    })
}

exports.getsubscriptionDetails = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message : `user not found with id ${id}`
        })
    }

    const getDateInDays = (data = '') =>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor( date/ (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90
        }else if(user.subscriptionType === "Standard"){
            date = date + 180
    }else if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    // Subscription Expiration Calculation 

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    });
}