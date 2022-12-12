// import {LoginRequest} from '../dto/request/loginrequest'
export class AuthService {
    
    async login(email,password) {
        const urlStart = "http://localhost:8000";
        const response = await fetch(`${urlStart}/api/auth/checkuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          let json = await response.json();
        //   personname=json.Name
          console.log(json);
          if(!json.ok)
          {
            throw new Error (json) 
          }
          return json
    }
  }
  