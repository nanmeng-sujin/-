"ui";
//engines.execScriptFile("./xs1.js");

var color = "#009688";


ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="刺痛更新器"/>
                <TextView id="tv_text" singleLine="true" ellipsize="marquee" focusable="true" text = "欢迎使用刺痛脚本,更新完成后在复读机加载脚本的框里填上刺痛.java进行加载即可,感谢使用!!!" textColor = "red" textSize = "13sp"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager"h="*"> 
                <frame>
                <img src="https://www.hualigs.cn/image/602b0997a0617.jpg" scaleType="centerCrop" alpha="0.4" />
                    <ScrollView>
                        <vertical padding="0 0" >
                        <text text="当前版本: NULL"id="当前" textColor="#6809F7"textSize="16sp"h="*"/>
                            <text text="最新版本: NULL"id="版本" textColor="#6809F7"textSize="16sp"h="*"/>
                        </vertical>
                    </ScrollView>
                    <ScrollView>
                        <vertical padding="10 45" >
                            <text id="xinban" textColor="#6809F7"textSize="16sp"/>
                        </vertical>
                    </ScrollView>
                    
                    <linear gravity="bottom">
                        <button id="检查" text="检查更新" w="120" style="Widget.AppCompat.Button.Colored" />
                        <button id="替换" text="替换更新" w="120" style="Widget.AppCompat.Button.Colored" />
                        <button id="下载" text="仅下载更新包" w="120" style="Widget.AppCompat.Button.Colored" />
                    </linear>
                </frame>
                <frame>
                    <img src="https://www.hualigs.cn/image/602b0997a0617.jpg" scaleType="centerCrop" alpha="0.4" />
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);



path = "/sdcard/QQ复读机/刺痛.java"
if(files.exists(path)==false){
ui.当前.setText("当前版本: "+"NULL");
}else{

var file = open("/sdcard/QQ复读机/刺痛.java", "r")
//读取一行并打印


//var file=open("/sdcard/vivo手机助手/安装说明.txt");
var ub=file.readlines();
ub.length  //获取行数
var str=ub[4]
//strs=str.split("String Version = '");
strs= str.substring(18,29);
toast("欢迎使用!!!");
ui.当前.setText("当前版本: "+strs);
}
ui.tv_text.setSelected(true);
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "刺痛Java作者:TKゞ刺痛\n"+
            "刺痛Java是基于绿豆基础上进行改写，本脚本功能多，玩法全，如有bug可加群或者直接联系脚本作者进行反馈");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["更新内容", "设置"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
    

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "联系作者",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "加入一群",
      icon: "@drawable/ic_settings_black_48dp"
  },
  {
      title: "加入二群",
      icon: "@drawable/ic_favorite_black_48dp"
  },
  {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);
//打开QQ
ui.menu.on("item_click", item => {
    switch(item.title){
            case "联系作者":
            var qq = "2292380798";
    app.startActivity({ 
        action: "android.intent.action.VIEW", 
        data:"mqq://im/chat?chat_type=wpa&version=2292380798&src_type=web&uin=" + qq, 
        packageName: "com.tencent.mobileqq", })
    }
    })
//加入一群
ui.menu.on("item_click", item => {
    switch(item.title){
        case "加入一群":
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?card_type=group&uin=676360846",
            packageName: "com.tencent.mobileqq",
        });
    }
})
//加入二群
ui.menu.on("item_click", item => {
    switch(item.title){
        case "加入二群":
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?card_type=group&uin=158183435",
            packageName: "com.tencent.mobileqq",
        });
    }
})
//退出
ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
        ui.finish();
        break;
    }
});

ui.下载.click(() => {
    threads.start(download);
})
ui.替换.click(() => {
    //files.rename("/sdcard/QQ复读机/刺痛", "刺痛.bak")
    threads.start(xiazai);
})
ui.检查.click(() => {
    threads.start(loadFloat);
    threads.start(load);
    if(storage.get("dd")==undefined){
}else{
ui.xinban.setText(storage.get("dd"))
}
})
/*
ui.检查.click(() => {
var url = "http://www.nanmeng.fun/刺痛/NewVersionInfo.txt"
ui.a.loadUrl(url);
})
*/
function loadFloat(){
var ddd= http.get("http://www.nanmeng.fun/刺痛/NewVersionInfo.txt").body.string();
 storage.put("dd", ddd);
}
var storage = storages.create("刺痛更");


function load(){
    var banben=http.get("http://www.nanmeng.fun/刺痛/NewVersion.txt").body.string();
    ui.版本.setText("最新版本: "+banben);
}




var downloadDialog = null;
var downloadId = -1;

function down(){
    downloadDialog = dialogs.build({
        title: "下载中...",
        progress: {
            max: 100,
            showMinMax: true
        },
        autoDismiss: false
    })
        .on("positive", ()=>{
            if(downloadDialog.getActionButton("positive") == "暂停"){
                stopDownload();
                downloadDialog.setActionButton("positive", "继续");
            }else{
                startDownload();
                downloadDialog.setActionButton("positive", "暂停");
            }
        })
        .on("negative", ()=>{
            stopDownload();
            downloadDialog.dismiss();
            downloadDialog = null;
        })
        .show();
    startDownload();
}

function startDownload(){
    downloadId = setInterval(()=>{
        var p = downloadDialog.getProgress();
        if(p >= 100){
            stopDownload();
            downloadDialog.dismiss();
            downloadDialog = null;
            toast("完成");
        }else{
            downloadDialog.setProgress(p + 1);
        }
    }, 100);
}

function stopDownload(){
    clearInterval(downloadId);
}

/**
 * 下载
 * 通过get请求从github下载zip文件
 */
function download() {
    down()
    try {
        var Url = "http://www.nanmeng.fun/刺痛/New.zip"
        var r = http.get(Url)  //开始请求
        var zipFile = r.body.bytes() 
        if (zipFile) {
            var 代码路径 = write(zipFile)
        } else {
            console.error('下载失败')
            exit()
        }
    } catch (err) {
      //  console.error(err)  
        toast("下载错误,请等待一会在进行下载")
        exit()  //退出
    }
}

/**
 * 将下载好的zip文件保存在手机
 */
function write(zipFile) {
    var path = files.join(files.cwd(),"520xs.zip")
    path="/sdcard/QQ复读机/刺痛更新包.zip"
    files.createWithDirs(path)  
    //log(path)
    
    files.writeBytes(path, zipFile)
    //var r = decompression(path) 
    //toast("下载完成")
    //return r
}


function xiazai() {
    down()
    try {
        var Url = "http://www.nanmeng.fun/刺痛/New.zip"
        var r = http.get(Url)  //开始请求
        var zipFile = r.body.bytes() 
        if (zipFile) {
            var 代码路径 = writed(zipFile)
        } else {
            console.error('下载失败')
            exit()
        }
    } catch (err) {
      //  console.error(err)  
        toast("下载错误,请等待一会在进行下载")
        exit()  //退出
    }
}

/**
 * 将下载好的zip文件保存在手机
 */
function writed(zipFile) {
    var path = files.join(files.cwd(),"520xs.zip")
    path="/sdcard/QQ复读机/刺痛更新包.zip"
    files.createWithDirs(path)  
    files.writeBytes(path, zipFile)
    var r = decompressions(path) 
    return r
}

/**
 * 在同一目录下decompression
 */

function decompressions(文件路径) {
    path="/sdcard/QQ复读机"
   var 解压后的文件路径 =path 
    com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件路径))
    //toast("解压完成")
}
var isCanFinish = false;
var isCanFinishTimeout;
ui.emitter.on("back_pressed", e => {
    if (!isCanFinish) {
        isCanFinish = true;
        isCanFinishTimeout=setTimeout(() => {
            toastLog("双击退出");
            isCanFinish = false;
        }, 400);
        e.consumed = true;
    } else {
        clearTimeout(isCanFinishTimeout);
        e.consumed = false;
    };
});
