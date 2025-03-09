<template>
  <div class="todo">
    <div id="todoList">
      <div @keyup.enter="handleAddClick">
        <el-autocomplete
          style="width: 100%"
          popper-class="my-autocomplete"
          v-model="newTodo"
          ref="input"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容，按回车键确认"
          @select="handleSelect"
        >
          <i
            class="el-icon-plus el-input__icon"
            style="cursor: pointer"
            slot="suffix"
            @click="handleAddClick"
          >
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="todoList"
          tooltip-effect="dark"
          style="
            width: 100%;
            margin-top: 10px;
            height: calc(-300px + 100vh);
            overflow-y: auto;
          "
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="待办事项">
            <template slot-scope="scope"
              ><span
                v-if="scope.row.isDone"
                style="text-decoration: line-through"
                >{{ scope.row.content }}</span
              ><span v-else>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                style="color: #f56c6c"
                type="text"
                size="mini"
                @click="handleDeleteClick(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
          "
        >
          <p>
            <span>已完成 </span><a style="color: #5cbb7a">{{ finishNum }}</a
            ><span> / 全部 </span><a style="color: #8896b3">{{ allNum }}</a>
          </p>
          <div>
            <el-button
              size="small"
              circle
              type="success"
              @click="dialogVisible = true"
              ><i class="el-icon-star-off"></i
            ></el-button>
            <el-button
              size="small"
              circle
              type="warning"
              @click="signDialogVisible = true"
              ><i class="el-icon-edit"></i></el-button
            ><el-button size="small" circle type="danger" @click="delTodo"
              ><i class="el-icon-delete"></i
            ></el-button>
          </div>
        </div>
        <el-dialog
          title="编辑待办"
          :visible.sync="centerDialogVisible"
          width="300px"
        >
          <el-input
            ref="nowInput"
            v-model="nowContent"
            placeholder="请输入新的内容"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdateClick"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
    <div id="timer" v-show="false"></div>
    <el-dialog title="常用待办" :visible.sync="dialogVisible" width="300px">
      <el-table :data="suggestTodo" style="width: 100%">
        <el-table-column prop="value" label="待办模版"> </el-table-column>
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEditRow(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color: #f56c6c"
              @click="handleDeleteRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column></el-table
      >
    </el-dialog>
    <el-dialog
      :center="false"
      title="自定义待办模版"
      width="300px"
      :visible.sync="signDialogVisible"
      ><el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="value">
          <el-input v-model="ruleForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存模版</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Dialog, Toast } from "vant";
export default {
  name: "todoList",
  // eslint-disable-next-line
  components: { Dialog, Toast },
  data() {
    return {
      suggestTodo: [
        { value: "读一本书", uuid: "djsadnadkad2123123" },
        { value: "看一部电影", uuid: "cccmkemff334232" },
        { value: "学习一门新技术", uuid: "dedd2wdwdw" },
        { value: "锻炼半个小时", uuid: "fdsfwfefwef999" },
        { value: "去看海", uuid: "ccdccce3313" },
      ],
      centerDialogVisible: false,
      nowContent: "",
      newTodo: "",
      dialogVisible: false,
      signDialogVisible: false,
      ruleForm: {
        value: "",
        uuid: "",
      },
      rules: {
        value: [{ required: true, message: "请填写待办模版" }],
      },
    };
  },
  computed: {
    ...mapGetters(["allNum", "finishNum"]),
    ...mapState(["todoList", "flag"]),
  },
  methods: {
    ...mapActions([
      "handleUpdate",
      "handleDelete",
      "handleAdd",
      "toggleSelection",
      "handleSelectionChanged",
      "initTodo",
      "handleMounted",
    ]),
    handleDeleteClick(row) {
      Dialog.confirm({
        title: "删除待办",
        message: "是否确认删除该事项？",
      })
        .then(() => {
          this.handleDelete(row);
          Toast.success("删除成功!");
        })
        .catch(() => {
          Toast.fail("已取消");
        });
    },
    delTodo() {
      Dialog.confirm({
        title: "清空已完成事项",
        message: "是否确认删除已完成事项？",
      })
        .then(() => {
          this.toggleSelection();
          Toast.success("删除成功!");
        })
        .catch(() => {
          Toast.fail("已取消");
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let suggestIndex = this.suggestTodo.findIndex(
            (item) => item.uuid == this.ruleForm.uuid
          );
          if (suggestIndex > -1) {
            this.suggestTodo[suggestIndex].value = this.ruleForm.value;
          } else {
            this.suggestTodo.push({
              value: this.ruleForm.value,
              uuid: this.generateUUID(),
            });
          }
          window.localStorage.setItem(
            "suggestTodo",
            JSON.stringify(this.suggestTodo)
          );
          Toast.success("保存成功!");
          this.signDialogVisible = false;
          this.ruleForm = {
            value: "",
            uuid: "",
          };
        } else {
          Toast.fail("自定义模版不能为空");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEditRow(row) {
      this.ruleForm.uuid = row.uuid;
      this.ruleForm.value = row.value;
      this.signDialogVisible = true;
    },
    async handleDeleteRow(row) {
      this.dialogVisible = false;
      await Dialog.confirm({
        title: "删除模版",
        message: "是否确认删除该模版？",
      })
        .then(() => {
          this.suggestTodo = this.suggestTodo.filter((item) => item != row);
          window.localStorage.setItem(
            "suggestTodo",
            JSON.stringify(this.suggestTodo)
          );
          Toast.success("删除成功!");
        })
        .catch(() => {
          Toast.fail("已取消");
        });
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      this.handleSelectionChanged(val);
    },
    handleAddClick() {
      if (this.newTodo.trim()) {
        let addTodo = {
          content: this.newTodo,
          isDone: false,
          uuid: this.generateUUID(),
        };
        this.handleAdd(addTodo);
      }
      this.newTodo = "";
    },
    handleUpdateClick() {
      if (this.nowContent.trim()) {
        this.handleUpdate({
          nowContent: this.nowContent,
          nowContentID: this.nowContentID,
        });
        Toast.success("保存成功!");
        this.centerDialogVisible = false;
      }
    },
    handleEdit(index, row) {
      this.centerDialogVisible = true;
      this.nowContentID = row.uuid;
      this.nowContent = row.content;
    },
    saveToLocalStorage() {
      var todoStore = this.todoList.map((item) => {
        return {
          content: item.content,
          isDone: item.isDone ? true : false,
          uuid: item.uuid ? item.uuid : this.generateUUID(),
        };
      });
      window.localStorage.setItem("todoStore", JSON.stringify(todoStore));
    },
    generateUUID() {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    querySearch(queryString, cb) {
      var suggestTodo = this.suggestTodo;
      var results = queryString
        ? suggestTodo.filter(this.createFilter(queryString))
        : suggestTodo;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (suggestTodo) => {
        return (
          suggestTodo.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.handleAddClick();
      // this.$refs.input.focus()
    },
    handleIconClick(ev) {
      console.log(ev);
    },
  },
  beforeMount() {
    let allTodo = window.localStorage.getItem("todoStore")
      ? JSON.parse(window.localStorage.getItem("todoStore"))
      : [];
    this.initTodo(allTodo);
  },
  mounted() {
    if (this.todoList.length > 0) {
      this.todoList.map((todo) => {
        if (todo.isDone)
          this.$refs.multipleTable.toggleRowSelection(todo, true);
      });
    }
    this.suggestTodo = window.localStorage.getItem("suggestTodo")
      ? JSON.parse(window.localStorage.getItem("suggestTodo"))
      : this.suggestTodo;
    this.handleMounted();
  },
  updated() {
    this.saveToLocalStorage();
  },
};
</script>

<style>
@media screen and (max-width: 800px) {
  #todoList {
    position: absolute;
    left: 50%;
    margin-left: -40vw;
    width: 80vw;
  }
}
@media screen and (min-width: 800px) {
  #todoList {
    position: absolute;
    left: 50%;
    margin-left: -180px;
    width: 360px;
  }
}
#buttons {
  position: absolute;
  text-align: center;
  bottom: 20px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.el-table__empty-block {
  height: calc(100vh - 360px) !important;
}
</style>
