import React from 'react';
import pickers from '../../pickers.json'
let pickerComponents = {
  PubKeyPicker: require('./PubKeyPicker'),
  AmountPicker: require('./AmountPicker'),
  AssetPicker: require('./AssetPicker'),
  CursorPicker: require('./CursorPicker'),
  LedgerPicker: require('./LedgerPicker'),
  LimitPicker: require('./LimitPicker'),
  OperationPicker: require('./OperationPicker'),
  OrderPicker: require('./OrderPicker'),
  TransactionPicker: require('./TransactionPicker'),
}

/**
Usage example:
  Picker('source_account', { onUpdate: this.onUpdateHandler, key: index })

Required props:
  onUpdate

Optional props:
  forceError
  forceDirty
  optional (which needs to be renamed to required)
  key
  customLabel

**/
export default function(type, props) {
  if (!('key' in props)) {
    props.key = type;
  }
  props.type = type;

  if (!('label' in props)) {
    throw new Error(`Missing label in Picker props. Check the code where you call the Picker function.`);
  }
  if (!(type in pickers)) {
    throw new Error(`Picker type ${type} not found in pickers.json`);
  }

  let pickerType;
  pickerType = pickers[type].component;

  let PickerComponent = pickerComponents[pickers[type].component];
  return <PickerComponent {...props} />;
}
