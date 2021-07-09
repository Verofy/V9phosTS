import PhosModule from "../components/PhosModule";
import { handleValue } from "./helpers";
import React from "react";

export function getConstants() { 
  console.log("GET CONSTANTS:",PhosModule.getConstants())
}

export async function promiseTest() {
  await PhosModule.promiseTest(8)
  .catch(err=>{console.error(err)})
  .then(val=>{handleValue(val)})  
};

export async function init(){
  await PhosModule.init()
  .catch(err=>{console.error(err)})
  .then(val=>{console.info("Module initialiazed "+val)})  
}

export async function authenticate(){
  const issuer = "V9";
  const token = "2ac5040c-2ae7-49b9-a71e-9ace3528d69d";
  const license = "V9SDK" 
  await PhosModule.authenticate(issuer, token, license)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info("User authenticated as "+val)})
}

export async function makeSale(){
  await PhosModule.makeSale(true)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function makeSaleWithAmount(amount){
  await PhosModule.makeSaleWithAmount(amount, true)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function makeRefund(){

}

export async function makeRefundWithAmount(){

}

export async function makeVoid(){

}

export async function getTransactionHistory(){

}