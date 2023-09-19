$(function () {
    const fileInput = $('#file'); // 获取文件输入框元素
    const resultLabel = $('#result-label'); // 获取结果标签元素
    const loading = $('#loading'); // 获取加载中元素

    $('#uploadForm').on('submit', function (event) { // 监听表单提交事件
        event.preventDefault(); // 阻止表单默认提交行为
        
        const file = fileInput[0].files[0]; // 获取选择的文件

        if (file) { // 如果文件存在
            loading.show(); // 显示加载中动画

            const formData = new FormData(); // 创建FormData对象
            formData.append('file', file); // 将文件添加到FormData对象中

            $.ajax({
                url: '/upload', // 设置请求的URL
                type: 'POST', // 设置请求方法为POST
                data: formData, // 设置请求的数据为FormData对象
                processData: false, // 禁用数据处理
                contentType: false, // 禁用数据类型设置
                success: function (response) { // 请求成功的回调函数
                    console.log(response); // 在控制台输出响应结果
                    const prism_wordsInfo = response.prism_wordsInfo; // 获取识别结果数组
                    const result = prism_wordsInfo.map(item => item.word).join(''); // 将识别结果拼接为字符串
                    
                    resultLabel.text(result); // 显示识别结果
                },
                error: function (xhr, status, error) { // 请求失败的回调函数
                    console.error('识别失败:', error); // 在控制台输出错误信息
                },
                complete: function () { // 请求完成时的回调函数
                    loading.hide(); // 隐藏加载中动画
                }
            });

            fileInput.val(''); // 清空文件输入框的值
        }
    });
});
