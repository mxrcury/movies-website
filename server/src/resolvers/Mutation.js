const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const tokenVerify = (token) => {
  return jwt.verify(token,process.env.SECRET_KEY)
}

const createUser = async (_, args) => {
  const { registerInput: { username, email, password } } = args;

  // Check if user exists
  
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    const error = new Error("User already exists");
    error.status = 400;
    error.code = "USER_ALREADY_EXISTS";
    throw error;
  }
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 7);
  // Add user to DB
  const user = await User.create({ username, email, password: hashedPassword })

  // Return user data and success status
  return {
    username: user.username,
    email: user.email,
    status: `User with email:${email} was created`,
  };
};

const loginUser = async (_,args) => {
    // Get input data from arguments
    const { loginInput:{ email ,password } } = args
    // Check if user with this email exists in DB
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('No user was found',{cause:{status:400}})
        error.status = 400
        error.code = "USER_NOT_FOUND"
        throw error
    }
    // Check if password is valid
    const isValidPassword = bcrypt.compareSync(password,user.password)

    if (!isValidPassword) {
      const error = new Error("Invalid password", { cause: { status: 400 } });
      error.status = 400;
      error.code = "INVALID_PASSWORD";
      throw error;
    }
    // Create JWT token
    const tokenPayload = {id:user._id}
    const token = jwt.sign(tokenPayload,process.env.SECRET_KEY,{expiresIn:"24h"})

    // Return user data and token
    return {email:user.email,username:user.username,token,status:`You're logged in`,settings:{...user.settings}}

}

const saveMovieList = async (_,args) => {
    const {listInput:{token, listTitle, link}, movieList } = args

  const newList = {listTitle,link,movies:movieList}

  const decodedData = tokenVerify(token)

  const user = await User.findById({_id:decodedData.id})

  if (!user.savedMovies.length) {
    await User.findByIdAndUpdate(user.id,{$set:{savedMovies:[]}})
  }
  await User.findByIdAndUpdate(user.id,{$push:{savedMovies:newList}})

  return { listTitle, link, movie:movieList }
}

const deleteMovieList = async (_, { listTitle, token }) => {
  const decodedData = tokenVerify(token)
  const user = await User.findById({_id:decodedData.id})

  if(user.savedMovies.length){
    const deletedList = await User.findByIdAndUpdate(user.id,{$pull:{savedMovies:{listTitle}}})
    console.log('in saved movies',deletedList)
  }
  return [...user.savedMovies]
}

const changeSettings = async (_,{ token, locale, saveLists }) => {
  const decodedData = tokenVerify(token)
  await User.findByIdAndUpdate(decodedData.id,{$set:{settings:{locale,saveLists}}})
  const user = await User.findById({_id:decodedData.id})

  return {...user.settings}
}

module.exports = { createUser, loginUser, saveMovieList, deleteMovieList, changeSettings }