(function ($){
    angular.module('myApp')
    .directive('restApi',function ($http){
        return {
            scope : {
                response : '&response',
                validate : '&validate',
                url : '=restApi',
                model : '=model'
            },
            link : function (scope,elem,attr){

                elem.submit(function (datas){
                    var json = {};
                    if(scope.model){
                        json = scope.model;
                    }
                    else {
                        $.each(elem.serializeArray(),function (index,val){
                            json[val.name] = val.value;
                        });
                    }
                    if(scope.validate({data:json}) != false){
                        $http({
                            url : scope.url,
                            method : attr.method,
                            data : json
                        }).error(function (){
                            alert('서버와의 통신에 실패하였습니다.');
                        }).success(function (d){
                            scope.response({data:d});
                        });
                    }

                    return false;
                });
            }
        }
    });

})(jQuery);
