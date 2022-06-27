<template>
  <div>
    <!-- 主页面信息 -->
    <div>
      <el-container>
        <el-header>GIS虚拟实验室</el-header>
        <el-container>
          <!-- 侧边栏信息 -->
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title">地图展示控件</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="map_reset"
                    >地图复位</el-menu-item
                  >
                  <el-menu-item index="1-2" @click="lo_area"
                    >定位至区域</el-menu-item
                  >
                  <el-menu-item index="1-3" @click="mapZoomIn"
                    >地图放大</el-menu-item
                  >
                  <el-menu-item index="1-4" @click="mapZoomOut"
                    >地图缩小</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">停驻点挖掘</template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="showTraceInfo"
                    >停驻点说明</el-menu-item
                  >
                  <el-menu-item index="2-2" @click="showTrace"
                    >轨迹列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">聚类分析</template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" @click="showClusterInfo"
                    >聚类说明</el-menu-item
                  >
                  <el-menu-item index="3-2">所有停驻点聚类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <!-- 地图界面 -->
          <el-main>
            <BaiduMap ref="BaiduMap" />
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!-- 轨迹线抽屉 -->
    <div>
      <el-drawer
        title="轨迹线展示"
        :visible.sync="traceVis"
        :direction="direction"
        :height="drawerHeight"
      >
        <TraceLine ref="traceLine" />
      </el-drawer>
    </div>
    <!-- 停驻点说明弹窗 -->
    <div>
      <el-dialog title="停驻点说明" :visible.sync="showTraceInfoVis">
        <img
          src="https://pic3.zhimg.com/80/v2-210d1fe456cbfcccee2452c091464cb6_720w.jpg"
          alt="停驻点"
        />
        <div class="Text">
          <h1>停驻点：</h1>
            表示物体在某位置处于停留状态且维持一段时间的，该位置即停驻点。不同文献对其称呼不同，包括停留点、停驻点、stay
          point、stops等。<br>
            在该实验中，我们将采用以时间和距离为阈值的方式提取轨迹中的停驻点。通过这些停驻点，我们可以清楚地了解在一个地区的特定时间段，
          人流量的大小和居民的出行倾向。
        </div>
      </el-dialog>
    </div>
    <!-- 聚类说明弹窗 -->
    <div>
      <el-dialog title="聚类说明" :visible.sync="showClusterInfoVis">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BaiduMap from "./baiduMap.vue";
import TraceLine from "./traceLine.vue";

export default {
  name: "mainPage",
  components: { BaiduMap, TraceLine },
  data() {
    return {
      traceVis: false,
      direction: "btt",
      drawerHeight: "1600px",
      showTraceInfoVis: false,
      showClusterInfoVis: false,
    };
  },
  methods: {
    map_reset() {
      this.$refs.BaiduMap.map_reset();
    },
    lo_area() {
      this.$refs.BaiduMap.lo_area();
    },
    mapZoomIn() {
      this.$refs.BaiduMap.mapZoomIn();
    },
    mapZoomOut() {
      this.$refs.BaiduMap.mapZoomOut();
    },
    showTraceInfo() {
      this.showTraceInfoVis = true;
    },
    showTrace() {
      this.traceVis = true;
    },
    showClusterInfo() {
      this.showClusterInfoVis = false;
    },
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.Text {
  text-align: left;
}
</style>
