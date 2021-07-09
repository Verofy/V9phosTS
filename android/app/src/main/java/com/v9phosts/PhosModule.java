package com.v9phosts;

import android.app.Activity;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletionException;
import android.telecom.Call;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import digital.paynetics.phos.PhosSdk;
import digital.paynetics.phos.exceptions.PhosException;
import digital.paynetics.phos.sdk.callback.AuthCallback;
import digital.paynetics.phos.sdk.callback.InitCallback;
import digital.paynetics.phos.sdk.callback.TransactionCallback;
import digital.paynetics.phos.sdk.callback.TransactionDetailCallback;
import digital.paynetics.phos.sdk.callback.TransactionListCallback;
import digital.paynetics.phos.sdk.entities.Transaction;
import digital.paynetics.phos.sdk.entities.Transactions;
import digital.paynetics.phos.sdk.enums.TransactionState;
import digital.paynetics.phos.sdk.enums.TransactionType;


public class PhosModule extends ReactContextBaseJavaModule{
    PhosModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "PhosModule";
    }
    private static final String INIT_ERROR = "INIT_ERROR";
    private static final String AUTH_ERROR = "AUTH_ERROR";
    private static final String SALE_ERROR = "AUTH_ERROR";
    private static final String REFUND_ERROR = "INIT_ERROR";
    private static final String ERROR = "ERROR";

    @ReactMethod public void promiseTest(Integer i, final Promise promise){
        Log.d("Message: ", String.valueOf("Message: "+i));
        if(i<10) {
            promise.resolve(i);
        } else {
            promise.reject(INIT_ERROR, "Initialization error");
        }
    }
    @ReactMethod void init(final Promise promise){
        InitCallback initCallback = null;
        ReactApplicationContext reactContext = getReactApplicationContext();
        Activity currentActivity = getCurrentActivity();

        PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
            @Override
            public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message: ", String.valueOf("Initialization successful: "+data+" "+map));
                promise.resolve(true); //JSON
            }
            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                promise.reject(INIT_ERROR, "Initialization error: "+e+" "+map); //JSON
            }
        });
    };
    @ReactMethod void authenticate(String issuer, String token, String license, final Promise promise){
        Log.d("Message: ", String.valueOf("Authentication started "));
        Activity currentActivity = getCurrentActivity();
        InitCallback initCallback = null;

        PhosSdk.getInstance().authenticate(issuer, license, token, new AuthCallback(){
            @Override
            public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message: ", String.valueOf("Authentication successful "+ data +" "+ map));
                promise.resolve(issuer+" with parameters of "+data+" "+map); //JSON
            }
            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message: ", String.valueOf("Authentication failed "+ e +" "+ map));
                promise.reject(AUTH_ERROR, "Authentication error: "+e+" extras: "+map); //JSON
            }
        });
    };
    @ReactMethod void makeSaleExtras(Boolean showTransactionResult, final Promise promise){
        Log.d("Message: ", String.valueOf("Sale processing started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        TransactionCallback transactionCallback =null;

        PhosSdk.getInstance().makeSale(currentActivity, showTransactionResult, extras, new TransactionCallback() {
            @Override
            public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale successful "+data+" "+map));
                promise.resolve("transaction_key: "+data+" extras: "+map); //JSON
                //Sale successful
                //data is transaction key
                //extras is the Map passed in makeSale()
            }
            @Override
            public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale failed "+e));
                promise.reject(SALE_ERROR, "Sale error: "+e+" extras: "+map); //JSON
                //Sale failed
            }
        });
    }
    @ReactMethod void makeSaleWithAmountExtras(double Amount, Boolean showTransactionResult, final Promise promise){
        Log.d("Message: ", String.valueOf("Sale processing started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1");
        extras.put("KEY_2", "Value 2");
        TransactionCallback transactionCallback =null;

        PhosSdk.getInstance().makeSaleWithAmount(currentActivity,(double) Amount,showTransactionResult, extras, new TransactionCallback() {
            @Override
            public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale successful "+data+" "+map));
                promise.resolve("transaction_key: "+data+" extras: "+map); //JSON
            }
            @Override
            public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale failed "+e));
                promise.reject(SALE_ERROR, "Sale error: "+e+" extras: "+map); //JSON
            }
        });
    };
    @ReactMethod void makeRefundExtras(String transactionKey, Boolean showTransactionResult,
                                       Boolean disablePrompt, final Promise promise){
        Log.d("Message: ", String.valueOf("Sale refund started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        TransactionCallback transactionCallback =null;
        Transaction transaction = null; //???

        PhosSdk.getInstance().makeRefund(currentActivity, transaction, showTransactionResult, extras, disablePrompt, new TransactionCallback() {
            @Override
            public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Refund successful "+data+" "+map));
                promise.resolve("transaction_key: "+data+" extras: "+map); //JSON
                //Refund successful
                //data is transaction key
                //extras is the Map passed in makeRefund()
            }
            @Override
            public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Refund failed "+e));
                promise.reject(REFUND_ERROR, "Refund error: "+e+" extras: "+map); //JSON
                //Refund failed
            }
        });
    };
    @ReactMethod void makeRefundWithAmountExtras(String transactionKey, Double amount, Boolean showTransactionResult,
                                                 Boolean disablePrompt, final Promise promise){
        Log.d("Message: ", String.valueOf("Sale refund started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        TransactionCallback transactionCallback =null;

        PhosSdk.getInstance().makeRefundWithAmount(currentActivity, transactionKey, (double) amount,showTransactionResult, extras, disablePrompt, new TransactionCallback() {
            @Override
            public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Refund successful "+data+" "+map));
                promise.resolve("transaction_key: "+data+" extras: "+map); //JSON
                //Refund successful
                //data is transaction key
                //extras is the Map passed in makeRefund()
            }
            @Override
            public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Refund failed "+e));
                promise.reject(REFUND_ERROR, "Refund error: "+e+" extras: "+map); //JSON
                //Refund failed
            }
        });
    };
    @ReactMethod void makeVoidExtras(String transactionKey, Boolean showTransactionResult,
                                     Boolean disablePrompt, final Promise promise){
        Log.d("Message: ", String.valueOf("Void started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        TransactionCallback transactionCallback =null;
        PhosSdk.getInstance().makeVoid(currentActivity, transactionKey, showTransactionResult, extras, disablePrompt, new TransactionCallback() {
            @Override
            public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Void successful "+data+" "+map));
                promise.resolve("transaction_key: "+data+" extras: "+map); //JSON
            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale failed "+e));
                promise.reject(ERROR, "Void error: "+e+" extras: "+map); //JSON
            }
        });
    };
    @ReactMethod void getTransactionHistory(int page, int limit, final Promise promise){
        Log.d("Message: ", String.valueOf("Getting transaction history started "));
        Date date = null;
        TransactionType type = null;
        TransactionState state = null;
        PhosSdk.getInstance().getTransactionHistory(page, limit, date, type, state, new TransactionListCallback() {
            @Override
            public void onSuccess(Transactions data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message: ", String.valueOf(data.getItems()));
                promise.resolve(String.valueOf(data.getItems())); //JSON
            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale failed "+e));
                promise.reject(ERROR, "Getting transaction error: "+e+" extras: "+map); //JSON
            }
        });
    };
    @ReactMethod void getTransactionByTrKey(String trKey, final Promise promise){
        Log.d("Message: ", String.valueOf("Getting transaction history started "));
        PhosSdk.getInstance().getTransactionByTrKey(trKey, new TransactionDetailCallback() {
            @Override
            public void onSuccess(Transaction transaction, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message: ", String.valueOf(transaction));
                promise.resolve(String.valueOf(transaction)); //JSON
            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message", String.valueOf("Sale failed "+e));
                promise.reject(ERROR, "Getting transaction error: "+e+" extras: "+map); //JSON
            }
        });
    };
}