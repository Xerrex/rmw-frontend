const ITEM_NAME = "authToken";

export function saveAuthToken(token){
  localStorage.setItem(ITEM_NAME, token);
}


export function getAuthToken(){
  const token = localStorage.getItem(ITEM_NAME);
  return token;
}
