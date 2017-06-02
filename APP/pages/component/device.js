/**
 * Created by boli on 2017/2/21.
 */
export default{
  browser(){
      var u=navigator.userAgent,
          deviceType;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
          deviceType=1;
          return deviceType;
      }else if(isiOS){
         deviceType=0;
          return deviceType;
      }
      else{
          deviceType=2;
          return deviceType;
      }
  },
    isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
}
