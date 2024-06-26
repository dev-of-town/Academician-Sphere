import jwt from 'jsonwebtoken';

export function getToken({username, mail, _id}){
    try{
        const token = jwt.sign({ _id, username, mail }, "THISISOURSECRET", {
            expiresIn: "30d",
        });
        return token;
    }catch(error){

    }
}

export function getId(token){
    try{
        const decode = jwt.verify(token,'THISISOURSECRET');
        // console.log(decode);
        return decode._id;
    }catch(error){
        console.log(error);
        return null;
    }
}

export function getUsername(token){
    try{
        const decode = jwt.verify(token,'THISISOURSECRET');
        // console.log(decode);
        return decode.username;
    }catch(error){
        console.log(error);
        return null;
    }
}

