package org.itri.venraaspt;

public interface VenraasptCallback {
    /**
     * 呼叫ven_recomd後, 會呼叫此函數
     *
     * @param result  呼叫ven_recomd後, server傳回的結果.
     *
     */
    void recomdCallback(String result);
}
