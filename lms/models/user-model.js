const users = [];

module.exports = class userModel{
    
    constructor(userName,userType,userEmail,userPassword,id){
        this.userName = userName;
        this.userType = userType;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this._id = id;
    }

}