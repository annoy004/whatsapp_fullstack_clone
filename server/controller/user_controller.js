import User from '../models/user.js'
 export const addUser = async(request,response) => {// isme hum log localhost pe baithe hain toh humlog ko bus req accept karna hait  jo hum log ne api call ki this axios.post api file se 
   try {
      let exist = await User.findOne ({sub:request.body.sub});
      if(exist) {
         response.status(200).json({msg:'user already exist'});
         return;
      }

      const newUser = new User(request.body);
      await newUser.save();
      return response.status(200).json(newUser);

   } catch (error) {
      return response.status(500).json(error.message);
   }
}

export const getUsers = async(request,response) => {
   try {
    const Users = await User.find({});
    return response .status(200).json(Users);
   } catch (error) {
      return response .status(500).json(error.message);

   }
}