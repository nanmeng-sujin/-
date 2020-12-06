toastLog("欢迎使用学习助手！");

let window = floaty.window(
    <vertical>
        <button id="move" text="移动" w="60" h="35" bg="#80AAFFFF" textSize="11sp" />
        <button id="startXX" text="一键学习" w="60" h="35" bg="#7777FF92" textSize="11sp" />
        <button id="startDT" text="所有答题" w="60" h="35" bg="#77F6F680" textSize="11sp" />
        <button id="stop" text="停止" w="60" h="35" bg="#77FA6BFA" textSize="11sp" />
        <button id="exit" text=" 退出悬浮窗 " w="60" h="35" bg="#77ff5577" textSize="11sp" />
    </vertical>
);

let deviceWidth = device.width;
let deviceHeight = device.height;
window.setPosition(deviceWidth * 0.83, deviceHeight * 0.6);
setInterval(() => {}, 1000);


let wx, wy, downTime, windowX, windowY;
// 这个函数是对应悬浮窗的移动
window.move.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            wx = event.getRawX();
            wy = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            // 如果按下的时间超过 xx 秒判断为长按，调整悬浮窗位置
            if (new Date().getTime() - downTime > 300) {
                window.setPosition(windowX + (event.getRawX() - wx), windowY + (event.getRawY() - wy));
            }
            return true;
        case event.ACTION_UP:
            // 手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - wy) < 30 && Math.abs(event.getRawX() - wx) < 30) {
                toastLog(" 长按调整位置 ")
            }
            return true;
    }
    return true;
});




// 这个函数是对应悬浮窗的退出
window.exit.click(() => {
    toastLog("感谢使用学习助手！");
    console.hide();
    engines.stopAllAndToast();
    exit();
});


let th = null;

window.startXX.click(() => {
    let ss = "./xxqg_xs.js";
    startTh(ss);
});
//手动答题，支持每日、每周、专项、挑战、争上游、双人对战等
window.startDT.click(() => {
    let ss = "./Answer.js"; //手动答题
    startTh(ss);
});

//停止
window.stop.click(() => {
    if (th == null) {
        toastLog(" 没有进行中的脚本 ");
    } else {
        if (th.isAlive()) {
            threads.shutDownAll();
            toastLog("已进行停止，请等待两秒后进行其他操作！");
        } else {
            toastLog(" 没有进行中的脚本 ");
        }
    }
});



function startTh(fileStr) {
    var ss = fileStr;
    if (th == null) {
        th = threads.start(function() {
            toastLog("欢迎使用学习助手");
            let begin = require(ss);
            begin();
        });
    } else {
        if (th.isAlive()) {
            toastLog("脚本都在运行了你还点！？");
        } else {
            th = threads.start(function() {
                let begin = require(ss);
                begin();
            });
        }
    }
}