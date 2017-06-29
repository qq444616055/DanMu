$(document).ready(function(){
	var video = $(".video");//视屏dom
	var video_height = video.height();//视频高度
	var video_width = video.width();//视屏宽度
	var timerArr = [];//计时器数组
	var speed = 5;//弹幕滚动速度
	/*点击弹幕发送按钮*/
	$(".input_button").click(function(){
		var danmuText = $(".input_text").val();
		/*如果输入内容为空，就不会生成送弹幕*/
		if ( !danmuText ){
			return;
		}
		/*生成弹幕*/
		var danmuDiv = $( '<div>' + danmuText + '</div>' );
		video.append(danmuDiv);
		/*预先设置弹幕样式的某些属性*/
		var danmuFontSize = 16;//弹幕字体大小
		var danmuTop = parseInt( Math.random() * (video_height-danmuFontSize) +danmuFontSize );//弹幕距离视屏窗口上边距
		var danmuColor = 'rgb('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+')';//弹幕颜色	
		var danmuWidth = danmuText.length * danmuFontSize;//弹幕宽度
		/*设置弹幕样式*/
		danmuDiv.css({
			"width": danmuWidth,
			"font-size": danmuFontSize,
			"top": danmuTop,
			"left": video_width,
			"color": danmuColor,
			"overflow": "hidden",
			"position": "absolute",
		});
		var left = danmuDiv.position().left;//获取弹幕相对于视屏窗口的左边距
		/*弹幕滚动*/
		var timer = setInterval(function(){
			left --;//向左滚动
			danmuDiv.css("left", left);
			/*弹幕完全退出视屏窗口时删除弹幕*/
			if( (left+danmuWidth) < 0 ){
				clearInterval( timer );//清除该条弹幕计时器
				danmuDiv.remove();//清除该条弹幕
			}
		}, speed);
		timerArr.push(timer);//加入到弹幕数组计时器
	});
});
