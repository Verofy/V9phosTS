import PhosModule from "../components/PhosModule";
import { NativeModules } from "react-native";

import React from "react";

//const { PhosModule, SDK } = NativeModules;

export function processPayment() {
  console.log("called")
  console.log(PhosModule)
  //console.log(NativeModules.ModuleRegistryAdapter)
}