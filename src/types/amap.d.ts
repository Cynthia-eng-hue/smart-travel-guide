// 高德地图API类型声明
declare namespace AMap {
  class Map {
    constructor(container: string | HTMLElement, options?: any)
    setCenter(lnglat: [number, number]): void
    setZoom(zoom: number): void
    setMapStyle(style: string): void
    addControl(control: any): void
    destroy(): void
  }
  
  class Marker {
    constructor(options: any)
    setMap(map: Map): void
    on(event: string, callback: Function): void
  }
  
  class InfoWindow {
    constructor(options: any)
    open(map: Map, lnglat: [number, number]): void
  }
  
  class Scale {
    constructor(options?: any)
  }
  
  class ToolBar {
    constructor(options?: any)
  }
  
  class MapType {
    constructor(options?: any)
  }
  
  class PlaceSearch {
    constructor(options?: any)
    search(keyword: string, callback: (status: string, result: any) => void): void
  }
  
  class Icon {
    constructor(options: any)
  }
  
  class Size {
    constructor(width: number, height: number)
  }
  
  class Pixel {
    constructor(x: number, y: number)
  }
}

declare interface Window {
  AMap: typeof AMap
}