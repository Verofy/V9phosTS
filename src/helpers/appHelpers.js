import PhosModule from "../components/PhosModule";
import { handleValue } from "./helpers";
import React from "react";
const showTransactionResult=true;
const disablePrompt=true;
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
  await PhosModule.makeSaleExtras(showTransactionResult)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function makeSaleWithAmount(amount){
  await PhosModule.makeSaleWithAmountExtras(amount, showTransactionResult)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function makeRefund(){
  const transaction = "MOCK+TRANSACTION+KEY";
  await PhosModule.makeRefundExtras(transaction, showTransactionResult, disablePrompt)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})

}

export async function makeRefundWithAmount(amount){
  const transaction = "MOCK+TRANSACTION+KEY";
  await PhosModule.makeRefundWithAmountExtras(transaction, amount, showTransactionResult, disablePrompt)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function makeVoid(){
  const transaction = "MOCK+TRANSACTION+KEY";
  await PhosModule.makeVoidExtras(transaction, showTransactionResult, disablePrompt)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function getTransactionHistory(){
  const page=1;
  const limit=50;
  await PhosModule.getTransactionHistory(page, limit)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}

export async function getTransactionByTrKey(){
  const trKey = "MOCK+TRANSACTION+KEY";
  await PhosModule.getTransactionByTrKey(trKey)
  .catch(err=>{console.error(err)})
  .then(val=>{console.info(val)})
}