import { makeAutoObservable } from "mobx"
export class AuthStore {
    authenticated = false
    constructor(authService) {
        this.authService = authService
        makeAutoObservable(this)
    }
    async login(email, password) {
        try {
            const urlStart = "http://localhost:8000";
            const response = await fetch(`${urlStart}/api/auth/checkuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            let json = await response.json();
            console.log(json);
            if(json.Message==="Enter correct Password")
            {
                this.setAuthenticated(false)
                return false;
            }
            else if(json.Message==='No Such User Exist')
            {
                this.setAuthenticated(false)
                return false;
            }
            else
            {
                // let dummy = false;
                localStorage.setItem("AUTH_TOKEN", json.AUTH_TOKEN)
                this.setAuthenticated(true)
                let temp = this.authenticated;
                // console.log(mkc,"dsfsd")
                if (temp) {
                    return true;
                }
    
                console.log(this.authenticated)
            }
         
        } catch (error) {
            console.log(error)
        }
    }
    setAuthenticated(authenticated) {
        this.authenticated = authenticated
    }
    isAuthenticated() {
        return this.authenticated
    }
    isAuthTokenAvailable()
    {
        if(localStorage.getItem('AUTH_TOKEN'))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
