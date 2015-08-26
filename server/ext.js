String.prototype.cdata = function (){
    return '<![CDATA[' + this.replace(new RegExp(']]>','g'),']]><![CDATA[') + ']]>';
}
