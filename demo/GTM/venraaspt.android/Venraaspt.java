package org.itri.venraaspt;

import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;


public class Venraaspt {
    private static Venraaspt mInstance;

    private final String apiUuid = "/venapis/vengu";
    private final String apiLog = "/venapis/log";
    private final String apiHermes = "/hermes/api/goods/rank";

    private String serverLog;
    private String serverHermes;

    private String token;
    private String domain;
    private String clientHost;
    private String topHost;
    private String venGuid;
    private String venSession;

    private String userId;
    private String action;
    private String pageType;
    private String categoryCode;
    private String goodsId;
    private String transI;
    private String nowRec;
    private String fromRec;
    private String device = "mbe";
    private String keyword;

    public JSONObject jGoods = null;

    public static synchronized Venraaspt getInstance() {
        if (mInstance == null) {
            mInstance = new Venraaspt();
        }
        return mInstance;
    }

    private Venraaspt() {}

    public void ven_init(final String serverLog, final String serverHermes, String token, final String domain, String clientHost, String topHost) {
        Log.i("[ven_init]", "serverLog='" + serverLog + "', serverHermes='" + serverHermes + "', token='" + token + "', domain='" + domain + "'");
        this.serverLog = serverLog;
        this.serverHermes = serverHermes;
        this.token = token;
        this.domain = domain;
        this.clientHost = clientHost;
        this.topHost = topHost;
        new Thread(new Runnable() {
            @Override
            public void run() {
                venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                venSession = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=s&pt=a");
        }}).start();
    }

    //設定user id
    public void ven_uid(String userId) {
        this.userId = userId;
    }

    //頁面瀏覽紀錄
    public void ven_portal() {
        ven_clear();
        ven_log("pageload", "p");
    }

    public void ven_edm() {
        ven_clear();
        ven_log("pageload", "edm");
    }

    public void ven_search(String keyword) {
        ven_clear();
        this.keyword = keyword;
        ven_log("pageload", "sep");
    }

    public void ven_category(String categoryCode) {
        ven_clear();
        this.categoryCode = categoryCode;
        ven_log("pageload", "cap");
    }

    public void ven_goods(String categoryCode, String goodsId, String keyword, String fromRec, String nowRec) {
        ven_clear();
        this.categoryCode = categoryCode;
        this.goodsId = goodsId;
        this.keyword = keyword;
        this.fromRec = fromRec;
        this.nowRec = nowRec;
        ven_log("pageload", "gop");
    }

    public void ven_cart(String transI) {
        ven_clear();
        this.transI = transI;
        ven_log("cartload", "scp");
    }

    public void ven_order(String transI) {
        ven_clear();
        this.transI = transI;
        ven_log("checkout", "orp");
    }

    public void ven_log(String _action, String _pageType) {
        this.action = _action;
        this.pageType = _pageType;

        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.i("[ven_log]", "venGuid='" + venGuid + "'");
                if (check_venGuid() == false) {
                    venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                }
                Log.i("[ven_log]", "venSession='" + venSession + "'");
                if (check_venSession() == false) {
                    venSession = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=s&pt=a");
                }

                Calendar cal = Calendar.getInstance();
                int zoneOffset = -((cal.get(Calendar.ZONE_OFFSET) + cal.get(Calendar.DST_OFFSET)) / 60000);
                //Log.i("[ven_log]", "client_utc:" + cal.getTime().getTime());
                //Log.i("[ven_log]", "client_tzo:" + zoneOffset);

                String params;
                params = action + "={"
                        + "\"token\":\"" + token + "\""
                        + ",\"page_type\":\"" + pageType + "\""
                        + ",\"action\":\"" + action + "\""
                        + ",\"client_host\":\"" + clientHost + "\""
                        + ",\"tophost\":\"" + topHost + "\""
                        + ",\"device\":\"" + device + "\""
                        + ",\"client_utc\":" + cal.getTime().getTime()
                        + ",\"client_tzo\":" + zoneOffset;

                if ((userId != null) && (userId.trim().length() > 0)) {
                    params += ",\"uid\":\"" + userId + "\"";
                }
                else {
                    params += ",\"uid\":null";
                }
                if ((categoryCode != null) && (categoryCode.trim().length() > 0)) {
                    params += ",\"categ_code\":\"" + categoryCode + "\"";
                }
                else {
                    params += ",\"categ_code\":null";
                }
                if ((goodsId != null) && (goodsId.trim().length() > 0)) {
                    params += ",\"gid\":\"" + goodsId + "\"";
                }
                else {
                    params += ",\"gid\":null";
                }
                if ((transI != null) && (transI.trim().length() > 0)) {
                    params += ",\"trans_i\":\"" + transI + "\"";
                }
                else {
                    params += ",\"trans_i\":null";
                }
                if ((nowRec != null) && (nowRec.trim().length() > 0)) {
                    params += ",\"now_rec\":\"" + nowRec + "\"";
                }
                else {
                    params += ",\"now_rec\":null";
                }
                if ((fromRec != null) && (fromRec.trim().length() > 0)) {
                    params += ",\"from_rec\":\"" + fromRec + "\"";
                }
                else {
                    params += ",\"from_rec\":null";
                }
                if ((venGuid != null) && (venGuid.trim().length() > 0)) {
                    params += ",\"ven_guid\":\"" + venGuid + "\"";
                }
                else {
                    params += ",\"ven_guid\":null";
                }
                if ((venSession != null) && (venSession.trim().length() > 0)) {
                    params += ",\"ven_session\":\"" + venSession + "\"";
                }
                else {
                    params += ",\"ven_session\":null";
                }
                if ((keyword != null) && (keyword.trim().length() > 0)) {
                    params += ",\"keyword\":\"" + keyword + "\"";
                }
                else {
                    params += ",\"keyword\":null";
                }
                params += "\"}";
                httpPost("https://" + serverLog + apiLog, params);
        }}).start();
    }

    //商品放入購物車時呼叫
    public void ven_cartAdd(String _goodsId) {
        this.goodsId = _goodsId;

        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.i("[ven_log]", "venGuid='" + venGuid + "'");
                if (check_venGuid() == false) {
                    venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                }
                Log.i("[ven_log]", "venSession='" + venSession + "'");
                if (check_venSession() == false) {
                    venSession = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=s&pt=a");
                }

                Calendar cal = Calendar.getInstance();
                int zoneOffset = -((cal.get(Calendar.ZONE_OFFSET) + cal.get(Calendar.DST_OFFSET)) / 60000);

                String params;
                params = "cartadd={"
                        + "\"token\":\"" + token + "\""
                        + ",\"page_type\":\"" + pageType + "\""
                        + ",\"action\":\"cartadd\""
                        + ",\"client_host\":\"" + clientHost + "\""
                        + ",\"tophost\":\"" + topHost + "\""
                        + ",\"device\":\"" + device + "\""
                        + ",\"client_utc\":" + cal.getTime().getTime()
                        + ",\"client_tzo\":" + zoneOffset;

                if ((userId != null) && (userId.trim().length() > 0)) {
                    params += ",\"uid\":\"" + userId + "\"";
                }
                else {
                    params += ",\"uid\":null";
                }
                if ((categoryCode != null) && (categoryCode.trim().length() > 0)) {
                    params += ",\"categ_code\":\"" + categoryCode + "\"";
                }
                else {
                    params += ",\"categ_code\":null";
                }
                if ((goodsId != null) && (goodsId.trim().length() > 0)) {
                    params += ",\"gid\":\"" + goodsId + "\"";
                }
                else {
                    params += ",\"gid\":null";
                }
                if ((transI != null) && (transI.trim().length() > 0)) {
                    params += ",\"trans_i\":\"" + transI + "\"";
                }
                else {
                    params += ",\"trans_i\":null";
                }
                if ((nowRec != null) && (nowRec.trim().length() > 0)) {
                    params += ",\"now_rec\":\"" + nowRec + "\"";
                }
                else {
                    params += ",\"now_rec\":null";
                }
                if ((fromRec != null) && (fromRec.trim().length() > 0)) {
                    params += ",\"from_rec\":\"" + fromRec + "\"";
                }
                else {
                    params += ",\"from_rec\":null";
                }
                if ((venGuid != null) && (venGuid.trim().length() > 0)) {
                    params += ",\"ven_guid\":\"" + venGuid + "\"";
                }
                else {
                    params += ",\"ven_guid\":null";
                }
                if ((venSession != null) && (venSession.trim().length() > 0)) {
                    params += ",\"ven_session\":\"" + venSession + "\"";
                }
                else {
                    params += ",\"ven_session\":null";
                }
                if ((keyword != null) && (keyword.trim().length() > 0)) {
                    params += ",\"keyword\":\"" + keyword + "\"";
                }
                else {
                    params += ",\"keyword\":null";
                }
                params += "\"}";
                httpPost("https://" + serverLog + apiLog, params);
            }
        }).start();
    }

    //推薦
    public void ven_recomd(final String recPos, final String recType, final int rowItems, final VenraasptCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.i("[ven_recomd]", "venGuid='" + venGuid + "'");
                if (check_venGuid() == false) {
                    venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                }
                Log.i("[ven_recomd]", "venSession='" + venSession + "'");
                if (check_venSession() == false) {
                    venSession = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=s&pt=a");
                }

                String params = null;
                params = "{\"token\":\"" + token + "\""
                        + ",\"rec_pos\":\"" + recPos + "\""
                        + ",\"rec_type\":\"" + recType + "\""
                        + ",\"device\":\"" + device + "\""
                        + ",\"ven_guid\":\"" + venGuid + "\""
                        + ",\"ven_session\":\"" + venSession + "\""
                        + ",\"topk\":" + rowItems
                        + "}";
                String result = httpPost("https://" + serverHermes + apiHermes, params);
                Log.i("[ven_recomd]", "result='" + result + "'");

                try {
                    JSONObject jObj = new JSONObject(result);
                    ven_reccall(jObj.getString("recomd_id"));
                } catch (Exception e) {
                    Log.i("[ven_recomd]", "Exception='" + e.toString() + "'");
                }

                callback.recomdCallback(result);
            }
        }).start();
    }

    private void ven_reccall(String _nowRec) {
        this.nowRec = _nowRec;

        Calendar cal = Calendar.getInstance();
        int zoneOffset = -((cal.get(Calendar.ZONE_OFFSET) + cal.get(Calendar.DST_OFFSET)) / 60000);

        String params;
        params = "reccall={"
                + "\"token\":\"" + token + "\""
                + ",\"page_type\":\"" + pageType + "\""
                + ",\"action\":\"reccall\""
                + ",\"client_host\":\"" + clientHost + "\""
                + ",\"tophost\":\"" + topHost + "\""
                + ",\"device\":\"" + device + "\""
                + ",\"client_utc\":" + cal.getTime().getTime()
                + ",\"client_tzo\":" + zoneOffset;

        if ((userId != null) && (userId.trim().length() > 0)) {
            params += ",\"uid\":\"" + userId + "\"";
        } else {
            params += ",\"uid\":null";
        }
        if ((categoryCode != null) && (categoryCode.trim().length() > 0)) {
            params += ",\"categ_code\":\"" + categoryCode + "\"";
        } else {
            params += ",\"categ_code\":null";
        }
        if ((goodsId != null) && (goodsId.trim().length() > 0)) {
            params += ",\"gid\":\"" + goodsId + "\"";
        } else {
            params += ",\"gid\":null";
        }
        if ((transI != null) && (transI.trim().length() > 0)) {
            params += ",\"trans_i\":\"" + transI + "\"";
        } else {
            params += ",\"trans_i\":null";
        }
        if ((nowRec != null) && (nowRec.trim().length() > 0)) {
            params += ",\"now_rec\":\"" + nowRec + "\"";
        } else {
            params += ",\"now_rec\":null";
        }
        if ((fromRec != null) && (fromRec.trim().length() > 0)) {
            params += ",\"from_rec\":\"" + fromRec + "\"";
        } else {
            params += ",\"from_rec\":null";
        }
        if ((venGuid != null) && (venGuid.trim().length() > 0)) {
            params += ",\"ven_guid\":\"" + venGuid + "\"";
        } else {
            params += ",\"ven_guid\":null";
        }
        if ((venSession != null) && (venSession.trim().length() > 0)) {
            params += ",\"ven_session\":\"" + venSession + "\"";
        } else {
            params += ",\"ven_session\":null";
        }
        if ((keyword != null) && (keyword.trim().length() > 0)) {
            params += ",\"keyword\":\"" + keyword + "\"";
        } else {
            params += ",\"keyword\":null";
        }
        params += "\"}";
        httpPost("https://" + serverLog + apiLog, params);
    }

    //private function
    private void ven_clear() {
        this.action = null;
        this.pageType = null;
        this.categoryCode = null;
        this.goodsId = null;
        this.transI = null;
        this.nowRec = null;
        this.fromRec = null;
        this.keyword = null;
    }

    private String httpGet(String url) {
        Log.i("[httpGet]", "url='" + url + "'");
        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoInput(true);
            conn.setDoOutput(true);
            int responseCode = conn.getResponseCode();
            Log.i("[httpGet]", "responseCode: " + responseCode);
            if (responseCode == HttpURLConnection.HTTP_OK) { // connection ok
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    Log.i("[httpGet]", "inputLine='" + inputLine + "'");
                    response.append(inputLine);
                }
                in.close();
                Log.i("[httpGet]", "response='" + response.toString() + "'");
                return response.toString();
            }
            else {
                return "";
            }
        }
        catch (Exception e) {
            Log.i("[httpGet]", "Exception='" + e.toString() + "'");
            return "";
        }
    }

    private String httpPost(String url, String postData) {
        Log.i("[httpPost]", "url='" + url + "'\npostData='" + postData + "'");
        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setReadTimeout(20000);
            conn.setConnectTimeout(20000);
            conn.setRequestMethod("POST");
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setUseCaches(false);

            OutputStream os = conn.getOutputStream();
            DataOutputStream writer = new DataOutputStream(os);
            writer.writeBytes(postData);
            writer.flush();
            writer.close();
            os.close();

            //Get Response
            InputStream is = conn.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            reader.close();

            Log.i("[httpPose]", "response='" + response.toString() + "'");
            return response.toString();
        }
        catch (Exception e) {
            Log.i("[httpPost]", "Exception='" + e.toString() + "'");
            return "";
        }
    }

    private boolean check_venGuid() {
        Log.i("[check_venGuid]", "venGuid='" + venGuid + "'");
        for (int i=0; i<30; i++) {
            if ((venGuid == null) || (venGuid.trim().length() == 0)) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                Log.i("[check_venGuid]", "[" + i + "]");
            }
            else {
                return true;
            }
        }
        return false;
    }

    private boolean check_venSession() {
        Log.i("[check_venSession]", "venSession='" + venSession + "'");
        for (int i=0; i<30; i++) {
            if ((venSession == null) || (venSession.trim().length() == 0)) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                Log.i("[check_venSession]", "[" + i + "]");
            }
            else {
                return true;
            }
        }
        return false;
    }

    public String getVenGuid() {
        return venGuid;
    }

    public String getVenSession() {
        return venSession;
    }
}
