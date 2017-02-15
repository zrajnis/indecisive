export const SERVER_RESPONSE = 'SERVER_RESPONSE';

export function serverResponse (response){
  return {type: SERVER_RESPONSE, response};
}