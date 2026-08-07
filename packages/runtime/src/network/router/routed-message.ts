export type MessageType =

"request" |
"response" |
"event";


export interface RoutedMessage {


id:string;


type:MessageType;


from:string;


to:string;


payload:unknown;


createdAt:Date;


}


