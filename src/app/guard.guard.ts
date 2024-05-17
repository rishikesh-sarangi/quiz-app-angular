import { CanActivateFn } from '@angular/router';

export const authGuardAdmin: CanActivateFn = (route, state) => {
  const loggedInSave = localStorage.getItem('loggedInSaveAdmin');
  const loggedInTemp = localStorage.getItem('loggedInTempAdmin');
  return loggedInSave == 'true' || loggedInTemp == 'true';

  // if (loggedin == 'true') {
  //   return true;
  // }
  // return false;
};

export const authGuardUser: CanActivateFn = (route, state) => {
  const loggedInSave = localStorage.getItem('loggedInSaveUser');
  const loggedInTemp = localStorage.getItem('loggedInTempUser');
  return loggedInSave == 'true' || loggedInTemp == 'true';
};
