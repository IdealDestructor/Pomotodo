(function () {
  "use strict";
  var e = {
      8200: function (e, t, o) {
        var n = o(7195),
          i = function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              { attrs: { id: "app" } },
              [
                t(
                  "nav",
                  [
                    t(
                      "router-link",
                      {
                        staticStyle: { "text-decoration": "none" },
                        attrs: { to: "/" },
                      },
                      [e._v("📝 待办项")]
                    ),
                    e._v(" | "),
                    t(
                      "router-link",
                      {
                        staticStyle: { "text-decoration": "none" },
                        attrs: { to: "/tomato" },
                      },
                      [e._v("🍅 番茄钟")]
                    ),
                  ],
                  1
                ),
                t("router-view"),
              ],
              1
            );
          },
          l = [],
          a = o(1001),
          r = {},
          s = (0, a.Z)(r, i, l, !1, null, null, null),
          u = s.exports,
          d = o(2241),
          c = function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              { staticClass: "todo" },
              [
                t("div", { attrs: { id: "todoList" } }, [
                  t(
                    "div",
                    {
                      on: {
                        keyup: function (t) {
                          return !t.type.indexOf("key") &&
                            e._k(t.keyCode, "enter", 13, t.key, "Enter")
                            ? null
                            : e.handleAddClick.apply(null, arguments);
                        },
                      },
                    },
                    [
                      t(
                        "el-autocomplete",
                        {
                          ref: "input",
                          staticStyle: { width: "100%" },
                          attrs: {
                            "popper-class": "my-autocomplete",
                            "fetch-suggestions": e.querySearch,
                            placeholder: "请输入内容，按回车键确认",
                          },
                          on: { select: e.handleSelect },
                          scopedSlots: e._u([
                            {
                              key: "default",
                              fn: function ({ item: o }) {
                                return [
                                  t("div", { staticClass: "name" }, [
                                    e._v(e._s(o.value)),
                                  ]),
                                ];
                              },
                            },
                          ]),
                          model: {
                            value: e.newTodo,
                            callback: function (t) {
                              e.newTodo = t;
                            },
                            expression: "newTodo",
                          },
                        },
                        [
                          t("i", {
                            staticClass: "el-icon-plus el-input__icon",
                            staticStyle: { cursor: "pointer" },
                            attrs: { slot: "suffix" },
                            on: { click: e.handleAddClick },
                            slot: "suffix",
                          }),
                        ]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    [
                      t(
                        "el-table",
                        {
                          ref: "multipleTable",
                          staticStyle: { width: "100%", "margin-top": "10px" },
                          attrs: { data: e.todoList, "tooltip-effect": "dark" },
                          on: { "selection-change": e.handleSelectionChange },
                        },
                        [
                          t("el-table-column", {
                            attrs: { type: "selection", width: "55" },
                          }),
                          t("el-table-column", {
                            attrs: { label: "待办事项" },
                            scopedSlots: e._u([
                              {
                                key: "default",
                                fn: function (o) {
                                  return [
                                    o.row.isDone
                                      ? t(
                                          "span",
                                          {
                                            staticStyle: {
                                              "text-decoration": "line-through",
                                            },
                                          },
                                          [e._v(e._s(o.row.content))]
                                        )
                                      : t("span", [e._v(e._s(o.row.content))]),
                                  ];
                                },
                              },
                            ]),
                          }),
                          t("el-table-column", {
                            attrs: {
                              label: "操作",
                              width: "90",
                              fixed: "right",
                            },
                            scopedSlots: e._u([
                              {
                                key: "default",
                                fn: function (o) {
                                  return [
                                    t(
                                      "el-button",
                                      {
                                        attrs: { type: "text", size: "mini" },
                                        on: {
                                          click: function (t) {
                                            return e.handleEdit(
                                              o.$index,
                                              o.row
                                            );
                                          },
                                        },
                                      },
                                      [e._v("编辑")]
                                    ),
                                    t(
                                      "el-button",
                                      {
                                        staticStyle: { color: "#f56c6c" },
                                        attrs: { type: "text", size: "mini" },
                                        on: {
                                          click: function (t) {
                                            return e.handleDeleteClick(o.row);
                                          },
                                        },
                                      },
                                      [e._v("删除")]
                                    ),
                                  ];
                                },
                              },
                            ]),
                          }),
                        ],
                        1
                      ),
                      t(
                        "div",
                        {
                          staticStyle: {
                            display: "flex",
                            "justify-content": "space-between",
                            "align-items": "center",
                          },
                        },
                        [
                          t("p", [
                            t("span", [e._v("已完成 ")]),
                            t("a", { staticStyle: { color: "#5cbb7a" } }, [
                              e._v(e._s(e.finishNum)),
                            ]),
                            t("span", [e._v(" / 全部 ")]),
                            t("a", { staticStyle: { color: "#8896b3" } }, [
                              e._v(e._s(e.allNum)),
                            ]),
                          ]),
                          t(
                            "div",
                            [
                              t(
                                "el-button",
                                {
                                  attrs: {
                                    size: "small",
                                    circle: "",
                                    type: "success",
                                  },
                                  on: {
                                    click: function (t) {
                                      e.dialogVisible = !0;
                                    },
                                  },
                                },
                                [t("i", { staticClass: "el-icon-star-off" })]
                              ),
                              t(
                                "el-button",
                                {
                                  attrs: {
                                    size: "small",
                                    circle: "",
                                    type: "warning",
                                  },
                                  on: {
                                    click: function (t) {
                                      e.signDialogVisible = !0;
                                    },
                                  },
                                },
                                [t("i", { staticClass: "el-icon-edit" })]
                              ),
                              t(
                                "el-button",
                                {
                                  attrs: {
                                    size: "small",
                                    circle: "",
                                    type: "danger",
                                  },
                                  on: { click: e.delTodo },
                                },
                                [t("i", { staticClass: "el-icon-delete" })]
                              ),
                            ],
                            1
                          ),
                        ]
                      ),
                      t(
                        "el-dialog",
                        {
                          attrs: {
                            title: "编辑待办",
                            visible: e.centerDialogVisible,
                            width: "300px",
                          },
                          on: {
                            "update:visible": function (t) {
                              e.centerDialogVisible = t;
                            },
                          },
                        },
                        [
                          t("el-input", {
                            ref: "nowInput",
                            attrs: { placeholder: "请输入新的内容" },
                            model: {
                              value: e.nowContent,
                              callback: function (t) {
                                e.nowContent = t;
                              },
                              expression: "nowContent",
                            },
                          }),
                          t(
                            "span",
                            {
                              staticClass: "dialog-footer",
                              attrs: { slot: "footer" },
                              slot: "footer",
                            },
                            [
                              t(
                                "el-button",
                                {
                                  on: {
                                    click: function (t) {
                                      e.centerDialogVisible = !1;
                                    },
                                  },
                                },
                                [e._v("取 消")]
                              ),
                              t(
                                "el-button",
                                {
                                  attrs: { type: "primary" },
                                  on: { click: e.handleUpdateClick },
                                },
                                [e._v("确 定")]
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ]),
                t("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !1,
                      expression: "false",
                    },
                  ],
                  attrs: { id: "timer" },
                }),
                t(
                  "el-dialog",
                  {
                    attrs: {
                      title: "常用待办",
                      visible: e.dialogVisible,
                      width: "300px",
                    },
                    on: {
                      "update:visible": function (t) {
                        e.dialogVisible = t;
                      },
                    },
                  },
                  [
                    t(
                      "el-table",
                      {
                        staticStyle: { width: "100%" },
                        attrs: { data: e.suggestTodo },
                      },
                      [
                        t("el-table-column", {
                          attrs: { prop: "value", label: "待办模版" },
                        }),
                        t("el-table-column", {
                          attrs: { label: "操作", width: "90", fixed: "right" },
                          scopedSlots: e._u([
                            {
                              key: "default",
                              fn: function (o) {
                                return [
                                  t(
                                    "el-button",
                                    {
                                      attrs: { size: "mini", type: "text" },
                                      on: {
                                        click: function (t) {
                                          return e.handleEditRow(o.row);
                                        },
                                      },
                                    },
                                    [e._v("编辑")]
                                  ),
                                  t(
                                    "el-button",
                                    {
                                      staticStyle: { color: "#f56c6c" },
                                      attrs: { size: "mini", type: "text" },
                                      on: {
                                        click: function (t) {
                                          return e.handleDeleteRow(o.row);
                                        },
                                      },
                                    },
                                    [e._v("删除")]
                                  ),
                                ];
                              },
                            },
                          ]),
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                t(
                  "el-dialog",
                  {
                    attrs: {
                      center: !1,
                      title: "自定义待办模版",
                      width: "300px",
                      visible: e.signDialogVisible,
                    },
                    on: {
                      "update:visible": function (t) {
                        e.signDialogVisible = t;
                      },
                    },
                  },
                  [
                    t(
                      "el-form",
                      {
                        ref: "ruleForm",
                        staticClass: "demo-ruleForm",
                        attrs: {
                          model: e.ruleForm,
                          "status-icon": "",
                          rules: e.rules,
                        },
                      },
                      [
                        t(
                          "el-form-item",
                          { attrs: { prop: "value" } },
                          [
                            t("el-input", {
                              attrs: { autocomplete: "off" },
                              model: {
                                value: e.ruleForm.value,
                                callback: function (t) {
                                  e.$set(e.ruleForm, "value", t);
                                },
                                expression: "ruleForm.value",
                              },
                            }),
                          ],
                          1
                        ),
                        t(
                          "el-form-item",
                          [
                            t(
                              "el-button",
                              {
                                attrs: { type: "primary" },
                                on: {
                                  click: function (t) {
                                    return e.submitForm("ruleForm");
                                  },
                                },
                              },
                              [e._v("保存模版")]
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            );
          },
          f = [],
          h = (o(7658), o(408)),
          g = o(8768),
          m = o(521),
          p = {
            name: "todoList",
            components: { Dialog: g.Z, Toast: m.Z },
            data() {
              return {
                suggestTodo: [
                  { value: "读一本书", uuid: "djsadnadkad2123123" },
                  { value: "看一部电影", uuid: "cccmkemff334232" },
                  { value: "学习一门新技术", uuid: "dedd2wdwdw" },
                  { value: "锻炼半个小时", uuid: "fdsfwfefwef999" },
                  { value: "去看海", uuid: "ccdccce3313" },
                ],
                centerDialogVisible: !1,
                nowContent: "",
                newTodo: "",
                dialogVisible: !1,
                signDialogVisible: !1,
                ruleForm: { value: "", uuid: "" },
                rules: { value: [{ required: !0, message: "请填写待办模版" }] },
              };
            },
            computed: {
              ...(0, h.Se)(["allNum", "finishNum"]),
              ...(0, h.rn)(["todoList", "flag"]),
            },
            methods: {
              ...(0, h.nv)([
                "handleUpdate",
                "handleDelete",
                "handleAdd",
                "toggleSelection",
                "handleSelectionChanged",
                "initTodo",
                "handleMounted",
              ]),
              handleDeleteClick(e) {
                g.Z.confirm({
                  title: "删除待办",
                  message: "是否确认删除该事项？",
                })
                  .then(() => {
                    this.handleDelete(e), m.Z.success("删除成功!");
                  })
                  .catch(() => {
                    m.Z.fail("已取消");
                  });
              },
              delTodo() {
                g.Z.confirm({
                  title: "清空已完成事项",
                  message: "是否确认删除已完成事项？",
                })
                  .then(() => {
                    this.toggleSelection(), m.Z.success("删除成功!");
                  })
                  .catch(() => {
                    m.Z.fail("已取消");
                  });
              },
              submitForm(e) {
                this.$refs[e].validate((e) => {
                  if (!e) return m.Z.fail("自定义模版不能为空"), !1;
                  {
                    let e = this.suggestTodo.findIndex(
                      (e) => e.uuid == this.ruleForm.uuid
                    );
                    e > -1
                      ? (this.suggestTodo[e].value = this.ruleForm.value)
                      : this.suggestTodo.push({
                          value: this.ruleForm.value,
                          uuid: this.generateUUID(),
                        }),
                      window.localStorage.setItem(
                        "suggestTodo",
                        JSON.stringify(this.suggestTodo)
                      ),
                      m.Z.success("保存成功!"),
                      (this.signDialogVisible = !1),
                      (this.ruleForm = { value: "", uuid: "" });
                  }
                });
              },
              resetForm(e) {
                this.$refs[e].resetFields();
              },
              handleEditRow(e) {
                (this.ruleForm.uuid = e.uuid),
                  (this.ruleForm.value = e.value),
                  (this.signDialogVisible = !0);
              },
              async handleDeleteRow(e) {
                (this.dialogVisible = !1),
                  await g.Z.confirm({
                    title: "删除模版",
                    message: "是否确认删除该模版？",
                  })
                    .then(() => {
                      (this.suggestTodo = this.suggestTodo.filter(
                        (t) => t != e
                      )),
                        window.localStorage.setItem(
                          "suggestTodo",
                          JSON.stringify(this.suggestTodo)
                        ),
                        m.Z.success("删除成功!");
                    })
                    .catch(() => {
                      m.Z.fail("已取消");
                    }),
                  (this.dialogVisible = !0);
              },
              handleSelectionChange(e) {
                this.handleSelectionChanged(e);
              },
              handleAddClick() {
                if (this.newTodo.trim()) {
                  let e = {
                    content: this.newTodo,
                    isDone: !1,
                    uuid: this.generateUUID(),
                  };
                  this.handleAdd(e);
                }
                this.newTodo = "";
              },
              handleUpdateClick() {
                this.nowContent.trim() &&
                  (this.handleUpdate({
                    nowContent: this.nowContent,
                    nowContentID: this.nowContentID,
                  }),
                  m.Z.success("保存成功!"),
                  (this.centerDialogVisible = !1));
              },
              handleEdit(e, t) {
                (this.centerDialogVisible = !0),
                  (this.nowContentID = t.uuid),
                  (this.nowContent = t.content);
              },
              saveToLocalStorage() {
                var e = this.todoList.map((e) => ({
                  content: e.content,
                  isDone: !!e.isDone,
                  uuid: e.uuid ? e.uuid : this.generateUUID(),
                }));
                window.localStorage.setItem("todoStore", JSON.stringify(e));
              },
              generateUUID() {
                var e = new Date().getTime(),
                  t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (t) {
                      var o = (e + 16 * Math.random()) % 16 | 0;
                      return (
                        (e = Math.floor(e / 16)),
                        ("x" == t ? o : (7 & o) | 8).toString(16)
                      );
                    }
                  );
                return t;
              },
              querySearch(e, t) {
                var o = this.suggestTodo,
                  n = e ? o.filter(this.createFilter(e)) : o;
                t(n);
              },
              createFilter(e) {
                return (t) =>
                  0 === t.value.toLowerCase().indexOf(e.toLowerCase());
              },
              handleSelect(e) {
                console.log(e), this.handleAddClick();
              },
              handleIconClick(e) {
                console.log(e);
              },
            },
            beforeMount() {
              let e = window.localStorage.getItem("todoStore")
                ? JSON.parse(window.localStorage.getItem("todoStore"))
                : [];
              this.initTodo(e);
            },
            mounted() {
              this.todoList.length > 0 &&
                this.todoList.map((e) => {
                  e.isDone &&
                    this.$refs.multipleTable.toggleRowSelection(e, !0);
                }),
                (this.suggestTodo = window.localStorage.getItem("suggestTodo")
                  ? JSON.parse(window.localStorage.getItem("suggestTodo"))
                  : this.suggestTodo),
                this.handleMounted();
            },
            updated() {
              this.saveToLocalStorage();
            },
          },
          v = p,
          w = (0, a.Z)(v, c, f, !1, null, null, null),
          b = w.exports;
        n["default"].use(d.ZP);
        const y = [
            { path: "/", name: "todo", component: b },
            {
              path: "/tomato",
              name: "tomato",
              component: () => o.e(408).then(o.bind(o, 9359)),
            },
          ],
          x = new d.ZP({ base: "", routes: y });
        var S = x;
        n["default"].use(h.ZP);
        const C = new h.ZP.Store({
          state: { todoList: [], flag: !1 },
          getters: {
            allNum: (e) => e.todoList.length,
            undo: (e) => e.todoList.filter((e) => !1 === e.isDone),
            finishNum: (e) => e.todoList.filter((e) => !0 === e.isDone).length,
          },
          mutations: {
            update(e, t) {
              e.todoList = t;
            },
            delete(e, t) {
              e.todoList = e.todoList.filter((e) => e.uuid != t.uuid);
            },
            add(e, t) {
              e.todoList.push(t);
            },
            done(e, t) {
              console.log(t),
                e.todoList.map(
                  (e) => (
                    t.findIndex((t) => t.uuid == e.uuid) > -1
                      ? (e.isDone = !0)
                      : (e.isDone = !1),
                    e
                  )
                );
            },
            flag(e, t) {
              e.flag = t;
            },
          },
          actions: {
            initTodo({ commit: e }, t) {
              e("update", t);
            },
            async handleUpdate(
              { commit: e, state: t },
              { nowContent: o, nowContentID: n }
            ) {
              await e("flag", !1);
              let i = t.todoList.map(
                (e) => (e.uuid == n && (e.content = o), e)
              );
              await e("update", i), await e("flag", !0);
            },
            async handleDelete({ commit: e }, t) {
              await e("flag", !1), await e("delete", t), await e("flag", !0);
            },
            handleAdd({ commit: e }, t) {
              e("add", t);
            },
            toggleSelection({ commit: e, getters: t }) {
              e("update", t.undo);
            },
            handleSelectionChanged({ commit: e, state: t }, o) {
              t.flag && e("done", o);
            },
            handleMounted({ commit: e }) {
              e("flag", !0);
            },
          },
        });
        var k = C,
          _ = o(5114),
          T = o.n(_),
          D = o(6929),
          L =
            (o(5110),
            function () {
              var e = this;
              e._self._c;
              return e._m(0);
            }),
          O = [
            function () {
              var e = this,
                t = e._self._c;
              return t("div", { staticClass: "loading-area" }, [
                t("div", { staticClass: "loading-box" }, [
                  t("div", { staticClass: "loading" }),
                ]),
              ]);
            },
          ],
          F = {},
          Z = F,
          N = (0, a.Z)(Z, L, O, !1, null, "207c3606", null),
          I = N.exports;
        const V = n["default"].extend(I),
          A = new V();
        A.$mount(),
          n["default"].directive("loadings", {
            inserted(e, t) {
              t.value && e.appendChild(A.$el);
            },
            update(e, t) {
              t.value
                ? e.appendChild(A.$el)
                : document.body.contains(A.$el) && e.removeChild(A.$el);
            },
          }),
          n["default"].use(D.ZP),
          n["default"].use(T()),
          (n["default"].config.productionTip = !1),
          new n["default"]({ router: S, store: k, render: (e) => e(u) }).$mount(
            "#app"
          );
      },
    },
    t = {};
  function o(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var l = (t[n] = { id: n, loaded: !1, exports: {} });
    return e[n].call(l.exports, l, l.exports, o), (l.loaded = !0), l.exports;
  }
  (o.m = e),
    (function () {
      o.amdO = {};
    })(),
    (function () {
      var e = [];
      o.O = function (t, n, i, l) {
        if (!n) {
          var a = 1 / 0;
          for (d = 0; d < e.length; d++) {
            (n = e[d][0]), (i = e[d][1]), (l = e[d][2]);
            for (var r = !0, s = 0; s < n.length; s++)
              (!1 & l || a >= l) &&
              Object.keys(o.O).every(function (e) {
                return o.O[e](n[s]);
              })
                ? n.splice(s--, 1)
                : ((r = !1), l < a && (a = l));
            if (r) {
              e.splice(d--, 1);
              var u = i();
              void 0 !== u && (t = u);
            }
          }
          return t;
        }
        l = l || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > l; d--) e[d] = e[d - 1];
        e[d] = [n, i, l];
      };
    })(),
    (function () {
      o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e["default"];
              }
            : function () {
                return e;
              };
        return o.d(t, { a: t }), t;
      };
    })(),
    (function () {
      o.d = function (e, t) {
        for (var n in t)
          o.o(t, n) &&
            !o.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      };
    })(),
    (function () {
      (o.f = {}),
        (o.e = function (e) {
          return Promise.all(
            Object.keys(o.f).reduce(function (t, n) {
              return o.f[n](e, t), t;
            }, [])
          );
        });
    })(),
    (function () {
      o.u = function (e) {
        return "js/" + e + ".658ba133.js";
      };
    })(),
    (function () {
      o.miniCssF = function (e) {
        return "css/" + e + ".37420e2f.css";
      };
    })(),
    (function () {
      o.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (function () {
      o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      };
    })(),
    (function () {
      var e = {},
        t = "4-todo:";
      o.l = function (n, i, l, a) {
        if (e[n]) e[n].push(i);
        else {
          var r, s;
          if (void 0 !== l)
            for (
              var u = document.getElementsByTagName("script"), d = 0;
              d < u.length;
              d++
            ) {
              var c = u[d];
              if (
                c.getAttribute("src") == n ||
                c.getAttribute("data-webpack") == t + l
              ) {
                r = c;
                break;
              }
            }
          r ||
            ((s = !0),
            (r = document.createElement("script")),
            (r.charset = "utf-8"),
            (r.timeout = 120),
            o.nc && r.setAttribute("nonce", o.nc),
            r.setAttribute("data-webpack", t + l),
            (r.src = n)),
            (e[n] = [i]);
          var f = function (t, o) {
              (r.onerror = r.onload = null), clearTimeout(h);
              var i = e[n];
              if (
                (delete e[n],
                r.parentNode && r.parentNode.removeChild(r),
                i &&
                  i.forEach(function (e) {
                    return e(o);
                  }),
                t)
              )
                return t(o);
            },
            h = setTimeout(
              f.bind(null, void 0, { type: "timeout", target: r }),
              12e4
            );
          (r.onerror = f.bind(null, r.onerror)),
            (r.onload = f.bind(null, r.onload)),
            s && document.head.appendChild(r);
        }
      };
    })(),
    (function () {
      o.r = function (e) {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      };
    })(),
    (function () {
      o.nmd = function (e) {
        return (e.paths = []), e.children || (e.children = []), e;
      };
    })(),
    (function () {
      o.p = "";
    })(),
    (function () {
      if ("undefined" !== typeof document) {
        var e = function (e, t, o, n, i) {
            var l = document.createElement("link");
            (l.rel = "stylesheet"), (l.type = "text/css");
            var a = function (o) {
              if (((l.onerror = l.onload = null), "load" === o.type)) n();
              else {
                var a = o && ("load" === o.type ? "missing" : o.type),
                  r = (o && o.target && o.target.href) || t,
                  s = new Error(
                    "Loading CSS chunk " + e + " failed.\n(" + r + ")"
                  );
                (s.code = "CSS_CHUNK_LOAD_FAILED"),
                  (s.type = a),
                  (s.request = r),
                  l.parentNode && l.parentNode.removeChild(l),
                  i(s);
              }
            };
            return (
              (l.onerror = l.onload = a),
              (l.href = t),
              o
                ? o.parentNode.insertBefore(l, o.nextSibling)
                : document.head.appendChild(l),
              l
            );
          },
          t = function (e, t) {
            for (
              var o = document.getElementsByTagName("link"), n = 0;
              n < o.length;
              n++
            ) {
              var i = o[n],
                l = i.getAttribute("data-href") || i.getAttribute("href");
              if ("stylesheet" === i.rel && (l === e || l === t)) return i;
            }
            var a = document.getElementsByTagName("style");
            for (n = 0; n < a.length; n++) {
              (i = a[n]), (l = i.getAttribute("data-href"));
              if (l === e || l === t) return i;
            }
          },
          n = function (n) {
            return new Promise(function (i, l) {
              var a = o.miniCssF(n),
                r = o.p + a;
              if (t(a, r)) return i();
              e(n, r, null, i, l);
            });
          },
          i = { 826: 0 };
        o.f.miniCss = function (e, t) {
          var o = { 408: 1 };
          i[e]
            ? t.push(i[e])
            : 0 !== i[e] &&
              o[e] &&
              t.push(
                (i[e] = n(e).then(
                  function () {
                    i[e] = 0;
                  },
                  function (t) {
                    throw (delete i[e], t);
                  }
                ))
              );
        };
      }
    })(),
    (function () {
      var e = { 826: 0 };
      (o.f.j = function (t, n) {
        var i = o.o(e, t) ? e[t] : void 0;
        if (0 !== i)
          if (i) n.push(i[2]);
          else {
            var l = new Promise(function (o, n) {
              i = e[t] = [o, n];
            });
            n.push((i[2] = l));
            var a = o.p + o.u(t),
              r = new Error(),
              s = function (n) {
                if (o.o(e, t) && ((i = e[t]), 0 !== i && (e[t] = void 0), i)) {
                  var l = n && ("load" === n.type ? "missing" : n.type),
                    a = n && n.target && n.target.src;
                  (r.message =
                    "Loading chunk " + t + " failed.\n(" + l + ": " + a + ")"),
                    (r.name = "ChunkLoadError"),
                    (r.type = l),
                    (r.request = a),
                    i[1](r);
                }
              };
            o.l(a, s, "chunk-" + t, t);
          }
      }),
        (o.O.j = function (t) {
          return 0 === e[t];
        });
      var t = function (t, n) {
          var i,
            l,
            a = n[0],
            r = n[1],
            s = n[2],
            u = 0;
          if (
            a.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (i in r) o.o(r, i) && (o.m[i] = r[i]);
            if (s) var d = s(o);
          }
          for (t && t(n); u < a.length; u++)
            (l = a[u]), o.o(e, l) && e[l] && e[l][0](), (e[l] = 0);
          return o.O(d);
        },
        n = (self["webpackChunk_4_todo"] = self["webpackChunk_4_todo"] || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var n = o.O(void 0, [998], function () {
    return o(8200);
  });
  n = o.O(n);
})();
//# sourceMappingURL=index.fbe566a1.js.map
