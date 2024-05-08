import axios from 'axios';
const url = 'http://localhost:8000';

export const addUser =async (data) => {
    try{
      await axios.post(`${url}/add`,data);
    }catch(error){
        console.log("Error while Using addUser api", error.message);
    }

}

export const getUsers = async () => {
  try {
   let response= await axios.get(`${url}/users` );
   console.log(response);
    return response.data;
  } catch (error) {
    console.log(`eRRORR WHile calling getUsers api`, error.message);
  }
}

export const setConversation = async(data) => {
  try {
    await axios.post(`${url}/conversation/ad`,data);

  }catch (error) {
    console.log('Error while calling setconversation api',error.message);
  }
}
export const getConversation = async (data) => {
  try {
    const response = await axios.post(`${url}/conversation/gets`, data);
    return response.data; // Return the response data
  } catch (error) {
    console.log('Error while calling getconversation api', error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

export const newMessage =async (data) => {
  try{
    await axios.post(`${url}/message/add`,data);
  }
  catch (error) {
    console.log("Error while calling newMessage",error.message);
  }
}

export const getMessages =  async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("error while calling getMesage api",error.message);
  }
}

export const uploadFile = async(data ) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log('Error while calling uploadFile api',error.message);
  }
}