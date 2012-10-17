(function(){
window.GWDANG=GWDANG={
    first: 0,
    trend_days: 90,
    v_code: 1,
    server :'http://browser.gwdang.com',
    c_server :'http://www.gwdang.com',
    notice : 0,
    site : null,
    is_site_page : null,
    dp: null,
    IE6: false,
    width:0,
    timer:null,
    timer2:null,
    height:0,
    browser:null,
    is_tb: false,
    is_open: 0,
    style : 'top',
    position: 0,
    p_id : '',
    scrollTop: 0,
    page_now : { b2c:1, taobao:1, tmall:1, also_buy:1,history:1, promotion:1 },
    page_total: { b2c:1, taobao:1, tmall:1, also_buy:1,history:1, promotion:1  },
    page_size: 6,
    page_size_mini: 4,
    total_num: {b2c:6, taobao:6, tmall:6, also_buy:6,history:4, promotion: 6 },
    $A : function(a,b){//{{{
        if(typeof b == 'string'){ 
            a.innerHTML = b; 
        }else{
            a.appendChild(b);
        }
        return b;
    },//}}}
    $C : function(name){//{{{
        return document.createElement(name);
    },//}}}
    $T : function(name,no){//{{{
        return document.getElementsByTagName(name)[no];
    },//}}}
    ShowImage: function(ImgD,proMaxWidth,proMaxHeight){//{{{
        var image=new Image(); 
        image.src=ImgD.src;
        id = ImgD.id;
        if(image.width>0 && image.height>0){ 
            var rate = (proMaxWidth/image.width < proMaxHeight/image.height)?proMaxWidth/image.width:proMaxHeight/image.height;
            if(rate <= 1){ 
                GWDANG.$('#'+id).css('width', image.width*rate);
                GWDANG.$('#'+id).css('height', image.height*rate);
            }
            else {
                GWDANG.$('#'+id).css('width', image.width);
                GWDANG.$('#'+id).css('height', image.height);
            }
        }
    },//}}}
    defaultImage: function(id, proMaxWidth, proMaxHeight){//{{{
        var image=new Image(); 
        image.src='http://browser.gwdang.com/template/aug/image/default_load_image.png';
        if(image.width>0 && image.height>0){ 
            var rate = (proMaxWidth/image.width < proMaxHeight/image.height)?proMaxWidth/image.width:proMaxHeight/image.height;
            if(rate <= 1){ 
                GWDANG.$('#'+id).css('width', image.width*rate);
                GWDANG.$('#'+id).css('height', image.height*rate);
            }
            else {
                GWDANG.$('#'+id).css('width', image.width);
                GWDANG.$('#'+id).css('height', image.height);
            }
        }
    },
    base64_encode: function(str){//{{{
        var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64decodechars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64encodechars.charAt(c1 >> 2);
                out += base64encodechars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64encodechars.charAt(c1 >> 2);
                out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += base64encodechars.charAt((c2 & 0xf) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
            out += base64encodechars.charAt(c3 & 0x3f);
        }
        return out;
    },//}}}
    site_pattern_sets :{//{{{
//        '\\.vipshop\\.com': 'vipshop',
        '\\.lefeng\\.com': 'lefeng',
        '^http://www.smzdm.com' : 'smzdm',
        'jxdyf\\.com': 'jxdyf',
        'tnice\\.com': 'tnice',
        'paipai\\.com': 'paipai',
        'xinbaigo\\.com': 'xinbaigo',
        'orbis\\.com\\.cn': 'orbis',
        '\\.d1\\.com\\.cn': 'd1',
        '\\.chazuo\\.com': 'chazuo',
        '\\.u1baby\\.com': 'u1baby',
        '\\.homevv\\.com': 'homevv',
        '\\.paixie\\.net': 'paixie',
        '\\.zm7.cn': 'zm7',
        '\\.mogujie\\.com': 'mogujie',
        '\\.meilishuo\\.com': 'meilishuo',
        '\\.tao3c\\.com': 'tao3c',
        '\\.lifevc\\.com': 'lifevc',
        '\\.amazon\\.cn': 'amazon',
        '\\.dangdang\\.com': 'dangdang',
        '\\.360buy\\.com': '360buy',
        '\\.360top\\.com': '360top',
        '\\.zol\\.com\\.cn': 'zol',
        '\\.fglady\\.cn': 'fglady',
        '\\.ouku\\.com': 'ouku',
        '\\.newegg\\.com\\.cn': 'newegg',
        '\\.kimiss\\.com': 'kimiss',
        '\\.redbaby\\.com\\.cn': 'redbaby',
        '\\.m18\\.com': 'm18',
        '\\.w1\\.cn': 'w1',
        '\\.sephora\\.cn': 'sephora',
        '\\.lafaso\\.com': 'lafaso',
        '\\.s\\.cn': 's',
        '\\.51buy\\.com': '51buy',
        '\\.okbuy\\.com': 'okbuy',
        '\\.letao\\.com': 'letao',
        '\\.buy007\\.com': 'buy007',
        '\\.taoxie\\.com': 'taoxie',
        '\\.suning\\.com': 'suning',
        '\\.coo8\\.com': 'coo8',
        '\\.lusen\\.com': 'lusen',
        '\\.gome\\.com\\.cn': 'gome',
        '\\.gomesport\\.com': 'gomesport',
        '\\.yihaodian\\.com': 'yihaodian',
        '\\.1mall\\.com': 'yihaodian',
        '\\.womai\\.com': 'womai',
        '\\.leyou\\.com\\.cn': 'leyou',
        '\\.shopin\\.net': 'shopin',
        '\\.xiu\\.com': 'xiu',
        '\\.mbaobao\\.com': 'mbaobao',
        '\\.vjia\\.com': 'vjia',
        '\\.7cv\\.com': '7cv',
        '\\.qinqinbaby\\.com': 'qinqinbaby',
        '\\.oyeah\\.com\\.cn': 'oyeah',
        '\\.x\\.com\\.cn': 'x',
        '\\.guopi\\.com': 'guopi',
        '\\.no5\\.com\\.cn': 'no5',
        '\\.sasa\\.com': 'sasa',
        '\\.dhc\\.net\\.cn': 'dhc',
        '\\.9dadao\\.com': '9dadao',
        '\\.360kxr\\.com': '360kxr',
        '\\.m6go\\.com': 'm6go',
        '\\.likeface\\.com': 'likeface',
        '\\.qxian\\.com': 'qxian',
        '\\.didamall\\.com': 'didamall',
        '\\.yaodian100\\.com': 'yaodian100',
        '\\.yaofang\\.cn': 'yaofang',
        '\\.zol\\.com': 'zol-mall',
        '\\.lijiababy\\.com\\.cn': 'lijiababy',
        '\\.99read\\.com': '99read',
        '\\.china-pub\\.com': 'china-pub',
        '\\.bookschina\\.com': 'bookschina',
        '\\.efeihu\\.com': 'efeihu',
        '\\.360mart\\.com': '360mart',
        '\\.yintai\\.com': 'yintai',
        '\\.quwan\\.com': 'quwan',
        '\\.urcosme\\.com': 'urcosme',
        'cn\\.strawberrynet\\.com': 'strawberrynet',
        '\\.luce\\.com\\.cn': 'luce',
        '\\.k121\\.com': 'k121',
        '\\.happigo\\.com': 'happigo',
        '\\.gap\\.cn': 'gap',
        '\\.misslele\\.com': 'misslele',
        '\\.5lux\\.com': '5lux',
        '\\.xiaozhuren\\.com': 'xiaozhuren',
        '\\.all3c\\.com': 'all3c',
        '\\.idaphne\\.com': 'idaphne',
        '\\.daphne\\.cn': 'daphne',
        '\\.pcbaby\\.com\\.cn': 'pcbaby',
        '\\.binggo\\.com/': 'binggo',
        '^(?:http|https)://(?!buy|cart).+\\.(?:taobao|tmall)\\.com': 'taobao',
        '\\.tiantian\\.com/': 'tiantian',
        '\\.xijie\\.com': 'xijie',
        '\\.jumei\\.com': 'jumei',
        '\\.caomeipai\\.com': 'caomeipai',
        '\\.dahuozhan\\.com': 'dahuozhan',
        '\\.dazhe\\.cn': 'dazhe',
        '\\.huolida\\.com': 'huolida',
        '\\.12dian\\.com': '12dian',
        '\\.yougou\\.com': 'yougou',
        '\\.111\\.com\\.cn': '111',
        '\\.daoyao\\.com': 'daoyao',
        '\\.jxdyf\\.com': 'jxdyf',
        '\\.jianke\\.com': 'jianke',
        '\\.douban\\.com' : 'douban',
        '\\.it168\\.com' : 'it168',
        '\\.pconline\\.com\\.cn' : 'pconline',
        '\\.pcpop\\.com' : 'pcpop',
        '\\.pclady\\.com\\.cn' : 'pclady',
        '\\.yoka\\.com' : 'yoka',
        '\\.55bbs\\.com' : '55bbs',
        '\\.onlylady\\.com' : 'onlylady',
        '\\.24dq\\.com' : '24dq',
        '\\.muyingzhijia\\.com' : 'muyingzhijia',
        '\\.lingshi\\.com' : 'lingshi',
        '\\.houmart\\.com' : 'houmart',
        '\\.onlyts\\.cn' : 'onlyts',
        '\\.winxuan\\.com' : 'winxuan',
        '\\.new7\\.com' : 'new7',
        '\\.bookuu\\.com' : 'bookuu',
        '\\.beifabook\\.com' : 'beifabook',
        'book\\.sina\\.com\\.cn' : 'sina-book',
        'tech\\.sina\\.com\\.cn' : 'sina-tech',
        'digi\\.sina\\.com\\.cn' : 'sina-digi',
        'baby\\.sina\\.com\\.cn' : 'sina-baby', 
        'eladies\\.sina\\.com\\.cn' : 'sina-eladies',
        'jiaju\\.sina\\.com\\.cn' : 'sina-jiaju',
        'mobile\\.sina\\.com\\.cn' : 'sina-mobile',
        'book\\.sohu\\.com' : 'sohu-book',
        'baobao\\.sohu\\.com' : 'sohu-baobao',
        'women\\.sohu\\.com' : 'sohu-women',
        'it\\.sohu\\.com' : 'sohu-it',
        'digi\\.163\\.com' : '163-digi',
        'book\\.163\\.com' : '163-book',
        'lady\\.163\\.com' : '163-lady',
        'home\\.163\\.com' : '163-home',
        'digi\\.tech\\.qq\\.com' : 'qq-digi',
        'hea\\.qq\\.com' : 'qq-hea',
        'baby\\.qq\\.com' : 'qq-baby',
        'lady\\.qq\\.com' : 'qq-lady',
        'book\\.qq\\.com' : 'qq-book',
        'yaolan\\.com' : 'yaolan',
        'yesky\\.com' : 'yesky',
        'pchome\\.net' : 'pchome',
        'enet\\.com\\.cn' : 'enet',
        '(?:ruiyi|rayi)\\.(?:com|cn|com\\.cn)' : 'ruiyi',
        'nop\\.cn' : 'nop',
        'imobile\\.com\\.cn' : 'imobile',
        'menglu\\.com': 'menglu',
        '(?:moonbasa|ing2ing|qjherb|cherriespie|clafield|baoyeah|suorang|monteamor|rutisher)\\.com': 'moonbasa',
        'keede.com': 'keede',
        'vancl.com': 'vancl',
        'dazhongdianqi\\.com\\.cn': 'dazhongdianqi',
        'skinstorechina.com': 'skinstorechina',
        'bearbuy\\.com\\.cn': 'bearbuy',
        'yanyue\\.cn': 'yanyue',
        'banggo\\.com': 'banggo',
        'yesmywine\\.com': 'yesmywine',
        'winenice\\.com': 'winenice',
        'jiuxian\\.com': 'jiuxian',
        'huimai365\\.com': 'huimai365',
        'goujiuwang\\.com': 'goujiuwang',
        '360hqb\\.com': '360hqb',
        'buy\\.qq\\.com': 'qq-buy',
        'easy361\\.com': 'easy361',
        'lucemall.com.cn': 'lucemall',
        'product\\.pchouse\\.com\\.cn': 'pchouse',
        '\\.etao\\.com': 'etao'
    },//}}}
    dp_pattern_sets : {//{{{
        '^(?:http|https)://ju\\.taobao\\.com/tg/home\\.htm.*item_id=[\\d]+': 'taobao-ju',
//        '^(?:http|https)://shop\\.vipshop\\.com/detail': 'vipshop',
        '^(?:http|https)://www\\.lefeng\\.com/goods/pklist\\.jsp\\?productId=': 'lefeng',
        '^(?:http|https)://product\\.lefeng\\.com/product/': 'lefeng',
        '^(?:http|https)://www\\.jxdyf\\.com/product-[\\d]+': 'jxdyf',
        '^(?:http|https)://www\\.tnice\\.com/product/': 'tnice',
        '^(?:http|https)://auction1\\.paipai\\.com/': 'paipai',
        '^(?:http|https)://item\\.xinbaigo\\.com/Goods/StyleDetail': 'xinbaigo',
        '^(?:http|https)://www\\.orbis\\.com\\.cn.*product\\-[\\d]+': 'orbis',
        '^(?:http|https)://www\\.d1\\.com\\.cn/product/': 'd1',
        '^(?:http|https)://www\\.chazuo\\.com/Product/p\\-[\\d]+': 'chazuo',
        '^(?:http|https)://www\\.u1baby\\.com/product\\-[\\d]+': 'u1baby',
        '^(?:http|https)://www\\.homevv\\.com/vvshopProductView/pid\\-[\\d]+\\.jhtml' : 'homevv',
        '^(?:http|https)://www\\.paixie\\.net/shoe\\-.+\\.html': 'paixie',
        '^(?:http|https)://www\\.tao3c\\.com/product/[\\d]+\\.html': 'tao3c',
        '^(?:http|https)://www\\.zm7\\.cn/goods': 'zm7',
        '^(?:http|https)://www\\.mogujie\\.com/note/.*?showtype=good': 'mogujie',
        '^(?:http|https)://www\\.meilishuo\\.com/share/[\\d]+': 'meilishuo',
        '^(?:http|https)://s\\.etao\\.com/item/[\\d]+\\.html': 'etao',
        '^(?:http|https)://s\\.etao\\.com/search\\?epid=[\\d]+': 'etao',
        '^(?:http|https)://product\\.pchouse\\.com\\.cn/item/[\\d]+\\.html': 'pchouse',
        '^(?:http|https)://buy\\.daphne\\.cn/goods\\.php': 'daphne',
        '^(?:http|https)://www\\.lucemall\\.com\\.cn/.+/[\\d]+\\.html': 'lucemall',
        '^(?:http|https)://www\\.lifevc\\.com/detail/': 'lifevc',
        '^(?:http|https)://www\\.easy361\\.com/[^\\?]*goods-[\\d]+\\.html': 'easy361',
        '^(?:http|https)://item\\.360hqb\\.com/spu\\-[\\d]+\\.html': '360hqb',
        '^(?:http|https)://item\\.360hqb\\.com/[\\d]+\\.html': '360hqb',
        '^(?:http|https)://q\\.360hqb\\.com/detail/[\\d\\_]+\\.html': '360hqb',
        '^(?:http|https)://www\\.goujiuwang\\.com/product/item\\-id\\-[\\d]+\\.htm': 'goujiuwang',
        '^(?:http|https)://www\\.huimai365\\.com/goods\\-[\\d]+\\.html': 'huimai365',
        '^(?:http|https)://www\\.jiuxian\\.com/goods\\-[\\d]+\\.html': 'jiuxian',
        '^(?:http|https)://www\\.winenice\\.com/p_[\\d]+\\.shtml': 'winenice',
        '^(?:http|https)://www\\.yesmywine\\.com/goods/[\\d]+\\.html': 'yesmywine',
        'banggo\\.com/Goods/[\\d]+\\.shtml': 'banggo',
        '^(?:http|https)://www\\.yanyue\\.cn/smoke\\-product\\-[\\d]+\\.html': 'yanyue',
        '^(?:http|https)://www\\.bearbuy\\.com\\.cn/goods\\.php\\?id=[\\d]+': 'bearbuy',
        '^(?:http|https)://www\\.amazon\\.cn/.*?(?:dp/|gp/product/|detailApp/)': 'amazon',
        '^(?:http|https)://(?:product\\.dangdang\\.com/product\.aspx|reco\\.dangdang\\.com/reco_pub\\.php)\\?product_id=\\d+': 'dangdang',
        '^(?:http|https)://www\\.360buy\\.com/product/\\d+\\.html': '360buy',
        '^(?:http|https)://book\\.360buy\\.com/\\d+\\.html': '360buy-book',
        '^(?:http|https)://mvd\\.360buy\\.com/\\d+\\.html': '360buy-mvd',
        '^(?:http|https)://www\\.360top\\.com/product/\\d+\\.html': '360top',
        '^(?:http|https)://detail\\.zol\\.com\\.cn/.*?(?:index).*?\\.shtml': 'zol',
        '^(?:http|https)://detail\\.zol\\.com\\.cn/[\\d]+/[\\d]+/[a-zA-Z]+\\.shtml': 'zol',
        '^(?:http|https)://www\\.fglady\\.cn/BMsgL': 'fglady',
        '^(?:http|https)://www\\.ouku\\.com/goods': 'ouku',
        '^(?:http|https)://www\\.newegg\\.com\\.cn/Product/.*?\\.htm': 'newegg',
        '^(?:http|https)://product\\.kimiss\\.com/product/': 'kimiss',
        '^(?:http|https)://www\\.redbaby\\.com\\.cn/.*?/[\\d]*?\\.html': 'redbaby',
        '^(?:http|https)://product\\.m18\\.com/': 'm18',
        '^(?:http|https)://www\\.w1\\.cn/goods': 'w1',
        '^(?:http|https)://www\\.sephora\\.cn/productDetailAction/': 'sephora',
        '^(?:http|https)://www\\.lafaso\\.com/(?:product/|goods/product_detail)': 'lafaso',
        '^(?:http|https)://www\\.s\\.cn/[\\w]{2,}(\\-[\\w]+)+\\.html': 's',
        '^(?:http|https)://item\\.51buy\\.com/': '51buy',
        '^(?:http|https)://www\\.okbuy\\.com/product/detail': 'okbuy',
        '^(?:http|https)://www\\.letao\\.com/shoe': 'letao',
        '^(?:http|https)://www\\.buy007\\.com/.*?/.*?/[A-Za-z\\d\\_\\-]*?\\.html': 'buy007',
        '^(?:http|https)://www\\.taoxie\\.com/commodity': 'taoxie',
        '^(?:http|https)://[\\w]+\\.suning\\.(?:com|cn)/emall/(Prod|prd|fsm)': 'suning',
	'^(?:http|https)://www\\.suning\\.(?:com|cn)/webapp/wcs/stores/servlet/(Prod|prd)': 'suning',
        '^(?:http|https)://www\\.coo8\\.com/product/': 'coo8',
        '^(?:http|https)://www\\.lusen\\.com/product': 'lusen',
        '^(?:http|https)://www\\.gome\\.com\\.cn/[^\\?]*product/': 'gome',
        '^(?:http|https)://www\\.gomesport\\.com/.*?/d\\-[\\d]+\\.html': 'gomesport',
        '^(?:http|https)://www\\.yihaodian\\.com/product/(?:[\\d\\_]+|.*productID.*)': 'yihaodian',
        '^(?:http|https)://www\\.1mall\\.com/product/': 'yihaodian',
        '^(?:http|https)://[a-zA-Z]+\\.womai\\.com/Product\\-': 'womai',
        '^(?:http|https)://www\\.leyou\\.com\\.cn/product/single/': 'leyou',
        '^(?:http|https)://www\\.shopin\\.net/product/': 'shopin',
        '^(?:http|https)://(?:item|www)\\.xiu\\.com/product/': 'xiu',
        '^(?:http|https)://item\\.mbaobao\\.com/pshow': 'mbaobao',
        '^(?:http|https)://item\\.vjia\\.com/[\\d]*?\\.html': 'vjia',
        '^(?:http|https)://www\\.7cv\\.com/product/': '7cv',
        '^(?:http|https)://www\\.qinqinbaby\\.com/product/': 'qinqinbaby',
        '^(?:http|https)://www\\.oyeah\\.com\\.cn/goods': 'oyeah',
        '^(?:http|https)://www\\.x\\.com\\.cn/n_product/[\\w]+\\.shtml': 'x',
        '^(?:http|https)://www\\.x\\.com\\.cn/product': 'x',
        '^(?:http|https)://www\\.guopi\\.com/p\\.jsp': 'guopi',
        '^(?:http|https)://www\\.no5\\.com\\.cn/goods/': 'no5',
        '^(?:http|https)://web[\\d]+\\.sasa\\.com/SasaWeb/sch/product/viewProductDetail': 'sasa',
        '^(?:http|https)://www\\.dhc\\.net\\.cn/gds/(?:detail|csearch\\.jsp\\?ccd=[\\d]+)': 'dhc',
        '^(?:http|https)://www\\.9dadao\\.com/product/': '9dadao',
        '^(?:http|https)://www\\.360kxr\\.com/product/': '360kxr',
        '^(?:http|https)://www\\.m6go\\.com/product': 'm6go',
        '^(?:http|https)://www\\.likeface\\.com/product': 'likeface',
        '^(?:http|https)://www\\.qxian\\.com/.*?[0-9]*?\\.html': 'qxian',
        '^(?:http|https)://www\\.didamall\\.com/products/info/': 'didamall',
        '^(?:http|https)://www\\.yaodian100\\.com/ecmall/product': 'yaodian100',
        '^(?:http|https)://www\\.yaofang\\.cn/goods': 'yaofang',
        '^(?:http|https)://(?:www|mall)\\.zol\\.com/detail': 'zol-mall',
        '^(?:http|https)://www\\.lijiababy\\.com\\.cn/(?:eshop/product|Clothing/.*?/Product\_item\\.aspx)': 'lijiababy',
        '99read\\.com/Product/': '99read',
        '^(?:http|https)://product\\.china-pub\\.com': 'china-pub',
        '^(?:http|https)://www\\.bookschina\\.com/[\\d]+\\.htm': 'bookschina',
        '^(?:http|https)://www\\.efeihu\\.com/(?:Product/|Pages/ProductShow/ProductDetails\\.aspx)': 'efeihu',
        '^(?:http|https)://www\\.360mart\\.com/product[s]?/.*?\\.html': '360mart',
        '^(?:http|https)://www\\.yintai\\.com/product/productdetail': 'yintai',
        '^(?:http|https)://www\\.quwan\\.com/goods': 'quwan',
        '^(?:http|https)://www\\.urcosme\\.com/search/final': 'urcosme',
        '^(?:http|https)://cn\\.strawberrynet\\.com/.*?/[0-9]+/': 'strawberrynet',
        '^(?:http|https)://www\\.luce\\.com\\.cn/product/': 'luce',
        '^(?:http|https)://www\\.k121\\.com/item': 'k121',
        '^(?:http|https)://www\\.happigo\\.com/[\\w]+/[\\w]+/[\\w]+/[\\d]+\\.html': 'happigo',
        '^(?:http|https)://www\\.gap\\.cn/(.*?/){1,3}[0-9]*?\\.html': 'gap',
        '^(?:http|https)://www\\.misslele\\.com/.+[\\d]+\\.html': 'misslele',
        '^(?:http|https)://www\\.5lux\\.com/goods': '5lux',
        '^(?:http|https)://www\\.xiaozhuren\\.com/(Disney/)?goods\\.php': 'xiaozhuren',
        '^(?:http|https)://www\\.all3c\\.com/product/': 'all3c',
        '^(?:http|https)://www\\.idaphne\\.com/goods': 'idaphne',
        '^(?:http|https)://product\\.pcbaby\\.com\\.cn/a/': 'pcbaby',
        '^(?:http|https)://www\\.binggo\\.com/.*?/[0-9]*?\\.html': 'binggo',
        '^(?:http|https)://(?:(item\\.(taobao|tmall))|(detail\\.tmall))\\.com': 'taobao',
        '^(?:http|https)://item\\.beta\\.taobao\\.com': 'taobao',
        '^(?:http|https)://spu\\.tmall\\.com': 'taobao-spu',
        '^(?:http|https)://www\\.tiantian\\.com/.+/[\\d]+\\.html': 'tiantian',
        '^(?:http|https)://www\\.xijie\\.com/prod': 'xijie',
        '^(?:http|https)://mall\\.jumei\\.com/product': 'jumei',
        '^(?:http|https)://buy\\.caomeipai\\.com/goods': 'caomeipai',
        '^(?:http|https)://www\\.dahuozhan\\.com/product/': 'dahuozhan',
        '^(?:http|https)://www\\.dazhe\\.cn/goodsdetail': 'dazhe',
        '^(?:http|https)://www\\.huolida\\.com/product/': 'huolida',
        '^(?:http|https)://www\\.12dian\\.com/product': '12dian',
        '^(?:http|https)://www\\.yougou\\.com/c_': 'yougou',
        '^(?:http|https)://www\\.111\\.com\\.cn/product/': '111',
        '^(?:http|https)://www\\.daoyao\\.com/product': 'daoyao',
        '^(?:http|https)://www\\.jxdyf\\.com/ProductContent': 'jxdyf',
        '^(?:http|https)://www\\.jianke\\.com/product/': 'jianke',
        '^(?:http|https)://book\\.douban\\.com/subject/[\\d]+/' : 'douban',
        '^(?:http|https)://product\\.it168\\.com/detail/doc/[0-9]+/index\\.shtml' : 'it168',
        '^(?:http|https)://product\\.pconline\\.com\\.cn/.*?/.*?/[0-9]+\\.html' : 'pconline',
        '^(?:http|https)://product\\.pcpop\\.com/[0-9]+/Index\\.html' : 'pcpop',
        '^(?:http|https)://cosme\\.pclady\\.com\\.cn/product/[0-9]+\\.html' : 'pclady',
        '^(?:http|https)://brand\\.yoka\\.com/cosmetics/.*?/detail[0-9]+\\.htm' : 'yoka',
        '^(?:http|https)://detail\\.55bbs\\.com/.*?/index[0-9]+\\.shtml' : '55bbs',
        '^(?:http|https)://hzp\\.onlylady.com/.*?/[0-9]+/' : 'onlylady',
        '^(?:http|https)://www\\.24dq.com/product.*?html' : '24dq',
        '^(?:http|https)://www\\.muyingzhijia\\.com/Shopping/ProductDetail\\.aspx' : 'muyingzhijia',
        '^(?:http|https)://item\\.lingshi\\.com/lingshi' : 'lingshi',
        '^(?:http|https)://www\\.houmart\\.com/p\\-[\\d]+\\.html' : 'houmart',
        '^(?:http|https)://www\\.onlyts\\.cn/goods' : 'onlyts',
        '^(?:http|https)://www\\.winxuan\\.com/product/.*?[0-9]*?' : 'winxuan',
        '^(?:http|https)://www\\.new7\\.com/product/[0-9\-]*?\\.html' : 'new7',
        '^(?:http|https)://detail\\.bookuu\\.com/[0-9]*?\\.html' : 'bookuu',
        '^(?:http|https)://book\\.beifabook\\.com/Product/BookDetail.aspx' : 'beifabook',
        '^(?:http|https)://tech\\.sina\\.com\\.cn.*?[0-9]*?\\.html' : 'sina-tech',
        '^(?:http|https)://product\\.baby\\.sina\\.com\\.cn.*?[0-9]*?\\.html' : 'sina-baby',
        '^(?:http|https)://eladies\\.sina\\.com\\.cn.*?[0-9]*?\\.shtml' : 'sina-eladies',
        '^(?:http|https)://product\\.it\\.sohu\\.com/detail/[0-9]*?_index.html' : 'sohu-it',
        '^(?:http|https)://baodian\\.women\\.sohu\\.com/product-[0-9]*?\\.shtml' : 'sohu-women',
        '^(?:http|https)://product\\.tech\\.163\\.com.*?/product/.*?\\.html' : '163-digi',
        '^(?:http|https)://digi\\.163\\.com/.*?/.*?/[\\w].*?\\.html' : '163-digi',
        '^(?:http|https)://cosmetic\\.lady\\.163\\.com/product/[0-9]*?\\.html' : '163-lady',
        '^(?:http|https)://datalib\\.digi\\.tech\\.qq\\.com/.*?/[0-9]*?/' : 'qq-digi',
        '^(?:http|https)://digi\\.tech\\.qq\\.com/.*?/*?/[\\d]+/[\\d]+/' : 'qq-digi',
        '^(?:http|https)://data\\.tech\\.qq\\.com/.*?/[0-9]*?/' : 'qq-hea',
        '^(?:http|https)://lady\\.qq\\.com/.*?/product/.*?[0-9]' : 'qq-lady',
        '^(?:http|https)://product\\.yesky\\.com/product/.*?[0-9]*?/' : 'yesky',
        '^(?:http|https)://product\\.pchome\\.net/.*?[0-9]*?\\.html' : 'pchome',
        '^(?:http|https)://product\\.enet\\.com\\.cn/[a-zA-Z\\-].*?[\\d].*?\\.html' : 'enet',
        '^(?:http|https)://www\\.(?:ruiyi|rayi)\\.(?:com|cn|com\\.cn)/\\?product-[\\d].*?\\.html' : 'ruiyi',
        '^(?:http|https)://www\\.nop\\.cn/product-[\\d]*?\\.html' : 'nop',
        '^(?:http|https)://product\\.imobile\\.com\\.cn/show/[\\d].*?\\.html' : 'imobile',
        '^(?:http|https)://product\\.cnmo\\.com/cell_phone/index[\\d].*?\\.shtml' : 'cnmo',
        '^(?:http|https)://phone\\.shouji\\.com\\.cn/[\\d]+/detail/[\\d]+' : 'shouji',
        '^(?:http|https)://product\\.tompda\\.com/[a-zA-Z]/[a-zA-Z]/[\\d]+/[\\d]+' : 'tompda',
        '^(?:http|https)://www\\.3533\\.com/phone/phone.+\\.htm' : 'phone3533',
        '^(?:http|https)://product\\.intozgc\\.com/[a-zA-Z\\_]+\\_[\\d]+': 'intozgc',
        '^(?:http|https)://product\\.chinabyte\\.com/product/[\\d]+/[\\d]+': 'chinabyte',
        '^(?:http|https)://app\\.tech\\.ifeng\\.com/[a-zA-Z\\-\\_]+/[a-zA-Z\\-\\_]+/[a-zA-Z0-9\\-\\_]+': 'ifeng',
        '^(?:http|https)://app\\.tech\\.ifeng\\.com/[a-zA-Z\\-\\_]+/detail\\-index\\-[0-9]+\\.html': 'ifeng',
        '^(?:http|https)://www2\\.xitek\\.com/production/product.php': 'xitek',
        '^(?:http|https)://product\\.imp3\\.net/product\\.php': 'imp3',
        '^(?:http|https)://www\\.menglu\\.com/product/[\\d]+\\.html': 'menglu',
        '^(?:http|https)://(?:lady|lingerie|www)\\.moonbasa\\.com/p\\-[\\d]+\\.html': 'moonbasa',
        '^(?:http|https)://www\\.(?:ing2ing|qjherb|cherriespie|clafield|baoyeah|suorang|monteamor|rutisher)\\.com/p\\-[\\d]+\\.html': 'moonbasa',
        '^(?:http|https)://www\\.keede\\.com(\\.cn)?/[a-zA-Z]+[\\d]+\\.html': 'keede',
        '^(?:http|https)://item\\.vancl\\.com/[\\d]+\\.html': 'vancl',
        '^(?:http|https)://www\\.dazhongdianqi\\.com\\.cn/dazhong/product[\\-\\d]+\\.htm': 'dazhongdianqi',
        '^(?:http|https)://www\\.skinstorechina\\.com/.+/.+[\\d]+\\-p\\.html': 'skinstorechina',
        '^(?:http|https)://item\\.buy\\.qq\\.com/item/': 'qq-buy'
    },//}}}
    dp_info: function(){//{{{
        return {
            'name' : GWDANG.$T('title',0).innerHTML,
            'price' : 0,
            'isbn' : ''
        }
    },//}}}
    dp_parse_func_sets :{//{{{
        'amazon': function(){
            var isbn_str = '';
        	var isbn_str1 = GWDANG.$('li:contains("ISBN")').text();
        	var isbn_str2 = GWDANG.$('li:contains("条形码")').text();
        	if( isbn_str1 ) { 
        			isbn_str1 = isbn_str1.substr(5); 
    		}else {
    			isbn_str1 = '';
    		}
        	if( isbn_str2 ) { 
        			isbn_str2 = isbn_str2.substr(4); 
    		}else {
    			isbn_str2 = '';
    		}
            if(isbn_str1 == '' ){
                isbn_str = isbn_str2;
            }else if(isbn_str2 == ''){
                isbn_str = isbn_str1;
            }else{
                if(isbn_str1.length > isbn_str2.length){
                    isbn_str = isbn_str2;
                }else{
                    isbn_str = isbn_str1;
                }
            }
    		return {
    			'name': GWDANG.$('#btAsinTitle').text(), 
    			'isbn': isbn_str
    		};
    	},
        'dangdang': function(){
            var dp = GWDANG.dp_info();
            try{
                dp.isbn = GWDANG.$('.book_detailed span:contains("I S B N")').html();
                dp.isbn = dp.isbn.substr(8);
            }catch(e){
                dp.isbn = '';
            }
            return dp;
        },
    	'360buy-book': function(){
            var str = GWDANG.$('#name h1').html();
            var isbn = GWDANG.$('#summary>li:nth-child(4)').text().substr(5);
            if(isbn.length > 10){
                return {
                    'name': str.substr(0,str.indexOf('<')), 
                    'isbn': isbn
                };
            }else{
                return GWDANG.dp_info();
            }
    	},
    	'fglady': function(){
    		return {
    			'name': GWDANG.$('.pd-content-left table tbody').children('tr').eq(1).children('td').eq(0).children('div').eq(0).text(), 
    			'isbn': ''
    		};
    	},
    	'ouku': function(){
    		return {
    			'name': GWDANG.$('.cellname h2').contents().filter(function(){return this.nodeType == 3;}).text(), 
    			'isbn': ''
    		};
    	},
    	'kimiss': function(){
    		return {
    			'name': GWDANG.$('.title h1').text(), 
    			'isbn': ''
    		};
    	},
    	'redbaby': function(){
    		return {
    			'name': GWDANG.$('#pName').text(), 
    			'isbn': ''
    		};
    	},
    	'm18': function(){
    		return {
    			'name': GWDANG.$('#styleName').text(), 
    			'isbn': ''
    		};
    	},
    	'w1': function(){
    		return {
    			'name': GWDANG.$('.title h1').text(), 
    			'isbn': ''
    		};
    	},
    	'sephora': function(){
    		return {
    			'name': GWDANG.$('.sdTitleL h1').text(), 
    			'isbn': ''
    		};
    	},
    	'lafaso': function(){
            var name = GWDANG.$('#pname').text();
            if(typeof name =='undefined' || name == ''){
                name = GWDANG.$('title').text();
            }
    		return {
    			'name': name, 
    			'isbn': ''
    		};
    	},
    	's': function(){
    		return {
    			'name': GWDANG.$('.goodsname').text(), 
    			'isbn': ''
    		};
    	},
    	'letao': function(){
    		return {
    			'name': GWDANG.$('#buyinfo h1').text(), 
    			'isbn': ''
    		};
    	},
    	'buy007': function(){
    		return {
    			'name': GWDANG.$('#info_right table tbody').children('tr').eq(0).children('td').eq(0).children('h1').eq(0).text(), 
    			'isbn': ''
    		};
    	},
    	'taoxie': function(){
    		return {
    			'name': GWDANG.$('.detail').children('div').eq(0).children('h2').eq(0).text(), 
    			'isbn': ''
    		};
    	},
    	'suning': function(){
            var name = GWDANG.$('.subpath span').text();
            if(typeof name == 'undefined' || name == '' || name == null){
                name = GWDANG.$('.path div span').text();
            }
    		return {
    			'name': name,
    			'isbn': GWDANG.$('.summary').children('ul').eq(1).children('li').eq(0).children('span').eq(0).text().substr(5)
    		};
    	},
    	'coo8': function(){
    		return {
    			'name': GWDANG.$('#productname h1').children('strong').eq(0).text(), 
    			'isbn': ''
    		};
    	},
    	'lusen': function(){
    		return {
    			'name': GWDANG.$('h1.goodsname').text(), 
    			'isbn': ''
    		};
    	},
    	'gomesport': function(){
    		return {
    			'name': GWDANG.$('.detail_intor_title b').text(), 
    			'isbn': ''
    		};
    	},
    	'yihaodian': function(){
    		return {
    			'name': GWDANG.$('#productMainName').text(), 
    			'isbn': ''
    		};
    	},
    	'womai': function(){
    		return {
    			'name': GWDANG.$('.detail_r1_title h1').text(), 
    			'isbn': ''
    		};
    	},
    	'leyou': function(){
    		return {
    			'name': GWDANG.$('#textDetail h1').text(), 
    			'isbn': ''
    		};
    	},
    	'shopin': function(){
    		return {
    			'name': GWDANG.$('.p-tit h1').text(), 
    			'isbn': ''
    		};
    	},
    	'xiu': function(){
    		return {
    			'name': GWDANG.$('.p_title').text(), 
    			'isbn': ''
    		};
    	},
    	'mbaobao': function(){
    		return {
    			'name': GWDANG.$('.goods-title').text(), 
    			'isbn': ''
    		};
    	},
    	'vjia': function(){
    		return {
    			'name': GWDANG.$('.sp-singleName .title').text(), 
    			'isbn': ''
    		};
    	},
    	'7cv': function(){
    		return {
    			'name': GWDANG.$('.main_right_top').text(), 
    			'isbn': ''
    		};
    	},
    	'x': function(){
    		return {
    			'name': GWDANG.$('.pro_name').text(), 
    			'isbn': ''
    		};
    	},
    	'guopi': function(){
    		return {
    			'name': GWDANG.$('#p_name').text(), 
    			'isbn': ''
    		};
    	},
    	'no5': function(){
    		return {
    			'name': GWDANG.$('#pro_text_pname').text(), 
    			'isbn': ''
    		};
    	},
    	'sasa': function(){
            var brand = GWDANG.$('.txt_16px_b_666666').text();
            var title = GWDANG.$('.txt_16px_n_666666').text();
            title.replace('<br>','');
    		return {
    			'name': brand + title, 
    			'isbn': ''
    		};
    	},
    	'dhc': function(){
    		return {
    			'name': GWDANG.$('head title').text(), 
    			'isbn': ''
    		};
    	},
    	'9dadao': function(){
    		return {
    			'name': GWDANG.$('.pra h2').text(), 
    			'isbn': ''
    		};
    	},
    	'360kxr': function(){
    		return {
    			'name': '', 
    			'isbn': ''
    		};
    	},
    	'm6go': function(){
            var brand = GWDANG.$('.content ul').children('li').eq(0).children('h2').eq(0).text();
            var title = GWDANG.$('.content ul').children('li').eq(1).children('h2').eq(0).text();
    		return {
    			'name': brand + title, 
    			'isbn': ''
    		};
    	},
    	'likeface': function(){
    		return {
    			'name': GWDANG.$('.tCtn h1').text(), 
    			'isbn': ''
    		};
    	},
    	'qxian': function(){
    		return {
    			'name': GWDANG.$('.product_body1_right_title h1').text(), 
    			'isbn': ''
    		};
    	},
    	'didamall': function(){
    		return {
    			'name': GWDANG.$('.floatleft').text(), 
    			'isbn': ''
    		};
    	},
    	'yaodian100': function(){
    		return {
    			'name': GWDANG.$('.infoboxheader h1').text(), 
    			'isbn': ''
    		};
    	},
    	'lijiababy': function(){
            var name = GWDANG.$('#txtproname').text();
            if(typeof name =='undefined' || name == ''){
                name = GWDANG.$('#lbl_proname').text();
            }
    		return {
    			'name': name, 
    			'isbn': ''
    		};
    	},
    	'99read': function(){
            var dp = GWDANG.dp_info();
            dp.isbn = GWDANG.$('li:contains("产品条码")').html();
            if(dp.isbn == null || typeof dp.isbn =='undefined' || dp.isbn == ''){
                dp.isbn = '';
            }else{
                dp.isbn = dp.isbn.substr(7);
            }
    		return dp;
    	},
    	'china-pub': function(){
    		return {
    			'name': GWDANG.$('h1.black15c').text(), 
    			'isbn': GWDANG.$('li:contains("ISBN")').children('strong').eq(0).html()
    		};
    	},
    	'bookschina': function(){
            var dp = GWDANG.dp_info();
            dp.isbn = GWDANG.$('tr:contains("出版时间：")').children().eq(1).text();
            return dp;
    	},
    	'efeihu': function(){
    		return {
    			'name': GWDANG.$('#itemName h2').text(), 
    			'isbn': ''
    		};
    	},
    	'yintai': function(){
    		return {
    			'name': GWDANG.$('.p-tit').text(), 
    			'isbn': ''
    		};
    	},
    	'urcosme': function(){
    		return {
    			'name': GWDANG.$('.productInformationText h1').text(), 
    			'isbn': ''
    		};
    	},
    	'strawberrynet': function(){
    		return {
    			'name': GWDANG.$('.div_content19').text(), 
    			'isbn': ''
    		};
    	},
    	'luce': function(){
    		return {
    			'name': GWDANG.$('.Product_Detail ul').children('li').eq(0).children('p').eq(0).text(), 
    			'isbn': ''
    		};
    	},
    	'k121': function(){
    		return {
    			'name': GWDANG.$('.newproductname0').text(), 
    			'isbn': ''
    		};
    	},
    	'happigo': function(){
    		return {
    			'name': GWDANG.$('.goodscr-name a').text(), 
    			'isbn': ''
    		};
    	},
    	'gap': function(){
    		return {
    			'name': GWDANG.$('.product-name h1').text(), 
    			'isbn': ''
    		};
    	},
    	'misslele': function(){
    		return {
    			'name': GWDANG.$('#goods_name').text(), 
    			'isbn': ''
    		};
    	},
    	'all3c': function(){
    		return {
    			'name': GWDANG.$('.buyinfo h1').text(), 
    			'isbn': ''
    		};
    	},
    	'idaphne': function(){
    		return {
    			'name': GWDANG.$('.title').text(), 
    			'isbn': ''
    		};
    	},
    	'binggo': function(){
                var name = GWDANG.$('#pName h1').html();
                var final_name = '';
                var len = name.length;
                var i=0;
                for(; i<len; i++){
                    if(name[i]=='<'){break;}
                }
    		return {
    			'name': name.substr(0,i), 
    			'isbn': ''
    		};
    	},
        'taobao-ju': function(){
            var info = GWDANG.dp_info();
            info.name = GWDANG.$.trim(GWDANG.$('.main-box h2').html());
            return info;
        },
    	'taobao': function(){
            var info = GWDANG.dp_info();
            var attrs = GWDANG.$(".attributes-list ul").html();
            var sattrs = '';
            if(attrs == null){
                attrs = GWDANG.$(".attributes-list").html();
            }
            attrs = attrs.replace(/(?:<\!\-\-[^\-]*\-\->|<li[^>]*>|&nbsp;|\ )/ig, '');
            attrs = attrs.replace(/<\/li[^>]*>/ig, '|');
            attrs = attrs.replace(/\n/ig, '');
            attrs = attrs.replace(/\ /ig, '');
            try{
                var brand = attrs.match(new RegExp(/(\u54c1\u724c(?:\:|\uff1a)[^\|]+)/ig));
                for(var i =0; i<brand.length; i++){
                    sattrs += brand[i]+'|';
                }
            }catch(e){}
            try{
                var no = attrs.match(new RegExp(/((?:\u7cfb\u5217|\u8d27\u53f7|\u578b\u53f7)(?:\:|\uff1a)[^\|]+)/ig));
                for(var i =0; i<no.length; i++){
                    sattrs += no[i]+'|';
                }
            }catch(e){}
            try{
                var isbn = attrs.match(new RegExp(/(ISBN[^\:\uff1a]*(?:\:|\uff1a)[^\|]+)/ig));
                for(var i =0; i<isbn.length; i++){
                    sattrs += isbn[i]+'|';
                }
            }catch(e){}
            info.skeyword = sattrs;
    		return info;
    	},
    	'taobao-spu': function(){
    		return {
    			'name': GWDANG.$('#detail .detail-hd h3').text(), 
    			'isbn': ''
    		};
    	},
    	'xijie': function(){
    		return {
    			'name': GWDANG.$('.detail_sh_right h1').text(), 
    			'isbn': ''
    		};
    	},
    	'caomeipai': function(){
    		return {
    			'name': GWDANG.$('#pro_name h2').text(), 
    			'isbn': ''
    		};
    	},
    	'dahuozhan': function(){
    		return {
    			'name': GWDANG.$('.property h2').text(), 
    			'isbn': ''
    		};
    	},
    	'huolida': function(){
    		return {
    			'name': GWDANG.$('.h1_title h1').text(), 
    			'isbn': ''
    		};
    	},
    	'12dian': function(){
    		return {
    			'name': GWDANG.$('.goodstitle').text(), 
    			'isbn': ''
    		};
    	},
    	'111': function(){
    		return {
    			'name': GWDANG.$('#productMainName').text(), 
    			'isbn': ''
    		};
    	},
    	'daoyao': function(){
    		return {
    			'name': GWDANG.$('.product_1_4 .d_table_3 .font_01').text(), 
    			'isbn': ''
    		};
    	},
    	'jianke': function(){
    		return {
    			'name': GWDANG.$('.h1_title h1').text(), 
    			'isbn': ''
    		};
    	},
        'douban' : function(){
            var tmp_isbn = GWDANG.$('#info').html();
            var start = tmp_isbn.indexOf('ISBN:');
            var length = tmp_isbn.length;
            var isbn = '';
            start += 12;
            for(; start < length; start ++){
                if(tmp_isbn[start]>='0' && tmp_isbn[start]<='9'){
                    isbn += tmp_isbn[start];
                }
            }
            var info = GWDANG.dp_info();
            info.isbn = isbn;
            return info;
        },
        'it168' : function(){
            return {
                'name': GWDANG.$('.title2').text(),
                'isbn': ''
            }
        },
        'pconline' : function(){
            return {
                'name': GWDANG.$('.pro-tit .name').text(),
                'isbn': ''
            }
        },
        'pcpop' : function(){
            return {
                'name': GWDANG.$('.tit1 h1').text(),
                'isbn': ''
            }
        },
        'yoka' : function(){
            return {
                'name': GWDANG.$('.pInfo_c2_lu h2').text(),
                'isbn': ''
            }
        },
        '55bbs' : function(){
            return {
                'name': GWDANG.$('.cpjsright_name h1').text(),
                'isbn': ''
            }
        },
        'onlylady' : function(){
            return {
                'name': GWDANG.$('.bnnaer_text').text(),
                'isbn': ''
            }
        },
        '24dq' : function(){
            return {
                'name': GWDANG.$('.goodsname').text(),
                'isbn': ''
            }
        },
        'muyingzhijia' : function(){
            return {
                'name': GWDANG.$('#lblPdtName').text(),
                'isbn': ''
            }
        },
        'lingshi' : function(){
            return {
                'name': GWDANG.$('#detail_bb h3').text(),
                'isbn': ''
            }
        },
        'onlyts' : function(){
            return {
                'name': GWDANG.$('#bread .last').eq(1).text(),
                'isbn': ''
            }
        },
        'winxuan' : function(){
            var isbn = '';
            try{
                isbn = GWDANG.$('.book_more tbody tr').eq(4).children('td').eq(1).text();
                isbn = isbn.substr(6);
            }catch(e){
                isbn = '';
            }
            var title = GWDANG.$('.goods_title').html();
            if(title.indexOf('<') > 0){
                title = title.substr(0, title.indexOf('<'));
            }
            return {
                'name': title,
                'isbn': isbn
            }
        },
        'new7' : function(){
            return {
                'name': GWDANG.$('.mainR h1 strong').text(),
                'isbn': ''
            }
        },
        'bookuu' : function(){
            return {
                'name':GWDANG.$('.detail-title').text(),
    			'isbn': GWDANG.$('li:contains("ISBN")').html().substr(5)
            }
        },
        'beifabook' : function(){
            var isbn = GWDANG.$('#LabelISBN').text();
            isbn = isbn.replace(/-/g, "");
            return {
                'name':GWDANG.$('#LabelTitle').text(),
                'isbn': isbn
            }
        },
        'sina-tech' : function(){
            var name = GWDANG.$('.zcblk02 h2').html();
            if(typeof name=='undefined' || name =='' || name == null){
                name = GWDANG.$('.PartATitle h2').html();
                if(typeof name=='undefined' || name =='' || name == null){
                    name = GWDANG.$('.Info h2').html();
                    if(typeof name=='undefined' || name =='' || name == null){
                        name = GWDANG.$('.product-name h1').html();
                        if(typeof name=='undefined' || name =='' || name == null){
                            name = GWDANG.$('title').text().substr(0, GWDANG.$('title').text().indexOf('_'));
                        }
                    }
                }
            }
            if(name.indexOf('<')>0){
                name = name.substr(0, name.indexOf('<'));
            }
            name = name.replace("&nbsp;","");
            return {
                'name':name,
                'isbn': ''
            }
        },
        'sina-baby' : function(){
            return {
                'name':GWDANG.$('.dp_info_title').text(),
                'isbn': ''
            }
        },
        'sina-eladies' : function(){
            return {
                'name':GWDANG.$('.blk01 h1').text(),
                'isbn': ''
            }
        },
        'sohu-it' : function(){
            return {
                'name':GWDANG.$('.til h2').text(),
                'isbn': ''
            }
        },
        'sohu-women' : function(){
            return {
                'name':GWDANG.$('.r h2 span').text(),
                'isbn': ''
            }
        },
        '163-digi' : function(){
            var name = GWDANG.$('.colA h3').text();
            if(typeof name =='undefined' ||name==null || name==''){
                name = GWDANG.$('.colA h1').text();
            }
            return {
                'name':name,
                'isbn': ''
            }
        },
        '163-lady' : function(){
            return {
                'name':GWDANG.$('.detailbox-main h1').text(),
                'isbn': ''
            }
        },
        'qq-digi' : function(){
            var name = GWDANG.$('.top_hd h2').text();
            if(typeof name == 'undefined' || name=='' || name == null ){
                name = GWDANG.$('.font0751 span').text();
            }
            return {
                'name':name,
                'isbn': ''
            }
        },
        'qq-hea' : function(){
            var name = GWDANG.$('#pdShow h1').text();
            if(typeof name == 'undefined' || name=='' || name == null ){
                name = GWDANG.$('#pdShow .longName').text();
            }
            return {
                'name':name,
                'isbn': ''
            }
        },
        'qq-lady' : function(){
            var name = GWDANG.$('.pro_info .title').text();
            return {
                'name':name,
                'isbn': ''
            }
        },
        'vipshop': function(){
            return {
                'name':GWDANG.$.trim(GWDANG.$('.pro_info .goods_protit').text()),
                'isbn': ''
            }
        }
    },//}}}
    find_site: function(){//{{{
        var url = window.location.href;
        if(self.location!=top.location){
            return false;
        }
        for( var pattern in GWDANG.dp_pattern_sets ){
            if( url.match(new RegExp(pattern, 'i')) ){
                return GWDANG.dp_pattern_sets[pattern]; 
            }
        }
        return false;
    },//}}}
    check_site : function(){//{{{
        var url = window.location.href;
        if(self.location!=top.location){
            return false;
        }
        for( var pattern in GWDANG.site_pattern_sets ){
            if( url.match(new RegExp(pattern, 'i')) ){
                return GWDANG.site_pattern_sets[pattern];
            }
        }
        return false;
    },//}}}
    get_site_name : function(){//{{{
        var url = window.location.href;
        for( var pattern in GWDANG.site_pattern_sets ){
            if( url.match(new RegExp(pattern, 'i')) ){
                return GWDANG.site_pattern_sets[pattern];
            }
        }
        return false;

    },//}}}
    addScript : function(content,inline,callback){//{{{
        var head = GWDANG.$T('head',0);
        var script = GWDANG.$C('script');
        script.type = 'text/javascript';
        script.charset="utf-8";
        if (inline) {
            script.text = content;
        } else {
            script.src = content;
            script.onload = script.onreadystatechange = function () {
                if (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete') {
                    if (callback) {
                        callback();
                    }
                    script.onload = script.onreadystatechange = null;
                }
            };
        }
        GWDANG.$A(head,script);
        if (inline && callback) {
            callback();
        }
    },//}}}
    init : function(){//{{{
        GWDANG.site=GWDANG.find_site();
        GWDANG.is_site_page=GWDANG.check_site();
        if(!GWDANG.site && !GWDANG.is_site_page){
            return null;
        }else if(GWDANG.site && GWDANG.is_site_page){
            GWDANG.is_site_page = GWDANG.site;
        }
        GWDANG.load_js();
    },//}}}
    fix_load_jquery: function(){
        if(GWDANG.is_site_page.indexOf('360buy') >= 0 || GWDANG.site == 'amazon' || GWDANG.site == 'zol-mall' || GWDANG.site == 'womai' || GWDANG.site == 'homevv'){
            return true;
        }
        return false;
    },
    load_js : function(){//{{{
        if(window.location.href.indexOf('v.t.sina.com.cn/share')>=0){
            return null;
        }
        if(typeof jQuery =='undefined' || this.fix_load_jquery()){
            GWDANG.addScript(GWDANG.server + '/js/jquery-1.5.1.min.js', false, function(){
                jQuery.noConflict();
                GWDANG.$ = typeof(jQuery)!= 'undefined'? jQuery : $;
                GWDANG.show_bar();
            });
        }else{
            GWDANG.$ = jQuery;
            try{
                if(typeof (GWDANG.$.ajax) != 'undefined'){
                    GWDANG.show_bar();
                }else{
                    GWDANG.addScript(GWDANG.server + '/js/jquery-1.5.1.min.js', false, function(){
                        jQuery.noConflict();
                        GWDANG.$ = jQuery;
                        if(typeof (GWDANG.$.ajax) != 'undefined'){
                            GWDANG.show_bar();
                        }else{
                            GWDANG.addScript(GWDANG.server + '/js/jquery-1.5.1.min.js', false, function(){
                                jQuery.noConflict();
                                GWDANG.$ = jQuery;
                                GWDANG.show_bar();
                            });
                        }
                    });
                }
            }catch(e){
                GWDANG.addScript(GWDANG.server + '/js/jquery-1.5.1.min.js', false, function(){
                    jQuery.noConflict();
                    GWDANG.$ = jQuery;
                    GWDANG.show_bar();
                });
            }
        }
    },//}}}
    show_bar: function(){//{{{
        if(!GWDANG.site){
            if(!GWDANG.is_site_page){
                return null;
            }else{
                GWDANG.site_search();
            }
        }else{
            GWDANG.site_dp();
        }
    },//}}}
    init_item_list :function(){//{{{
        var tmp = 0;
        tmp = GWDANG.$('#b2c-item-list').children();
        GWDANG.total_num.b2c = tmp.length;
        tmp = GWDANG.$('#tmall-item-list').children();
        GWDANG.total_num.tmall = tmp.length;
        tmp = GWDANG.$('#taobao-item-list').children();
        GWDANG.total_num.taobao = tmp.length;
        tmp = GWDANG.$('#also_buy-item-list').children();
        GWDANG.total_num.also_buy = tmp.length;
    },//}}}
    init_history_list:function(){//{{{
        tmp = GWDANG.$('#history-item-list').children();
        GWDANG.total_num.history = tmp.length;
    },//}}}
    init_promotion_list:function(){//{{{
        tmp = GWDANG.$('#promotion-item-list').children();
        GWDANG.total_num.promotion = tmp.length;
    },//}}}
    set_page_args :function(){//{{{
        GWDANG.$('#b2c-current-page').html(GWDANG.page_now.b2c);
        GWDANG.$('#b2c-page-num').html(GWDANG.page_total.b2c);
        GWDANG.$('#tmall-current-page').html(GWDANG.page_now.tmall);
        GWDANG.$('#tmall-page-num').html(GWDANG.page_total.tmall);
        GWDANG.$('#taobao-current-page').html(GWDANG.page_now.taobao);
        GWDANG.$('#taobao-page-num').html(GWDANG.page_total.taobao);
        GWDANG.$('#also_buy-current-page').html(GWDANG.page_now.also_buy);
        GWDANG.$('#also_buy-page-num').html(GWDANG.page_total.also_buy);
        GWDANG.$('#promotion-current-page').html(GWDANG.page_now.promotion);
        GWDANG.$('#promotion-page-num').html(GWDANG.page_total.promotion);
        GWDANG.$('#history-current-page').html(GWDANG.page_now.history);
        GWDANG.$('#history-page-num').html(GWDANG.page_total.history);
    },//}}}
    set_item_args :function(){//{{{
        var width = document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : document.body.clientWidth;
        width = width < 800 ? 800 : width;
        GWDANG.page_size = parseInt((width-80)/200);
        GWDANG.page_size_mini = parseInt((width-310)/200);
        GWDANG.page_now.b2c = GWDANG.page_now.taobao = GWDANG.page_now.tmall = GWDANG.page_now.also_buy = GWDANG.page_now.history = GWDANG.page_now.promotion = 1;
        GWDANG.page_total.b2c = GWDANG.total_num.b2c%GWDANG.page_size_mini == 0 ? parseInt(GWDANG.total_num.b2c/GWDANG.page_size_mini) : parseInt(GWDANG.total_num.b2c/GWDANG.page_size_mini) + 1;
        GWDANG.page_total.tmall = GWDANG.total_num.tmall%GWDANG.page_size_mini == 0 ? parseInt(GWDANG.total_num.tmall/GWDANG.page_size_mini) : parseInt(GWDANG.total_num.tmall/GWDANG.page_size_mini) + 1;
        GWDANG.page_total.taobao = GWDANG.total_num.taobao%GWDANG.page_size_mini == 0 ? parseInt(GWDANG.total_num.taobao/GWDANG.page_size_mini) : parseInt(GWDANG.total_num.taobao/GWDANG.page_size_mini) + 1;
        GWDANG.page_total.promotion = GWDANG.total_num.promotion%GWDANG.page_size_mini == 0 ? parseInt(GWDANG.total_num.promotion/GWDANG.page_size_mini) : parseInt(GWDANG.total_num.promotion/GWDANG.page_size_mini) + 1;
        GWDANG.page_total.also_buy = GWDANG.total_num.also_buy%GWDANG.page_size == 0 ? parseInt(GWDANG.total_num.also_buy/GWDANG.page_size) : parseInt(GWDANG.total_num.also_buy/GWDANG.page_size) + 1;
        /*GWDANG.page_total.history = GWDANG.total_num.history%GWDANG.page_size_mini == 0 ? parseInt(GWDANG.total_num.history/GWDANG.page_size_mini) : parseInt(GWDANG.total_num.history/GWDANG.page_size_mini) + 1;*/
    },//}}}
    check_image : function(url, imgid){//{{{
        var Browser=new Object(); 
        Browser.userAgent=window.navigator.userAgent.toLowerCase(); 
        Browser.ie=/msie/.test(Browser.userAgent); 
        Browser.Moz=/gecko/.test(Browser.userAgent); 
        var val=url; 
        var img=new Image();
        var obj = document.getElementById(imgid);
        if(Browser.ie){ 
            img.onreadystatechange =function(){
                if(img.readyState=="complete"||img.readyState=="loaded"){
                    if(img.width>0 && img.height>0){ 
                        var rate = (90/img.width < 90/img.height)?90/img.width:90/img.height;
                        if(rate <= 1){
                            GWDANG.$('#'+imgid).css('width', img.width*rate);
                            GWDANG.$('#'+imgid).css('height', img.height*rate);
                        }else {
                            GWDANG.$('#'+imgid).css('width', img.width);
                            GWDANG.$('#'+imgid).css('height', img.height);
                        }
                    }
                    GWDANG.$('#'+imgid).attr('src', url);
                }
            }        
        }else if(Browser.Moz){ 
            img.onload=function(){ 
                if(img.complete==true){
                    if(img.width>0 && img.height>0){ 
                        var rate = (90/img.width < 90/img.height)?90/img.width:90/img.height;
                        if(rate <= 1){
                            GWDANG.$('#'+imgid).css('width', img.width*rate);
                            GWDANG.$('#'+imgid).css('height', img.height*rate);
                        }else {
                            GWDANG.$('#'+imgid).css('width', img.width);
                            GWDANG.$('#'+imgid).css('height', img.height);
                        }
                    }
                    GWDANG.$('#'+imgid).attr('src', url);
                } 
            }
        }    
        img.onerror=function(){
            obj.src = "http://browser.gwdang.com/template/aug/images/default_load_image.png";
            obj.width = obj.getAttribute('d_width');
            obj.height = obj.getAttribute('d_width');
            obj.setAttribute("data-original","http://browser.gwdang.com/template/aug/images/default_load_image.png");
        }
        img.src=val;
    },//}}}
    load_image : function(type, start, end){//{{{
        var Browser=new Object(); 
        Browser.userAgent=window.navigator.userAgent.toLowerCase(); 
        Browser.ie=/msie/.test(Browser.userAgent); 
        Browser.Moz=/gecko/.test(Browser.userAgent); 
        if(typeof type == 'undefined'){
            return false;
        }
        var li = GWDANG.$("#"+type+"-item-list li");
        var ul = GWDANG.$("#"+type+"-item-list");
        if(Browser.ie || !GWDANG.check_animate()){
            GWDANG.$(li).css('display', 'none');
            for(var i = start; i <end; i++){
                GWDANG.$('#'+type+'-prod-item-'+i).css('display', 'block');
            }
            for(var i = start; i <end; i++){
                GWDANG.$('#'+type+'-prod-item-'+i+' .gwdang-lazy').each(function(){
                    var img = GWDANG.$(this);
                    var id = GWDANG.$(this).attr('id');
                    if(img.attr('data-original') != img.attr('src')){
                        GWDANG.check_image(img.attr('data-original'), id);
                    }
                });
            }
        }else{
            ul.animate({opacity:"0"},100,"swing",function(){
                GWDANG.$(li).css('display', 'none');
                for(var i = start; i <end; i++){
                    GWDANG.$('#'+type+'-prod-item-'+i).css('display', 'block');
                }
                ul.animate({opacity:"1"},100,"swing", function(){
                    for(var i = start; i <end; i++){
                        GWDANG.$('#'+type+'-prod-item-'+i+' .gwdang-lazy').each(function(){
                            var img = GWDANG.$(this);
                            var id = GWDANG.$(this).attr('id');
                            if(img.attr('data-original') != img.attr('src')){
                                GWDANG.check_image(img.attr('data-original'), id);
                            }
                        });
                    }
                });
            });
        }
    },//}}}
    change_page : function(type, position, page){//{{{
        if(type == 'promotion'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.promotion = page >= 1 && page <= GWDANG.page_total.promotion ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.promotion = GWDANG.page_now.promotion == 1 ? GWDANG.page_total.promotion : --GWDANG.page_now.promotion;
            }else if(position == 1){
                GWDANG.page_now.promotion = GWDANG.page_now.promotion == GWDANG.page_total.promotion ? 1 : ++GWDANG.page_now.promotion;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.promotion);
            var start = (GWDANG.page_now.promotion-1)*GWDANG.page_size_mini;
            var end = GWDANG.page_now.promotion*GWDANG.page_size_mini;
            end = end > GWDANG.total_num.promotion ? GWDANG.total_num.promotion : end;
            GWDANG.load_image(type, start, end);
        }else if(type == 'b2c'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.b2c = page >= 1 && page <= GWDANG.page_total.b2c ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.b2c = GWDANG.page_now.b2c == 1 ? GWDANG.page_total.b2c : --GWDANG.page_now.b2c;
            }else if(position == 1){
                GWDANG.page_now.b2c = GWDANG.page_now.b2c == GWDANG.page_total.b2c ? 1 : ++GWDANG.page_now.b2c;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.b2c);
            var start = (GWDANG.page_now.b2c-1)*GWDANG.page_size_mini;
            var end = GWDANG.page_now.b2c*GWDANG.page_size_mini;
            end = end > GWDANG.total_num.b2c ? GWDANG.total_num.b2c : end;
            GWDANG.load_image(type, start, end);
        }else if(type =='tmall'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.tmall = page >= 1 && page <= GWDANG.page_total.tmall ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.tmall = GWDANG.page_now.tmall == 1 ? GWDANG.page_total.tmall : --GWDANG.page_now.tmall;
            }else if(position == 1){
                GWDANG.page_now.tmall = GWDANG.page_now.tmall == GWDANG.page_total.tmall ? 1 : ++GWDANG.page_now.tmall;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.tmall);
            var start = (GWDANG.page_now.tmall-1)*GWDANG.page_size_mini;
            var end = GWDANG.page_now.tmall*GWDANG.page_size_mini;
            end = end > GWDANG.total_num.tmall ? GWDANG.total_num.tmall : end;
            GWDANG.load_image(type, start, end);
        }else if(type =='taobao'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.taobao = page >= 1 && page <= GWDANG.page_total.taobao ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.taobao = GWDANG.page_now.taobao == 1 ? GWDANG.page_total.taobao : --GWDANG.page_now.taobao;
            }else if(position == 1){
                GWDANG.page_now.taobao = GWDANG.page_now.taobao == GWDANG.page_total.taobao ? 1 : ++GWDANG.page_now.taobao;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.taobao);
            var start = (GWDANG.page_now.taobao-1)*GWDANG.page_size_mini;
            var end = GWDANG.page_now.taobao*GWDANG.page_size_mini;
            end = end > GWDANG.total_num.taobao ? GWDANG.total_num.taobao : end;
            GWDANG.load_image(type, start, end);
        }else if(type == 'also_buy'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.also_buy = page >= 1 && page <= GWDANG.page_total.also_buy ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.also_buy = GWDANG.page_now.also_buy == 1 ? GWDANG.page_total.also_buy : --GWDANG.page_now.also_buy;
            }else if(position == 1){
                GWDANG.page_now.also_buy = GWDANG.page_now.also_buy == GWDANG.page_total.also_buy ? 1 : ++GWDANG.page_now.also_buy;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.also_buy);
            var start = (GWDANG.page_now.also_buy-1)*GWDANG.page_size;
            var end = GWDANG.page_now.also_buy*GWDANG.page_size;
            end = end > GWDANG.total_num.also_buy ? GWDANG.total_num.also_buy : end;
            GWDANG.load_image(type, start, end);
        }else if(type == 'history'){
            if(typeof page != 'undefined'){
                GWDANG.page_now.history = page >= 1 && page <= GWDANG.page_total.history ? page : 1;
            }else if(position == -1){
                GWDANG.page_now.history = GWDANG.page_now.history == 1 ? GWDANG.page_total.history : --GWDANG.page_now.history;
            }else if(position == 1){
                GWDANG.page_now.history = GWDANG.page_now.history == GWDANG.page_total.history ? 1 : ++GWDANG.page_now.history;
            }
            GWDANG.$('#'+type+'-current-page').html(GWDANG.page_now.history);
            var start = (GWDANG.page_now.history-1)*GWDANG.page_size_mini;
            var end = GWDANG.page_now.history*GWDANG.page_size_mini;
            end = end > GWDANG.total_num.history ? GWDANG.total_num.history : end;
            GWDANG.load_image(type, start, end);
        }
    },//}}}
    close: function(){//{{{
        if(GWDANG.browser == 'ie' || !GWDANG.check_animate()){
            GWDANG.$('#gwdang-notifier').hide();
            GWDANG.$('body').attr('style', '');
            GWDANG.$('body').css('top', 0);
            GWDANG.$('body').css('margin-top', 0);
        }else{
            try{
                GWDANG.$('body').animate({ 'top': "0px" }, 500, 'swing', function(){
                    GWDANG.$('body').css('top', 0);
                    GWDANG.$('body').css('margin-top', 0);
                    GWDANG.$('body').attr('style', '');
                    GWDANG.$('#gwdang-notifier').hide();
                });
            }catch(e){
                GWDANG.$('body').css('top', 0);
                GWDANG.$('body').css('margin-top', 0);
                GWDANG.$('body').attr('style', '');
                GWDANG.$('#gwdang-notifier').hide();
            }
        }
    },//}}}
    site_search: function (){//{{{
        this.site = this.is_site_page;
        this.IE6=window.ActiveXObject&&!window.XMLHttpRequest;
        this.width = document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : document.body.clientWidth ;
        this.height= (typeof document.documentElement.clientHeight != 'undefined') && document.documentElement.clientHeight > 0 ? document.documentElement.clientHeight : document.body.clientHeight ;
        var Browser=new Object(); 
        Browser.userAgent=window.navigator.userAgent.toLowerCase(); 
        Browser.ie=/msie/.test(Browser.userAgent); 
        Browser.Moz=/gecko/.test(Browser.userAgent);
        if(Browser.ie){
            this.browser = 'ie';
        }else if(Browser.Moz){
            this.browser = 'moz';
        }else{
            this.browser = 'other';
        }
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/permanent_id/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':true,
            'data':'version=2',
            'success':function(msg){
                GWDANG.p_id = msg.p_id;
                GWDANG.is_open = msg.is_open;
                GWDANG.position = msg.position;
                GWDANG.style=msg.style;
                if(GWDANG.style =='top'){
                    try{
                        typeof document.getElementById('gwdang-notifier').innerHTML;
                        GWDANG.$('#gwdang-notifier').html('');
                    }catch(e){
                        GWDANG.$('body').append('<div id="gwdang-notifier"></div>');
                        GWDANG.$('#gwdang-notifier').show();
                    }
                    GWDANG.$('head').append('<link type="text/css" href="'+GWDANG.server+'/get.css?f=/css/brwext/gwdang-notifier.'+GWDANG.v_code+'.css'+'" rel="stylesheet" />');
                }else if(GWDANG.style == 'right'){
                    try{
                        typeof document.getElementById('plt-notifier').innerHTML;
                        GWDANG.$('#plt-notifier').html('');
                    }catch(e){
                        GWDANG.$('body').append('<div id="plt-notifier"></div>');
                        GWDANG.$('#plt-notifier').show();
                    }
                    GWDANG.$('head').append('<link type="text/css" href="'+GWDANG.server+'/get.css?f=/css/plt_notifier.css'+'" rel="stylesheet" />');
                }
                GWDANG.$.ajax({
                    'url':GWDANG.server+'/brwext/site_search_new/',
                    'dataType':'jsonp',
                    'jsonp':'callback',
                    'async':false,
                    'data':'permanent_id='+GWDANG.p_id+'&format=json&site='+GWDANG.site,
                    'success':function(msg){
                        GWDANG.show_search_bar(msg, GWDANG.style);
                    }
                });
            }
        });
	},//}}}
	site_dp: function (){//{{{
        this.dp = this.get_dp_info();
        this.IE6=window.ActiveXObject&&!window.XMLHttpRequest;
        this.width = document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : document.body.clientWidth ;
        this.height= this.site == document.documentElement.clientHeight > 0 ? document.documentElement.clientHeight : document.body.clientHeight;
        var Browser=new Object(); 
        Browser.userAgent=window.navigator.userAgent.toLowerCase(); 
        Browser.ie=/msie/.test(Browser.userAgent); 
        Browser.Moz=/gecko/.test(Browser.userAgent);
        if(Browser.ie){
            this.browser = 'ie';
        }else if(Browser.Moz){
            this.browser = 'moz';
        }else{
            this.browser = 'other';
        }
        this.$.ajax({
            'url':GWDANG.server+'/brwext/permanent_id/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':true,
            'data':'version=2',
            'success':function(msg){
                GWDANG.p_id = msg.p_id;
                GWDANG.is_open = msg.is_open;
                GWDANG.position = msg.position;
                GWDANG.style=msg.style;
                GWDANG.notice=msg.notice;
                GWDANG.first = msg.first;
                if(GWDANG.style =='top'){
                    try{
                        typeof document.getElementById('gwdang-notifier').innerHTML;
                        GWDANG.$('#gwdang-notifier').html('');
                    }catch(e){
                        GWDANG.$('body').append('<div id="gwdang-notifier"></div>');
                        GWDANG.$('#gwdang-notifier').show();
                    }
                    GWDANG.$('head').append('<link type="text/css" href="'+GWDANG.server+'/get.css?f=/css/brwext/gwdang-notifier.'+GWDANG.v_code+'.css'+'" rel="stylesheet" />');
                }else if(GWDANG.style == 'right'){
                    try{
                        typeof document.getElementById('plt-notifier').innerHTML;
                        GWDANG.$('#plt-notifier').html('');
                    }catch(e){
                        GWDANG.$('body').append('<div id="plt-notifier"></div>');
                        GWDANG.$('#plt-notifier').show();
                    }
                    GWDANG.$('head').append('<link type="text/css" href="'+GWDANG.server+'/get.css?f=/css/plt_notifier.css'+'" rel="stylesheet" />');
                }
                GWDANG.$.ajax({
                    'url':GWDANG.server+'/brwext/dp_query_new/',
                    'dataType':'jsonp',
                    'jsonp':'callback',
                    'async':false,
                    'data':'permanent_id='+GWDANG.p_id+'&format=json&url=' + encodeURIComponent(GWDANG.dp.url) + '&site=' + GWDANG.dp.site + '&isbn=' + GWDANG.dp.isbn+ '&name=' + encodeURIComponent(GWDANG.dp.name)+'&keyword='+ encodeURIComponent(GWDANG.dp.keyword)+'&skeyword='+ encodeURIComponent(GWDANG.dp.skeyword) ,
                    'success':function(msg){
                        GWDANG.show_dp_bar(msg, GWDANG.style);
                    }
                });
            }
        });
	},//}}}
    check_animate: function(){//{{{
        if(GWDANG.is_site_page == 'xiaozhuren' || GWDANG.is_site_page == 'tao3c'){
            return false;
        }
        return true;
    },//}}}
    get_promotion_info: function() {
        try{
            var pro = this.promotion_infos[this.site];
            if(typeof pro != 'undefined'){
                return pro;
            }else{
                return this.promotion_infos['default'];
            }
        }catch(e){
            return this.promotion_infos['default'];
        }
        return this.promotion_infos['default'];
    },
    get_dp_info: function(){//{{{
		try{
			var dp = this.dp_parse_func_sets[this.site]();
			dp.site = this.site;
			dp.url = window.location.href;
		}catch(e){
            var dp = this.dp_info();
            dp.site = this.site;
            dp.url = window.location.href;
		}
        dp.icon = dp.url.replace(/^http[s]?\:\/\//g,"");
        dp.icon = dp.icon.replace(/\/.*?$/g,"");
        dp.icon += '/favicon.ico';
        if(typeof dp.keyword == 'undefined' || dp.keyword == null){
            dp.keyword = '';
        }
        if(typeof dp.skeyword == 'undefined' || dp.skeyword == null){
            dp.skeyword = '';
        }
        if(typeof dp.isbn == 'undefined' || dp.isbn == null){
            dp.isbn='';
        }
        if(typeof dp.name == 'undefined' || dp.name == ''){
            dp.name = this.$('title').html();
        }
        return dp;
    },//}}}
    add_favor:function(site_id, dp_id){//{{{
        GWDANG.$('.favor-error').hide();
        var dp = GWDANG.dp;
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/favor/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=add&site='+dp.site+'&site_id='+site_id+'&num_iid='+dp_id+'&url='+encodeURIComponent(dp.url)+'&title='+encodeURIComponent(dp.name)+'&icon='+encodeURIComponent(dp.icon),
            'success':function(msg){
                if(msg.code == 1){
                    GWDANG.$('#gwdang-favor-list').prepend(msg.html);
                    GWDANG.$('#gwdang-favor-no-result').hide();
                }else {
                    GWDANG.$('#favor-error-msg'+msg.code).show();
                }
            }
        });
    },//}}}
    del_favor:function(site_id, dp_id){//{{{
        GWDANG.$('.favor-error').hide();
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/favor/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=del&site_id='+site_id+'&dp_id='+dp_id,
            'success':function(msg){
                if(msg.code == 1){
                    try{
                        if(GWDANG.check_animate()){
                            GWDANG.$('#gwdang-favor-'+site_id+'-'+dp_id).animate({'opacity':0},300,function(){
                                GWDANG.$('#gwdang-favor-'+site_id+'-'+dp_id).remove();
                                if(GWDANG.$('.gwdang-favor-li').length == 0){
                                    GWDANG.$('#gwdang-favor-no-result').show();
                                }
                            });
                        }else{
                            GWDANG.$('#gwdang-favor-'+site_id+'-'+dp_id).remove();
                            if(GWDANG.$('.gwdang-favor-li').length == 0){
                                GWDANG.$('#gwdang-favor-no-result').show();
                            }
                        }
                    }catch(e){
                        GWDANG.$('#gwdang-favor-'+site_id+'-'+dp_id).remove();
                        if(GWDANG.$('.gwdang-favor-li').length == 0){
                            GWDANG.$('#gwdang-favor-no-result').show();
                        }
                    }
                }else{
                    GWDANG.$('#favor-error-msg'+msg.code).show();
                }
            }
        });
    },//}}}
    list_favor:function(){//{{{
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/favor/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=list',
            'success':function(msg){
                if(msg.code == 1){
                    GWDANG.$('#gwdang-favor-list').html('');
                    GWDANG.$('#gwdang-favor-list').prepend(msg.html);
                }else{
                    GWDANG.$('#favor-error-msg'+msg.code).show();
                }
            }
        });
    },//}}}
    add_history:function(site_id, dp_id){//{{{
        var dp = GWDANG.dp;
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/history/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=add&site='+dp.site+'&site_id='+site_id+'&num_iid='+dp_id+'&url='+encodeURIComponent(dp.url)+'&title='+encodeURIComponent(dp.name)+'&icon='+encodeURIComponent(dp.icon),
            'success':function(msg){}
        });
    },//}}}
    del_history:function(site_id, dp_id){//{{{
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/history/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=del&site_id='+site_id+'&dp_id='+dp_id,
            'success':function(msg){
            }
        });
    },//}}}
    list_history:function(){//{{{
        GWDANG.$.ajax({
            'url':GWDANG.server+'/brwext/history/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=list_history',
            'success':function(msg){
                if(msg.code == 1){
                    GWDANG.$('#gwdang-history-list').append(msg.html);
                    if(GWDANG.$('#gwdang-history-list').children('li').length <= 2){
                        GWDANG.$('#gwdang-history-no-result').show();
                        GWDANG.$('#gwdang-history-hot').show();
                    }else{
                        GWDANG.$('#gwdang-history-no-result').hide();
                        GWDANG.$('#gwdang-history-reco').show();
                    }
                }
            }
        });
    },//}}}
    tab_out:function(){//{{{
        GWDANG.$('.gwdang-main .gwdang-tab').css('color', '');
        GWDANG.$('.gwdang-main .gwdang-tab').css('height', 30);
        GWDANG.$('.gwdang-main .gwdang-tab').css('background-color', '');
    },//}}}
    tab_in:function(obj){//{{{
        if(obj.attr('class') == 'gwdang-tab'){
            obj.css('color', '#177EE5');
            obj.css('height', 32);
            obj.css('background-color', 'white');
        }
    },//}}}
    mouse_over_event:function(obj){//{{{
        clearInterval(GWDANG.timer);
        var id = obj.attr('id');
        GWDANG.timer = setInterval("GWDANG.tab_out();GWDANG.tab_in(GWDANG.$('#"+id+"'));GWDANG.$('.gwdang-main .panel').hide();GWDANG.$('.gwdang-main .panel-mini').hide();GWDANG.$('#"+id+"-detail').show();clearInterval(GWDANG.timer);", 200);
    },//}}}
    mouse_click_event:function(obj){
        clearInterval(GWDANG.timer);
        clearInterval(GWDANG.timer2);
        var id = obj.attr('id');
        GWDANG.tab_out();
        GWDANG.tab_in(obj);
        GWDANG.$('.gwdang-main .panel').hide();
        GWDANG.$('.gwdang-main .panel-mini').hide();
        GWDANG.$('#'+id+'-detail').show();
    },
    set_panel_hover_event:function(){//{{{
        //hover 
        this.$('.gwdang-main .accurate a').each(function(){
            if(GWDANG.browser == 'ie'){
                GWDANG.$(this).bind('mouseenter', function(){
                    GWDANG.mouse_over_event(GWDANG.$(this));
                    clearInterval(GWDANG.timer2);
                });
                GWDANG.$(this).bind('mouseleave', function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.timer2 = setInterval("GWDANG.tab_out();GWDANG.$('.gwdang-main .panel').hide();GWDANG.$('.gwdang-main .panel-mini').hide();clearInterval(GWDANG.timer2);", 1000);
                });
            }else{
                GWDANG.$(this).mouseover(function(){
                    clearInterval(GWDANG.timer2);
                    GWDANG.mouse_over_event(GWDANG.$(this));
                });
                GWDANG.$(this).mouseout(function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.timer2 = setInterval("GWDANG.tab_out();GWDANG.$('.gwdang-main .panel').hide();GWDANG.$('.gwdang-main .panel-mini').hide();clearInterval(GWDANG.timer2);", 1000);
                });
            }
            GWDANG.$(this).click(function(){
                clearInterval(GWDANG.timer2);
                GWDANG.mouse_over_event(GWDANG.$(this));
            });
        });
        //click
        this.$('.gwdang-main .gwdang-icon').each(function(){
            GWDANG.$(this).bind('click', function(){
                var id = GWDANG.$(this).attr('id');
                if(GWDANG.$('#'+id+'-detail').css('display') != 'block'){
                    GWDANG.mouse_click_event(GWDANG.$(this));
                }else{
                    GWDANG.$('#'+id+'-detail').css('display', 'none');
                }
            });
        });
        this.$('.gwdang-main .panel').each(function(){
            var id = GWDANG.$(this).attr('id');
            id = id.substr(0, id.length-7);
            if(GWDANG.browser == 'ie'){
                GWDANG.$(this).bind('mouseenter', function(){
                    clearInterval(GWDANG.timer2);
                    GWDANG.tab_in(GWDANG.$('#'+id));
                    GWDANG.$(this).show();
                });
                GWDANG.$(this).bind('mouseleave', function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.tab_out();
                    GWDANG.$(this).hide();
                });
            }else{
                GWDANG.$(this).mouseover(function(){
                    clearInterval(GWDANG.timer2);
                    GWDANG.tab_in(GWDANG.$('#'+id));
                    GWDANG.$(this).show();
                });
                GWDANG.$(this).mouseout(function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.tab_out();
                    GWDANG.$(this).hide();
                });
            }
        });
        this.$('.gwdang-main .panel-mini').each(function(){
            if(GWDANG.browser == 'ie'){
                GWDANG.$(this).bind('mouseenter', function(){
                    clearInterval(GWDANG.timer2);
                    GWDANG.$(this).show();
                });
                GWDANG.$(this).bind('mouseleave', function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.$(this).hide();
                });
            }else{
                GWDANG.$(this).mouseover(function(){
                    clearInterval(GWDANG.timer2);
                    GWDANG.$(this).show();
                });
                GWDANG.$(this).mouseout(function(){
                    clearInterval(GWDANG.timer);
                    GWDANG.$(this).hide();
                });
            }
        });
    },//}}}
    list_history_reco:function(){//{{{
        this.$.ajax({
            'url':GWDANG.server+'/brwext/history/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'action=list_reco',
            'success':function(msg){
                if(msg.code == 1){
                    GWDANG.$('#history-item-list').html(msg.html);
                    GWDANG.init_history_list();
                    GWDANG.set_item_args();
                    GWDANG.set_page_args();
                    GWDANG.load_image('history', 0, GWDANG.page_size_mini);
                    GWDANG.$('#history-item-list').attr('inited', 1);
                }
            }
        });
    },//}}}
    show_reco_products: function(){
        this.$('#gwdang-promotion-dp').show();
        var site_id = this.$('#gwdang-now-site_id').text();
        var class_id = this.$('#gwdang-now-class_id').text();
        this.$.ajax({
            'url':GWDANG.server+'/brwext/reco/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'class_id='+class_id+'&site_id='+site_id,
            'success':function(data){
                try{//{{{
                    GWDANG.$('#gwdang-promotion-dp-detail').append('<div class="panel-wrap"><div class="pages">\u7b2c <span class="current-page" id="promotion-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="promotion-page-num">1</span> \u9875</div><div class="left-page"><a id="promotion-prev-page" title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'promotion\',-1);"></a></div><ul class="buy-list"><li><b>\u70ed\u95e8\u4fc3\u9500\u6d3b\u52a8\uff1a</b></li></ul></div>');
                    if(data.promotion_list.length>0){
                        for(var i=0; i<data.promotion_list.length; i++){
                            if(i>=6){
                                break;
                            }
                            var activity = data.promotion_list[i];
                            var li = GWDANG.$('<li></li>');
                            li.append('<img class="store" src="'+activity.icon_url+'" onerror="this.setAttribute(\'src\', \'http://www.gwdang.com/favicon.ico\');" />');
                            li.append('<a href="'+activity.url+'" target="_blank" title="'+activity.title+'" ><span class="title">'+activity.title+'</span></a>');
                            li.appendTo('#gwdang-promotion-dp-detail .buy-list');
                        }
                        GWDANG.$('#gwdang-promotion-dp-detail .buy-list').append('<li><a href="'+activity.more_link+'" target="_blank"><span class="show-all">'+activity.more_link_title+'</span></a></li>');
                    }
                    GWDANG.$('#gwdang-promotion-dp-detail .panel-wrap').append('<div class="recom-title"><a style="font-weight:bold;cursor:pointer;" href="'+activity.more_product_link+'" target="_blank">'+activity.reco_title+'</a></div><div class="all-products"><ul id="promotion-item-list"></ul></div>');
                    if(data.price_product.length>0){
                        for(var i=0; i<data.price_product.length; i++){
                            var dp = data.price_product[i];
                            var li = GWDANG.$('<li id="promotion-prod-item-'+i+'"></li>');
                            li.append('<a id="img-'+dp.dp_id+'" title="'+dp.title+'" target="_blank" class="small-img" href="'+dp.url+'"><img src="http://browser.gwdang.com/template/aug/images/new/120.gif" data-original="'+dp.img_url+'" id="dp-image-small-'+dp.dp_id+'" d_width="90" d_height="90" class="gwdang-lazy"></a>');
                            li.append('<span class="gwd-price"><a target="_blank" style="color:#E52600" title="'+dp.title+'" href="'+dp.url+'">&yen;'+dp.price+'</a></span>');
                            li.append('<p class="dp"><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="store">'+dp.site_name+'</span></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="fees" style="color:#00A66C">\u521a\u521a\u964d\u4e86&yen;<font style="font-weight:bold">'+dp.price_gap+'</font></span></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a></p>');
                            li.appendTo('#promotion-item-list');
                        }
                    }
                    GWDANG.$('#gwdang-promotion-dp-detail .panel-wrap').append('<div class="right-page"><a id="promotion-next-page" title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'promotion\',1);"></a></div>');
                    GWDANG.$('#gwdang-promotion-dp-detail').append('<div class="panel-shadow"></div>');
                    GWDANG.init_promotion_list();
                    GWDANG.set_item_args();
                    GWDANG.set_page_args();
                    GWDANG.load_image('promotion', 0, GWDANG.page_size);
                }catch(e){}//}}}
            }
        });
    },
    show_price_trend:function(){//{{{
        var js_file = this.server + '/get.js?f=/js/highcharts.js';
        var dp_ids = this.$('#gwdang-buy-on-sale-dp-ids').html();
        if(dp_ids == null){
            dp_ids = '';
        }
        var dp_id = this.$('#gwdang-dp_id').html();
        var width = document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : document.body.clientWidth ;
        this.addScript(js_file, false, function(){
            GWDANG.$ = typeof(jQuery)!= 'undefined'? jQuery : $;
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/price_trend/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':false,
                'data':'action=list_data&dp_ids='+dp_ids+'&dp_id='+dp_id+'&days='+GWDANG.trend_days,
                'success':function(msg){
                    if(msg.store.length > 0){
                        if(msg.lowest == '1'){
                            GWDANG.$('#gwdang-trend-text').html('\u5386\u53f2\u6700\u4f4e');
                            GWDANG.$('#gwdang-trend-text').css('color', '#E52600');
                        }
                        GWDANG.$('#gwdang-trend-current-price').html(msg.store[0].current_price);
                        GWDANG.$('#gwdang-trend-pri-range').html(msg.store[0].price_range);
                        var chart;
                        var obj = {
                            chart: {
                                renderTo: 'gwdang-pri-trend-chart',
                                type: 'line',
                                marginRight: 130,
                                marginBottom: 25
                             },
                            title: {
                                text: 'B2C\u5546\u57ce\u6700\u8fd1'+GWDANG.trend_days+'\u5929\u4ef7\u683c\u8d8b\u52bf',
                                x: -20
                            },
                            xAxis: {
                                type: 'datetime',
                                dateTimeLabelFormats:{
                                    day: '%m-%d'
                                }
                            },
                            yAxis: {
                                title: {
                                    text: '\u4ef7\u683c(\u5143)'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                xDateFormat: '%Y-%m-%d',
                                shared: true
                            },
                            legend: {
                                enabled:true,
                                layout: 'horizontal',
                                align: 'right',
                                verticalAlign: 'top',
                                borderWidth:0,
                                y: 50,
                                width:100
                            },
                            series:[]
                        };
                        if(msg.store.length>0){
                            var len = msg.store.length;
                            for(var i = 0; i < len; i++){
                                obj.series[i] = {
                                    visible:false,
                                    name: msg.store[i].name,
                                    pointStart:Date.UTC(msg.startY,msg.startM,msg.startD),
                                    pointInterval: 86400000,
                                    data:[]
                                };
                                if(i == 0){
                                    obj.series[i].visible = true;
                                }
                                if(msg.store[i].data.length>0){
                                    var len2 = msg.store[i].data.length;
                                    var datas = msg.store[i].data;
                                    for(var j = 0; j < len2; j ++){
                                        obj.series[i].data[j] = parseFloat(datas[j]);
                                    }
                                }
                            }
                        }
                        GWDANG.$('#gwdang-pri-trend-chart').css('width', width-300);
                        GWDANG.$('#gwdang-trend-detail .remind').css('left', width-280);
                        chart = new Highcharts.Chart(obj);
                        GWDANG.$('#gwdang-remind-btn').click(function(){
                            GWDANG.$('.remind-error').hide();
                            var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
                            var type = 1;
                            var price = 0;
                            var email = GWDANG.$('#gwdang-remind-email').val();
                            var dp_id = GWDANG.$('#gwdang-dp_id').html();
                            if(GWDANG.$('#gwdang-pri-notice-im').attr('checked')){
                                type = 1;
                            }else if(GWDANG.$('#gwdang-pri-notice-li').attr('checked')){
                                type = 2;
                                price = parseFloat(GWDANG.$('#gwdang-pri-limit').val());
                            }
                            if (!pattern.test(email)){
                                GWDANG.$('#gwdang-remind-error0').show();
                            }else{
                                GWDANG.$.ajax({
                                    'url':GWDANG.server+'/brwext/remind/',
                                    'dataType':'jsonp',
                                    'jsonp':'callback',
                                    'async':false,
                                    'data':'action=add&dp_id='+dp_id+'&email='+encodeURIComponent(email)+'&type='+type+'&price='+price,
                                    'success':function(msg){
                                        if(msg.code == 1){
                                            GWDANG.$('#gwdang-remind-error2').show();
                                        }else if(msg.code == 2){
                                            GWDANG.$('#gwdang-remind-error3').show();
                                        }else{
                                            GWDANG.$('#gwdang-remind-error1').show();
                                        }
                                    }
                                });
                            }
                        });
                        GWDANG.$('#gwdang-trend').show();
                        GWDANG.fix_width();
                    }
                }
            });
        });
    },//}}}
    show_cart_info:function(){//{{{
        this.$.ajax({
            'url':GWDANG.c_server+'/brwext/cart/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'op=list&format=brwext_jsonp',
            'success':function(msg){
                if(typeof msg.html != 'undefined' && msg.html != ''){
                    GWDANG.$('#gwdang-cart-list').html(msg.html);
                    GWDANG.$('#gwdang-cart-list').attr('inited', 1);
                    GWDANG.$('#gwdang-cart-num').html(msg.cart_num);
                }
            }
        });
    },//}}}
    show_cart_sum:function(){//{{{
        this.$.ajax({
            'url':GWDANG.c_server+'/cart/',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':false,
            'data':'op=sum&format=brwext_jsonp',
            'success':function(msg){
                GWDANG.$('#gwdang-cart-num').html(msg.cart_num);
            }
        });
    },//}}}
    addToCartMulti:function(id){//{{{
        this.$.ajax({
            'url':GWDANG.c_server+'/cart',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':true,
            'data':'dp_ids='+id+'&op=add_multi&format=brwext_jsonp',
            'success':function(msg){
                GWDANG.$('#gwdang-cart-multi').attr('href', 'javascript:');
                GWDANG.$('#gwdang-cart-multi').html('\u5df2\u6dfb\u52a0');
                GWDANG.show_cart_info();
            }
        });
    },//}}}
    addToCart:function(id){//{{{
        this.$.ajax({
            'url':GWDANG.c_server+'/cart',
            'dataType':'jsonp',
            'jsonp':'callback',
            'async':true,
            'data':'dp_id='+id+'&op=add&format=brwext_jsonp',
            'success':function(msg){
                GWDANG.$('#gwdang-cart-'+id).attr('href', 'javascript:');
                GWDANG.$('#gwdang-cart-'+id+' span').html('\u5df2\u6dfb\u52a0\u5230\u6bd4\u4ef7\u5355');
                GWDANG.$('#gwdang-cart-'+id+' span').css('color', '#999');
                GWDANG.show_cart_info();
                try{
                    GWDANG.$('#gwdang-cart-btn-'+id).attr('href', 'javascript:');
                    GWDANG.$('#gwdang-cart-btn-'+id).html('\u5df2\u6dfb\u52a0\u5230\u6bd4\u4ef7\u5355');
                }catch(e){}
            }
        });
    },//}}}
    submitFeedback:function(){//{{{
        var nick = this.$('#gwdang-feedback-nick').val();
        var content = this.$('#gwdang-feedback-content').val();
        nick = nick.replace(/[\ ]+/ig, '');
        content = content.replace(/[\ ]+/ig, '');
        var email = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        var qq = /^[\d]+$/;
        if(content == ''){
            this.$('.gwdang-feedback-error').hide();
            this.$('#gwdang-feedback-error-0').show();
        }else if(nick == ''){
            this.$('.gwdang-feedback-error').hide();
            this.$('#gwdang-feedback-error-1').show();
        }else if(!qq.test(nick) && !email.test(nick)){
            this.$('.gwdang-feedback-error').hide();
            this.$('#gwdang-feedback-error-1').show();
        }else{
            this.$.ajax({
                'url':GWDANG.server+'/brwext/feedback',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'nick='+encodeURIComponent(nick)+'&content='+encodeURIComponent(content)+'&format=brwext_jsonp',
                'success':function(msg){
                        GWDANG.$('.gwdang-feedback-error').hide();
                    if (msg.code == 1){
                        GWDANG.$('#gwdang-feedback-input').hide();
                        GWDANG.$('#gwdang-feedback-nick').val('');
                        GWDANG.$('#gwdang-feedback-content').val('');
                        GWDANG.$('#gwdang-feedback-success').show();
                        GWDANG.$('#gwdang-feedback-clean').show();
                    }else{
                        GWDANG.$('#gwdang-feedback-error-2').show();
                    }
                }
            });
        }
    },//}}}
    clearFeedback:function(){//{{{
        this.$('#gwdang-feedback-detail').hide();
        this.$('#gwdang-feedback-input').show();
        this.$('#gwdang-feedback-success').hide();
        this.$('#gwdang-feedback-clean').hide();
        this.$('#gwdang-feedback').hide();

    },//}}}
    show_search_bar: function(data, style){
        if(typeof style == 'undefined' || style == "top"){
            this.display_search_bar_top(data);
        }else if(style == 'right'){
            this.display_search_bar_right(data);
        }else if(style == 'bottom'){
            this.display_search_bar_bottom(data);
        }
    },
    display_search_bar_top: function(data){
        this.$('#gwdang-notifier').html();
        //iframe for fix ie6
        this.$('#gwdang-notifier').append('<!--[if IE 6]><script type="text/javascript">(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:""},d);var c=\'<iframe class="bgiframe"frameborder="0"tabindex="-1"src="\'+d.src+\'"style="display:block;position:absolute;z-index:-1;\'+(d.opacity!==false?"filter:Alpha(Opacity=\'0\');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+\'px\')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+\'px\')":b(d.height))+\';"/>\';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);</script><![endif]-->');//{{{//}}}
        this.$('#gwdang-notifier').append('<div class="gwdang-main gwdang-mini" style="width:105px;right:0;left:auto" id="gwdang-main"></div>');
        this.$('#gwdang-main').append('<div class="gwdang-nav main"><div class="logo" style="left:7px;"><a href="http://www.gwdang.com" target="_blank" style="width:19px;"><span></span></a></div><div class="icons" style="margin-left:25px;right:auto;"><a class="search-mini gwdang-icon" id="gwdang-search" href="javascript:" title="\u641c\u5546\u54c1" style="margin:0"> </a><a class="sale" id="gwdang-sale" href="'+data.promotion.jump_url+'" target="_blank" title="\u67e5\u770b'+data.promotion.info+'"> </a></div><div class="feedback-close" style="width:25px;"><a href="javascript:GWDANG.close();" target="_self" class="close" title="\u5173\u95ed\u8d2d\u7269\u515a"> </a></div></div>');
        this.$('#gwdang-main').append('<div id="gwdang-search-detail" class="panel-mini panel-search"><div class="pointer-up" style="right:45px;"></div><div class="panel-main"><ul class="search-tabs"><li id="search-gwdang" class="selected">\u8d2d\u7269\u515a</li> <li id="search-taobao">\u6dd8\u5b9d</li> <li id="search-360buy">\u4eac\u4e1c</li> <li id="search-amazon">\u4e9a\u9a6c\u900a</li> <li id="search-dangdang">\u5f53\u5f53</li> <li id="search-suning">\u82cf\u5b81</li></ul><form id="gwdang-search-form" target="_blank" action="http://www.gwdang.com/union/go/" method="get"><input class="keyword" id="gwdang-search-title" name="s_product" type="text" value=""><input name="target_url" id="gwdang-search-target_url" value="" type="hidden" ><input name="from" id="from" value="browser" type="hidden"><input id="gwdang-search-site_id" type="hidden" name="site_id" value="0"><input class="search-keyword" id="gwdang-search-btn" type="button" value="\u641c\u7d22"></form></div></div>');
/*        this.$('#gwdang-main').append('<div class="panel history panel-history" id="gwdang-history-detail"><div class="panel-wrap"><ul class="history-list" id="gwdang-history-list"><li><b>\u6d4f\u89c8\u5386\u53f2</b></li></ul><div class="pages">\u7b2c <span class="current-page" id="history-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="history-page-num">3</span> \u9875</div><div class="left-page"><a title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'history\',-1);"></a></div><div class="recom-title">\u6839\u636e\u6d4f\u89c8\u5386\u53f2\u5411\u60a8\u63a8\u8350</div><div class="recommend all-products" id="gwdang-history-recommend"><ul id="history-item-list"></ul></div><div class="right-page"><a title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'history\',1);"></a></div></div><div class="panel-shadow"></div></div>');
*/
        if(this.IE6){
            this.$('.gwdang-main .panel').bgiframe();
            this.$('.gwdang-main .panel-mini').bgiframe();
        }
        this.set_search_option_event();
        this.set_panel_hover_event();
        try{
            if(this.check_animate()){
                GWDANG.$('.gwdang-mini').animate({right:'5px'}, 1000, function(){
                    GWDANG.$('.gwdang-mini').animate({right:'0px'}, 1000, function(){});                            
                });
            }
        }catch(e){
            this.$('.gwdang-mini').css('right', '0');
        }
    },
    set_search_option_event: function(){
        //set search_btn option
        this.$('.search-tabs li').each(function(){
            GWDANG.$(this).click(function(){
                GWDANG.$('.search-tabs li').removeClass('selected');
                GWDANG.$(this).addClass('selected');
            });
        });
        this.$('#gwdang-search-title').keydown(function(event){
            if(event.which == 13){
                GWDANG.$('#gwdang-search-btn').click();
            }
        });
        this.$('#gwdang-search-btn').click(function(){
            if( GWDANG.$('#gwdang-search-title').val() != '' ){
                GWDANG.$('#gwdang-search-form').attr('action', 'http://www.gwdang.com/union/go/');
                var val = GWDANG.$('#gwdang-search-title').val();
                val = encodeURIComponent(val);
                if(GWDANG.$('#search-gwdang').hasClass('selected')){
                    GWDANG.$('#gwdang-search-form').attr('action', 'http://www.gwdang.com/search/');
                }else if(GWDANG.$('#search-taobao').hasClass('selected')){
                    GWDANG.$('#gwdang-search-site_id').val('83');
                    GWDANG.$('#gwdang-search-target_url').val('http://s8.taobao.com/search?q='+val);
                }else if(GWDANG.$('#search-360buy').hasClass('selected')){
                    GWDANG.$('#gwdang-search-site_id').val('3');
                    GWDANG.$('#gwdang-search-target_url').val('http://search.360buy.com/Search?enc=utf-8&keyword='+val);
                }else if(GWDANG.$('#search-amazon').hasClass('selected')){
                    GWDANG.$('#gwdang-search-site_id').val('1');
                    GWDANG.$('#gwdang-search-target_url').val('http://www.amazon.cn/s/?field-keywords='+val);
                }else if(GWDANG.$('#search-dangdang').hasClass('selected')){
                    GWDANG.$('#gwdang-search-site_id').val('2');
                    GWDANG.$('#gwdang-search-target_url').val('http://searchb.dangdang.com/?key='+val);
                }else if(GWDANG.$('#search-suning').hasClass('selected')){
                    GWDANG.$('#gwdang-search-site_id').val('25');
                    GWDANG.$('#gwdang-search-target_url').val('http://www.suning.com/emall/Search?searchKeywords='+val);
                }
                GWDANG.$('#gwdang-search-form').submit();
            }else{
                GWDANG.$('#gwdang-search-title').focus();
            }
        });
    },
    display_search_bar_right: function(data){
        this.$('#plt-notifier').html('');
        this.$('#plt-notifier').append('<span id="y" style="display:none"></span><div id="plt-search-mini" class="plt-search-mini"><div id="plt-icon" class="plt-icon" title="\u70b9\u51fb\u53ef\u5c55\u5f00\u6216\u6536\u8d77\uff0c\u62d6\u52a8\u53ef\u6539\u53d8\u4f4d\u7f6e\u3002">\u8d2d\u7269\u515a</div><div id="plt-search-bar" class="plt-search-bar"><div style="padding:14px 5px"><a href="'+data.promotion.jump_url+'"  target="_blank" class="show-more">'+data.promotion.info+'</a></div></div></div>');
        var elem;
        if(this.IE6){
            elem = document.documentElement;
        }else if(window.ActiveXObject && this.site == 'amazon'){
            elem = document.body;
        }
        if(this.IE6 || (this.site =='amazon' && window.ActiveXObject)){
            this.$("#plt-search-mini").css('top', elem.scrollTop);
            this.$("#plt-notifier").css('top', elem.scrollTop);
            this.$(window).scroll(function() {
                if(GWDANG.site == 'amazon' && window.ActiveXObject){
                    GWDANG.$("#plt-notifier").css('top', document.body.scrollTop - GWDANG.scrollTop  + parseInt(GWDANG.position) + 'px'); 
                    GWDANG.$("#plt-search-mini").css('top', document.body.scrollTop - GWDANG.scrollTop + parseInt(GWDANG.position) + 'px');
                }else{
                    GWDANG.$("#plt-notifier").css('top', document.documentElement.scrollTop - GWDANG.scrollTop  + parseInt(GWDANG.position) + 'px'); 
                    GWDANG.$("#plt-search-mini").css('top', document.documentElement.scrollTop - GWDANG.scrollTop + parseInt(GWDANG.position) + 'px');
                }
            });
        }
        this.$('#plt-icon').click(function(){
            if(GWDANG.$('#plt-search-bar').css('display') == 'none'){
                GWDANG.$('#plt-search-bar').css('display', 'block');
                if(GWDANG.IE6 || (GWDANG.site == 'amazon' && window.ActiveXObject)){
                    GWDANG.$('#plt-search-mini').css('width','185');
                }
                GWDANG.is_open=1;
            }else{
                GWDANG.$('#plt-search-bar').css('display', 'none');
                if(GWDANG.IE6 || (GWDANG.site == 'amazon' && window.ActiveXObject)){
                    GWDANG.$('#plt-search-mini').css('width','62');
                }
                GWDANG.is_open=0;
            }
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_is_open&is_open='+GWDANG.is_open+'&callback=?',
                'success':function(msg){
                    GWDANG.p_id = msg.p_id;
                    GWDANG.is_open = msg.is_open;
                }
            });
        });
        if(this.is_open == 1){
            this.$('#plt-search-bar').css('display', 'block');
            if(this.IE6 || (window.location.href.indexOf('amazon')>0 && window.ActiveXObject)){
                this.$('#plt-search-mini').css('width','185');
            }
        }else{
            this.$('#plt-search-bar').css('display', 'none');
            if(this.IE6 || (window.location.href.indexOf('amazon')>0 && window.ActiveXObject)){
                this.$('#plt-search-mini').css('width','62');
            }
        }
        this.$("#plt-search-mini").css('top', GWDANG.position);

        var container = document.documentElement;
        var ele = document.getElementById('plt-search-mini');
        var bodyHeight = container.offsetHeight;
        var maxY = this.height- 46;
        var dd = new Dragdrop({
            target : ele,
        	area : [0,maxY],
        	callback : function(obj){
        		if(typeof obj.moveY == 'number' && this.dragY){
        			document.getElementById('y').innerHTML = 'y:'+obj.moveY;	
        		}
        	}
        });	
        dd.dragY();
        this.$('#plt-search-mini').animate({ right: "5px" }, 2000, 'swing',	function() {GWDANG.$(this).animate({ right: "0" }, 100);});
    },
    show_dp_bar: function(data, style){//{{{
        if(typeof style == 'undefined' || style == "top"){
            this.display_dp_main_bar_top(data);
        }else if(style == 'right'){
            this.display_dp_main_bar_right(data);
        }else if(style == 'bottom'){
            this.display_dp_main_bar_bottom(data);
        }
    },//}}}
    display_dp_main_bar_top:function(data){//{{{
        this.$('#gwdang-notifier').html();
        //iframe for fix ie6
        this.$('#gwdang-notifier').append('<!--[if IE 6]><script type="text/javascript">(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:""},d);var c=\'<iframe class="bgiframe"frameborder="0"tabindex="-1"src="\'+d.src+\'"style="display:block;position:absolute;z-index:-1;\'+(d.opacity!==false?"filter:Alpha(Opacity=\'0\');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+\'px\')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+\'px\')":b(d.height))+\';"/>\';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);</script><![endif]-->');//{{{//}}}

        this.$('#gwdang-notifier').append('<div class="gwdang-main" id="gwdang-main"></div>');
        if(this.first == 1 && this.IE6){
            this.$('#gwdang-notifier').append('<div id="gwdang-help" style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_notice_fix.gif\') no-repeat;width: 630px;height: 240px;z-index: 9999999999999999;left: 50%;position: absolute;margin-left: -315px;top: 5px;"></div>');
            this.$('#gwdang-help').append('<a style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_know.png\') no-repeat;width: 112px;height: 32px;display: block;position: absolute;left: 50%;top: 130px;" href="javascript:" id="gwdang-help-close"></a>');
            this.$('#gwdang-help').append('<a style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_guide.png\') no-repeat; width: 112px; height: 32px; display: block; position: absolute;margin-left: -126px; left: 50%;  top: 130px;" href="http://www.gwdang.com/app/extension_guide" target="_blank"></a>');
        }else if(this.first == 1){
            this.$('#gwdang-notifier').append('<div id="gwdang-help" style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_notice.png\') no-repeat;width: 630px;height: 240px;z-index: 9999999999999999;left: 50%;position: fixed;margin-left: -315px;top:5px;"></div>');
            this.$('#gwdang-help').append('<a style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_know.png\') no-repeat;width: 112px;height: 32px;display: block;position: fixed;left: 50%;top: 130px;" href="javascript:" id="gwdang-help-close"></a>');
            this.$('#gwdang-help').append('<a style="background: url(\'http://browser.gwdang.com/template/aug/images/new/help_guide.png\') no-repeat; width: 112px; height: 32px; display: block; position: fixed;margin-left: -126px; left: 50%;  top: 130px;" href="http://www.gwdang.com/app/extension_guide" target="_blank"></a>');
        }
        if(this.first == 1){
            this.$('#gwdang-help-close').click(function(){
                GWDANG.$('#gwdang-help').hide();
            });
        }
        this.$('#gwdang-main').append('<div class="gwdang-nav main" id="gwdang-main-nav"></div>');
        this.$('#gwdang-main-nav').append('<div id="gwdang-bar-logo" class="logo"><a href="http://www.gwdang.com" target="_blank"><span></span></a></div>');
        
        try{
            this.$('#gwdang-main-nav').append('<div id="gwdang-bar-icons" class="icons"><a class="search gwdang-icon" id="gwdang-search" href="javascript:" title="\u53bb\u8d2d\u7269\u515a\u627e\u5b9d\u8d1d"></a><a class="sale gwdang-icon" id="gwdang-sale" href="'+data.promotion_info.jump_url+'" target="_blank" title="\u67e5\u770b'+data.promotion_info.info+'"></a><!--<a href="javascript:" class="history gwdang-icon" id="gwdang-history" title="\u6d4f\u89c8\u5386\u53f2\u63a8\u8350"></a>--></div>');
        }catch(e){}

        //search_form
        this.$('#gwdang-main-nav').append('<div class="gwdang-search-form-head" id="gwdang-search-form-head"></div>');
        this.$('#gwdang-main-nav').append('<div id="gwdang-bar-search" class="gwdang-search-form"><form id="gwdang-search-form" action="http://www.gwdang.com/search" method="get" target="_blank"><input id="gwdang-search-product" type="text" name="s_product" value="\u53bb\u8d2d\u7269\u515a\u627e\u5b9d\u8d1d" default="1" default_val="\u53bb\u8d2d\u7269\u515a\u627e\u5b9d\u8d1d" /></form></div>');

        this.$('#gwdang-search-product').click(function(){
            if(GWDANG.$(this).attr('default') == 1){
                GWDANG.$(this).val('');
                GWDANG.$(this).attr('default', 0);
            }
        });
        this.$('#gwdang-search-product').blur(function(){
            if(GWDANG.$(this).val()==''){
                GWDANG.$(this).val(GWDANG.$(this).attr('default_val'));
                GWDANG.$(this).attr('default', 1);
            }
        });
        this.$('#gwdang-search').click(function(){
            if(GWDANG.$('#gwdang-search-product').attr('default')==1){
                GWDANG.$('#gwdang-search-product').val('');
                GWDANG.$('#gwdang-search-product').attr('default', 0);
            }
            var p_name = GWDANG.$('#gwdang-search-product').val();
            p_name = GWDANG.$.trim(p_name);
            if( p_name != ''){
                GWDANG.$('#gwdang-search-form').submit();
            }else{
                GWDANG.$('#gwdang-search-product').focus();
            }
        });
        this.$('#gwdang-main-nav').append('<div class="accurate" id="gwdang-bar-compare"><div class="contents" id="gwdang-main-contents"></div></div>');
        //b2c
        try{//{{{
            if(typeof (data.b2c.min_price)!='undefined'){
                var dp_ids = '0-0';
                this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-b2c-dp" class="gwdang-tab"><span class="b2c-icon"></span>\u5546\u57ce<span class="lowest gwd-price">&yen;'+data.b2c.min_price+'</span> <span class="pointer-down"></span></a>');
                this.$('#gwdang-main').append('<div class="panel compare" id="gwdang-b2c-dp-detail"></div>');
                this.$('#gwdang-b2c-dp-detail').append('<div class="panel-wrap"><div class="pages">\u7b2c <span class="current-page" id="b2c-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="b2c-page-num">1</span> \u9875</div><div class="left-page"><a id="b2c-prev-page" title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'b2c\',-1);"></a></div><ul class="buy-list"><li><b>\u6b63\u54c1\u5546\u57ce\u5728\u5356\uff1a</b></li></ul></div>');
                if(data.b2c.store.length>0){
                    for(var i=0; i<data.b2c.store.length; i++){
                        if(i>=6){
                            break;
                        }
                        var dp = data.b2c.store[i];
                        var li = this.$('<li></li>');
                        dp_ids += ","+dp.dp_id;
                        li.append('<img class="store" src="'+dp.icon_url+'" onerror="this.setAttribute(\'src\', \'http://www.gwdang.com/favicon.ico\');" />');
                        li.append('<a href="'+dp.url+'" target="_blank" ><span class="title">'+dp.site_name+'</span></a>');
                        if(dp.more > 1){
                            li.append('<a href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser#for_dp_info_buy" target="_blank"><span class="more">('+dp.more+'\u6b3e)</span></a>');
                        }
                        li.append('<a href="'+dp.url+'" target="_blank" ><span class="price">&yen;'+dp.price+'</span></a>');
                        li.appendTo('#gwdang-b2c-dp-detail .buy-list');
                    }
                    this.$('#gwdang-b2c-dp-detail .buy-list').append('<li><a id="gwdang-cart-multi" style="display:none" href="javascript:GWDANG.addToCartMulti(\''+data.b2c.all_dp_ids+'\')">\u5168\u90e8\u52a0\u5165\u6bd4\u4ef7\u5355</a><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser#for_dp_info_buy" target="_blank"><span class="show-all">\u67e5\u770b\u5168\u90e8\u5546\u5bb6('+data.b2c.store.length+')</span></a></li>');
                }
                this.$('#gwdang-b2c-dp-detail .panel-wrap').append('<span style="display:none" id="gwdang-buy-on-sale-dp-ids">'+dp_ids+'</span>');
                this.$('#gwdang-b2c-dp-detail .panel-wrap').append('<span style="display:none" id="gwdang-dp_id">'+data.now.now_dp_id+'</span>');
                this.$('#gwdang-b2c-dp-detail .panel-wrap').append('<div class="all-products"><ul id="b2c-item-list"></ul></div>');
                if(data.b2c.product.length>0){
                    for(var i=0; i<data.b2c.product.length; i++){
                        var dp = data.b2c.product[i];
                        var li = this.$('<li id="b2c-prod-item-'+i+'"></li>');
                        li.append('<a id="img-'+dp.dp_id+'" title="'+dp.title+'" target="_blank" class="small-img" href="'+dp.url+'"><img src="http://browser.gwdang.com/template/aug/images/new/120.gif" data-original="'+dp.img_url+'" id="dp-image-small-'+dp.dp_id+'" d_width="90" d_height="90" class="gwdang-lazy"></a>');
                        if(typeof dp.l_price != 'undefined'){
                            li.append('<span class="gwd-price" style="font-size:12px;color:#999;text-decoration:line-through;text-align:center;">&yen;'+dp.l_price+'</span>');
                        }
                        if(dp.more>1){
                            li.append('<span class="gwd-price"><a target="_blank" style="color:#E52600" title="'+dp.title+'" href="'+dp.url+'">&yen;'+dp.price+'</a><a target="_blank" title="'+dp.title+'" href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser#for_dp_info_buy"><span class="more">\u66f4\u591a('+dp.more+')</span></a></span>');
                        }else{
                            li.append('<span class="gwd-price"><a target="_blank" style="color:#E52600" title="'+dp.title+'" href="'+dp.url+'">&yen;'+dp.price+'</a></span>');
                        }
                        //li.append('<p style="display:none" class="product-btn"><span class="gwdang-cart-btn"></span><a id="gwdang-cart-'+dp.dp_id+'" href="javascript:GWDANG.addToCart(\''+dp.dp_id+'\')"><span>\u52a0\u5165\u6bd4\u4ef7\u5355-\u591a\u6b3e\u6bd4\u4ef7</span></a></p>');
                        li.append('<p class="dp"><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="store">'+dp.site_name+'</span></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="fees">'+dp.fee+'</span></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a></p>');
                        li.appendTo('#b2c-item-list');
                    }
                }
                this.$('#gwdang-b2c-dp-detail .panel-wrap').append('<div class="right-page"><a id="b2c-next-page" title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'b2c\',1);"></a></div>');
                this.$('#gwdang-b2c-dp-detail').append('<div class="panel-shadow"></div>');
            }
        }catch(e){}//}}}

        //tmall
        try{//{{{
            if(typeof (data.tmall.min_price)!='undefined'){
                this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-tmall-dp" class="gwdang-tab"><span class="tmall-icon"></span>\u5929\u732b<span class="lowest taobao gwd-price">&yen;'+data.tmall.min_price+'</span> <span class="pointer-down"></span></a>');
                this.$('#gwdang-main').append('<div class="panel taobao-compare" id="gwdang-tmall-dp-detail"></div>');
                this.$('#gwdang-tmall-dp-detail').append('<div class="panel-wrap"><div class="pages">\u7b2c <span class="current-page" id="tmall-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="tmall-page-num">1</span> \u9875</div><div class="left-page"><a id="tmall-prev-page" title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'tmall\',-1);"></a></div><ul class="buy-list"></ul></div>');
                this.$('#gwdang-tmall-dp-detail .buy-list').append('<li><b>\u5929\u732b(\u6dd8\u5b9d\u5546\u57ce)\u5728\u5356\uff1a</b></li>');
                if(data.tmall.store.length>0){
                    for(var i=0; i<data.tmall.store.length; i++){
                        if(i>=6){
                            break;
                        }
                        var dp = data.tmall.store[i];
                        var li = this.$('<li></li>');
                        li.append('<img class="store" src="'+dp.icon_url+'">');
                        li.append('<a href="'+dp.url+'" target="_blank" ><span class="title">'+dp.nick+'</span></a>');
                        li.append('<a href="'+dp.url+'" target="_blank" ><span class="price">&yen;'+dp.price+'</span></a>');
                        li.appendTo('#gwdang-tmall-dp-detail .buy-list');
                    }
                    if(data.tmall.store.length>6){
                        this.$('#gwdang-tmall-dp-detail .buy-list').append('<li><a href="'+data.tmall.more_link+'" target="_blank"><span class="show-all">\u53bb\u5929\u732b\u67e5\u770b\u66f4\u591a\u7ed3\u679c</span></a></li>');
                    }
                }
                this.$('#gwdang-tmall-dp-detail .panel-wrap').append('<div class="all-products"><ul id="tmall-item-list"></ul></div>');
                if(data.tmall.product.length>0){
                    for(var i=0; i<data.tmall.product.length; i++){
                        var dp=data.tmall.product[i];
                        var li = this.$('<li id="tmall-prod-item-'+i+'"></li>');
                        li.append('<a id="img-tmall-'+dp.num_iid+'" title="'+dp.title+'" target="_blank" class="small-img" href="'+dp.url+'"><img data-original="'+dp.pic_url+'" src="http://browser.gwdang.com/template/aug/images/new/120.gif" id="dp-image-small-tmall-'+dp.num_iid+'" class="gwdang-lazy"></a>');
                        li.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="gwd-price"> &yen;'+dp.price+'</span></a>');
                        li.append('<p class="dp"><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="store">'+dp.nick+'</span></br></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a></p>');
                        li.appendTo('#tmall-item-list');
                    }
                }
                this.$('#gwdang-tmall-dp-detail .panel-wrap').append('<div class="right-page"><a id="tmall-next-page" title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'tmall\',1);"></a></div>');
                this.$('#gwdang-tmall-dp-detail').append('<div class="panel-shadow"></div>');
            }
        }catch(e){}//}}}

        //taobao
        try{//{{{
            if(typeof (data.taobao.min_price)!= 'undefined'){
                this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-taobao-dp" class="gwdang-tab"><span class="taobao-icon"></span>\u6dd8\u5b9d<span class="lowest taobao gwd-price">&yen;'+data.taobao.min_price+'</span> <span class="pointer-down"></span></a>');
                this.$('#gwdang-main').append('<div class="panel taobao-compare" id="gwdang-taobao-dp-detail"><div class="panel-wrap"><div class="pages">\u7b2c <span class="current-page" id="taobao-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="taobao-page-num">1</span> \u9875</div><div class="left-page"><a title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'taobao\', -1);"></a></div><ul class="buy-list"></ul></div></div>');
                this.$('#gwdang-taobao-dp-detail .buy-list').append('<li><b>\u6dd8\u5b9d\u7f51\u5728\u5356\uff1a</b></li>');
                if(data.taobao.store.length>0){
                    for(var i=0; i<data.taobao.store.length; i++){
                        if(i>=6){
                            break;
                        }
                        var dp = data.taobao.store[i];
                        var li = this.$('<li></li>');
                        li.append('<img class="store" src="'+dp.icon_url+'">');
                        li.append('<a href="'+dp.url+'" target="_blank" title="\u5356\u5bb6:'+dp.nick+'" ><span class="title">\u5356\u5bb6\u6240\u5728\u5730\uff1a'+dp.item_location+'</span></a>');
                        li.append('<a href="'+dp.url+'" target="_blank" ><span class="price">&yen;'+dp.price+'</span></a>');
                        li.appendTo('#gwdang-taobao-dp-detail .buy-list');
                    }
                    if(data.taobao.store.length > 6){
                        li.appendTo('#gwdang-taobao-dp-detail .buy-list').append('<li><a href="'+data.taobao.more_link+'" target="_blank"><span class="show-all">\u67e5\u770b\u66f4\u591a\u7ed3\u679c</span></a></li>');
                    }
                }
                this.$('#gwdang-taobao-dp-detail .panel-wrap').append('<div class="all-products"><ul id="taobao-item-list"></ul></div>');
                if(data.taobao.product.length>0){
                    for(var i=0;i<data.taobao.product.length; i++){
                        var dp=data.taobao.product[i];
                        var li=this.$('<li id="taobao-prod-item-'+i+'"></li>');
                        li.append('<a id="img-taobao-'+dp.num_iid+'" title="'+dp.title+'" target="_blank" class="small-img" href="'+dp.url+'"><img data-original="'+dp.pic_url+'" src="http://browser.gwdang.com/template/aug/images/new/120.gif" id="dp-image-small-taobao-'+dp.num_iid+'" class="gwdang-lazy"></a>');
                        li.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="gwd-price"> &yen;'+dp.price+'</span></a>');
                        li.append('<p class="dp"><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="location">'+dp.item_location+'</span></a><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"></a></br><a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a></p>');
                        li.appendTo('#taobao-item-list');
                    }
                }
                this.$('#gwdang-taobao-dp-detail .panel-wrap').append('<div class="right-page"><a title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'taobao\', 1);"></a></div>');
                this.$('#gwdang-taobao-dp-detail').append('<div class="panel-shadow"></div>');
            }
        }catch(e){}//}}}

        //trend
        this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-trend" style="display:none;" class="gwdang-tab"><span class="price-trend-icon"></span><span id="gwdang-trend-text">\u4ef7\u683c\u5386\u53f2</span></a>');//{{{
        this.$('#gwdang-main').append('<div class="panel price-trend" id="gwdang-trend-detail"><div class="panel-wrap"><div class="chart" id="gwdang-pri-trend-chart" style="width:700px; height:240px"></div><a class="trend-see-what" href="http://www.gwdang.com/dp'+data.now.now_dp_id+'/where_buy" target="_blank">\u53bb\u770b\u770b</a><div class="remind"><div class="recom-title"><h2>\u5f53\u524d\u4ef7\u683c: &yen;<span class="current-price" id="gwdang-trend-current-price"></span></h2><p>\u5386\u53f2\u4ef7\u683c: &yen;<span id="gwdang-trend-pri-range"></span></p></div><h1>\u964d\u4ef7\u63d0\u9192</h1><div><input type="radio" name="gwdang-notice[]" id="gwdang-pri-notice-im" style="border:0" checked="true"><label>\u4e00\u65e6\u5546\u54c1\u964d\u4ef7\u6211\u4eec\u5c06\u53d1\u90ae\u4ef6\u901a\u77e5\u60a8</label></div><div><input type="radio" name="gwdang-notice[]" id="gwdang-pri-notice-li" style="border:0" ><label>\u4ef7\u683c\u964d\u5230&nbsp;&nbsp;&yen;<input type="text" id="gwdang-pri-limit" value="" style="width:40px;line-height:20px">\u5143&nbsp;&nbsp;\u4ee5\u4e0b\u63d0\u9192\u60a8</label></div><div class="email"><input type="text" style="width:185px; line-height:20px" class="" id="gwdang-remind-email" value="\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740" onfocus="if(this.getAttribute(\'value\') == \'\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740\'){ this.setAttribute(\'value\', \'\');}"><a id="gwdang-remind-btn" href="javascript:">\u63d0\u4ea4</a></div><div class="notice"><span class="remind-error" id="gwdang-remind-error0" style="display:none">\u90ae\u7bb1\u5730\u5740\u9519\u8bef\uff0c\u518d\u68c0\u67e5\u4e00\u4e0b\u683c\u5f0f\u5427 :)</span><span class="remind-error" id="gwdang-remind-error1" style="display:none">\u6dfb\u52a0\u964d\u4ef7\u63d0\u9192\u5931\u8d25\uff0c\u7a0d\u540e\u518d\u8bd5\u8bd5\u5427 :)</span><span class="remind-error" id="gwdang-remind-error2" style="display:none">\u6dfb\u52a0\u6210\u529f! \u8bf7\u53ca\u65f6\u67e5\u6536\u964d\u4ef7\u63d0\u9192\u90ae\u4ef6 :)</span><span class="remind-error" id="gwdang-remind-error3" style="display:none">\u60a8\u5df2\u7ecf\u6dfb\u52a0\u8fc7\u6b64\u5546\u54c1\u5566 :)</span></div></div></div><div class="panel-shadow"> </div></div>');//}}}

        //review
        try{//{{{
            if(typeof (data.review.review_cnt)!='undefined'){
                this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-review" class="gwdang-tab"><span class="review-icon"></span><span>\u8bc4\u4ef7</span></a>');
                this.$('#gwdang-main').append('<div class="panel review" id="gwdang-review-detail"></div>');
                this.$('#gwdang-review-detail').append('<div class="review-wrap"></div>');
                var rating = this.$('<div class="ratings"></div>');
                var review_cnt = this.$('<div class="review-cnt"></div>');
                var number = parseFloat(data.review.star_level);
                var count = 1;
                while(number >= 20 && count <= 5){
                   review_cnt.append('<span class="big-stars full-star"></span>');
                   count++;
                   number -= 20;
                }
                while(number >= 10 && count <= 5){
                   review_cnt.append('<span class="big-stars half-star"></span>');
                   count++;
                   number -= 10;
                }
                while(count <= 5){
                   review_cnt.append('<span class="big-stars hollow-star"></span>');
                   count++;
                }
                review_cnt.append('<span class="score">'+data.review.score+'</span>');
                review_cnt.appendTo(rating);
                rating.append('<div><a target="_blank" href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/#dp_info_review" ><span class="review-num">'+data.review.review_cnt+'</span>\u4eba\u8bc4\u4ef7</a>&nbsp;&nbsp;<a target="_blank" href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/#dp_info_review" ><span class="review-num" style="color:#e52600;font-size:16px;font-weight:bold;">'+data.review.recom_percent+'</span>\u4eba\u63a8\u8350\u8d2d\u4e70</a></div>');
                rating.append('<span class="stars-five"  title="\u529b\u8350">  </span><div class="bar" style="width:'+data.review.star_bar.s5+'px"></div><div class="bar-grey" style="width:'+(100-parseFloat(data.review.star_bar.s5))+'px"></div><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt=5#dp_info_review" target="_blank" >'+data.review.percent.s5+'</a><br>');
                rating.append('<span class="stars-four"  title="\u63a8\u8350">  </span><div class="bar" style="width:'+data.review.star_bar.s4+'px"></div><div class="bar-grey" style="width:'+(100-parseFloat(data.review.star_bar.s4))+'px"></div><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt=4#dp_info_review" target="_blank" >'+data.review.percent.s4+'</a><br>');
                rating.append('<span class="stars-three"  title="\u8fd8\u884c">  </span><div class="bar" style="width:'+data.review.star_bar.s3+'px"></div><div class="bar-grey" style="width:'+(100-parseFloat(data.review.star_bar.s3))+'px"></div><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt=3#dp_info_review" target="_blank" >'+data.review.percent.s3+'</a><br>');
                rating.append('<span class="stars-two"  title="\u8f83\u5dee">  </span><div class="bar" style="width:'+data.review.star_bar.s2+'px"></div><div class="bar-grey" style="width:'+(100-parseFloat(data.review.star_bar.s2))+'px"></div><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt=2#dp_info_review" target="_blank" >'+data.review.percent.s2+'</a><br>');
                rating.append('<span class="stars-one"  title="\u5f88\u5dee">  </span><div class="bar" style="width:'+data.review.star_bar.s1+'px"></div><div class="bar-grey" style="width:'+(100-parseFloat(data.review.star_bar.s1))+'px"></div><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt=1#dp_info_review" target="_blank" >'+data.review.percent.s1+'</a><br>');
                rating.append('<div style="text-align:left;"><a target="_blank" href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/#dp_info_review">\u67e5\u770b\u5168\u90e8\u8bc4\u4ef7</a></div>');
                rating.appendTo('#gwdang-review-detail .review-wrap');
                if(data.review.good.length>0 || data.review.bad.length>0){
                    this.$('#gwdang-review-detail .review-wrap').append('<div class="features"></div>');
                    if(data.review.good.length>0){
                        this.$('#gwdang-review-detail .features').append('<div class="good"><div class="title">\u4f18\u70b9</div><div class="tags"></div></div>');
                        var tags = this.$('#gwdang-review-detail .review-wrap .features .good .tags');
                        for(var i=0; i<data.review.good.length; i++){
                            var tag = data.review.good[i];
                            tags.append('<a target="_blank" title="\u67e5\u770b\u63d0\u5230'+tag.key+'\u7684\u8bc4\u8bba" href="'+tag.url+'">'+tag.key+'<span>('+tag.cnt+')</span></a>');
                        }
                    }
                    if(data.review.bad.length>0){
                        this.$('#gwdang-review-detail .features').append('<div class="bad"><div class="title">\u7f3a\u70b9</div><div class="tags"></div></div>');
                        var tags = this.$('#gwdang-review-detail .review-wrap .features .bad .tags');
                        for(var i=0; i<data.review.bad.length; i++){
                            var tag = data.review.bad[i];
                            tags.append('<a target="_blank" title="\u67e5\u770b\u63d0\u5230'+tag.key+'\u7684\u8bc4\u8bba" href="'+tag.url+'">'+tag.key+'<span>('+tag.cnt+')</span></a>');
                        }
                    }
                }
                if(data.review.good.length>0 || data.review.bad.length>0){
                    var main_review = this.$('<div class="main-review"></div>');
                }else{
                    var main_review = this.$('<div class="main-review" style="left:250px;border-left:1px dashed #ddd;"></div>');
                }
                var ul = this.$('<ul></ul>');
                if(data.review.main_review.length>0){
                    for(var i=0; i<data.review.main_review.length; i++){
                        var item = data.review.main_review[i];
                        var li = this.$('<li></li>');
                        var info = this.$('<div class="review-info"></div>');
                        info.append('<span class="review-title"><strong><a href="'+item.r_url+'" target="_blank" >'+item.title+'</a></strong></span>');
                        var star = parseFloat(item.star_cnt);
                        var now = 1;
                        while(star >= 1 && now <= 5){
                            info.append('<span class="stars full-star"></span>');
                            star --;
                            now ++;
                        }
                        while(star >= 0.5 && now <= 5){
                            info.append('<span class="stars half-star"></span>');
                            star -= 0.5;
                            now ++;
                        }
                        while(now <= 5){
                            info.append('<span class="stars hollow-star"></span>');
                            now ++;
                        }
                        info.appendTo(li);
                        li.append('<div><a class="nick-name" href="'+item.a_url+'" target="_blank">'+item.author+'</a><span class="store">'+item.site_name+'</span><span class="date">'+item.date+'</span></div><div><a href="'+item.r_url+'" target="_blank" >'+item.body+'</a></div>');
                        li.appendTo(ul);
                        ul.appendTo(main_review);
                        break;
                    }
                }
                main_review.appendTo('#gwdang-review-detail .review-wrap');
                this.$('#gwdang-review-detail').append('<div class="panel-shadow"></div>');
            }
        }catch(e){}//}}}

        //also_buy
        this.$('#gwdang-main-contents').append('<a href="javascript:" id="gwdang-also_buy" style="display:none;" class="gwdang-tab"><span class="recom-icon-tb"></span><span>\u63a8\u8350</span><span class="pointer-down"></span></a>');//{{{
        try{
            if(data.also.length > 0){
                this.$('#gwdang-main').append('<div class="panel recommend" id="gwdang-also_buy-detail"><div class="panel-wrap"><div class="pages">\u7b2c <span class="current-page" id="also_buy-current-page">1</span> \u9875\uff0c\u5171 <span class="page-num" id="also_buy-page-num">1</span> \u9875</div><div class="left-page"><a id="also_buy-prev-page" title="\u4e0a\u4e00\u9875" href="javascript:GWDANG.change_page(\'also_buy\',-1);"></a></div><div class="recom-title">\u4e70\u8fc7\u6b64\u5546\u54c1\u7684\u4eba\u8fd8\u4e70\u4e86</div><div class="all-products"><ul id="also_buy-item-list"></ul></div><div class="right-page"><a id="also_buy-next-page" title="\u4e0b\u4e00\u9875" href="javascript:GWDANG.change_page(\'also_buy\',1);"></a></div></div><div class="panel-shadow"> </div></div>');
                for(var i=0; i< data.also.length; i++){
                    var dp = data.also[i];
                    var li = this.$('<li id="also_buy-prod-item-'+i+'"></li>');
                    li.append('<a id="img-also-'+dp.dp_id+'" title="'+dp.title+'" target="_blank" class="small-img" href="'+dp.url+'"><img src="http://browser.gwdang.com/template/aug/images/new/120.gif" data-original="'+dp.img_url+'" id="dp-image-small-also-'+dp.dp_id+'" d_width="90" d_height="90" class="gwdang-lazy"></a>');
                    if(dp.from == 'b2c'){
                        var span = this.$('<span class="gwd-price"></span>');
                        span.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'">&yen;'+dp.price+'</a>');
                        if(dp.more > 1){
                            span.append('<a target="_blank" title="'+dp.title+'" href="'+dp.more_link+'"><span class="more">\u66f4\u591a('+dp.more+')</span></a>');
                        }
                        span.appendTo(li);
                        var p = this.$('<p class="review-stars"></p>');
                        var star = parseFloat(dp.score);
                        var now = 1;
                        while(star >= 2 && now <= 5){
                            p.append('<span class="stars full-star"></span>');
                            star -= 2;
                            now ++;
                        }
                        while(star >= 1 && now <= 5){
                            p.append('<span class="stars half-star"></span>');
                            star -= 1;
                            now ++;
                        }
                        while(now <= 5){
                            p.append('<span class="stars hollow-star"></span>');
                            now ++;
                        }
                        p.append('<span><a href="http://www.gwdang.com/dp'+dp.dp_id+'/reviews/#for_dp_info_review" target="_blank">'+dp.review_cnt+'\u4eba\u8bc4\u4ef7</a></span>');
                        p.appendTo(li);
                        var dp_p = this.$('<p class="dp"></p>');
                        dp_p.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="store">'+dp.site_name+'</span></a>');
                        dp_p.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="fees">'+dp.fee+'</span></a>');
                        dp_p.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a>');
                        dp_p.appendTo(li);
                    }else if(dp.from == 'taobao'){
                        li.append('<span class="gwd-price"><a target="_blank" title="'+dp.title+'" href="'+dp.url+'">&yen;'+dp.price+'</a></span>');
                        var p = this.$('<p class="dp"></p>');
                        p.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="store">'+dp.volume+'</span></a>');
                        p.append('<a target="_blank" title="'+dp.title+'" href="'+dp.url+'"><span class="title">'+dp.title+'</span></a>');
                        p.appendTo(li);
                    }
                    li.appendTo('#also_buy-item-list');
                }
                this.$('#gwdang-also_buy').show();
            }
        }catch(e){}//}}}

        //reco
        if(data.also.length == 0 && this.site != 'taobao' && this.site != 'tmall'){
            this.$('#gwdang-main-contents').append('<a href="javascript:" style="display:none" id="gwdang-promotion-dp" class="gwdang-tab"><span class="recom-icon"></span>\u7279\u4ef7\u4fc3\u9500</a>');
            this.$('#gwdang-main-contents').append('<span style="display:none" id="gwdang-now-class_id">'+data.now.class_id+'</span>');
            this.$('#gwdang-main-contents').append('<span style="display:none" id="gwdang-now-site_id">'+data.now.site_id+'</span>');
            this.$('#gwdang-main').append('<div class="panel promotion" style="display:none;" id="gwdang-promotion-dp-detail"></div>');
        }

        this.$('#gwdang-main-nav').append('<div class="feedback-close" style="z-index:999999999999;width:130px;_width:135px;float:none;position:absolute;right:0" id="gwdang-feed-close"></div>');//{{{
        this.$('#gwdang-feed-close').append('<a href="javascript:GWDANG.close();" target="_self" class="close gwdang-icon" title="\u5173\u95ed\u8d2d\u7269\u515a"></a>');
        this.$('#gwdang-feed-close').append('<a href="javascript:" class="feedback gwdang-icon" id="gwdang-feedback" title="\u6211\u8981\u53cd\u9988"></a>');
        this.$('#gwdang-feed-close').append('<a href="javascript:" class="modify gwdang-icon" id="gwdang-modify" title="\u4fee\u6539\u63d2\u4ef6\u8bbe\u7f6e"></a>');//}}}
        this.$('#gwdang-feed-close').append('<a href="javascript:" class="gwdang-icon share-div" style="width:25px;" id="gwdang-share-bad" title="\u4e3e\u62a5\u5047\u4fc3\u9500\u7684\u5546\u54c1\u7ed9\u670b\u53cb"><span class="share-bad-ico"></span></a>');
        this.$('#gwdang-feed-close').append('<a href="javascript:" class="gwdang-icon share-div" style="width:25px;" id="gwdang-share-good" title="\u63a8\u8350\u4f18\u60e0\u7684\u5546\u54c1\u7ed9\u670b\u53cb"><span class="share-good-ico"></span></a>'); 
        //setting_btn
        if(this.style=='right'){
            var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
        }else {
            var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
        }
        this.$('#gwdang-main').append('<div id="gwdang-modify-detail" class="panel-mini panel-modify"><div class="pointer-up"><!--[if IE 6]>\u25c6<![endif]--></div><div class="panel-main"><h4>\u8bf7\u9009\u62e9\u6837\u5f0f\u8bbe\u7f6e\uff1a</h4>'+tmp+'<br />\u9009\u62e9\u6837\u5f0f\u540e\u5c06\u5728\u4e0b\u4e00\u4e2a\u9875\u9762\u751f\u6548<br /><h4 id="gwdang-setting-success" style="display:none">\u8bbe\u7f6e\u6210\u529f\u3002</h4><a href="http://www.gwdang.com/app/extension" target="_blank">\u5206\u4eab\u6b64\u8f6f\u4ef6</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.gwdang.com/app/mobile" target="_blank">\u624b\u673a\u5ba2\u6237\u7aef</a></div></div>');//{{{//}}}
        //notice module
        try{
            this.$('#gwdang-main').append('<div class="panel-notice panel-mini" style="display:'+data.notice_status+'; width:70px;*width:80px;position:absolute;top:40px;left:2px;background-color:#fafafa;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:0 1px #fff;-moz-box-shadow: 0 1px #fff;box-shadow: 0 -1px 0 #fefcfc inset,0 0 8px rgba(0,0,0,0.3);background:#FAFAFA;border:1px solid #ebebeb;*border:2px solid #ebebeb; _border:2px solid #ebebeb;" ><div class="pointer-up" style="width:14px;height:10px;position:absolute;top:-7px;left:15px;background:url("http://browser.gwdang.com/template/aug/images/extension/gwdang-notifier.png") no-repeat 0 -140px;_background-image:url("http://browser.gwdang.com/template/aug/images/extension/gwdang-notifier.jpg"); _background:none;_line-height:20px;_font-size:10px;_width:10px;_overflow:hidden;_color:#ebebeb;_margin-top:-7px;color:#ebebeb"><!--[if IE 6 ]>\u25c6<![endif]--></div><span class="gwdang-notice-close" style="display:block;cursor:pointer;position:absolute;right:0px;width:15px;height:20px;overflow:hidden">X</span><p style="clear:both;padding:0 5px; color:#E52600"><a style="color:#E52600;" href="http://blog.gwdang.com/?p=149" target="_blank" class="gwdang-notice-close">\u65b0\u901a\u77e5</a></p></div>');//{{{//}}}
        }catch(e){}
        //share_btn
        try{//{{{
            if(typeof (data.share_good)!= 'undefined'){
                this.$('#gwdang-main').append('<div id="gwdang-share-good-detail" class="panel-share-good panel-mini"><div class="pointer-up"><!--[if IE 6]>\u25c6<![endif]--></div><div class="panel-main"><ul><li style="float:left"><a id="gwdang_sina" target="_self" ahref="'+data.share_good.sina+'" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ><span class="sina32"></span></a></li><li style="float:left"><a id="gwdang_qq" target="_self" ahref="'+data.share_good.qq+'" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ><span class="qq32"></span></a></li><li style="float:left"><a id="gwdang_qzone" target="_self" ahref="'+data.share_good.qzone+'" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" onclick="'+data.share.win+'" href="javascript:" ><span class="qzone32"></span></a></li><li style="float:left"><a id="gwdang_renren" target="_self" ahref="'+data.share_good.renren+'" title="\u5206\u4eab\u5230\u4eba\u4eba\u7f51" onclick="'+data.share.win+'" href="javascript:"><span class="renren32"></span></a></li><li style="float:left"><a id="gwdang_douban" target="_self" ahref="'+data.share_good.douban+'" title="\u5206\u4eab\u5230\u8c46\u74e3" onclick="'+data.share.win+'" href="javascript:" ><span class="douban32"></span></a></li></ul></div></div>');
            }
            if(typeof (data.share_bad)!= 'undefined'){
                this.$('#gwdang-main').append('<div id="gwdang-share-bad-detail" class="panel-share-bad panel-mini"><div class="pointer-up"><!--[if IE 6]>\u25c6<![endif]--></div><div class="panel-main"><ul><li style="float:left"><a id="gwdang_sina" target="_self" ahref="'+data.share_bad.sina+'" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ><span class="sina32"></span></a></li><li style="float:left"><a id="gwdang_qq" target="_self" ahref="'+data.share_bad.qq+'" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ><span class="qq32"></span></a></li><li style="float:left"><a id="gwdang_qzone" target="_self" ahref="'+data.share_bad.qzone+'" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" onclick="'+data.share.win+'" href="javascript:" ><span class="qzone32"></span></a></li><li style="float:left"><a id="gwdang_renren" target="_self" ahref="'+data.share_bad.renren+'" title="\u5206\u4eab\u5230\u4eba\u4eba\u7f51" onclick="'+data.share.win+'" href="javascript:"><span class="renren32"></span></a></li><li style="float:left"><a id="gwdang_douban" target="_self" ahref="'+data.share_bad.douban+'" title="\u5206\u4eab\u5230\u8c46\u74e3" onclick="'+data.share.win+'" href="javascript:" ><span  class="douban32"></span></a></li></ul></div></div>');
            }
        }catch(e){}//}}}
        //feedback_btn
        this.$('#gwdang-main').append('<div class="panel-feedback panel-mini" id="gwdang-feedback-detail"><div class="pointer-up"><!--[if IE 6]>\u25c6<![endif]--></div><p class="title">\u7528\u6237\u53cd\u9988<span id="gwdang-feedback-error-0" class="gwdang-feedback-error">\u63d0\u4ea4\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a:(</span><span id="gwdang-feedback-error-1" class="gwdang-feedback-error">\u8054\u7cfb\u65b9\u5f0f\u586b\u5199\u6709\u8bef:(</span><span id="gwdang-feedback-error-2" class="gwdang-feedback-error">\u53cd\u9988\u63d0\u4ea4\u5931\u8d25\u4e86:(</span></p><div id="gwdang-feedback-input"><p><span>\u53cd\u9988\u5185\u5bb9\uff1a</span></p><p><textarea id="gwdang-feedback-content" name="gwdang-feedback-content" maxlength="400"></textarea></p><p><span>\u90ae\u7bb1\u6216QQ(<span>\u90ae\u7bb1\u683c\u5f0fXXX@XX.XX; QQ\u76f4\u63a5\u586b\u6570\u5b57\u5373\u53ef</span>)\uff1a</span><input id="gwdang-feedback-nick"  name="gwdang-feedback-nick"  value=""></p><p><a href="javascript:GWDANG.submitFeedback();"><span>\u63d0\u4ea4\u53cd\u9988</span></a></p></div><div id="gwdang-feedback-success"><p class="feedback-success"><span>\u975e\u5e38\u611f\u8c22\u60a8\u7684\u53cd\u9988\uff0c\u6211\u4eec\u5c06\u5c3d\u5feb\u5904\u7406\uff0c\u52aa\u529b\u6539\u8fdb\u6211\u4eec\u7684\u4ea7\u54c1\u3002\u5982\u6709\u9700\u8981\uff0c\u5c06\u4e0e\u60a8\u8054\u7cfb\u6c9f\u901a :) </span></p><p><a href="javascript:GWDANG.clearFeedback();"><span>\u786e\u5b9a</span></a></p></div></div>');//{{{
        //handle the mouse events
        //move the top bar position
        if(this.browser != 'ie'){
            try{
                if(this.site!='amazon'){
                    this.$('body').css('width', '100%');
                }
                this.$('body').css('position', 'absolute');
                if(this.check_animate()){
                    this.$('body').animate({ 'top': "32px" }, 500, 'swing', function(){
                        GWDANG.$('body').css('top', 32);
                    });
                }else{
                    this.$('body').css('top', 32);
                }
            }catch(e){
                if(this.site!='amazon'){
                    this.$('body').css('width', '100%');
                }
                this.$('body').css('position', 'absolute');
                this.$('body').css('top', 32);
            }
        }else{
            this.$('body').css('width', '100%');
            this.$('body').css('margin-top', 32);
        }
        this.$('#gwdang-notifier').show();
        if(data.also.length ==0 && this.site != 'taobao' && this.site != 'tmall'){
            this.show_reco_products();
        }
        if(this.site == 'amazon'){
            this.width = document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : document.body.clientWidth;
            this.$('.gwdang-main').css('width',this.width);
        }
        if(this.IE6){
            this.$('.gwdang-main .panel').bgiframe();
            this.$('.gwdang-main .panel-mini').bgiframe();
        }
        //this.set_search_option_event();
        this.set_panel_hover_event();
        this.$('.panel-notice').unbind();
        //init items' list
        this.init_item_list();
        this.$(window).resize(function(){
            GWDANG.set_item_args();
            GWDANG.set_page_args();
            if(GWDANG.dp.site == 'amazon'){
                GWDANG.width = document.body.clientWidth;
                GWDANG.$('.gwdang-main').css('width',GWDANG.width); 
            }
            GWDANG.$('.all-products').css('width',GWDANG.width-310);
            GWDANG.$('.gwdang-main .recommend .all-products').css('width', GWDANG.width-80);
        });
        this.set_item_args();
        this.set_page_args();
        if(this.dp.site == 'amazon'){
            this.width = document.body.clientWidth;
            GWDANG.$('.gwdang-main').css('width', this.width); 
        }
        this.$('.all-products').css('width',this.width-310);
        this.$('.gwdang-main .recommend .all-products').css('width', this.width-80);

        this.load_image('b2c', 0, this.page_size_mini);
        this.load_image('tmall', 0, this.page_size_mini);
        this.load_image('taobao', 0, this.page_size_mini);
        this.load_image('also_buy', 0, this.page_size);
        this.show_price_trend();
        this.$('.gwdang-main .panel-modify input').click(function(){
            GWDANG.$("#gwdang-setting-success").hide();
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_style&style='+GWDANG.$(this).val()+'&callback=?',
                'success':function(msg){
                    GWDANG.$("#gwdang-setting-success").show();
                    setTimeout("GWDANG.$(\"#gwdang-setting-success\").css('display', 'none');", 3000);
                    GWDANG.p_id = msg.p_id;
                    GWDANG.is_open = msg.is_open;
                    GWDANG.style = msg.style;
                }
            });
        });
        this.$('.gwdang-notice-close').click(function(){
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_notice&notice='+GWDANG.notice+'&callback=?',
                'success':function(msg){
                    GWDANG.$(".panel-notice").hide();
                }
            });
        
        });
        if(this.site == 'taobao'){
            this.$(window).scroll(function(){
                if(GWDANG.$('#J_TabBarWrap').hasClass('tb-sticky-tabbar') && GWDANG.$('#J_TabBarWrap').css('top') != 32 && GWDANG.$('#gwdang-notifier').css('display') != 'none'){
                    GWDANG.$('#J_TabBarWrap').css('top', 32);
                }else if(GWDANG.$('#gwdang-notifier').css('display') == 'none' && GWDANG.$('#J_TabBarWrap').hasClass('tb-sticky-tabbar')){
                    GWDANG.$('#J_TabBarWrap').css('top', 0);
                }   
                if(GWDANG.$('#J_TabBar').css('position') == 'fixed'){
                    GWDANG.$('#J_TabBar').css('top', 17);
                }
            }); 
        }
        if(this.browser != 'ie' ){
            this.$('#bibibei').css('top', 32);
        }
        this.$('#gwdang-main').css('z-index', 2147483648);
        this.fix_width();
    },//}}}
    fix_width : function(){
        this.$('#gwdang-bar-compare').width('auto');
        var logo_width = parseInt(this.$('#gwdang-bar-logo').width());
        var compare_width = parseInt(this.$('#gwdang-bar-compare').width());
        if( this.IE6 && compare_width > 665){
            compare_width = 665;
        }
        var icons_width = parseInt(this.$('#gwdang-bar-icons').width());
        var feed_close_width = parseInt(this.$('#gwdang-feed-close').width());
        var search_width = this.width - logo_width - compare_width - icons_width - feed_close_width - 20;
        search_width -= 20;
        if(search_width > 300){
            search_width = 300;
        }else if( search_width < 0){
            search_width = 80;
        }
        if(this.IE6){
            this.$('#gwdang-search-form-head').css('background-image','url("http://browser.gwdang.com/template/aug/images/extension/gwdang-notifier.jpg")');
        }
        this.$('#gwdang-bar-search').css('width', search_width);
        this.$('#gwdang-search-form-head').css('right',search_width+183);
        if(this.site == 'amazon'){
            this.$('#gwdang-search-product').css('height', 26);
        }
    },
    display_dp_main_bar_right:function(data){//{{{
        this.$('#plt-notifier').html('');
        this.$('#plt-notifier').append('<!--[if IE 6]><script type="text/javascript">(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:""},d);var c=\'<iframe class="bgiframe"frameborder="0"tabindex="-1"src="\'+d.src+\'"style="display:block;position:absolute;z-index:-1;\'+(d.opacity!==false?"filter:Alpha(Opacity=\'0\');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+\'px\')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+\'px\')":b(d.height))+\';"/>\';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);</script><![endif]-->');//{{{//}}}
        this.$('#plt-notifier').append('<span id="y" style="display:none"></span>');
        if(typeof data.b2c.min_price != 'undefined'){
            this.$('#plt-notifier').append('<span id="where_buy" style="display:none">'+data.b2c.store.length+'</span>');
            this.$('#plt-notifier').append('<div id="plt-mini" class="plt-mini" title="\u70b9\u51fb\u53ef\u5c55\u5f00\uff0c\u62d6\u52a8\u53ef\u6539\u53d8\u4f4d\u7f6e"></div>');
            this.$('#plt-mini').append('<div id="plt-icon" class="plt-icon">\u8d2d\u7269\u515a</div>');
            this.$('#plt-mini').append('<div id="plt-mini-bar" class="plt-mini-bar"></div>');

            //min-price
            if(parseFloat(data.now.min_price) > 0){
                this.$('#plt-mini-bar').append('<div class="price">\uffe5<span class="price_num">'+data.now.min_price+'</span>&nbsp;\u8d77&nbsp;</div>');
            }

            //score
            if(typeof data.now.score != 'undefined' && parseFloat(data.now.score) > 0){
                var stars = '<span class="star_small">';
                var now = 0;
                var score = data.now.score;
                while(score >= 2 && now < 5){
                    stars += '<img src="http://www.gwdang.com/template/aug/images/star_red.gif"/>';
                    now ++;
                    score -= 2;
                }
                while(score >=1 && now <5){
                    stars += '<img src="http://www.gwdang.com/template/aug/images/star_halfgray.gif"/>';
                    now ++;
                    score -= 1;
                }
                while(now < 5){
                    stars += '<img src="http://www.gwdang.com/template/aug/images/star_gray.gif"/>';
                    now ++;
                }
                stars += '</span>';
                this.$('#plt-mini-bar').append('<div class="rating"><p class="rating-num">'+data.now.score+'\u5206</p><p>'+stars+'</p></div>');
            }else if(this.IE6){
                this.$('#plt-mini').css("width", 210);
            }
            this.$('#plt-mini').append('<div class="plt-open"><span></span></div>');
            this.$('#plt-notifier').append('<div id="plt-main" class="plt-main"></div>');
            this.$('#plt-main').append('<div id="plt-title"></div>');
            this.$('#plt-title').append('<a href="javascript:" target="_self" onclick="javascript:var gwdang_share_to = document.getElementById(\'share_to\'); if(gwdang_share_to.style.display==\'none\'){gwdang_share_to.style.display=\'block\'}else{gwdang_share_to.style.display=\'none\'}">\u5206\u4eab<b class="trig"></b></a>');
            this.$('#plt-title').append('<a id="plt-feedback" href="javascript:" target="_self">\u610f\u89c1\u53cd\u9988<b class="trig"></b></a>');
            this.$('#plt-title').append('<a id="plt-modify" href="javascript:" target="_self">\u8bbe\u7f6e<b class="trig"></b></a>');
            this.$('#plt-main').append('<div id="plt-close" class="plt-close" title="\u6536\u8d77\u6269\u5c55\u9762\u677f"><span></span></div>');
            this.$('#plt-main').append('<div id="plt-wrapper"></div>');
            this.$('#plt-wrapper').append('<div id="plt-accordion"></div>');
            this.$('#plt-accordion').append('<div class="plt-acc-div plt-overview" id="plt-acc-div"></div>');

            //share module
            try{
                this.$('#plt-acc-div').append('<div class="plt-block share_to" id="share_to" style="display:none"><a class="sina" id="gwdang_sina" target="_self" ahref="'+data.share.sina+'" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ></a><a class="qq" id="gwdang_qq" target="_self" ahref="'+data.share.qq+'" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ></a><a class="qzone" id="gwdang_qzone" target="_self" ahref="'+data.share.qzone+'" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" onclick="'+data.share.win+'" href="javascript:" ></a><a class="renren" id="gwdang_renren" target="_self" ahref="'+data.share.renren+'" title="\u5206\u4eab\u5230\u4eba\u4eba\u7f51" onclick="'+data.share.win+'" href="javascript:"></a><a class="douban" id="gwdang_douban" target="_self" ahref="'+data.share.douban+'" title="\u5206\u4eab\u5230\u8c46\u74e3" onclick="'+data.share.win+'" href="javascript:" ></a></div><div class="clear"></div>');
            }catch(e){}

            //modify block
            if(this.style=='right'){
                var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
            }else {
                var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
            }
            this.$('#plt-acc-div').append('<div class="plt-block" style="display:none" id="plt-modify-block"><h4>\u8bf7\u9009\u62e9\u6837\u5f0f\u8bbe\u7f6e\uff1a</h4>'+tmp+'<br />\u9009\u62e9\u6837\u5f0f\u540e\u5c06\u5728\u4e0b\u4e00\u4e2a\u9875\u9762\u751f\u6548<br /><h4 id="plt-setting-success" style="display:none">\u8bbe\u7f6e\u6210\u529f\u3002</h4></div>');

            //feedback_btn
            this.$('#plt-acc-div').append('<div class="plt-block" style="display:none" id="gwdang-feedback"><p class="title">\u7528\u6237\u53cd\u9988</p><div id="gwdang-feedback-input"><p><span>\u53cd\u9988\u5185\u5bb9\uff1a</span></p><p><textarea id="gwdang-feedback-content" name="gwdang-feedback-content" maxlength="400"></textarea></p><p><span>\u90ae\u7bb1\u6216QQ\uff1a</span><input id="gwdang-feedback-nick"  name="gwdang-feedback-nick"  value=""></p><p><a href="javascript:GWDANG.submitFeedback();"><span>\u63d0\u4ea4\u53cd\u9988</span></a></p></div><p><span id="gwdang-feedback-success">\u975e\u5e38\u611f\u8c22\u60a8\u7684\u53cd\u9988\uff0c\u6211\u4eec\u5c06\u5c3d\u5feb\u5904\u7406\uff0c\u52aa\u529b\u6539\u8fdb\u6211\u4eec\u7684\u4ea7\u54c1\u3002\u5982\u6709\u9700\u8981\uff0c\u5c06\u4e0e\u60a8\u8054\u7cfb\u6c9f\u901a :) </span></span><span id="gwdang-feedback-error-0" class="gwdang-feedback-error">\u63d0\u4ea4\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a:(</span><span id="gwdang-feedback-error-1" class="gwdang-feedback-error">\u8054\u7cfb\u65b9\u5f0f\u586b\u5199\u6709\u8bef:(</span><span id="gwdang-feedback-error-2" class="gwdang-feedback-error">\u53cd\u9988\u63d0\u4ea4\u5931\u8d25\u4e86:(</span></p><p id="gwdang-feedback-clean"><a href="javascript:GWDANG.clearFeedback();"><span>\u786e\u5b9a</span></a></p></div>');//{{{

            //title
            this.$('#plt-acc-div').append('<div class="plt-block"><strong><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank">'+data.now.ctitle+'</a></strong></div>');
            if(data.now.is_exact != "1"){
                this.$('#plt-acc-div').append('<div id="plt-more"><a href="'+data.now.more_link+'" target="_blank">\u67e5\u770b\u5168\u90e8\u5339\u914d</a></div>');
            }
            if(data.b2c.store.length>0){
                //now_product
                try{
                    var score = '';
                    if(parseFloat(data.now.score) <= 0){
                        score = '\u6682\u65e0\u8bc4\u4ef7';
                    }else{
                        score = stars+'&nbsp;&nbsp;<span class="price">'+data.now.score+'</span>\u5206';
                    }
                    this.$('#plt-acc-div').append('<div class="plt-block"><div class="plt-main-img"><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank"><img src="http://browser.gwdang.com/template/aug/images/new/120.gif" data-original="'+data.now.cimg_url+'" id="dp-image-small-'+data.now.cdp_id+'" d_width="90" d_height="90" class="gwdang-lazy" /></a></div><div class="big-price-wrapper"><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank" style="line-height:30px" >\uffe5<span class="big-price" style="line-height:30px">'+data.now.min_price+'</span>\u8d77</a><p style="line-height:30px" >'+score+'</p><p style="line-height:30px"><a title="\u6536\u85cf\u5e76\u83b7\u5f97\u964d\u4ef7\u63d0\u9192" href="http://www.gwdang.com/dp'+data.now.dp_id+'/?from=browser" target="_blank"><img src="http://www.gwdang.com/template/aug/images/new/price_down_icon.png">\u964d\u4ef7\u65f6\u63d0\u9192\u6211</a></p></div></div>');
                }catch(e){}
                //operations
                try{
                    this.$('#plt-acc-div').append('<div class="plt-block share_block"><a target="_blank" href="http://www.gwdang.com/cart/?from=browser" class="show_cart_btn"><img src="http://www.gwdang.com/template/aug/images/cart.png" title="\u67e5\u770b\u6bd4\u4ef7\u5355" /></a><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank" class="cart_btn"><img src="http://www.gwdang.com/template/aug/images/button_04.png" title="\u5c06\u6b64\u5546\u54c1\u6dfb\u52a0\u5230\u6bd4\u4ef7\u5355\uff0c\u591a\u6b3e\u6bd4\u4ef7\uff0c\u4e00\u952e\u4e0b\u5355" /></a><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank" class="share_btn"><img src="http://www.gwdang.com/template/aug/images/button_01.png" title="\u53bb\u8d2d\u7269\u515a\u6536\u85cf\u6b64\u5546\u54c1" /></a></div>');
                }catch(e){}

                //b2c
                try{
                    if(data.b2c.store.length>0){
                        var b2c = this.$('<div class="plt-block"></div>');
                        b2c.append('<h4>\u6b63\u54c1\u5546\u57ce\u5728\u5356:</h4>');
                        var ul = this.$('<ul class="plt-where-buy" id="plt-b2c-where-buy"></ul>');
                        for(var i=0; i<data.b2c.store.length; i++){
                            if(i>=5){
                                break;
                            }
                            var dp = data.b2c.store[i];
                            var li = this.$('<li></li>');
                            if(dp.more!='1'){
                                li.append('<a class="union_link"  href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser" target="_blank" title="\u53bb\u8d2d\u7269\u515a\u67e5\u770b\u5176\u5b83\u540c\u6b3e\u5546\u54c1"><span class="source">'+dp.site_name+'('+dp.more+'\u6b3e)</span><span class="price-wrapper">\uffe5<span class="price">'+dp.price+'</span></span></a>');
                            }else{
                                li.append('<a class="union_link"  href="'+dp.url+'" target="_blank" title="\u53bb'+dp.site_name+'\u67e5\u770b\u6b64\u5546\u54c1"><span class="source">'+dp.site_name+'</span><span class="price-wrapper">\uffe5<span class="price">'+dp.price+'</span></span></a>');
                            }
                            li.appendTo(ul);
                        }
                        ul.appendTo(b2c);
                        if(data.b2c.store.length>5){
                            b2c.append('<div class="plt-review-link"><a href="http://www.gwdang.com/dp'+data.now.dp_id+'/where_buy/?from=browser" target="_blank">\u67e5\u770b\u5168\u90e8\u5546\u5bb6<span class="plt-review_cnt">('+data.b2c.store.length+')</span></a></div>');
                        }
                        b2c.append('<div class="plt-clear"></div>');
                        b2c.appendTo('#plt-acc-div');
                    }
                }catch(e){}

                //tmall
                try{
                    if(data.tmall.product.length>0){
                        var tmall = this.$('<div class="plt-block"></div>');
                        tmall.append('<h4>\u5929\u732b(\u6dd8\u5b9d\u5546\u57ce)\u5728\u5356:</h4>');
                        var ul = this.$('<ul class="plt-where-buy" id="plt-tmall-where-buy"></ul>');
                        for(var i=0; i<data.tmall.product.length; i++){
                            if(i>=5){
                                break;
                            }
                            var dp = data.tmall.product[i];
                            var li = this.$('<li><a class="union_link"  href="'+dp.url+'" target="_blank" title="'+dp.title+'"><span class="source">'+dp.nick+'</span><span class="price-wrapper">\uffe5<span class="price">'+dp.price+'</span></span></a></li>');
                            li.appendTo(ul);
                        }
                        ul.appendTo(tmall);
                        tmall.append('<div class="plt-review-link"><a href="'+data.tmall.more_link+'" target="_blank">\u53bb\u5929\u732b\u67e5\u770b\u66f4\u591a\u7ed3\u679c</a></div>');
                        tmall.append('<div class="plt-clear"></div>');
                        tmall.appendTo('#plt-acc-div');
                    }
                }catch(e){}

                //taobao
                try{
                    if(data.taobao.product.length>0){
                        var taobao = this.$('<div class="plt-block"></div>');
                        taobao.append('<h4>\u6dd8\u5b9d\u7f51\u5728\u5356:</h4>');
                        var ul = this.$('<ul class="plt-where-buy" id="plt-taobao-where-buy"></ul>');
                        for(var i=0; i<data.taobao.product.length; i++){
                            if(i>=5){
                                break;
                            }
                            var dp = data.taobao.product[i];
                            var li = this.$('<li><a class="union_link"  href="'+dp.url+'" target="_blank" title="'+dp.title+'"><span class="source">\u5356\u5bb6\u6240\u5728\u5730\uff1a'+dp.item_location+'</span><span class="price-wrapper">\uffe5<span class="price">'+dp.price+'</span></span></a></li>');
                            li.appendTo(ul);
                        }
                        ul.appendTo(taobao);
                        taobao.append('<div class="plt-review-link"><a href="'+data.taobao.more_link+'" target="_blank">\u53bb\u6dd8\u5b9d\u67e5\u770b\u66f4\u591a\u7ed3\u679c</a></div>');
                        taobao.append('<div class="plt-clear"></div>');
                        taobao.appendTo('#plt-acc-div');
                    }
                }catch(e){}
            }

            //score
            try{
                if(typeof data.now.score != 'undefined' && parseFloat(data.now.score) > 0){
                    var score = this.$('<div class="plt-block plt-review-sum"></div>');
                    var score_bar = '<table width="210" class="star_all">';
                    for(var i=5; i>0; i-- ){
                        var num = data.review.star_bar_num[i-1];
                        var per = data.review.percent_num[i-1];
                        score_bar += '<tr>';
                        score_bar += '<td width="40">'+i+'\u661f</td><td><div class="star_proportion"><div class="star_proportion_img" style="width:'+(80*parseFloat(per))+'px"></div><div class="clear"></div></div></td><td>';
                        score_bar += '<a target="_blank" title="\u67e5\u770b'+i+'\u661f\u8bc4\u8bba" href="http://www.gwdang.com/dp'+data.now.dp_id+'/reviews/?r_stars_cnt='+i+'#dp_info_review_header">'+num+'\u4eba</a>';
                        score_bar += '</td></tr>';
                    }
                    score_bar += '</table>';
                    score.append('<div class="plt-review-sum"><div class="rating"><p class="rating-label">\u5e73\u5747\u5206</p><p class="rating-num">'+data.review.score+'</p><p>'+stars+'</p></div>'+score_bar+'</div>');
                    score.append('<div class="plt-clear"></div>');
                    score.append('<p class="plt-review-link"><a  href="http://www.gwdang.com/dp'+data.now.dp_id+'/?from=browser" target="_blank" title="\u53bb\u8d2d\u7269\u515a\u67e5\u770b\u5168\u90e8\u8bc4\u8bba">\u67e5\u770b\u5168\u90e8\u8bc4\u8bba<span class="plt-review-cnt">('+data.review.review_cnt+')</span></a></p>');
                    score.append('<div class="plt-clear"></div>');
                    score.appendTo('#plt-acc-div');
                }
            }catch(e){}
            
            //features
            try{
                if(data.review.good.length>0 || data.review.bad.length>0){
                    var review = this.$('<div class="feature-div plt-block"></div>');
                    var feature = this.$('<div class="feature"></div>');
                    if(data.review.good.length>0){
                        feature.append('<h4>\u4f18\u70b9:</h4>');
                        var table_good = '<table class="feature-list" cellspacing="0">';
                        for(var i=0; i<data.review.good.length; i++){
                            var good = data.review.good[i];
                            if(i%2 == 0){
                                table_good += '<tr>';
                            }
                            table_good += '<td class="feature-word"><a target="_blank" href="'+good.url+'" title="\u67e5\u770b\u63d0\u5230'+good.key+'\u7684\u8bc4\u8bba">'+good.key+'<span>('+good.cnt+')</span></a></td>';
                            if(i%2 == 1){
						        table_good += '</tr>';
                            }
                        }
                        if(data.review.good.length%2 == 0){
                            table_good += '<td></td></tr>';
                        }
						table_good += '</table>';
                        feature.append(table_good);
                    }
                    if(data.review.bad.length>0){
                        feature.append('<h4>\u7f3a\u70b9:</h4>');
                        var table_bad = '<table class="feature-list" cellspacing="0">';
                        for(var i=0; i<data.review.bad.length; i++){
                            var bad = data.review.bad[i];
                            if(i%2 == 0){
                                table_bad += '<tr>';
                            }
                            table_bad += '<td class="feature-word"><a target="_blank" href="'+bad.url+'" title="\u67e5\u770b\u63d0\u5230'+bad.key+'\u7684\u8bc4\u8bba">'+bad.key+'<span>('+bad.cnt+')</span></a></td>';
                            if(i%2 == 1){
						        table_bad += '</tr>';
                            }
                        }
                        if(data.review.bad.length%2 == 0){
                            table_bad += '<td></td></tr>';
                        }
						table_bad += '</table>';
                        feature.append(table_bad);
                    }
                    feature.appendTo(review);
                    review.appendTo('#plt-acc-div');
                }
            }catch(e){}

            //also-buy
            try{
                if(data.also.length>0){
                    var also = this.$('<div class="plt-block"></div>');
                    also.append('<h4>\u5173\u6ce8\u6b64\u5546\u54c1\u7684\u4eba\u4e5f\u5173\u6ce8:</h4>');
                    for(var i=0; i<data.also.length; i++){
                        if(i>5){
                            break;
                        }
                        var dp = data.also[i];
                        if(i%2 ==0){
                            var pos = 'left';
                        }else{
                            var pos = 'right';
                        }
                        also.append('<div class="plt-recommend '+pos+'"><div class="plt-main-img" style="height:90px;overflow:hidden"><a href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser" title="'+dp.title+'" target="_blank"><img src="http://browser.gwdang.com/template/aug/images/new/120.gif" data-original="'+dp.img_url+'" id="dp-image-small-also-'+dp.dp_id+'" d_width="90" d_height="90" class="gwdang-lazy" /></a></div><a class="title" style="width:100px;overflow:hidden;" href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser&m=also" target="_blank" title="'+dp.title+'">'+dp.title+'</a><a class="price" href="http://www.gwdang.com/dp'+dp.dp_id+'/where_buy/?from=browser&m=also" target="_blank" title="'+dp.title+'" >\uffe5<span>'+dp.price+'</span></a></div>');
                    }
                    also.appendTo('#plt-acc-div');
                }
            }catch(e){}
            this.$('#plt-acc-div').append('<div class="plt-clear"></div>');
            this.$('#plt-acc-div').append('<div id="plt-footer" class="plt-block"><a href="http://www.gwdang.com/app/mobile/?from=browser" target="_blank">\u624b\u673a\u5ba2\u6237\u7aef</a>&nbsp;&nbsp;<a href="http://www.gwdang.com/app/extension/?from=browser" target="_blank">\u5206\u4eab\u8f6f\u4ef6</a>&nbsp;&nbsp;<a href="http://blog.gwdang.com/?p=92&from=browser" target="_blank">\u53cd\u9988\u610f\u89c1</a></div>');
        }else{//只有淘宝推荐的情况：

            this.$('#plt-notifier').append('<span id="y" style="display:none"></span>');
            this.$('#plt-notifier').append('<div id="plt-mini" class="plt-mini" title="\u70b9\u51fb\u53ef\u5c55\u5f00\uff0c\u62d6\u52a8\u53ef\u6539\u53d8\u4f4d\u7f6e" style="*width:210px;"></div>');
            this.$('#plt-mini').append('<div id="plt-icon" class="plt-icon">\u8d2d\u7269\u515a</div>');
            this.$('#plt-mini').append('<div id="plt-mini-bar" class="plt-mini-bar"></div>');
            //min-price
            if(typeof data.tmall.min_price != 'undefined' && parseFloat(data.tmall.min_price) > 0){
                this.$('#plt-mini-bar').append('<div class="price">\uffe5<span class="price_num">'+data.tmall.min_price+'</span>&nbsp;\u8d77&nbsp;</div>');
            }else if(typeof data.taobao.min_price != 'undefined' && parseFloat(data.taobao.min_price) > 0){
                this.$('#plt-mini-bar').append('<div class="price">\uffe5<span class="price_num">'+data.taobao.min_price+'</span>&nbsp;\u8d77&nbsp;</div>');
            }
            this.$('#plt-mini').append('<div class="plt-open"><span></span></div>');

            this.$('#plt-notifier').append('<div id="plt-main" class="plt-main" style="_width:312px"></div>');
            this.$('#plt-main').append('<div id="plt-title"></div>');
            this.$('#plt-title').append('<a href="javascript:" target="_self" onclick="javascript:var gwdang_share_to = document.getElementById(\'share_to\'); if(gwdang_share_to.style.display==\'none\'){gwdang_share_to.style.display=\'block\'}else{gwdang_share_to.style.display=\'none\'}">\u5206\u4eab<b class="trig"></b></a>');
            this.$('#plt-title').append('<a id="plt-feedback" href="javascript:" target="_self">\u610f\u89c1\u53cd\u9988<b class="trig"></b></a>');
            this.$('#plt-title').append('<a id="plt-modify" href="javascript:" target="_self">\u8bbe\u7f6e<b class="trig"></b></a>');
            this.$('#plt-main').append('<div id="plt-close" class="plt-close" title="\u6536\u8d77\u6269\u5c55\u9762\u677f"><span></span></div>');
            this.$('#plt-main').append('<div id="plt-wrapper"><div id="plt-accordion"><div class="plt-acc-div plt-overview" id="plt-acc-div"></div></div></div>');
            //share module
            try{
                this.$('#plt-acc-div').append('<div class="plt-block share_to" id="share_to" style="display:none"><a class="sina" id="gwdang_sina" target="_self" ahref="'+data.share.sina+'" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ></a><a class="qq" id="gwdang_qq" target="_self" ahref="'+data.share.qq+'" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a" onclick="'+data.share.win+'" href="javascript:" ></a><a class="qzone" id="gwdang_qzone" target="_self" ahref="'+data.share.qzone+'" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" onclick="'+data.share.win+'" href="javascript:" ></a><a class="renren" id="gwdang_renren" target="_self" ahref="'+data.share.renren+'" title="\u5206\u4eab\u5230\u4eba\u4eba\u7f51" onclick="'+data.share.win+'" href="javascript:"></a><a class="douban" id="gwdang_douban" target="_self" ahref="'+data.share.douban+'" title="\u5206\u4eab\u5230\u8c46\u74e3" onclick="'+data.share.win+'" href="javascript:" ></a></div><div class="clear"></div>');
            }catch(e){}

            //modify block
            if(this.style=='right'){
                var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
            }else {
                var tmp = '<input type="radio" name="plt-modify-style[]" style="border:0" checked="true" value="top"><label>\u65b0\u7248(\u9875\u9762\u9876\u90e8)</label><br /><input type="radio" name="plt-modify-style[]" style="border:0" value="right"><label>\u7b80\u6d01\u7248(\u9875\u9762\u53f3\u4fa7)</label>';
            }
            this.$('#plt-acc-div').append('<div class="plt-block" style="display:none" id="plt-modify-block"><h4>\u8bf7\u9009\u62e9\u6837\u5f0f\u8bbe\u7f6e\uff1a</h4>'+tmp+'<br />\u9009\u62e9\u6837\u5f0f\u540e\u5c06\u5728\u4e0b\u4e00\u4e2a\u9875\u9762\u751f\u6548<br /><h4 id="plt-setting-success" style="display:none">\u8bbe\u7f6e\u6210\u529f\u3002</h4></div>');

            //feedback_btn
            this.$('#plt-acc-div').append('<div class="plt-block" style="display:none" id="gwdang-feedback"><p class="title">\u7528\u6237\u53cd\u9988</p><div id="gwdang-feedback-input"><p><span>\u53cd\u9988\u5185\u5bb9\uff1a</span></p><p><textarea id="gwdang-feedback-content" name="gwdang-feedback-content" maxlength="400"></textarea></p><p><span>\u90ae\u7bb1\u6216QQ\uff1a</span><input id="gwdang-feedback-nick"  name="gwdang-feedback-nick"  value=""></p><p><a href="javascript:GWDANG.submitFeedback();"><span>\u63d0\u4ea4\u53cd\u9988</span></a></p></div><p><span id="gwdang-feedback-success">\u975e\u5e38\u611f\u8c22\u60a8\u7684\u53cd\u9988\uff0c\u6211\u4eec\u5c06\u5c3d\u5feb\u5904\u7406\uff0c\u52aa\u529b\u6539\u8fdb\u6211\u4eec\u7684\u4ea7\u54c1\u3002\u5982\u6709\u9700\u8981\uff0c\u5c06\u4e0e\u60a8\u8054\u7cfb\u6c9f\u901a :) </span></span><span id="gwdang-feedback-error-0" class="gwdang-feedback-error">\u63d0\u4ea4\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a:(</span><span id="gwdang-feedback-error-1" class="gwdang-feedback-error">\u8054\u7cfb\u65b9\u5f0f\u586b\u5199\u6709\u8bef:(</span><span id="gwdang-feedback-error-2" class="gwdang-feedback-error">\u53cd\u9988\u63d0\u4ea4\u5931\u8d25\u4e86:(</span></p><p id="gwdang-feedback-clean"><a href="javascript:GWDANG.clearFeedback();"><span>\u786e\u5b9a</span></a></p></div>');//{{{

            this.$('#plt-acc-div').append('<div class="plt-block" style="display:none" id="plt-modify-block"><h4>\u8bf7\u9009\u62e9\u6837\u5f0f\u8bbe\u7f6e\uff1a</h4>'+tmp+'<br />\u9009\u62e9\u6837\u5f0f\u540e\u5c06\u5728\u4e0b\u4e00\u4e2a\u9875\u9762\u751f\u6548<br /><h4 id="plt-setting-success" style="display:none">\u8bbe\u7f6e\u6210\u529f\u3002</h4></div>');

            //tmall
            try{
                if(data.tmall.product.length>0){
                    this.$('#plt-acc-div').append('<div class="plt-block"><div><span class="plt-sale-cnt"><strong><a href="'+data.taobao.more_link+'" target="_blank">'+data.keyword+'</strong></span></div><div class="plt-review-link"><a href="'+data.taobao.more_link+'" target="_blank">\u53bb\u6dd8\u5b9d\u67e5\u770b\u66f4\u591a\u7ed3\u679c</a></div></div>');
                    var tmall = this.$('<div  class="plt-block"></div>');
                    tmall.append('<h4>\u5929\u732b(\u6dd8\u5b9d\u5546\u57ce)\u5728\u5356:</h4>');
                    for(var i=0; i<data.tmall.product.length; i++){
                        var dp = data.tmall.product[i];
                        tmall.append('<div class="plt-main-img-taobao"  style="height:90px;width:90px;float:left;overflow:hidden"><a  title="'+dp.title+'" href="'+dp.url+'" target="_blank"><img src="'+dp.pic_url+'"></img></a></div><div class="big-price-wrapper-taobao"><p style="line-height:30px"><a title="'+dp.title+'" href="'+dp.url+'" target="_blank"><font color="#BA3000">\uffe5'+dp.price+'</font> \u5143</a></p><p style="line-height:25px"><a class="a-link-limit-height" title="'+dp.title+'" href="'+dp.url+'" target="_blank">\u6700\u8fd1\u6210\u4ea4\u91cf:'+dp.volume+' \u4ef6</a></p><p style="line-height:25px"><a class="a-link-limit-height" title="'+dp.title+'" href="'+dp.url+'" target="_blank"><span class="taobao-seller"></span>'+dp.nick+'</a></p></div>');
                        if(i>=10){
                            break;
                        }
                    }
                    tmall.appendTo('#plt-acc-div');
                    this.$('#plt-acc-div').append('<div class="plt-block"><div class="plt-review-link"><a href="'+data.tmall.more_link+'" target="_blank">\u53bb\u5929\u732b\u67e5\u770b\u66f4\u591a\u7ed3\u679c</a></div></div>');
                }
            }catch(e){}

            //taobao
            try{
                if(data.taobao.product.length>0){
                    var taobao = this.$('<div class="plt-block"></div>');
                    taobao.append('<h4>\u6dd8\u5b9d\u7f51\u5728\u5356:</h4>');
                    for(var i=0; i<data.taobao.product.length; i++){
                        var dp = data.taobao.product[i];
                        taobao.append('<div class="plt-main-img-taobao"  style="height:90px;width:90px;float:left;overflow:hidden"><a title="'+dp.title+'" href="'+dp.url+'" target="_blank"><img src="'+dp.pic_url+'"></img></a></div><div class="big-price-wrapper-taobao"><p style="line-height:30px"><a title="'+dp.title+'" href="'+dp.url+'" target="_blank"><font color="#BA3000">\uffe5'+dp.price+'</font> \u5143</a></p><p style="line-height:25px"><a class="a-link-limit-height" title="'+dp.title+'" href="'+dp.url+'" target="_blank">\u6700\u8fd1\u6210\u4ea4\u91cf:'+dp.volume+' \u4ef6</a></p><p style="line-height:25px"><a class="a-link-limit-height" title="'+dp.title+'" href="'+dp.url+'" target="_blank"><span class="taobao-seller"></span>'+dp.item_location+'</a></p></div>');
                    }
                    taobao.appendTo('#plt-acc-div');
                    this.$('#plt-acc-div').append('<div class="plt-block"><div class="plt-review-link"><a href="'+data.taobao.more_link+'" target="_blank">\u53bb\u6dd8\u5b9d\u67e5\u770b\u66f4\u591a\u7ed3\u679c</a></div></div>');
                }
            }catch(e){}
            this.$('#plt-wrapper').append('<div class="plt-clear"></div>');
            this.$('#plt-wrapper').append('<div id="plt-footer" class="plt-block"><a href="http://www.gwdang.com/app/mobile/?from=browser" target="_blank">\u624b\u673a\u5ba2\u6237\u7aef</a>&nbsp;&nbsp;<a href="http://www.gwdang.com/app/extension/?from=browser" target="_blank">\u5206\u4eab\u8f6f\u4ef6</a>&nbsp;&nbsp;<a href="http://blog.gwdang.com/?p=92&from=browser" target="_blank">\u53cd\u9988\u610f\u89c1</a></div>');
        }

        //handles events
        this.$('.plt-main-img a img').each(function(){
            GWDANG.check_image(GWDANG.$(this).attr('data-original'), GWDANG.$(this).attr('id'));
        });
        if(this.IE6){
            this.$('#plt-main').bgiframe();
        }
        this.$('#plt-main').css("height", this.height);
        this.$(window).resize(function() {
            GWDANG.height = (GWDANG.dp.site == 'amazon' ? document.body.clientHeight : document.documentElement.clientHeight);
            GWDANG.$('#plt-main').css("height", GWDANG.height);
            GWDANG.$("#plt-wrapper").height(GWDANG.$("#plt-main").height()-70);
        });
        this.$(window).resize();
        var elem;
        if(this.IE6){
            elem = document.documentElement;
        }else if(dp.site=='amazon' && window.ActiveXObject){
            elem = document.body;
        }
        if(this.IE6 ||(this.site=='amazon' && window.ActiveXObject)){
            this.$("#plt-notifier").css('top', elem.scrollTop); 
            this.$("#plt-mini").css('top', elem.scrollTop);
            this.$("#plt-main").css('top', elem.scrollTop);
            this.$("#plt-main").height(this.height);
            this.$(window).scroll(function() {
                if(GWDANG.site=='amazon' && window.ActiveXObject){
                    GWDANG.$("#plt-notifier").css('top', document.body.scrollTop - GWDANG.scrollTop  + parseInt(GWDANG.position) + 'px'); 
                    GWDANG.$("#plt-mini").css('top', document.body.scrollTop - GWDANG.scrollTop + parseInt(GWDANG.position) + 'px');
                    GWDANG.$("#plt-main").css('top', document.body.scrollTop + 'px');
                }else{
                    GWDANG.$("#plt-notifier").css('top', document.documentElement.scrollTop - GWDANG.scrollTop  + parseInt(GWDANG.position) + 'px'); 
                    GWDANG.$("#plt-mini").css('top', document.documentElement.scrollTop - GWDANG.scrollTop + parseInt(GWDANG.position) + 'px');
                    GWDANG.$("#plt-main").css('top', document.documentElement.scrollTop + 'px');
                }
            });
        }
        if(this.IE6){
            this.$('.star_all').css('margin-left','40px');
        }
        this.$('#plt-close').click(function(){
            GWDANG.$("#plt-main").hide();
            GWDANG.$('#plt-mini').show();
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_is_open&is_open=0&callback=?',
                'success':function(msg){
                    GWDANG.p_id = msg.p_id;
                    GWDANG.is_open = msg.is_open;
                }
            });
        });
        this.$('#plt-modify').click(function(){
            if(GWDANG.$("#plt-modify-block").css('display') == 'block'){
                GWDANG.$("#plt-modify-block").css('display', 'none');
            }else{
                GWDANG.$("#plt-modify-block").css('display', 'block');
            }
        });
        this.$('#plt-feedback').click(function(){
            if(GWDANG.$("#gwdang-feedback").css('display') == 'block'){
                GWDANG.$("#gwdang-feedback").css('display', 'none');
            }else{
                GWDANG.$("#gwdang-feedback").css('display', 'block');
            }
        });
        this.$('#plt-modify-block input').click(function(){
            GWDANG.$("#plt-setting-success").hide();
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_style&style='+GWDANG.$(this).val()+'&callback=?',
                'success':function(msg){
                    GWDANG.$("#plt-setting-success").show();
                    setTimeout("GWDANG.$(\"#plt-modify-block\").css('display', 'none');GWDANG.$(\"#plt-setting-success\").hide();", 1000);
                    GWDANG.p_id = msg.p_id;
                    GWDANG.is_open = msg.is_open;
                    GWDANG.style = msg.style;
                }
            });
        });
        this.$('#plt-mini').click(function(){
            GWDANG.$('#plt-mini').hide();
            GWDANG.$('#plt-main').show();
        	GWDANG.$("#plt-wrapper").height(GWDANG.$('#plt-main').height()-70);
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_is_open&is_open=1&callback=?',
                'success':function(msg){
                    GWDANG.p_id = msg.p_id;
                    GWDANG.is_open = msg.is_open;
                }
            });
        });
        if(this.is_open == 1){
            GWDANG.$('#plt-mini').hide();
            this.$('#plt-main').show();
            this.$("#plt-wrapper").height(this.$('#plt-main').height()-70);
        }
        this.$("#plt-mini").css('top', this.position);

        this.$('ul.plt-where-buy:empty').parent().hide();
        this.$('#plt_notifier a').attr({target: "_blank"});
        var container = document.documentElement;
        var ele = document.getElementById('plt-mini');
        var bodyHeight = container.offsetHeight;
        var maxY = this.height- 46;
        var dd = new Dragdrop({
            target : ele,
        	area : [0,maxY],
        	callback : function(obj){
        		if(typeof obj.moveY == 'number' && this.dragY){
        			document.getElementById('y').innerHTML = 'y:'+obj.moveY;	
        		}
        	}
        });	
        dd.dragY();
        if(this.$('#where_buy').text()=='0'){
            this.$('#plt-mini').css('width',62);
        }
        this.$('#plt-mini').animate({ right: "5px" }, 2000, 'swing',	function() {GWDANG.$(this).animate({ right: "0" }, 100);});

    }//}}}
};//}}}
Dragdrop=function(window){//{{{
	var doc = window.document;
	var E = {
		on : function(el, type, fn){
			el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent ? el.attachEvent("on" + type, fn) :	el['on'+type] = fn;
		},
		un : function(el,type,fn){
			el.removeEventListener ? el.removeEventListener(type, fn, false) : el.detachEvent ?	el.detachEvent("on" + type, fn) : el['on'+type] = null;
		},
		evt : function(e){
			return e || window.event;
		}
	};
	return function(opt){
		var conf = null, defaultConf, diffY;
		function Config(opt){
			this.target = opt.target;
			this.bridge = opt.bridge;
			this.dragable = opt.dragable != false;
			this.dragY = opt.dragY != false;
			this.area  = opt.area;
			this.callback = opt.callback;
		}	
		function Dragdrop(opt){
			if(!opt){return;}
			conf = new Config(opt);
			defaultConf = new Config(opt);
			conf.bridge ? E.on(conf.bridge,'mousedown',mousedown) :	E.on(conf.target,'mousedown',mousedown);
		}
		Dragdrop.prototype = {
			dragY : function(b){
				conf.dragY = true;
			},
			setArea : function(a){
				conf.area = a;
			},
			setBridge : function(b){
				conf.bridge = b;
			},
			setDragable : function(b){
				conf.dragable = b;
			},
			reStore : function(){
				conf = new Config(defaultConf);
				conf.target.style.top = '0px';
			},
			getDragY : function(){
				return conf.dragY;
			}
		}
		function mousedown(e){
            var el = conf.target;
            var currTargetId=null;
			e = E.evt(e);
			el.style.cursor = 'move';
            if(typeof e.srcElement=='undefined' || !e.srcElement ){
                currTargetId=e.target.id;
            }else{
                currTargetId=e.srcElement.id;
            }
            if( currTargetId!='s_product' ){
                if(e.stopPropagation){
                    e.stopPropagation();
                } 
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    e.returnValue = false;
                }
                if(el.setCapture){ 
                    E.on(el, "losecapture", mouseup);
                    el.setCapture();
                    e.cancelBubble = true;
                }else if(window.captureEvents){
                    e.preventDefault();
                    e.stopPropagation();
                    E.on(window, "blur", mouseup);
                }
                diffY = e.clientY - el.offsetTop;
                E.on(doc,'mousemove',mousemove);
                E.on(doc,'mouseup',mouseup);
            }
		}
		function mousemove(e){
			var el = conf.target, e = E.evt(e), moveY = e.clientY - diffY;
			var minY, maxY;
			if(conf.area){
				minY = (window.ActiveXObject && document.documentElement.clientHeight == 0 && document.body.clientHeight>0) ? conf.area[0]+ document.body.scrollTop : conf.area[0];
                maxY = (window.ActiveXObject && document.documentElement.clientHeight == 0 && document.body.clientHeight>0) ? conf.area[1] + document.body.scrollTop-23: conf.area[1];
                var IE6=window.ActiveXObject&&!window.XMLHttpRequest;
                if(IE6){
                    minY += document.documentElement.scrollTop;
                    maxY += document.documentElement.scrollTop;
                }
                moveY < minY && (moveY = minY);
				moveY > maxY && (moveY = maxY);
			}
			if(conf.dragable){
				conf.dragY && (el.style.top =  moveY + 'px');
				if(conf.callback){
					var obj = {moveY:moveY};
					conf.callback.call(conf,obj);
				}
			}
		}
		function mouseup(e){
			var el = conf.target;
			el.style.cursor = 'pointer';
			E.un(doc,'mousemove',mousemove);
			E.un(doc,'mouseup',mouseup);
			if(el.releaseCapture){ 
				E.un(el, "losecapture", mouseup);
				el.releaseCapture();
			}
			if(window.releaseEvents){
				E.un(window, "blur", mouseup);
			}
            GWDANG.$.ajax({
                'url':GWDANG.server+'/brwext/permanent_id/',
                'dataType':'jsonp',
                'jsonp':'callback',
                'async':true,
                'data':'version=2&op=set_position&position='+el.style.top+'&callback=?',
                'success':function(msg){
                    GWDANG.position = msg.position;
                    GWDANG.scrollTop = window.location.href.indexOf('amazon')>=0 && window.ActiveXObject ? document.body.scrollTop : document.documentElement.scrollTop;
                }
            });
		}
		return new Dragdrop(opt);
	}
}(this);//}}}
GWDANG.init();
})();
