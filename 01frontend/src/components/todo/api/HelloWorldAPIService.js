import { apiClient } from "./ApiClient"

//lamba 
export const retrieveHelloWorldBean 
      = () => apiClient.get("/hello-world-bean")

export const retrieveHelloWorldBeanParam
      = (username) => 
      apiClient.get(`/hello-world/path-variable/${username}`)