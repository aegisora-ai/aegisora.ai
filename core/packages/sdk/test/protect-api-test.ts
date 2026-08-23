import { protect } from '@aegisora/sdk';

async function main(){

 const agent = protect({
   async run(input:string){
     return {
       message: input,
       source: "consumer-agent"
     };
   }
 });

 const result = await agent.run({
   input:"hello protected agent"
 });

 console.log(JSON.stringify(result,null,2));
}

main();
