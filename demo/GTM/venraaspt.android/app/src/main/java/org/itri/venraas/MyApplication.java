package org.itri.venraas;

import android.app.Application;
import android.util.Log;

public class MyApplication extends Application {
    private static MyApplication mInstance;

    //add for venraaspt
    private Venraaspt venraaspt;
    public String categoryCode;
    public String goodsId;
    public String transI;
    public String nowRec;
    public String fromRec;
    public String keyword;

    public static synchronized MyApplication getInstance() {
        return mInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;

        Log.i("[MyApplication]", "initial venraaspt");
        venraaspt = Venraaspt.getInstance();
        venraaspt.ven_init("5guOvNnKn2", "venraas.github.io", "venraas.github.io", "venraas.github.io");
        //venraaspt.ven_init("9Rs7ZrElXm", "venraas.github.io", "venraas.github.io", "venraas.github.io");
        venraaspt.ven_uid("12345678");
    }
}
