export function authenticate(authData) {

  // check to see if the user exists and if so return the index
  const index = USERDATA.findIndex((c) => c.userId === authData.username);

  if (index === -1) {
      // user id doesn't exist
      return false;
  }
  else if (USERDATA[index].password !== authData.password) {
      // password doesn't match
      return false;
  }
  else {
      // return the user
      // NOTE: you usually wouldn't return a visible password like this
      return USERDATA[index]
  }
}


export const USERDATA = [
  { id: 89, userId: 'A00000001', first: 'Erica', last: 'Rangel', password: 'password01' },
  { id: 90, userId: 'A00000002', first: 'Kezia', last: 'Kennedy', password: 'password02' },
  { id: 91, userId: 'A00000003', first: 'Riley', last: 'Wheeler', password: 'password03' },
];