<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="margin:16px;font-size: 24px">SQL</div>
        <el-input type="textarea" v-model="sql" :rows="20"></el-input>
      </el-col>
      <el-col :span="12">
        <div style="margin:16px;font-size: 24px">Rust Struct</div>
        <el-input type="textarea" :model-value="sqlContent(sql)" :rows="20"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import {sqlContent} from "@/utils/sql"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      sql: 'CREATE TABLE `my_user`\n' +
          '(\n' +
          '    `id`            bigint(20) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,\n' +
          '    `username`       varchar(255)          NOT NULL COMMENT \'username\',\n' +
          '    `password`   varchar(255)        NOT NULL COMMENT \'password\'\n' +
          ') ENGINE = InnoDB\n' +
          '  DEFAULT CHARSET = utf8mb4;'
    }
  },
  methods: {
    sqlContent: sqlContent
  }

});
</script>
