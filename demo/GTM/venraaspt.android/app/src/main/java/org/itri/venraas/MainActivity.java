package org.itri.venraas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStream;
import java.net.URL;

public class MainActivity extends AppCompatActivity {
    private Button buttonEdm;
    private Button buttonSearch;
    private Button buttonGoods;

    private JSONArray jGoods;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buttonEdm = findViewById(R.id.buttonEDM);
        buttonEdm.setOnClickListener(edm);
        buttonSearch = findViewById(R.id.buttonSearch);
        buttonSearch.setOnClickListener(search);
        buttonGoods = findViewById(R.id.buttonGoods);
        buttonGoods.setOnClickListener(goods);

        VenraasptCallback callback = new VenraasptCallback() {
            @Override
            public void recomdCallback(String result) {
                try {
                    JSONObject jObj = new JSONObject(result);
                    jGoods = jObj.getJSONArray("recomd_list");
                    Log.i("JSONObject", "recomd_list size=" + jGoods.length());
                    for (int i=0; i<jGoods.length(); i++) {
                        JSONObject obj = jGoods.getJSONObject(i);
                        showImage(i + 1, obj.getString("goods_img_url").replaceAll("http", "https"));
                    }
                } catch(Exception e) {
                    Log.i("JSONObject", e.toString());
                }
            }
        };

        Venraaspt.getInstance().ven_portal();
        Venraaspt.getInstance().ven_recomd("p", "ClickStream", 10, callback);
    }

    private void showImage(int idx, String url) {
        Log.i("showImage", "url=" + url);
        String imageID = "image" + idx;
        int resID = getResources().getIdentifier(imageID, "id", getPackageName());
        ImageView image = findViewById(resID);
        try {
            InputStream is = (InputStream) new URL(url).getContent();
            Drawable draw = Drawable.createFromStream(is, "src");
            image.setImageDrawable(draw);
        } catch (Exception e) {
            Log.i("showImage", e.toString());
        }
    }

    public void imageClick(View v) {
        int idx = 0;
        switch(v.getId()) {
            case R.id.image1:
                idx = 0;
                break;
            case R.id.image2:
                idx = 1;
                break;
            case R.id.image3:
                idx = 2;
                break;
            case R.id.image4:
                idx = 3;
                break;
            case R.id.image5:
                idx = 4;
                break;
            case R.id.image6:
                idx = 5;
                break;
            case R.id.image7:
                idx = 6;
                break;
            case R.id.image8:
                idx = 7;
                break;
            case R.id.image9:
                idx = 8;
                break;
            case R.id.image10:
                idx = 9;
                break;
        }
        Log.v("imageClick", "idx=" + idx);

        try {
            JSONObject obj = jGoods.getJSONObject(idx);
            MyApplication.getInstance().categoryCode = obj.getString("category_code");
            MyApplication.getInstance().goodsId = obj.getString("id");
            MyApplication.getInstance().keyword = "iPhone";
            MyApplication.getInstance().fromRec = null;
            MyApplication.getInstance().nowRec = null;
            Venraaspt.getInstance().jGoods = obj;
            startActivity(new Intent(getApplicationContext(), GoodsActivity.class));
        } catch (Exception e) {
            Log.i("imageClick", "idx=" + idx + ", " + e.toString());
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

    private View.OnClickListener goods = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            MyApplication.getInstance().categoryCode = "371150";
            MyApplication.getInstance().goodsId = "698196";
            MyApplication.getInstance().keyword = "iPhone";
            MyApplication.getInstance().fromRec = null;
            MyApplication.getInstance().nowRec = null;
            startActivity(new Intent(getApplicationContext(), GoodsActivity.class));
        }
    };
}
