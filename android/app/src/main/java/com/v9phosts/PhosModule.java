package com.v9phosts;

import android.Manifest;
import android.app.Activity;

import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;


import digital.paynetics.phos.PhosSdk;
import digital.paynetics.phos.PhosSdkApplication;
import digital.paynetics.phos.exceptions.PhosException;
import digital.paynetics.phos.sdk.callback.AuthCallback;
import digital.paynetics.phos.sdk.callback.InitCallback;
import digital.paynetics.phos.sdk.callback.TransactionCallback;
import digital.paynetics.phos.sdk.callback.TransactionListCallback;
import digital.paynetics.phos.sdk.entities.Transaction;
import digital.paynetics.phos.sdk.entities.Transactions;
import digital.paynetics.phos.sdk.enums.TransactionState;
import digital.paynetics.phos.sdk.enums.TransactionType;
import digital.paynetics.phos.PhosSdkApplication;

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
    public static WritableArray response;
    private TransactionState changeState(String state) {
        switch (state){
            case "successful":
                return TransactionState.SUCCESSFUL;
            case "failed":
                return TransactionState.FAILED;
            case "pending":
                return TransactionState.PENDING;
            case "unknown":
                return TransactionState.UNKNOWN;
            default:
                return null;
        }
    };
    private TransactionType changeType(String type) {
        switch (type){
            case "sale":
                return TransactionType.SALE;
            case "void":
                return TransactionType.VOID;
            case "refund":
                return TransactionType.REFUND;
            default:
                return null;
        }
    };

    private static final int REQUEST_CODE_ASK_PERMISSIONS_LOCATION = 9000;
    private String[] permission = new String[]{ Manifest.permission.ACCESS_FINE_LOCATION };



    @ReactMethod public void isInitialised(final Promise promise) {
        Log.d("IsInitialised", String.valueOf(PhosSdk.getInstance().isInitialised()));
        Context context = getReactApplicationContext(); // or activity.getApplicationContext()
        PackageManager packageManager = context.getPackageManager();

        try {
            promise.resolve(String.valueOf(PhosSdk.getInstance().isInitialised())); //JSON
        } catch (Exception e) {
            promise.reject(ERROR, "Error "+e); //JSON
        }

    };


    @ReactMethod void initTest(){
        Log.d("Message ", String.valueOf("Test initialization started "));
        ReactApplicationContext reactContext = getReactApplicationContext();
        WritableMap res = new WritableNativeMap();
        Handler handler = new Handler(reactContext.getMainLooper());
        try{
            handler.post(new Runnable() {
                @Override
                public void run() {
                    PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
                        @Override
                        public void onSuccess(Void data, Map<String, String> map) {
                            Log.d("Message ", String.valueOf("Test initialization successful, isInitialised: "+PhosSdk.getInstance().isInitialised()));
                            authenticateTest("phos", "2ac5040c-2ae7-49b9-a71e-9ace3528d69d", "V9SDK");
                        }
                        @Override
                        public void onFailure(PhosException e, Map<String, String> map) {
                            Log.d("Message ", String.valueOf("Test initialization failed: "+ e));
                        }
                    });
                }
            });
        }catch(Exception e){
            Log.d("Message ", String.valueOf("Error caught"+ e));
        }
        Log.d("Message ", String.valueOf("Test initialization finished, isInitialised: "+PhosSdk.getInstance().isInitialised()));
    };
    void authenticateTest(String issuer, String token, String license){
        Log.d("Message ", String.valueOf("Authentication started"));
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                try{
                    PhosSdk.getInstance().authenticate(issuer, license, token, new AuthCallback(){
                        @Override
                        public void onSuccess(Void data, Map<String, String> map) {
                            Log.d("Message ", String.valueOf("Authentication successful "+ ", isInitialised: "+PhosSdk.getInstance().isInitialised()+" "+ PhosSdk.getInstance().getClass()));
                            //makeSaleTest(true);
                        }
                        @Override
                        public void onFailure(PhosException e, Map<String, String> map) {
                            Log.d("Message ", String.valueOf("Authentication failed: "+ e));
                        }
                    });
                } catch(Exception e){
                    Log.d("Message ", String.valueOf("Error caught"+ e));
                }
            }
        });
        Log.d("Message ", String.valueOf("Authentication finished, isInitialised: "+PhosSdk.getInstance().isInitialised()));
        //makeSaleTest(true);

    };
    void makeSaleTest(Boolean showTransactionResult){
        Log.d("Message ", "Sale processing started ");
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeSale(currentActivity, showTransactionResult, extras, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> map) {

                    }

                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException e, @Nullable Map<String, String> map) {

                    }
                });
            }
        });
        Log.d("Message ", "Sale processing finished ");
    };

    void makeSaleWithAmountTest(double Amount, Boolean showTransactionResult){
        Log.d("Message ", String.valueOf("Sale processing with amount started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1");
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeSaleWithAmount(currentActivity,(double) Amount,showTransactionResult, extras, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale with amount successful "+transaction+" "+map));
                        //res.putInt("status", 200);
                        //res.putString("message", "Sale successful");
                        //if(data!=null)res.putString("transaction_key", data);
                        //if(map!=null)res.putString("map", map.toString());
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException e, @Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                    }
                });
            }
        });
        Log.d("Message ", "Sale processing with amount finished ");
    };

    @ReactMethod void init(final Promise promise) throws InterruptedException {
        Log.d("Message ", String.valueOf("Initialization started "));
        ReactApplicationContext reactContext = getReactApplicationContext();
        Context applicationContext = getReactApplicationContext();
        Activity currentActivity = getCurrentActivity();
        WritableMap res = new WritableNativeMap();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
                    @Override
                    public void onSuccess(Void data, Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Initialization successful"));
                        res.putInt("status", 200);
                        res.putString("message", "SDK initialized");
                        //if(data!=null)res.putString("data", data.toString()); //Data type?
                        //if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON
                        authenticateTest("phos", "2ac5040c-2ae7-49b9-a71e-9ace3528d69d", "V9SDK");
                    }
                    @Override
                    public void onFailure(PhosException e, Map<String, String> map) {
                        promise.reject(INIT_ERROR, "Initialization error"); //JSON
                    }
                });
            }
        });
        Thread.sleep(4000);
        Log.d("Message ", String.valueOf("Initialization finished"));
    };
    @ReactMethod void authenticate(String issuer, String token, String license, final Promise promise){
        Log.d("Message ", String.valueOf("Authentication started "));
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().authenticate(issuer, license, token, new AuthCallback(){
                    @Override
                    public void onSuccess(Void data, Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Authentication successful "+ data +" "+ map));
                        res.putInt("status", 200);
                        res.putString("message", "Authentication successful");
                        if(data!=null)res.putString("data", data.toString()); //Data type?
                        if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e, Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Authentication failed: "+ e));
                        promise.reject(AUTH_ERROR, "Authentication error: "+e); //JSON
                    }
                });
            }
        });
    };
    @ReactMethod void makeSaleExtras(Boolean showTransactionResult, final Promise promise){
        Log.d("Message ", "Sale processing started ");
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeSale(currentActivity, showTransactionResult, extras, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale successful "+transaction+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Sale successful");
                        if(transaction!=null)res.putString("transaction_key", String.valueOf(transaction));
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                        //Sale successful
                        //data is transaction key
                        //extras is the Map passed in makeSale()
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction,PhosException e,@Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                        promise.reject(SALE_ERROR, "Sale error: "+e); //JSON
                        //Sale failed
                    }
                });
            }
        });
    };
    @ReactMethod void makeSaleWithAmountExtras(double Amount, Boolean showTransactionResult, final Promise promise){
        Log.d("Message ", String.valueOf("Sale processing started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1");
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeSaleWithAmount(currentActivity,(double) Amount,showTransactionResult, extras, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Sale successful "+transaction+" "+extras));
                        res.putInt("status", 200);
                        res.putString("message", "Sale successful");
                        //if(data!=null)res.putString("transaction_key", data);
                        //if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException error, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Sale failed "+error));
                        promise.reject(SALE_ERROR, "Sale error: "+error); //JSON
                    }
                });
            }
        });
    };
    @ReactMethod void makeRefundExtras(String transactionKey, Boolean showTransactionResult,
                                       Boolean disablePrompt, final Promise promise){
        Log.d("Message ", String.valueOf("Sale refund started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        Transaction transaction = new Transaction(); //???
        //Transaction transaction = null;
        //Log.d("Transaction", String.valueOf(transaction));
        ///??? Should be Transaction data apart? or should it be null?
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeRefund(currentActivity, transaction, showTransactionResult, extras, disablePrompt, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Refund successful "+transaction+" "+transaction));
                        res.putInt("status", 200);
                        res.putString("message", "Refund successful");
                        //if(transaction!=null)res.putString("transaction_key", transaction);
                        //if(transaction!=null)res.putString("map", transaction.toString());
                        promise.resolve(res); //JSON
                        //Refund successful
                        //data is transaction key
                        //extras is the Map passed in makeRefund()
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException error, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Refund failed "+error));
                        promise.reject(REFUND_ERROR, "Refund error: "+error); //JSON
                        //Refund failed
                    }
                });
            }
        });
    };
    @ReactMethod void makeRefundWithAmountExtras(String transactionKey, Double amount, Boolean showTransactionResult,
                                                 Boolean disablePrompt, final Promise promise){
        Log.d("Message ", String.valueOf("Sale refund started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeRefundWithAmount(currentActivity, transactionKey, (double) amount,showTransactionResult, extras, disablePrompt, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Refund successful "+transaction+" "+transaction));
                        res.putInt("status", 200);
                        res.putString("message", "Refund successful");
                        //if(data!=null)res.putString("transaction_key", data);
                        //if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                        //Refund successful
                        //data is transaction key
                        //extras is the Map passed in makeRefund()
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException error, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Refund failed "+error));
                        promise.reject(REFUND_ERROR, "Refund error: "+error); //JSON
                        //Refund failed
                    }
                });
            }
        });
    };
    @ReactMethod void makeVoidExtras(String transactionKey, Boolean showTransactionResult,
                                     Boolean disablePrompt, final Promise promise){
        Log.d("Message ", String.valueOf("Void started "));
        Activity currentActivity = getCurrentActivity();
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1"); //Example
        extras.put("KEY_2", "Value 2");
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().makeVoid(currentActivity, transactionKey, showTransactionResult, extras, disablePrompt, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Void successful "+transaction+" "+extras));
                        res.putInt("status", 200);
                        res.putString("message", "Void successful");
                        //if(transaction!=null)res.putString("data", transaction);
                        //if(extras!=null)res.putString("map", extras.toString());
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(@Nullable Transaction transaction, PhosException error, @Nullable Map<String, String> extras) {
                        Log.d("Message", String.valueOf("Sale failed "+error));
                        promise.reject(ERROR, "Void error: "+error); //JSON
                    }
                });
            }
        });
    };
    @ReactMethod void getTransactionHistory(int page, int limit, String date,String type, String state,final Promise promise) throws ParseException {
        Log.d("Message ", String.valueOf("Getting transaction history started "));
        DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        Date filterDate = formatter.parse(date);
        TransactionState transactionState = changeState(state);
        TransactionType transactionType = changeType(type);
        Log.d("Filter transactions by date:", String.valueOf(filterDate));
        Log.d("Filter transactions by type:", String.valueOf(transactionType));
        Log.d("Filter transactions by state:", String.valueOf(transactionState));
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().getTransactionHistory(page, limit, filterDate, transactionType, transactionState, new TransactionListCallback() {
                    @Override
                    public void onSuccess(Transactions data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf(data.getItems()));
                        res.putInt("status", 200);
                        res.putString("message", "Getting transaction history was successful");
                        res.putString("transaction_history", data.getItems().toString());
                        if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                        promise.reject(ERROR, "Getting transaction error: "+e); //JSON
                    }
                });
            }
        });

    };
    /*@ReactMethod void getTransactionByTrKey(String trKey, final Promise promise){
        Log.d("Message", String.valueOf("Getting transaction history started "));
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().getTransactionByTrKey(trKey, new TransactionCallback() {
                    @Override
                    public void onSuccess(Transaction transaction, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf(transaction));
                        res.putInt("status", 200);
                        res.putString("message", "Getting transaction history was successful");
                        res.putString("transaction", transaction.toString());
                        if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                        promise.reject(ERROR, "Getting transaction error: "+e); //JSON
                    }
                });
            }
        });
    };*/
};

