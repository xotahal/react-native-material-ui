package com.material.ui;

import android.content.Intent;
import android.app.Activity;
import android.view.View;
import android.graphics.Color;
import android.widget.TextView;
import android.support.design.widget.Snackbar;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ActivityEventListener;

import java.util.Map;
import java.util.HashMap;

public class MaterialUISnackBarModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  private Snackbar mUISnackBar = null;

  private static final String LENGTH_SHORT = "SHORT";
  private static final String LENGTH_LONG = "LONG";
  private static final String LENGTH_INDEFINITE = "INDEFINITE";

  private static final int COLOR_BACKGROUND = -13487566; // default #323232
  private static final int COLOR_TEXT = Color.WHITE;

  public MaterialUISnackBarModule(ReactApplicationContext reactContext) {
    super(reactContext);

    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return "MaterialUISnackBar";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(LENGTH_SHORT, Snackbar.LENGTH_SHORT);
    constants.put(LENGTH_LONG, Snackbar.LENGTH_LONG);
    constants.put(LENGTH_INDEFINITE, Snackbar.LENGTH_INDEFINITE);
    return constants;
  }

  @ReactMethod
  public void show(String message, int duration, boolean hideOnClick, int actionColor, String actionLabel, final Callback actionCallback) {
    Activity currentActivity = getCurrentActivity();

    View view = currentActivity.findViewById(android.R.id.content);
    mUISnackBar = Snackbar.make(view, message, duration);

    // Sets the text color of the action
    mUISnackBar.setActionTextColor(actionColor);

    // if hide on click, show an action to dismiss
    // otherwise a custom action
    if (hideOnClick) {
      mUISnackBar.setAction("Dismiss", new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          mUISnackBar.dismiss();
        }
      });
    } else if (actionLabel != null && actionCallback != null) {
      mUISnackBar.setAction(actionLabel, new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          mUISnackBar.dismiss();
          actionCallback.invoke();
        }
      });
    }

    // show sbackbar
    mUISnackBar.show();
  }

  @ReactMethod
  public void dismiss() {
    if (mUISnackBar == null) {
      return;
    }

    mUISnackBar.dismiss();
    mUISnackBar = null;
  }

  @Override
  public void onActivityResult(final int requestCode, final int resultCode, final Intent intent) {

  }
}