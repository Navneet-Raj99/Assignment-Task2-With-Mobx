import { AuthStore } from "./Authstore"
import { createContext } from "react"
import { AuthService } from "./Authservice"
const authService=new AuthService();
const authStore = new AuthStore(authService)

export const StoreContext = createContext({
  authStore
})
