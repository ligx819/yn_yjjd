let validity = (h, m, s) => {
    //获取当前时间时间戳
    let nowunix = Math.round(new Date().getTime());
    let date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(s);
    //获取指定时间时间戳
    let secunix = Math.round(date.getTime());
    let shengunix = secunix - nowunix;
    shengunix = parseFloat(shengunix) / 1000;
    let date1 = new Date();
    date1.setTime(date1.getTime() + (shengunix * 1000));
    return date1;
}

// 设置cookie
let setCookie = (cname, cvalue, extime) => {
    let expires = "expires=" + extime;
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 获取cookie
let getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}

//序列化对象
let params = (data) => {
    let arg = [];
    for (let i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&');
}

//封装ajax
let ajax = (opt) => {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function() {};
    let xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    let params = [];
    for (let key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    let postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);
        }
    };
}

Vue.component('my-popup', {
    props: ['popupCont'],
    template: '<transition name="slide-fade"><div class="popup" v-show="popupCont.show">' +
        '<div class="topImg">' +
        '<img v-if="popupCont.topImg" :src="popupCont.topImg" alt="" width="60%">' +
        '</div>' +
        '<div class="contBody">' +
        '<div class="tit">' +
        '<h3 v-text="popupCont.tit"></h3>' +
        '</div>' +
        '<div class="cont">' +
        '<p v-html="popupCont.cont"></p>' +
        '</div>' +
        '</div>' +
        '<div class="foot">' +
        '<a v-for="oneBtn in popupCont.btns" :href="oneBtn.href" class="btn" v-text="oneBtn.txt" @click="popupCont.show = !popupCont.show"></a>' +
        '</div>' +
        '</div></transition>'
});

let app = new Vue({
    el: '#app',
    data: {
        // 弹窗
        popupCont: {
            show: false,
            topImg: '',
            tit: '',
            cont: '<p>“快乐十分”是指从01至20共20个号码中任意选择1-5个号码组合为一注彩票进行的投注。每注金额2元，可以进行加倍投注，每注最高倍数为99倍。在20个号码中依次开出8个号码作为中奖号码，每10分钟开奖一期。采用专用摇奖设备进行自动电子摇奖并向投注机实时传送摇奖画面。</p><p>“快乐十分”根据投注号码个数分为选一、选二、选三、选四、选五投注；根据投注的方式，又分为直选、组选、和任选投注方式。具体允许的投注方式由中心根据游戏规则设定。</p>',
            btns: [{
                'txt': '我知道了',
                'href': 'javascript:void(0);'
            }]
        },
        fixed: false,
        machineSrc: './images/draw_machine1.png',
        ballSrcs: ['images/5.png', 'images/5.png', 'images/10.png', 'images/10.png', 'images/20.png', 'images/20.png', 'images/68.png', 'images/68.png', 'images/68.png', 'images/128.png', 'images/128.png', 'images/128.png'],
        // 每天答题机会
        answerChance: 1,
        // 题库
        questions: [{
            'question': '本次快乐十分派奖金额？',
            'options': [{
                'id': 'a1',
                'txt': '1000万'
            }, {
                'id': 'b1',
                'txt': '1500万'
            }, {
                'id': 'c1',
                'txt': '1800万'
            }],
            'answer': 2,
            'selected': -1
        }, {
            'question': '针对任三、任四、任五有哪些投注方式派奖？',
            'options': [{
                'id': 'a2',
                'txt': '单选'
            }, {
                'id': 'b2',
                'txt': '单选、胆拖、复式'
            }, {
                'id': 'c2',
                'txt': '胆拖、复式'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '快乐十分每隔几分钟开奖一期？',
            'options': [{
                'id': 'a3',
                'txt': '10分钟'
            }, {
                'id': 'b3',
                'txt': '20分钟'
            }, {
                'id': 'c3',
                'txt': '30分钟'
            }],
            'answer': 0,
            'selected': -1
        }, {
            'question': '云南快乐十分全天开奖多少期？',
            'options': [{
                'id': 'a4',
                'txt': '70期'
            }, {
                'id': 'b4',
                'txt': '72期'
            }, {
                'id': 'c4',
                'txt': '75期'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '快乐十分每期开出几个中奖号码？',
            'options': [{
                'id': 'a5',
                'txt': '5个'
            }, {
                'id': 'b5',
                'txt': '8个'
            }, {
                'id': 'c5',
                'txt': '10个'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '快乐十分的选号范围？',
            'options': [{
                'id': 'a6',
                'txt': '01-15'
            }, {
                'id': 'b6',
                'txt': '01-20'
            }, {
                'id': 'c6',
                'txt': '01-30'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '本次派奖针对任选三玩法的胆拖、复式投注加奖后返奖比例是多少？',
            'options': [{
                'id': 'a7',
                'txt': '70%'
            }, {
                'id': 'b7',
                'txt': '72%'
            }, {
                'id': 'c7',
                'txt': '75%'
            }],
            'answer': 2,
            'selected': -1
        }, {
            'question': '快乐十分单张彩票投注最大金额？',
            'options': [{
                'id': 'a8',
                'txt': '10000元'
            }, {
                'id': 'b8',
                'txt': '15000元'
            }, {
                'id': 'c8',
                'txt': '20000元'
            }],
            'answer': 2,
            'selected': -1
        }, {
            'question': '快乐十分是一种什么类型的彩票游戏？',
            'options': [{
                'id': 'a9',
                'txt': '乐透数字型'
            }, {
                'id': 'b9',
                'txt': '即开型'
            }, {
                'id': 'c9',
                'txt': '视频型'
            }],
            'answer': 0,
            'selected': -1
        }, {
            'question': '快乐十分单张票中奖10000元以上后需要缴纳个人所得税吗？',
            'options': [{
                'id': 'a10',
                'txt': '不需要'
            }, {
                'id': 'b10',
                'txt': '需要'
            }],
            'answer': 0,
            'selected': -1
        }, {
            'question': '本次派奖任选五单式投注加奖后奖金多少钱？',
            'options': [{
                'id': 'a11',
                'txt': '350'
            }, {
                'id': 'b11',
                'txt': '380'
            }, {
                'id': 'c11',
                'txt': '400'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '本次派奖任选五胆拖、复式投注加奖后奖金多少钱？',
            'options': [{
                'id': 'a12',
                'txt': '380'
            }, {
                'id': 'b12',
                'txt': '400'
            }, {
                'id': 'c12',
                'txt': '450'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '本次快乐十分从哪天开始派奖？',
            'options': [{
                'id': 'a13',
                'txt': '3月20日'
            }, {
                'id': 'b13',
                'txt': '3月23日'
            }, {
                'id': 'c13',
                'txt': '4月2日'
            }],
            'answer': 2,
            'selected': -1
        }, {
            'question': '中国福利彩票的宗旨是什么？',
            'options': [{
                'id': 'a14',
                'txt': '扶老、助残'
            }, {
                'id': 'b14',
                'txt': '扶老、助残、救孤、济困'
            }, {
                'id': 'c14',
                'txt': '救孤、济困'
            }],
            'answer': 1,
            'selected': -1
        }, {
            'question': '云南快乐十分从哪年开始销售？',
            'options': [{
                'id': 'a15',
                'txt': '2010年'
            }, {
                'id': 'b15',
                'txt': '2011年'
            }, {
                'id': 'c15',
                'txt': '2012年'
            }],
            'answer': 1,
            'selected': -1
        }, ]
    },
    beforeCreate() {
        let arr = ['images/5.png', 'images/10.png', 'images/20.png', 'images/68.png', 'images/128.png', 'images/answer_border_down.png', 'images/answer_border_top.png',
            'images/answer_good.png', 'images/answer_top.png', 'images/back.png', 'images/balls.png', 'images/banner.png', 'images/bg.png', 'images/btn_bg.png',
            'images/click_draw.png', 'images/draw_machine.png', 'images/draw_machine1.png', 'images/draw_machine2.png', 'images/gongxi.png', 'images/i_buttom.png',
            'images/i_top.png', 'images/lijichj.png', 'images/rule_border.png', 'images/rule_top.png', 'images/rule.png', 'images/woyaodati.png'
        ];
        let img = [];
        for (var i = 0; i < arr.length; i++) {
            img[i] = new Image();
            img[i].src = arr[i];
        }
    },
    mounted() {
        // 各页面高度自适应
        this.$nextTick(() => {
            let a = document.getElementById('app');
            let pg = a.getAttribute('data-page');
            let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            switch (pg) {
                case 'index':
                    let th1 = document.querySelector("div[class='top']").getBoundingClientRect().height;
                    let fh = document.querySelector("div[class='i_foot']").getBoundingClientRect().height;
                    if (th1 + fh < wh) {
                        this.fixed = true;
                        document.getElementById('app').style.height = wh + 'px';
                    }
                    break;
                case 'answer':
                    this.popupCont.show = true;
                    break;
                case 'draw':
                    let th = document.querySelector("div[class='top']").getBoundingClientRect().height;
                    if (th + 311.5 < wh) {
                        document.getElementById('app').style.height = wh + 'px';
                    }
                    break;
                case 'rule':
                    let rh = document.querySelector("div[class='rule_top']").getBoundingClientRect().height;
                    document.getElementById('rule_cont').style.height = wh - rh - 40 + 'px';
                    document.getElementById('app').style.height = wh - 15 + 'px';
                    break;
            }

        })
    },
    methods: {
        submit() {
            let that = this;
            let qs = that.questions;
            // 用户答对题目数
            let okCount = 0;
            let ac = getCookie('answerChance');
            if (ac != "" && parseInt(ac) < 1) {
                that.popupCont = {
                    show: true,
                    topImg: '',
                    tit: '很抱歉，您今天的答题机会已用完！',
                    cont: '<p>每个微信号每天只有1次答题机会，明天继续加油哦！</p>',
                    btns: [{
                        'txt': '关闭',
                        'href': 'javascript:void(0);'
                    }]
                }
                return false;
            } else {
                if (!ac) {
                    setCookie('answerChance', 1, validity(23, 59, 59));
                }
            }
            // 获得的抽奖机会
            let dc = -1;
            for (let i = 0, l = qs.length; i < l; i++) {
                if (qs[i].selected === -1) {
                    that.popupCont = {
                        show: true,
                        topImg: '',
                        tit: '',
                        cont: '当前还有未答题目，请答完全部题目后再提交！',
                        btns: [{
                            'txt': '我知道了',
                            'href': 'javascript:void(0);'
                        }]
                    }
                    dc = -2;
                    break;
                }
                if (qs[i].selected === qs[i].answer) {
                    okCount += 1;
                }
            }
            if (dc < -1) {
                return false;
            }
            okCount < 5 ? dc = -1 : (okCount < 10 ? dc = 1 : (okCount < 15 ? dc = 2 : dc = 3));
            setCookie('drawChance', dc, validity(23, 59, 59));
            let tt = '',
                btnTxt = '',
                hrf = '';
            dc <= 0 ? (tt = '很抱歉，没有获得抽奖机会！', hrf = 'index.html', btnTxt = '返回首页') : (tt = '恭喜，获得了' + dc + '次抽奖机会！', hrf = 'draw.html', btnTxt = '立即抽奖');
            that.popupCont = {
                show: true,
                topImg: dc > 0 ? './images/answer_good.png' : '',
                tit: tt,
                cont: '每个微信号每天可获1次答题机会。题库共15题，答对5题可获1次抽奖机会，答对10题可获2次抽奖机会，答对15题可获3次抽奖机会，抽奖机会当日清空。',
                btns: [{
                    'txt': btnTxt,
                    'href': hrf
                }]
            }
            setCookie('answerChance', 0, validity(23, 59, 59));
        },
        loadImage(url, callback, conf) {
            let that = this;
            let img = new Image();
            img.src = url;
            // 如果图片已经缓存，直接调用回调函数
            if (img.complete) {
                that.imgNow = img;
                callback.call(img, conf.x, conf.y, conf.width, conf.height);
                return;
            }
            img.onload = () => {
                that.imgNow = img;
                callback.call(img, conf.x, conf.y, conf.width, conf.height);
            };
        },
        drawing(ctx, w, h) {
            let that = this;
            ctx.clearRect(0, 0, w, h);
            that.ballSrcs.forEach((e) => {
                // let dx = Math.random() * (110 - 80 + 1) + 80;
                // let dy = Math.random() * (70 - 60 + 1) + 60;
                let dx = Math.random() * (400 - 170 + 1) + 170;
                let dy = Math.random() * (220 - 60 + 1) + 60;
                that.loadImage(e, (x, y, width, height) => {
                    // ctx.save();
                    // let rt = Math.random() * 360;
                    // ctx.translate(160, 90);
                    // ctx.rotate(rt * Math.PI / 180);
                    // ctx.translate(-160, -90);
                    ctx.drawImage(that.imgNow, x, y, width, height);
                    // ctx.restore();
                }, {
                    "x": dx,
                    "y": dy,
                    "width": 70,
                    "height": 90
                });
            });
        },
        lotteryResult() {
            let that = this;
            ajax({
                method: 'get',
                url: 'bonus.php',
                data: {
                    'OPENDID': 'xxxxxxxxx'
                },
                success: function(str) {
                    let tt = '',
                        ct = '';
                    str === '未中奖' ? (tt = '很抱歉，没有中奖！', ct = '您距离现金红包仅0.00001米！继续加油哦！') : (tt = '恭喜您，获得了' + str, ct = '红包将在收到中奖推送之后一个工作日内发放至微信账户。（红包可在“钱包”→“零钱”中查看）。因获奖者个人原因无法接收红包或联系不上的，均视为自愿弃奖。');
                    that.popupCont = {
                        show: true,
                        topImg: str === '未中奖' ? '' : './images/gongxi.png',
                        tit: tt,
                        cont: ct,
                        btns: [{
                            'txt': '继续抽奖',
                            'href': 'javascript:void(0)'
                        }, {
                            'txt': '返回首页',
                            'href': 'index.html'
                        }]
                    }
                    let dc = parseInt(getCookie('drawChance'));
                    dc -= 1;
                    setCookie('drawChance', dc, validity(23, 59, 59));
                },
                async: true
            });
        },
        clickDraw() {
            let that = this;
            if (!getCookie('drawChance') || parseInt(getCookie('drawChance')) < 0) {
                that.popupCont = {
                    show: true,
                    topImg: '',
                    tit: '很抱歉，您今天还未获得抽奖机会！',
                    cont: '用户只有通过活动首页的“我要答题”参与答题游戏才能获得抽奖机会哦，快快参与吧！',
                    btns: [{
                        'txt': '我要答题',
                        'href': 'answer.html'
                    }, {
                        'txt': '返回首页',
                        'href': 'index.html'
                    }]
                }
                return false;
            }
            if (parseInt(getCookie('drawChance')) === 0) {
                that.popupCont = {
                    show: true,
                    topImg: '',
                    tit: '很抱歉，您今天的抽奖机会已用完！',
                    cont: '您今天获得的抽奖机会已用完，明天继续加油哦！',
                    btns: [{
                        'txt': '返回首页',
                        'href': 'index.html'
                    }]
                }
                return false;
            }
            that.machineSrc = './images/draw_machine2.png';
            let bs = that.ballSrcs;
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            if (!that.timer) {
                that.timer = setInterval(() => {
                    that.drawing(ctx, canvas.width, canvas.height);
                }, 50);
                setTimeout(() => {
                    clearInterval(that.timer);
                    that.timer = false;
                    that.lotteryResult();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    that.machineSrc = './images/draw_machine1.png';
                }, 2000);
            }
        }
    }
})