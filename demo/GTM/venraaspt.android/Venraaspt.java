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
    //2020新增參數
    private String refInfo;
    private String wCategInfo;
    private String bCategInfo;

    public JSONObject jGoods = null;

    public static synchronized Venraaspt getInstance() {
        if (mInstance == null) {
            mInstance = new Venraaspt();
        }
        return mInstance;
    }

    private Venraaspt() {}

    /**
     * Venraaspt 使用前必須先呼叫ven_init設定必需的參數
     *
     * @param _serverLog  weblog server domain
     * @param _serverHermes  recomd server domain
     * @param _token  電商的token
     * @param _domain  電商的domain
     * @param _clientHost  　
     * @param _topHost  　
     * @param _venGuid  使用者的guid(null或""將會由server產生)
     *
     */
    public void ven_init(String _serverLog, String _serverHermes, String _token, String _domain,
                         String _clientHost, String _topHost, String _venGuid) {
        Log.i("[ven_init]", "serverLog='" + _serverLog + "', serverHermes='" + _serverHermes + "', token='" + _token + "', domain='" + _domain + "'");
        this.serverLog = _serverLog;
        this.serverHermes = _serverHermes;
        this.token = _token;
        this.domain = _domain;
        this.clientHost = _clientHost;
        this.topHost = _topHost;
        this.venGuid = _venGuid;
        new Thread(new Runnable() {
            @Override
            public void run() {
                if ((venGuid == null) || (venGuid.length() == 0)) {
                    venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                }
                venSession = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=s&pt=a");
            }}).start();
    }

    /**
     * 讀取使用者的guid
     *
     * @return 使用者的guid(venGuid)
     *
     */
    public String ven_getVenGuid() {
        return this.venGuid;
    }

    /**
     * 設定使用者的帳號
     *
     * @param userId  使用者的帳號
     *
     */
    public void ven_uid(String userId) {
        this.userId = userId;
    }

    /**
     * 讀取使用者的帳號
     *
     * @return userId  使用者的帳號
     *
     */
    public String ven_getUid() {
        return this.userId;
    }

    /**
     * webLog for portal(首頁)
     *
     */
    public void ven_portal() {
        ven_clear();
        ven_log("pageload", "p");
    }

    /**
     * webLog for eDM(廣告頁)
     *
     */
    public void ven_edm() {
        ven_clear();
        ven_log("pageload", "edm");
    }

    /**
     * webLog for search(搜尋頁)
     *
     * @param keyword 搜尋字串
     *
     */
    public void ven_search(String keyword) {
        ven_clear();
        this.keyword = keyword;
        ven_log("pageload", "sep");
    }

    /**
     * webLog for category(分類頁)
     *
     * @param categoryCode 分類頁代碼
     *
     */
    public void ven_category(String categoryCode) {
        ven_clear();
        this.categoryCode = categoryCode;
        ven_log("pageload", "cap");
    }

    /**
     * webLog for goods(商品頁)
     *
     * @param categoryCode 分類頁代碼
     * @param goodsId 商品代碼
     * @param keyword 搜尋字串
     * @param fromRec 來源推薦方式代碼
     *
     */
    public void ven_goods(String categoryCode, String goodsId, String keyword, String fromRec) {
        ven_clear();
        this.categoryCode = categoryCode;
        this.goodsId = goodsId;
        this.keyword = keyword;
        this.fromRec = fromRec;
        ven_log("pageload", "gop");
    }

    /**
     * webLog for cart(購物車頁)
     *
     * @param transI 購物車資訊
     *
     */
    public void ven_cart(String transI) {
        ven_clear();
        this.transI = transI;
        ven_log("cartload", "scp");
    }

    /**
     * webLog for order(結帳頁)
     *
     * @param transI 結帳資訊
     *
     */
    public void ven_order(String transI) {
        ven_clear();
        this.transI = transI;
        ven_log("checkout", "orp");
    }

    /**
     * webLog for user define
     *
     * @param _action pageload, cartload, checkout, cartadd, reccall
     * @param _pageType p, edm, sep, cap, gop, scp, orp...
     *
     */
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
                params += "}";
                try {
                    params = java.net.URLEncoder.encode(params, "UTF-8");
                }
                catch (Exception e) {
                    Log.i("[ven_log]", "Exception='" + e.toString() + "'");
                }
                httpPost("https://" + serverLog + apiLog, "application/x-www-form-urlencoded;charset=UTF-8", params);
            }}).start();
    }

    /**
     * webLog for 商品放入購物車時呼叫
     *
     * @param _goodsId 商品代碼
     *
     */
    public void ven_cartAdd(String _goodsId) {
        this.goodsId = _goodsId;

        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.i("[ven_cartAdd]", "venGuid='" + venGuid + "'");
                if (check_venGuid() == false) {
                    venGuid = httpGet("https://" + serverLog + apiUuid + "?id=" + domain + "&typ=g&pt=a");
                }
                Log.i("[ven_cartAdd]", "venSession='" + venSession + "'");
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
                params += "}";
                try {
                    params = java.net.URLEncoder.encode(params, "UTF-8");
                }
                catch (Exception e) {
                    Log.i("[ven_cartAdd]", "Exception='" + e.toString() + "'");
                }
                httpPost("https://" + serverLog + apiLog, "application/x-www-form-urlencoded;charset=UTF-8", params);
            }
        }).start();
    }

    /**
     * venraas ref_info for 商品推薦(購物車頁面)
     * "ref_info":[{"gid":"123"},{"gid":"456"}]
     *
     * @param _refInfo
     *
     */
    public void ven_refInfo(String _refInfo) {
        this.refInfo = _refInfo;
    }

    /**
     * venraas w_categ_info for 商品推薦
     * "w_categ_info":[ { "code":"368156" } ]
     *
     * @param _wCategInfo
     *
     */
    public void ven_wCategInfo(String _wCategInfo) {
        this.wCategInfo = _wCategInfo;
    }

    /**
     * venraas b_categ_info for 商品推薦
     * "b_categ_info":[ { "code":"368156" } ]
     *
     * @param _bCategInfo
     *
     */
    public void ven_bCategInfo(String _bCategInfo) {
        this.bCategInfo = _bCategInfo;
    }

    /**
     * 商品推薦
     *
     * @param recPos p, cap, gop...
     * @param recType AlsoView, ClickStream
     * @param rowItems 推薦數量
     * @param callback callback函數
     *
     */
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

                String params = "";
                params += "{\"token\":\"" + token + "\"";
                params += ",\"rec_pos\":\"" + recPos + "\"";
                params += ",\"rec_type\":\"" + recType + "\"";
                if ((categoryCode != null) && (categoryCode.trim().length() > 0)) {
                    params += ",\"categ_code\":\"" + categoryCode + "\"";
                }
                if (recPos.equalsIgnoreCase("scp") || recPos.equalsIgnoreCase("favor")) {
                    if ((refInfo != null) && (refInfo.trim().length() > 0)) {
                        params += ",\"ref_info\":\"" + refInfo + "\"";
                    }
                }
                if ((wCategInfo != null) && (wCategInfo.trim().length() > 0)) {
                    params += ",\"w_categ_info\":\"" + wCategInfo + "\"";
                }
                if ((bCategInfo != null) && (bCategInfo.trim().length() > 0)) {
                    params += ",\"b_categ_info\":\"" + bCategInfo + "\"";
                }
                params += ",\"device\":\"" + device + "\"";
                params += ",\"ven_guid\":\"" + venGuid + "\"";
                params += ",\"ven_session\":\"" + venSession + "\"";
                params += ",\"topk\":" + rowItems;
                params += "}";
                String result = httpPost("https://" + serverHermes + apiHermes, "application/json;charset=UTF-8", params);
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

    /**
     * webLog for 紀錄推薦方式
     *
     * @param _nowRec 推薦方式代碼
     *
     */
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
        params += "}";
        try {
            params = java.net.URLEncoder.encode(params, "UTF-8");
        }
        catch (Exception e) {
            Log.i("[ven_reccall]", "Exception='" + e.toString() + "'");
        }
        httpPost("https://" + serverLog + apiLog, "application/x-www-form-urlencoded;charset=UTF-8", params);
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

    private String httpPost(String url, String contentType, String postData) {
        Log.i("[httpPost]", "url='" + url + "'\npostData='" + postData + "'");
        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestProperty("Content-Type", contentType);
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
