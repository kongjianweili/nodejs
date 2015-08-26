
var session = (function ($){
    var sid = '';
    return {
        init : function (){
              sid = $.cookie('SESSION_ID');
        },
        id : function (ses){
            if(ses) {
                sid = ses;
                $.cookie('SESSION_ID',ses);
            }
            return sid;
        },
        clear : function (){
            $.removeCookie('SESSION_ID');
            sid = '';
        }
    }

})(jQuery);
