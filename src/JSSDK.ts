type mergeType = string | number;
export default class JSSDK {
    
   /** 
    * @param phone 待检验的手机号码，可以字符类型和数字
    */
   isTelephone(phone: mergeType): boolean {
       return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phone.toString());
   }


}