package com.v9phosts;

import android.app.Activity;
import android.content.Context;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import android.content.Intent;
import android.net.Uri;
import android.telecom.Call;
import android.util.Log;

import digital.paynetics.phos.PhosSdk;
import digital.paynetics.phos.exceptions.PhosException;
import digital.paynetics.phos.sdk.callback.AuthCallback;
import digital.paynetics.phos.sdk.callback.InitCallback;
import digital.paynetics.phos.sdk.callback.TransactionCallback;


public class PhosModule extends ReactContextBaseJavaModule{

    private static final int MAKE_SALE_REQUEST = 1;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PAYMENT_CANCELLED = "E_PAYMENT_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PAYMENT = "E_FAILED_TO_SHOW_PAYMENT";
    private static final String E_NO_PAYMENT_DATA_FOUND = "E_NO_PAYMENT_DATA_FOUND";

    private Promise mPaymentPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == MAKE_SALE_REQUEST) {
                if (mPaymentPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPaymentPromise.reject(E_PAYMENT_CANCELLED, "Image picker was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        Uri uri = intent.getData();

                        if (uri == null) {
                            mPaymentPromise.reject(E_NO_PAYMENT_DATA_FOUND, "No image data found");
                        } else {
                            mPaymentPromise.resolve(uri.toString());
                        }
                    }
                    mPaymentPromise = null;
                }
            }
        }
    };

    PhosModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "PhosModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public Boolean test(){
        return true;
    }

    @ReactMethod
    void createInit(Callback successCallback, Callback errorCallback) {
        Log.d("Message", String.valueOf("Initialization started "));
        ReactApplicationContext context = getReactApplicationContext();
        InitCallback callback = null; //?
        try {
            init(context, callback );
            successCallback.invoke("Callback : init success");
        } catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    void auth(String issuer, String token, String license, Callback successCallback, Callback errorCallback) {
        Log.d("Message", String.valueOf("Authentication started "));
        AuthCallback callback = null; //?
        try {
            authenticate(issuer, token, license, callback );
            successCallback.invoke("Callback : authentication success");
        } catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    void processPayment(Boolean showTransactionResult, Callback successCallback, Callback errorCallback) { //final promise
        Log.d("Message string", String.valueOf("Payment processing started "));
        ReactApplicationContext context = getReactApplicationContext();
        TransactionCallback callback = null; //?
        Activity currentActivity = getCurrentActivity();
        try {
            
            Intent paymentIntent = new Intent(Intent.ACTION_VIEW);
            paymentIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            Intent chooserIntent = Intent.createChooser(paymentIntent, "Open with");
            chooserIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            currentActivity.startActivity(chooserIntent);

            makeSale(context, showTransactionResult, callback);
            successCallback.invoke("Callback : payment successful");
        } catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }

    private void init(ReactApplicationContext reactContext, InitCallback callback){
        PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
            @Override
            public void onSuccess(Void unused, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message string", String.valueOf("Initialization successful"));
            }
            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {

            }

        });
    };
    void authenticate(String issuer, String token, String license, AuthCallback callback){
        PhosSdk.getInstance().authenticate(issuer, license, token, new AuthCallback(){
            @Override
            public void onSuccess(Void unused, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                Log.d("Message string", String.valueOf("Authentication successful"));
            }
            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {

            }
        });
    };
    void makeSale(ReactApplicationContext context, boolean showTransactionResult, TransactionCallback callback){
        Map<String, String> extras = new HashMap<>();
        extras.put("KEY_1", "Value 1");
        extras.put("KEY_2", "Value 2");
        PhosSdk.getInstance().makeSale(context, true, extras, new TransactionCallback() {
            @Override
            public void onSuccess(String s, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                //Sale successful
                //data is transaction key
                //extras is the Map passed in makeSale()
            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                //Sale failed
            }
        });
    }
    void makeSaleWithAmount(ReactApplicationContext context, double Amount, boolean showTransactionResult, Map<String, String> extras, TransactionCallback callback){
        extras.put("KEY_1", "Value 1");
        extras.put("KEY_2", "Value 2");
        PhosSdk.getInstance().makeSaleWithAmount(context, (double) 10, true, extras, new TransactionCallback() {
            @Override
            public void onSuccess(String s, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                //Sale successful
                //data is transaction key
                //extras is the Map passed in makeSaleWithAmount()
            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {
                //Sale failed
            }
        });
    }

};