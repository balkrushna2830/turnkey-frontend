import axios from "axios"

export const Register = (user) => {
    return (
        axios.post(process.env.REACT_APP_BACKEND + "/signup", user, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const Login = (user) => {
    return (
        axios.post(process.env.REACT_APP_BACKEND + "/signin", user, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    )
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const Logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        window.location.reload()
        return (
            axios.get(process.env.REACT_APP_BACKEND + "/signout").then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            })
        )
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
}