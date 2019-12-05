package org.itri.venraas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CartActivity extends AppCompatActivity {
    private Button buttonPortal;
    private Button buttonEdm;
    private Button buttonSearch;
    private Button buttonCheckout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart);

        buttonPortal = findViewById(R.id.buttonPortal);
        buttonPortal.setOnClickListener(portal);
        buttonEdm = findViewById(R.id.buttonEDM);
        buttonEdm.setOnClickListener(edm);
        buttonSearch = findViewById(R.id.buttonSearch);
        buttonSearch.setOnClickListener(search);
        buttonCheckout = findViewById(R.id.buttonCheckout);
        buttonCheckout.setOnClickListener(checkout);

        Venraaspt.getInstance().ven_cart(MyApplication.getInstance().transI);
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
            MyApplication.getInstance().keyword = "iPhone";
            startActivity(new Intent(getApplicationContext(), SearchActivity.class));
        }
    };

    private View.OnClickListener checkout = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            MyApplication.getInstance().transI = "{\"id\":null,\"ilist\":[{\"id\":\"" + MyApplication.getInstance().goodsId + "\"}]}";
            startActivity(new Intent(getApplicationContext(), CheckoutActivity.class));
        }
    };
}
