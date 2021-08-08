// we extend the User Model in firebase auth
export default interface User {
  uid: string;
  displayName: string;
  email: string;
  // is administrator
  isAdmin: boolean;
}
