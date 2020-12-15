import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

// var TDTWMTSImageProvider = function TDTWMTSImageProvider(urlformat, addone, minlevel, maxlevel, description, leveldiv, urlformat2) {
//     var defaultCredit = new Cesium.Credit('WMTS');
//     description = Cesium.defaultValue(description, {});
//     this._7 = new Cesium.GeographicTilingScheme({
//         numberOfLevelZeroTilesX: 2,
//         numberOfLevelZeroTilesY: 1
//     });
//     this._3 = 256;
//     this._4 = 256;
//     this._10 = Cesium.defaultValue(description.fileExtension, 'jpg');
//     this._9 = description.proxy;
//     this._12 = description.tileDiscardPolicy;
//     this._2 = minlevel;
//     this._1 = maxlevel;
//     this._8 = new Cesium.Rectangle(0 - Math.PI, 0 - Math.PI / 2, Math.PI, Math.PI / 2);
//     this._5 = new Cesium.Rectangle(0 - Math.PI, 0 - Math.PI / 2, Math.PI, Math.PI / 2);
//     this._6 = true;
//     this.baseurl = urlformat;
//     this.needaddone = addone;
//     if (leveldiv) {
//         this._0 = leveldiv;
//         this.baseurl2 = urlformat2;
//     }
//     var credit = Cesium.defaultValue(description.credit, defaultCredit);
//     if (typeof credit === 'string') {
//         credit = new Cesium.Credit(credit);
//     }
//     this._11 = credit;
// };
// Object.defineProperties(TDTWMTSImageProvider.prototype, {
//     tileWidth: {
//         get: function () {
//             return this._3;
//         }
//     },
//     tileHeight: {
//         get: function () {
//             return this._4;
//         }
//     },
//     defaultAlpha: {
//         get: function () {
//             return 1;
//         }
//     },
//     hasAlphaChannel: {
//         get: function () {
//             return true;
//         }
//     },
//     maximumLevel: {
//         get: function () {
//             return this._1;
//         }
//     },
//     minimumLevel: {
//         get: function () {
//             return this._2;
//         }
//     },
//     tilingScheme: {
//         get: function () {
//             return this._7;
//         }
//     },
//     extent: {
//         get: function () {
//             return this._8;
//         }
//     },
//     rectangle: {
//         get: function () {
//             return this._5;
//         }
//     },
//     ready: {
//         get: function () {
//             return this._6;
//         }
//     },
//     minimumTerrainLevel: {
//         get: function () {
//             return 0;
//         }
//     },
//     maximumTerrainLevel: {
//         get: function () {
//             return 17;
//         }
//     }
// });
// TDTWMTSImageProvider.prototype.requestImage = function (x, y, level) {
//     if (this.needaddone) {
//         x += 1;
//         y += 1;
//         level += 1;
//     }
//     var tempurl = this.baseurl;
//     if (this._0 && level > this._0) {
//         tempurl = this.baseurl2;
//     }
//     var url = tempurl.replace("{x}", x);
//     url = url.replace("{l}", y % 8);
//     url = url.replace("{y}", y);
//     url = url.replace("{z}", level);
//     return Cesium.ImageryProvider.loadImage(this, url);
// };

//加载本机 WeServer 发布的高程数据
var terrain = new Cesium.CesiumTerrainProvider({
    url: '/static/TerrainProvider',
    isGoogleCustom: true
});

//加载本机 WeServer 发布的影像瓦片
// WGS84坐标系：
// var imageprovider = new TDTWMTSImageProvider('http://localhost:80/WeServer/wmts/1.0.0/acimage/default/wgs84/{z}/{y}/{x}.jpg', false, 1, 16, {
//     alpha: 0
// });
//
// 墨卡托坐标系：
let imageprovider = new Cesium.WebMapTileServiceImageryProvider({
    url : 'http://localhost:80/WeServer/wmts',
    layer : 'acimage',
    style : 'default',
    format : 'image/jpeg',
    tileMatrixSetID : 'mercator',
    //tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
    //credit : new Cesium.Credit('U. S. Geological Survey'),
    maximumLevel: 9
});

//加载本机 WeServer 发布的地名标签
// WGS84坐标系：
// var labellayer = new TDTWMTSImageProvider('http://localhost:80/WeServer/wmts/1.0.0/aclabel/default/wgs84/{z}/{y}/{x}.png', false, 1, 19, {
//     alpha: 0
// });
//
// 墨卡托坐标系：
let labellayer = new Cesium.WebMapTileServiceImageryProvider({
    url : 'http://localhost:80/WeServer/wmts',
    layer : 'aclabel',
    style : 'default',
    format : 'image/png',
    tileMatrixSetID : 'mercator',
    //tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
    //credit : new Cesium.Credit('U. S. Geological Survey'),
    maximumLevel: 9
});


// var viewer = new Cesium.Viewer("cesiumContainer", {
//     imageryProvider: imageprovider,
//     terrainProvider: terrain,
//     animation: false,//是否创建动画小器件，左下角仪表
//     timeline: false,//是否显示时间轴
//     sceneModePicker: true,//是否显示3D/2D选择器
//     baseLayerPicker: true,//是否显示图层选择器
//     geocoder: false,//是否显示geocoder小器件，右上角查询按钮
    // imageryProviderViewModels: [img_arcgis_yxdt, img_arcgis_jcdt, img_tdt_sl, img_tdt_yx],//可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    // selectedImageryProviderViewModel: img_arcgis_jcdt,//当前地形图层的显示模型，仅baseLayerPicker设为true有意义
//     scene3DOnly: false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
//     navigationHelpButton: false,//是否显示右上角的帮助按钮
//     homeButton: true,//是否显示Home按钮
//     infoBox: true,//是否显示信息框
//     showRenderLoopErrors: false//如果设为true，将在一个HTML面板中显示错误信息
// });

let viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
    }),
    terrainProvider: terrain,
    animation: false,//是否创建动画小器件，左下角仪表
    timeline: false,//是否显示时间轴
    sceneModePicker: true,//是否显示3D/2D选择器
    baseLayerPicker: false,//是否显示图层选择器
    geocoder: false,//是否显示geocoder小器件，右上角查询按钮
    scene3DOnly: false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    navigationHelpButton: false,//是否显示右上角的帮助按钮
    homeButton: true,//是否显示Home按钮
    infoBox: true,//是否显示信息框
    showRenderLoopErrors: false//如果设为true，将在一个HTML面板中显示错误信息
});

//强制隐藏cesium控件版权信息
viewer._cesiumWidget._creditContainer.style.display = "none";

//调试信息：FPS帧数
viewer.scene.debugShowFramesPerSecond = true;

let layers = viewer.scene.imageryLayers;
//叠加本地瓦片地图
layers.addImageryProvider(imageprovider);

//叠加地球夜景
// let blackMarble = layers.addImageryProvider(
//    new Cesium.IonImageryProvider({ assetId: 3812 })
// );
// blackMarble.alpha = 0.5;//透明度，取值范围0%表示完全透明，100%表示不透明
// blackMarble.brightness = 2.0; // 亮度 > 1.0 increases brightness.  < 1.0 decreases.

//叠加本地标签瓦片图层
layers.addImageryProvider(labellayer);

//叠加logo
layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url: 'static/logo.png',
    rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
}));