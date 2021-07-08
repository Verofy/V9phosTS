import PhosModule from "../components/PhosModule";
import React from "react";

export function getConstants() { 
  console.log("GET CONSTANTS:",PhosModule.getConstants())
}

export function init(){
  PhosModule.createInit((err) => {console.log(err)}, (msg) => {console.log(msg)});
}

export function authenticate(){
  const issuer = "V9";
  const token = "rrrandomTOKEN";
  const license = "license" 
  PhosModule.auth(issuer, token, license, (err) => {console.log(err)}, (msg) => {console.log(msg)});
}

export function makeSale(){
  const map1 = new Map();
  PhosModule.processPayment(true, (err) => {console.log(err)}, (msg) => {console.log(msg)});
}

export function makeSaleWithAmount(){

}

export function makeRefund(){

}

export function makeRefundWithAmount(){

}

export function makeVoid(){

}

export function getTransactionHistory(){

}