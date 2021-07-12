import PhosModule from '../components/PhosModule';
import { handleValue, handleRes } from './helpers';
import React from 'react';
const showTransactionResult = true;
const disablePrompt = true;
export function getConstants() {
  console.log('GET CONSTANTS:', PhosModule.getConstants());
}

export async function promiseTest() {
  return await PhosModule.promiseTest(5)
    .then((r: any) => {
      console.log(r);
    })
    .catch((err: any) => {
      console.error(err.mes, err);
    });
}

export async function init() {
  return await PhosModule.init()
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export function initTest() {
  PhosModule.initTest((val: string) => {
    console.log(val);
  });
}

export async function authenticate() {
  const issuer = 'V9';
  const token = '2ac5040c-2ae7-49b9-a71e-9ace3528d69d';
  const license = 'V9SDK';
  return await PhosModule.authenticate(issuer, token, license)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function makeSale() {
  return await PhosModule.makeSaleExtras(showTransactionResult)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function makeSaleWithAmount(amount: number) {
  return await PhosModule.makeSaleWithAmountExtras(amount, showTransactionResult)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function makeRefund() {
  const transaction = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.makeRefundExtras(transaction, showTransactionResult, disablePrompt)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function makeRefundWithAmount(amount: number) {
  const transaction = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.makeRefundWithAmountExtras(transaction, amount, showTransactionResult, disablePrompt)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function makeVoid() {
  const transaction = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.makeVoidExtras(transaction, showTransactionResult, disablePrompt)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function getTransactionHistory() {
  const page = 1;
  const limit = 50;
  const date = '07/11/2021';
  const type = 'sale'; //sale, void, refund
  const state = 'successful'; //successful, failed, pending, unkwnon
  return await PhosModule.getTransactionHistory(page, limit, date, type, state)
    .then((r: any) => {
      console.info(r.message);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export async function getTransactionByTrKey() {
  const trKey = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.getTransactionByTrKey(trKey)
    .then((r: any) => {
      console.info(handleRes(r).transaction);
      return r;
    })
    .catch((err: any) => {
      console.error(err);
    });
}
