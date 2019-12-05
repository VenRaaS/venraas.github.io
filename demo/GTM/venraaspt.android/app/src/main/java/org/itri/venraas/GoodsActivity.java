package org.itri.venraas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import org.json.JSONObject;

import java.io.InputStream;
import java.net.URL;

public class GoodsActivity extends AppCompatActivity {
    private Button buttonPortal;
    private Button buttonEdm;
    private Button buttonSearch;
    private Button buttonCategory;
    private Button buttonCart;
    private Button buttonAddCart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.i("[GoodsActivity]", "onCreate");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_goods);

        buttonPortal = findViewById(R.id.buttonPortal);
        buttonPortal.setOnClickListener(portal);
        buttonEdm = findViewById(R.id.buttonEDM);
        buttonEdm.setOnClickListener(edm);
        buttonSearch = findViewById(R.id.buttonSearch);
        buttonSearch.setOnClickListener(search);
        buttonCategory = findViewById(R.id.buttonCategory);
        buttonCategory.setOnClickListener(category);
        buttonCart = findViewById(R.id.buttonCart);
        buttonCart.setOnClickListener(cart);
        buttonAddCart = findViewById(R.id.buttonAddCart);
        buttonAddCart.setOnClickListener(addcart);

        Venraaspt.getInstance().ven_goods(
                MyApplication.getInstance().categoryCode,
                MyApplication.getInstance().goodsId,
                MyApplication.getInstance().keyword,
                MyApplication.getInstance().fromRec,
                MyApplication.getInstance().nowRec);

        JSONObject jObj = Venraaspt.getInstance().jGoods;
        if (jObj != null) {
            try {
                final String url = jObj.getString("goods_img_url").replaceAll("http://", "https://");
                Log.i("showImage", "url=" + url);
                try {
                    ImageView image = findViewById(R.id.image);
                    new DownloadImageTask(image).execute(url);
                } catch (Exception e) {
                    Log.i("showImage", e.toString());
                }
            } catch(Exception e) {
                Log.i("JSONObject", e.toString());
            }

        }
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;
        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap bmp = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                bmp = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("[doInBackground]", e.getMessage());
                e.printStackTrace();
            }
            return bmp;
        }
        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
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

    private View.OnClickListener category = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            //MyApplication.getInstance().categoryCode = "371150";
            startActivity(new Intent(getApplicationContext(), CategoryActivity.class));
        }
    };

    private View.OnClickListener cart = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            MyApplication.getInstance().transI = "{\"id\":null,\"ilist\":[{\"id\":\"" + MyApplication.getInstance().goodsId + "\"}]}";
            startActivity(new Intent(getApplicationContext(), CartActivity.class));
        }
    };

    private View.OnClickListener addcart = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            //call venraaspt function must use Thread
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Venraaspt.getInstance().ven_cartAdd(MyApplication.getInstance().goodsId);
                }
            }).start();
        }
    };
}
