import axios from "axios"
import { isAuthenticated } from "../../Auth/Helper";

export const GetImagesCount = () => {
    return (
        axios.get(process.env.REACT_APP_BACKEND + "/ImagesCount/" + isAuthenticated().user.id, {
            headers: {
                Authorization: "Bearer " + isAuthenticated().token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const AddNewImage = (image) => {
    return (
        axios.post(process.env.REACT_APP_BACKEND + "/Images/" + isAuthenticated().user.id, image, {
            headers: {
                Authorization: "Bearer " + isAuthenticated().token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const UpdateImage = (image, id) => {
    return (
        axios.put(process.env.REACT_APP_BACKEND + "/Images/" + isAuthenticated().user.id+"/"+ id, image, {
            headers: {
                Authorization: "Bearer " + isAuthenticated().token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const DeleteImage = (id) => {
    return (
        axios.delete(process.env.REACT_APP_BACKEND + "/Images/" + isAuthenticated().user.id +"/"+ id, {
            headers: {
                Authorization: "Bearer " + isAuthenticated().token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const GetAllImages = () => {
    return (
        axios.get(process.env.REACT_APP_BACKEND + "/Images/" + isAuthenticated().user.id, {
            headers: {
                Authorization: "Bearer " + isAuthenticated().token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}
