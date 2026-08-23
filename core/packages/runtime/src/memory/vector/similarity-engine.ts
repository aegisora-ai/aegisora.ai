export class SimilarityEngine {


compare(
a:number[],
b:number[]
){


let dot=0;

let magA=0;

let magB=0;


for(
let i=0;
i<a.length;
i++
){

dot += a[i]*b[i];

magA += a[i]*a[i];

magB += b[i]*b[i];

}


if(
magA===0 ||
magB===0
){

return 0;

}


return dot /
(
Math.sqrt(magA) *
Math.sqrt(magB)
);


}


}
