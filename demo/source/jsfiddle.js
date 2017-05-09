/**
 * Created by Joey on 2017/2/15.
 */
jQuery(function($){amcharts2.defaultTheme="light";var theme=amcharts2.getQueryVar("theme");if(!theme)
    theme=amcharts2.defaultTheme;amcharts2.amchartsSwitchDemoTheme(theme,true);$(".theme-switcher a").on("click",function(){amcharts2.amchartsSwitchDemoTheme($(this).data("theme"));});if(typeof amchartsDemoControls!=='undefined'){var int=setInterval(function(){if(AmCharts.charts.length===0||AmCharts.charts[0].chartCreated){clearInterval(int);amcharts2.initDemoControls();}},100)}else{amchartsDemoControls=[];}
    $("#btn-show").on("click",function(){var action=$(this).data("type");var resources=[];for(var i=0;i<demoData.resources.length;i++){var resource=demoData.resources[i];if(resource.match(/\.css/))
        resources.push("<link rel=\"stylesheet\" href=\""+ resource+"\" type=\"text/css\" media=\"all\" />");else
        resources.push("<script src=\""+ resource+"\"></script>");}
        var addCss="";if(amcharts2.currentDemoTheme=="dark")
            addCss="body { background-color: #30303d; color: #fff; }\n";else if(amcharts2.currentDemoTheme=="black")
            addCss="body { background-color: #000; color: #fff; }\n";else if(amcharts2.currentDemoTheme=="chalk")
            addCss="body { background-color: #3f3e3b; color: #fff; }\n";if(action=="source"){var source="";if(demoData.css!="")
            source+="<!-- Styles -->\n"+"<style>\n"+ addCss+ demoData.css+"\n</style>\n\n";source+="<!-- Resources -->\n"+
            resources.join("\n")+"\n\n";source+="<!-- Chart code -->\n"+"<script>\n"+ demoData.javascript+"\n</script>\n\n";source+="<!-- HTML -->\n"+
            demoData.html;amcharts2.showModal("<pre>"+ amcharts2.encodeChars(source)+"</pre>","Source of the demo");}else if(action=="codepen"){jQuery("#codepen-form").remove();var form=jQuery("<form>").attr({"method":"post","id":"codepen-form","target":"_blank","action":"https://codepen.io/pen/define"}).css("display","none").appendTo("body");var field=jQuery("<input>").attr({"type":"hidden","name":"data","value":JSON.stringify({"title":demoData.title,"description":demoData.description,"html":resources.join("\n")+"\n"+ demoData.html,"js":demoData.javascript,"css":addCss+ demoData.css,"js_external":"https://code.jquery.com/jquery-1.11.2.min.js"})});form.append(field).submit();}else if(action=="jsfiddle"){jQuery("#jsfiddle-form").remove();var form=jQuery("<form>").attr({"method":"post","id":"jsfiddle-form","target":"_blank","action":"http://jsfiddle.net/api/post/library/pure/"}).css("display","none").appendTo("body");jQuery("<input>").attr({"type":"hidden","name":"title","value":demoData.title}).appendTo(form);jQuery("<input>").attr({"type":"hidden","name":"description","value":demoData.description}).appendTo(form);jQuery("<input>").attr({"type":"hidden","name":"html","value":resources.join("\n")+"\n"+ demoData.html}).appendTo(form);jQuery("<input>").attr({"type":"hidden","name":"js","value":demoData.javascript}).appendTo(form);jQuery("<input>").attr({"type":"hidden","name":"css","value":addCss+ demoData.css}).appendTo(form);jQuery("<input>").attr({"type":"hidden","name":"wrap","value":"b"}).appendTo(form);form.submit();}});});amcharts2.amchartsSwitchDemoTheme=function(theme,skipDemoUpdate){var $=jQuery;if(amcharts2.currentDemoTheme==theme)
    return;if($(".theme-button-"+ theme+":first").length===0)
    theme=amcharts2.defaultTheme;if(skipDemoUpdate!==true){var l=window.location;var newUrl=l.protocol+"//"+ l.hostname+ l.pathname;if(theme!=amcharts2.defaultTheme){newUrl+="?theme="+ theme;}
    newUrl+=l.hash;if(history.replaceState)
        history.replaceState({},document.title,newUrl);else{window.location=newUrl;return;}}
    if(amcharts2.currentDemoTheme)
        $("body").removeClass("demo-theme-"+ amcharts2.currentDemoTheme);$("body").addClass("demo-theme-"+ theme);amcharts2.currentDemoTheme=theme;amcharts2.updateParamLinks();amcharts2.processLazyLoad();if(typeof demoData==="undefined")
        return;demoData.javascript=demoData.javascript.replace(/"theme"\:[^"]*"([a-z]+)"/g,'"theme": "'+ theme+'"');var found=false;for(var i=0;i<demoData.resources.length;i++){var resource=demoData.resources[i];if(demoData.resources[i].match(/\/themes\/.*\.js/)){demoData.resources[i]=demoData.resources[i].replace(/[^./]*\.js/,amcharts2.currentDemoTheme+".js");found=true;}}
    if(!found)
        demoData.resources.push(demoData.resources[0].replace(/[^./]*\.js/,'themes/'+ amcharts2.currentDemoTheme+".js"));if(skipDemoUpdate!==true&&typeof AmCharts!=="undefined"&&typeof AmCharts.charts[0]!=="undefined"){AmCharts.charts[0].clear();eval(demoData.javascript);amcharts2.reapplyControlSettings();}
    var chalkFont="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace";if(theme==="chalk"&&!amcharts2.isLoaded(chalkFont))
        amcharts2.loadCSS(chalkFont);}
amcharts2.setConfigVar=function(prop,val){var path=prop.split('.');var holder=AmCharts.charts[0];var element;while(element=path.shift()){var index=element.match(/\[([0-9])*\]/);if(index!==null){element=element.replace(/\[.*/,"");holder=holder[element];element=Number(index[1]);}
    if(typeof holder[element]==="undefined")
        holder[element]={};if(path.length===0){holder[element]=val;}else{holder=holder[element];}}
    AmCharts.charts[0].validateNow(false,true);}
amcharts2.getConfigVar=function(prop){var path=prop.split('.');var holder=AmCharts.charts[0];var element;while(element=path.shift()){var index=element.match(/\[([0-9])*\]/);if(index!==null){element=element.replace(/\[.*/,"");holder=holder[element];element=Number(index[1]);}
    if(typeof holder[element]==="undefined")
        return undefined;if(path.length===0){return holder[element];}else{holder=holder[element];}}
    return undefined;}
amcharts2.initDemoControls=function(){var $=jQuery;var controlHolder=$('#demo-control-holder');$(amchartsDemoControls).each(function(){var control=$("<div>").addClass("demo-control col-md-4");control.append($("<div>").addClass("demo-control-category").html(this.category));var value=amcharts2.getConfigVar(this.property);if(this.type=="slider"){control.append($("<div>").addClass("demo-control-value").html(value));}
    control.append($("<div>").addClass("demo-control-title").html(this.title));if(this.type=="slider"){var step=(this.max- this.min)/ 100;
        if(step>1)
            step=Math.round(step);if(typeof value==='string'){value=Number(value.replace(/[^0-9.\-]*/g,""));}
        var slider=$("<div>").data("property",this.property).data("unit",this.unit).slider({"min":this.min,"max":this.max,"step":step,"value":value,"slide":function(event,ui){var value=ui.value;if($(this).data("unit"))
            value+=$(this).data("unit");$(this).siblings('.demo-control-value').html(value);amcharts2.setConfigVar($(this).data("property"),value);}});control.append(slider);this.control=slider;this.controlTrigger="slidechange";}else if(this.type=="select"){var value=amcharts2.getConfigVar(this.property);var wrapper=$("<div>").addClass("select");var select=$('<select>').data("property",this.property).on("change",function(){amcharts2.setConfigVar($(this).data("property"),$(this).val());});wrapper.append(select);this.control=select;this.controlTrigger="change";for(var i=0;i<this.options.length;i++){var opt_value=this.options[i];var option=$("<option>").val(opt_value).html(opt_value);if(value==opt_value)
        option.attr("selected","selected");select.append(option);}
        control.append(wrapper);}
    controlHolder.append(control);});}
amcharts2.reapplyControlSettings=function(){var $=jQuery;if(AmCharts.charts.length&&AmCharts.charts[0].chartRendered===true){$(amchartsDemoControls).each(function(){if(this.type=='slider'){amcharts2.setConfigVar(this.control.data("property"),this.control.slider("value"));}else{$(this.control).trigger(this.controlTrigger);}});}else{setTimeout(amcharts2.reapplyControlSettings,100);}};