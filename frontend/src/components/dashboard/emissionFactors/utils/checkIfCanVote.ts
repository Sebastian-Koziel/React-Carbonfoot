import { Factor } from "../../../../interfaces/interfaces";
import { storageGetUser } from "../../../../storage/localStorage"

export const checkIfCanVote = (factor:Factor)=> {
    const user = storageGetUser();
    if(factor.addedBy === user._id){
        return false;
    }
    if(user.votedFor.includes(factor._id)){
        return false;
    }
    return true;
}