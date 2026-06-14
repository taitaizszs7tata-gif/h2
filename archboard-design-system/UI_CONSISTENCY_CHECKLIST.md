# UI Consistency Checklist

每次新增页面、组件或流程时，逐项检查：

- [ ] 页面已引入 `tokens/globals.css`。
- [ ] 业务页面没有新增 raw hex 颜色。
- [ ] 按钮使用 `DSButton`。
- [ ] 搜索框使用 `DSSearchField`。
- [ ] 普通输入框使用 `DSTextField`。
- [ ] 卡片使用 `DSCard`、`DSMediaCard` 或 `DSEmptyCard`。
- [ ] 侧栏/右栏/浮层使用 `DSPanel`。
- [ ] 分区标题使用 `DSSectionLabel`。
- [ ] 顶部导航高度保持 `--ds-topbar-height`。
- [ ] 左侧栏宽度保持 `--ds-sidebar-width`，除非该页面没有侧栏。
- [ ] 主流程没有跳过项目列表、选择项目、公共/个人画布大厅。
- [ ] 画布详情返回到画布大厅。
- [ ] 文本在窄屏和宽屏都不重叠。
- [ ] hover、disabled、focus-visible 状态存在且和系统一致。
- [ ] 新增 token 已写入 `DESIGN.md` 并说明使用场景。
