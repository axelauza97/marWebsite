import { redirect } from 'react-router-dom';

export function action() {
  console.log("log");
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
}