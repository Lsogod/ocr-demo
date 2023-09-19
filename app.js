const parseOCR = require('./utils/parseOCR');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const process=require('process')
const app = express();
const PORT = 3000;
const upload = multer({ dest: 'uploads/' }); // 设置上传文件的存储目录

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'text/css');
  }
}));

// 解析请求主体
app.use(bodyParser.json()); // 解析JSON
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码表单数据

//从环境变量中获取APP_CODE
const APP_CODE = process.env.MY_APP_CODE;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', upload.single('file'), async function (req, res) {
  // console.log(req.file); // 输出上传的文件信息
  imgFile = req.file.path
  // 进行相应的文件处理操作
  try {
    parseOCR.parse(APP_CODE, imgFile)
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

