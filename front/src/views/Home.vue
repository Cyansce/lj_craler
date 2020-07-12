<template>
  <div class="home" v-loading="loading">
    <!-- <el-select v-model="houseTypeUrl" @change="handleChange">
      <el-option
        v-for="(item, index) in houseTypes"
        :key="index"
        :label="item.name"
        :value="item.url"
      ></el-option>
    </el-select>-->

    <el-row>
      <el-col :md="8" :sm="12" :xs="24">
        <el-select v-model="kind" @change="handleKindChange">
          <el-option value="district" label="区域"></el-option>
          <el-option value="subway_line" label="地铁"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8" :sm="12" :xs="24">
        <el-select v-model="region" @change="handleRegionChange" clearable>
          <el-option
            v-for="(item, index) in regions"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :md="8" :sm="12" :xs="24" v-if="region">
        <el-select v-model="area" @change="handleAreaChange">
          <el-option
            v-for="(item, index) in areas"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="小区" width="180"></el-table-column>
        <el-table-column prop="unitPrice" label="均价"></el-table-column>
        <el-table-column prop="signTime" label="时间"></el-table-column>
        <el-table-column prop="priceTrans" label="总价"></el-table-column>
        <el-table-column prop="desc" label="描述" width="180"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { getHouseTypes, getRegion, chengjiao } from "@/api/lj";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      loading: false,
      houseTypeUrl: "",
      houseTypes: [],
      cityData: {},
      regions: [],
      region: "",
      kind: "district",
      areas: [],
      area: "",
      tableData: []
    };
  },
  created() {
    // this.getHouseTypes()
    this.getCityInfo();
  },
  methods: {
    async getHouseTypes() {
      try {
        this.loading = true;
        this.houseTypes = await getHouseTypes();
        if (Array.isArray && this.houseTypes.length > 0) {
          this.houseTypeUrl = this.houseTypes[0].url;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getCityInfo() {
      try {
        this.loading = true;
        const result = await getRegion();
        this.cityData = result.data.info[0];
        this.handleKindChange(this.kind);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    handleKindChange(value) {
      this.region = "";
      this.handleRegionChange("");
      this.regions = (this.cityData[value] || []).map(s => ({
        name: s.district_name || s.subway_line_name,
        value: s.district_quanpin || s.baidu_subway_line_id
      }));
      this.regions.unshift({
        name: "不限",
        value: ""
      });
    },
    handleRegionChange(value) {
      if (!value) {
        this.handleAreaChange();
        return;
      }
      this.area = "";
      const region =
        this.cityData[this.kind].find(
          s =>
            s.district_quanpin === this.region ||
            s.baidu_subway_line_id === this.region
        ) || {};
      this.areas = ((region && (region.bizcircle || region.station)) || []).map(
        s => ({
          value: s.bizcircle_quanpin || s.subway_station_id,
          name: s.bizcircle_name || s.subway_station_name
        })
      );
      this.areas.unshift({
        name: "不限",
        value: region.district_quanpin || region.baidu_subway_line_id
      });
    },
    async handleAreaChange(val) {
      try {
        this.loading = true;
        const result = await chengjiao(val || "");
        this.tableData = result.data.data.getChengjiaoList.list;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
