
/**
 * @name		cascade plugin
 * @author		wdk
 * @version 	1.0 
 */
$(function(){
    $.prototype.extend({Cascade:Cascade});
    function Cascade(settings){
        var defaults={
            data:"",
            dataType:"xml",
            value:[],
            name:[],
            depth:2,
            xmlToData:xmlToData,
            jsonToData:jsonToData
        };
        $.extend(defaults,settings);
        var Selects=$(this);
        defaults.depth=Selects.length;
        if($.type(defaults.data)=="object"){
            defaults.dataType="json";
            init(defaults.data);
        }else{
            $.ajax({
                url:defaults.data,
                type:"GET",
                dataType:defaults.dataType,
                success:init,
                error:function(){
                    alert("加载列表失败！")
                }
            });
        }
        function init(data) {

            if(defaults.dataType=="xml"){
                data=xmlToData(data.childNodes[0],defaults);
            }else if(defaults.dataType=="json"){
                data=jsonToData(data,defaults);
            }
            change(data);
            Selects.on("change",function(){
                var _self=$(this),value=_self.val(),index=0;
                //???
                for(var i=0;i<defaults.depth;i++){
                    if(this==Selects[i]){
                        index=i;
                    }
                }
                defaults.value[index]=value;
                ///!!!
                for(var i=index+1;i<defaults.depth;i++){
                    defaults.value[i]="";
                }
                change(data);
            });
        }
        //根据select的value设置option列表
        function change(data){
            for(var i=0;i<defaults.depth;i++){
                removeDropDownList(Selects[i]);
            }
            var list=data,count=0,optionIndex=0;
            while(list!=null&&count<defaults.depth) {
                for (var i = 0; i < list.length; i++) {
                    var option = document.createElement("option");
                    option.value = list[i].name;
                    option.text  = list[i].name;
                    if (defaults.value[count] == option.value) {
                        option.selected = true;
                        optionIndex = i;
                    }
                    Selects[count].add(option);
                }
                ///!!!
                if(defaults.value[count]==""){
                    optionIndex=0;
                }
                list = list[optionIndex].sub;
                count++;
            }
        }

        function removeDropDownList(Select) {
            if (Select) {
                var len = Select.options.length;
                if (len > 0) {
                    for (var i = len; i >= 0; i--) {
                        Select.remove(i);
                    }
                }
            }

        }

        function jsonToData(json,settings,depth){
            depth=depth||0;
            if(depth>=settings.depth) return null;
            var data=[];
            var list=json[settings.name[depth]];
            if(!list) return null;
            for(var i=0;i<list.length;i++){
                var subData=jsonToData(list[i],settings,depth+1);
                data.push({name:list[i].name||list[i],sub:subData});
            }
            depth++;
            return data==[]?null:data;
        }
        function xmlToData(xmlDoc,settings,depth){
            depth=depth||0;
            if(depth>=settings.depth) return null;
            var data=[];
            var list=xmlDoc.getElementsByTagName(settings.name[depth]);
            if(!list) return null;
            for(var i=0;i<list.length;i++){
                var subData=xmlToData(list[i],settings,depth+1);
                data.push({name:list[i].getAttribute("name"),sub:subData});
            }
            depth++;
            return data==[]?null:data;
        }
    }

});


 