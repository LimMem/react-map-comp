export interface MapAttribute {
  /**
   * @description 地图允许展示的最小级别
   */
  minZoom?: number;

  /**
   * @description 地图允许展示的最大级别
   * @default
   */
  maxZoom?: number;
  /**
   * @description 是否启用使用高分辨率地图。在iPhone4及其后续设备上，可以通过开启此选项获取更高分辨率的底图，
   * @default v1.2,v1.3版本默认不开启，v1.4默认为开启状态
   */
  enableHighResolution?: boolean;
  /**
   * @description 是否自动适应地图容器变化，默认启用
   * @default true
   */
  enableAutoResize?: boolean;
  /**
   * @description 是否开启底图可点功能
   * @default true
   */
  enableMapClick?: boolean;
  /**
   * @description 输入输出的坐标类型 3为gcj02坐标，5为bd0ll坐标，
   * @default 5
   *
   */
  coordsType?: '3' | '5';
}

export interface BMapProps {
  /**
   * @description 百度地图ak
   */
  ak: string;

  /**
   * @description 地图容器id
   */
  id: string;

  /**
   * @description 使用个性化地图id, 使用该属性后会展示个性化地图样式
   */
  styleId?: string;

  /**
   * @description 地图容器样式
   */
  style?: React.CSSProperties;
  /**
   * @description 地图初始化属性
   */
  initMapProps?: MapAttribute;

  /**
   * @description 地图中心点
   */
  center?: BMapPoint;

  /**
   * @description 地图级别
   * @default 14
   */
  zoom?: number;

  /**
   * @description 地图加载完成
   */
  onMapLoaded?: (e: any) => void;

  /**
   * @description 左键单击地图时触发此事件。 当双击时，产生的事件序列为： onClick  onDblClick
   */
  onClick?: (e: any) => void;

  /**
   * @description 鼠标双击地图时会触发此事件
   */
  onDblClick?: (e: any) => void;

}


export interface BMapPoint {
  /**
   * @description 地理经度
   */
  lng: number;

  /**
   * @description 地理纬度
   */
  lat: number;
}

export interface MapChildBase {
  point?: BMapPoint;
  map: React.RefObject<BMapProps & any>
}

export interface BMapSizeProps {
  /**
   * @description 竖直方向的数值
   * @default
   */
  height?: number;

  /**
   * @description 水平方向的数值
   * @default
   */
  width?: number;
}

export interface BMapIconProps {
  /**
   * @description 以给定的图像地址
   * @default
   */
  url: string;

  /**
   * @description 以给定的图像大小
   * @default
   */
  size: BMapSizeProps;

  /**
   * @description 图标的定位点相对于图标左上角的偏移值
   * @default
   */
  anchor: BMapSizeProps;

  /**
   * @description 图标所用的图片相对于可视区域的偏移值，此功能的作用等同于CSS中的background-position属性
   * @default
   */
  imageOffset: BMapSizeProps;

  /**
   * @description 图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
   * @default
   */
  imageSize: BMapSizeProps;

  /**
   * @description 图标所用图像资源的位置
   * @default
   */
  imageUrl: string;

  /**
   * @description 信息窗口开启位置相对于图标左上角的偏移值
   * @default
   */
  infoWindowAnchor: BMapSizeProps;

  /**
  * @description 设置icon打印图片的url，该打印图片只针对IE6有效，解决IE6使用PNG滤镜导致的错位问题。如果您的icon没有使用PNG格式图片或者没有使用CSS Sprites技术，则可忽略此配置
  * @default
  */
  printImageUrl: string;
}

export interface BMapMarker extends MapChildBase {
  /**
   * @description 标注的位置偏移值
   * @default
   */
  offset?: BMapSizeProps;

  /**
   * @description 标注所用的图标对象
   * @default
   */
  icon?: BMapIconProps;

  /**
   * @description 是否在调用map.clearOverlays清除此覆盖物
   * @default true
   */
  enableMassClear?: BMapIconProps;

  /**
   * @description 是否启用拖拽
   * @default false
   */
  enableDragging?: BMapIconProps;

  /**
   * @description 是否响应点击事件
   * @default true
   */
  enableClicking?: BMapIconProps;

  /**
   * @description 拖拽标注时，标注是否开启离开地图表面效果。
   * @default false
   */
  raiseOnDrag?: boolean;

  /**
   * @description 拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
   * @default
   */
  draggingCursor?: string;

  /**
   * @description 旋转角度
   * @default
   */
  rotation?: number;

  /**
   * @description 阴影图标
   * @default
   */
  shadow?: BMapIconProps;

  /**
   * @description 鼠标移到marker上的显示内容
   * @default
   */
  title?: string;

}
