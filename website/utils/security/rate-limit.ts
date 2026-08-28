const requests = new Map<string,{count:number,time:number}>();


export function rateLimit(
  ip:string,
  limit:number=20,
  windowMs:number=60000
){

  const now=Date.now();

  const entry=requests.get(ip);


  if(!entry || now-entry.time > windowMs){

    requests.set(ip,{
      count:1,
      time:now
    });

    return true;
  }


  if(entry.count >= limit){
    return false;
  }


  entry.count++;

  return true;
}
