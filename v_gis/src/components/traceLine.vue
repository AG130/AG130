<template>
  <div>
    <!-- 轨迹点列表 -->
    <div>
      <el-table :data="traceLine">
        <el-table-column
          property="id"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          property="name"
          label="轨迹名"
          width="200"
        ></el-table-column>
        <el-table-column
          property="timeStart"
          label="出发时间"
          width="100"
        ></el-table-column>
        <el-table-column
          property="placeStart"
          label="出发地点"
          width="200"
        ></el-table-column>
        <el-table-column
          property="timeEnd"
          label="到达时间"
          width="100"
        ></el-table-column>
        <el-table-column
          property="placeEnd"
          label="到达地点"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showTrace(scope.$index, scope.row)"
              >展示轨迹</el-button
            >
            <el-button size="mini" @click="hideTrace(scope.$index, scope.row)"
              >隐藏轨迹</el-button
            >
            <el-button size="mini" @click="analysisTrace">停驻点识别</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 停驻点识别参数 -->
    <div>
      <el-dialog title="停驻点识别" :visible.sync="traceSetVis">
        <el-form :model="setForm">
          <el-form-item label="时间间隔">
            <el-input v-model="setForm.time" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="距离间隔">
            <el-input v-model="setForm.distance" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_set_input">取 消</el-button>
          <el-button type="primary" @click="conf_set_input">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";

export default {
  data() {
    return {
      traceLine: [
        {
          id: 1,
          name: "轨迹线1",
          timeStart: "00:07:53",
          placeStart: "汽车加油站",
          timeEnd: "07:32:11",
          placeEnd: "KTV停车场",
        },
        {
          id: 2,
          name: "轨迹线2",
          timeStart: "01:46:25",
          placeStart: "海德二道停车场",
          timeEnd: "07:48:25",
          placeEnd: "酒店停车场",
        },
        {
          id: 3,
          name: "轨迹线3",
          timeStart: "12:00",
          placeStart: "地大未来城",
          timeEnd: "13:00",
          placeEnd: "地大南望山",
        },
      ],
      traceSetVis: false,
      setForm: {
        time: "",
        distance: "",
      },
      // 停驻点
      pointsArr: [
        { lng: 114.625212, lat: 30.46644 },
        { lng: 114.619551, lat: 30.466218 },
        { lng: 114.617589, lat: 30.466121 },
      ],
    };
  },
  methods: {
    showTrace(index, row) {
      utils.$emit("showTrace", index);
    },
    hideTrace(index, row) {
      utils.$emit("hideTrace", index);
    },
    analysisTrace() {
      this.traceSetVis = true;
    },
    cancel_set_input() {
      this.setForm.time = "";
      this.setForm.distance = "";
      this.traceSetVis = false;
    },
    conf_set_input() {
      // 向后端传递参数,
      utils.$emit("resultPoints", this.pointsArr);
      utils.$emit("showPoints");
      this.traceSetVis = false;
    },
  },
};
</script>

<style>
</style>