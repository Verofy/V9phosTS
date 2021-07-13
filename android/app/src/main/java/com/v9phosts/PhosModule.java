package com.v9phosts;

import android.app.Activity;

import androidx.annotation.Nullable;

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
import android.os.Handler;
import android.util.Log;

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
    @ReactMethod public void promiseTest(Integer i, final Promise promise) {
        Log.d("Message ", String.valueOf("Message "+i));
        WritableMap res = new WritableNativeMap();
        if(i<10) {
            Log.d("Message ", String.valueOf("Test successful: "));
            res.putInt("Message", 200);
            res.putInt("value", i);
            promise.resolve(res);
        } else {
            promise.reject(INIT_ERROR, "Initialization error");
        }
    };
    @ReactMethod void init(final Promise promise){
        Log.d("Message ", String.valueOf("Initialization started "));
        ReactApplicationContext reactContext = getReactApplicationContext();
        Context applicationContext = getReactApplicationContext();
        Activity currentActivity = getCurrentActivity();
        WritableMap res = new WritableNativeMap();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().init(currentActivity.getApplicationContext(), new InitCallback() {
                    @Override
                    public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Initialization successful"));
                        res.putInt("status", 200);
                        res.putString("message", "SDK initialized");
                        //if(data!=null)res.putString("data", data.toString()); //Data type?
                        //if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON

                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        promise.reject(INIT_ERROR, "Initialization error"); //JSON
                    }
                });
            }
        });
    };

    @ReactMethod void initTest(Callback callback){
        Log.d("Message ", String.valueOf("Initialization started "));
        ReactApplicationContext reactContext = getReactApplicationContext();
        WritableMap res = new WritableNativeMap();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
                    @Override
                    public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Initialization successful"));
                        PhosSdk.getInstance().authenticate("phos", "2ac5040c-2ae7-49b9-a71e-9ace3528d69d", "V9SDK", new AuthCallback(){
                            @Override
                            public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                                Log.d("Message ", String.valueOf("Authentication successful "+ data +" "+ map));
                                res.putInt("status", 200);
                                res.putString("message", "Authentication successful");
                                //if(data!=null)res.putString("data", data.toString()); //Data type?
                                //if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                                callback.invoke(res);
                            }
                            @Override
                            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                                Log.d("Message ", String.valueOf("Authentication failed: "+ e));
                                callback.invoke(AUTH_ERROR, "Authentication error: "+e); //JSON
                            }
                        });
                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        callback.invoke(e);
                    }
                });
            }
        });
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
                    public void onSuccess(Void data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message ", String.valueOf("Authentication successful "+ data +" "+ map));
                        res.putInt("status", 200);
                        res.putString("message", "Authentication successful");
                        if(data!=null)res.putString("data", data.toString()); //Data type?
                        if(map!=null)res.putString("map", map.toString()); //To ReadableMap
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
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
                    public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale successful "+data+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Sale successful");
                        if(data!=null)res.putString("transaction_key", data);
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                        //Sale successful
                        //data is transaction key
                        //extras is the Map passed in makeSale()
                    }
                    @Override
                    public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
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
                    public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale successful "+data+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Sale successful");
                        if(data!=null)res.putString("transaction_key", data);
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                        promise.reject(SALE_ERROR, "Sale error: "+e); //JSON
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
                    public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Refund successful "+data+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Refund successful");
                        if(data!=null)res.putString("transaction_key", data);
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                        //Refund successful
                        //data is transaction key
                        //extras is the Map passed in makeRefund()
                    }
                    @Override
                    public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Refund failed "+e));
                        promise.reject(REFUND_ERROR, "Refund error: "+e); //JSON
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
                    public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Refund successful "+data+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Refund successful");
                        if(data!=null)res.putString("transaction_key", data);
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                        //Refund successful
                        //data is transaction key
                        //extras is the Map passed in makeRefund()
                    }
                    @Override
                    public void onFailure(PhosException e,@Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Refund failed "+e));
                        promise.reject(REFUND_ERROR, "Refund error: "+e); //JSON
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
                    public void onSuccess(String data, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Void successful "+data+" "+map));
                        res.putInt("status", 200);
                        res.putString("message", "Void successful");
                        if(data!=null)res.putString("data", data);
                        if(map!=null)res.putString("map", map.toString());
                        promise.resolve(res); //JSON
                    }
                    @Override
                    public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                        Log.d("Message", String.valueOf("Sale failed "+e));
                        promise.reject(ERROR, "Void error: "+e); //JSON
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
    @ReactMethod void getTransactionByTrKey(String trKey, final Promise promise){
        Log.d("Message", String.valueOf("Getting transaction history started "));
        WritableMap res = new WritableNativeMap();
        ReactApplicationContext reactContext = getReactApplicationContext();
        Handler handler = new Handler(reactContext.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                PhosSdk.getInstance().getTransactionByTrKey(trKey, new TransactionDetailCallback() {
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
    };
};

