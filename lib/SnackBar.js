'use strict';

import { NativeModules, processColor } from 'react-native';

var NativeSnackbar = NativeModules.MaterialUISnackBar;
const defaultActionColor = '#EEFF41';
export default class Snackbar {

  static show(message = "Hello I'm a SnackBar", options = {}) {
    let hideOnClick = false;
    let {
      actionColor = defaultActionColor,
      actionLabel = null,
      actionCallback= null,
      duration = false
    } = options;

    // show custom action label if set - with callback
    if (actionLabel && actionCallback) {
      if (!duration) {
        duration = NativeSnackbar.INDEFINITE;
      }
    } else {
      // without custom action labels, modify duration
      if (!duration) {
        duration = NativeSnackbar.SHORT;
      } else if (duration === 'indefinite') {
        duration = NativeSnackbar.INDEFINITE;
        hideOnClick = true;
      }
    }

    NativeSnackbar.show(
      message,
      duration,
      hideOnClick,
      processColor(actionColor),
      actionLabel,
      actionCallback
    );
  }
}
