package com.v9phosts;

import android.content.Context;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

import digital.paynetics.phos.PhosSdk;
import digital.paynetics.phos.exceptions.PhosException;
import digital.paynetics.phos.sdk.callback.AuthCallback;
import digital.paynetics.phos.sdk.callback.InitCallback;
import digital.paynetics.phos.sdk.callback.TransactionCallback;

public class PhosModule extends ReactContextBaseJavaModule{
    PhosModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "PhosModule";
    }

    void init(ReactContext reactContext, InitCallback callback){
        PhosSdk.getInstance().init(reactContext.getApplicationContext(), new InitCallback() {
            @Override
            public void onSuccess(Void unused, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {

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

            }

            @Override
            public void onFailure(PhosException e, @Nullable @org.jetbrains.annotations.Nullable Map<String, String> map) {

            }
        });
    };
    void makeSale(Context context, boolean showTransactionResult, Map<String, String> extras, TransactionCallback callback){
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
    void makeSaleWithAmount(Context context, double Amount, boolean showTransactionResult, Map<String, String> extras, TransactionCallback callback){

    }
};