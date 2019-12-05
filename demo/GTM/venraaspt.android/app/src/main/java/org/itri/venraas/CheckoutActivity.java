package org.itri.venraas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

public class CheckoutActivity extends AppCompatActivity {
    private Button buttonPortal;
    private Button buttonEdm;
    private Button buttonSearch;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkout);

        buttonPortal = findViewById(R.id.buttonPortal);
        buttonPortal.setOnClickListener(portal);
        buttonEdm = findViewById(R.id.buttonEDM);
        buttonEdm.setOnClickListener(edm);
        buttonSearch = findViewById(R.id.buttonSearch);
        buttonSearch.setOnClickListener(search);

        Venraaspt.getInstance().ven_order(MyApplication.getInstance().transI);

        WebView webview = (WebView) findViewById(R.id.webviewCheckout);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        //setContentView(webview);
        webview.setWebViewClient(new WebViewClient());
        String url = "https://venraas.github.io/demo/GTM/checkout_android.html";
        url += "?venguid=" + Venraaspt.getInstance().getVenGuid()
            + "&vensession=" + Venraaspt.getInstance().getVenSession()
            + "&amount=0&total=0";
        webview.loadUrl(url);
    }

    private View.OnClickListener portal = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            startActivity(new Intent(getApplicationContext(), MainActivity.class));
        }
    };

    private View.OnClickListener edm = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            startActivity(new Intent(getApplicationContext(), EdmActivity.class));
        }
    };

    private View.OnClickListener search = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            startActivity(new Intent(getApplicationContext(), SearchActivity.class));
        }
    };
}
