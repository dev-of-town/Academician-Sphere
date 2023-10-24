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
        const {_id} = jwt.verify(token,'THISISOURSECRET');
        return id;
    }catch(error){

    }
}

