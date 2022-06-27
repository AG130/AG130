<template>
  <div>
    <!-- 地图展示 -->
    <div id="map" style="width: 100%; height: 500px"></div>
    <!-- 定位区域弹窗 -->
    <div>
      <el-dialog
        title="请输入经纬度"
        :visible.sync="lo_area_inputForm"
        :height="'50px'"
      >
        <span>当前经纬度为：{{ center.lng }},{{ center.lat }}</span>
        <el-form :model="form">
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="form.lo_x" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="form.lo_y" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dailog-footer">
          <el-button @click="lo_area_inputForm = false">取消</el-button>
          <el-button type="primary" @click="lo_to_area">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import { linePoints } from "@/lines";

export default {
  data() {
    return {
      map: "",
      center_init: { lng: 114.0605, lat: 22.5505 },
      zoom_init: 13,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      lo_area_inputForm: false,
      formLabelWidth: "120px",
      form: {
        lo_x: "",
        lo_y: "",
      },
      //   轨迹点
      line_points: [],
      // 轨迹线
      polyline: [],
      // 停驻点
      pointsArr: [],
    };
  },
  mounted() {
    var that = this;
    that.map = new window.BMap.Map("map");
    that.map.centerAndZoom(
      new BMap.Point(this.center_init.lng, this.center_init.lat),
      this.zoom_init
    );
    that.map.enableScrollWheelZoom(true);
    that.map.addControl(
      new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: true,
      })
    );
    that.map.addControl(new BMap.ScaleControl());
    that.map.addControl(
      new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
      })
    );
    utils.$on("showTrace", function (id) {
      that.showTrace(id);
    });
    utils.$on("hideTrace", function (id) {
      that.hideTrace(id);
    });
    utils.$on("resultPoints", (data) => {
      that.pointsArr = data;
    });
    utils.$on("showPoints", function () {
      that.showPoints();
    });
    that.line_points=linePoints()
  },
  methods: {
    map_reset() {
      this.map.centerAndZoom(
        new BMap.Point(this.center_init.lng, this.center_init.lat),
        this.zoom_init
      );
    },
    lo_area() {
      var cen = this.map.getCenter();
      this.center.lng = cen.lng.toFixed(5);
      this.center.lat = cen.lat.toFixed(5);
      this.lo_area_inputForm = true;
    },
    lo_to_area() {
      this.center.lng = this.form.lo_x;
      this.center.lat = this.form.lo_y;
      this.map.setCenter(new BMap.Point(this.center.lng, this.center.lat));
      this.lo_area_inputForm = false;
    },
    mapZoomIn() {
      this.zoom = this.map.getZoom();
      this.zoom++;
      this.map.setZoom(this.zoom);
    },
    mapZoomOut() {
      this.zoom = this.map.getZoom();
      this.zoom--;
      this.map.setZoom(this.zoom);
    },
    showTrace(id) {
      var pl = [];
      for (var i = 0; i < this.line_points[id].length; i++) {
        var point = new BMap.Point(
          this.line_points[id][i].lng,
          this.line_points[id][i].lat
        );
        pl.push(point);
      }
      this.polyline[id] = new BMap.Polyline(pl, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      });

      this.map.addOverlay(this.polyline[id]);
      alert("展示成功！");
    },
    hideTrace(id) {
      this.map.removeOverlay(this.polyline[id]);
    },
    showPoints() {
      for (var i = 0; i < this.pointsArr.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(this.pointsArr[i].lng, this.pointsArr[i].lat)
        );
        this.map.addOverlay(marker);
      }
      alert("展示成功！");
    },
  },
};
</script>

<style>
.BMap_cpyCtrl {
  display: none;
}
</style>