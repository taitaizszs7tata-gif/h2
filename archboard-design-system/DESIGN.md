# H2 Architecture AI Design System

## 目标

这套设计系统用于约束后续新项目：页面必须复用已有 token 和 `components/ui` 组件，禁止在业务页面继续手写重复按钮、卡片、输入框、面板、导航和画布控制样式。

## 不可变规则

1. 新页面必须先引入 `tokens/globals.css`。
2. 业务页面不得直接新增 raw hex 颜色，除非是在 token 文件里扩展。
3. 按钮统一使用 `DSButton`。
4. 项目卡片、画布卡片、素材卡片统一使用 `DSCard`、`DSMediaCard`、`DSEmptyCard`。
5. 输入框统一使用 `DSTextField`、`DSSearchField`。
6. 侧栏、协作者面板、浮层面板统一使用 `DSPanel`。
7. 顶部导航、工作区导航统一使用 `DSAppShell`、`DSTopNav`、`DSNavTab`。
8. 画布详情可以嵌入外部画布实现，但顶部导航和返回层级必须遵守 `ROUTES.md` 与 `USER_FLOW_LOCK.md`。

## 视觉提取

从当前页面和组件中提取到的重复视觉规则：

- 背景：主背景 `#ffffff`，侧栏/轻面板 `#fafafa`。
- 文本：主文字 `#111111`，次级文字 `#555555`，弱提示 `#777777`。
- 控件：默认浅灰 `#eeeeee`，激活 `#ededed`，hover `#f0f0f0`。
- 边框：页面分隔 `#e5e5e5`，控件边框 `#dddddd`。
- 主按钮：黑底白字，hover 到 `#333333`。
- 品牌头像块：橙红 `#ff4b2f`。
- 状态点：成功/在线使用 emerald，通知/协作提示使用 rose。
- 布局：顶部导航 56px，左侧栏 260px，画布详情占据剩余视窗高度。
- 圆角：普通控件 8px，卡片 12px，工作区按钮 14px，搜索/状态 pill 使用 999px。

## Token 命名

颜色、尺寸、阴影、圆角必须优先使用 `--ds-*` token：

- `--ds-surface`
- `--ds-surface-subtle`
- `--ds-control`
- `--ds-control-active`
- `--ds-control-hover`
- `--ds-ink`
- `--ds-ink-muted`
- `--ds-ink-subtle`
- `--ds-border`
- `--ds-border-strong`
- `--ds-brand`
- `--ds-success`
- `--ds-danger`
- `--ds-topbar-height`
- `--ds-sidebar-width`
- `--ds-radius-control`
- `--ds-radius-card`
- `--ds-radius-workspace`
- `--ds-shadow-control`
- `--ds-shadow-card`

## 组件使用矩阵

| 场景 | 必用组件 |
| --- | --- |
| 主操作按钮 | `DSButton variant="primary"` |
| 次级按钮/边框按钮 | `DSButton variant="secondary"` |
| 图标按钮 | `DSButton variant="icon"` |
| 顶部导航 tab | `DSNavTab` |
| 搜索 | `DSSearchField` |
| 账号/密码/普通文本输入 | `DSTextField` |
| 项目/画布/素材图片卡 | `DSMediaCard` |
| 新建卡片 | `DSEmptyCard` |
| 右侧协作者面板 | `DSPanel` |
| 分区标题小绿点 | `DSSectionLabel` |
| 应用顶部壳 | `DSAppShell` + `DSTopNav` |

## 禁止模式

- 禁止在业务页面新写 `bg-[#...]`、`text-[#...]`、`border-[#...]`。
- 禁止重复写整段按钮 class。
- 禁止新建和现有视觉不一致的圆角、阴影、边框。
- 禁止为了直达画布详情跳过项目选择、公共/个人画布大厅。
- 禁止新增营销型 hero 或装饰性大卡片替代工作台界面。

## 新增组件流程

1. 先确认现有 `components/ui` 是否能组合完成。
2. 如果必须新增组件，先在 token 层确认没有新增颜色/圆角/阴影。
3. 新组件必须放在 `components/ui`。
4. 新组件必须在 `examples/refactor-map.md` 或项目文档里补充使用场景。
5. 修改后跑 `UI_CONSISTENCY_CHECKLIST.md`。

## 验收标准

- 页面视觉和当前项目保持一致。
- 新页面没有散落 raw visual values。
- 主流程没有跳过中间页。
- 所有可点击控件有清晰 hover/disabled/focus 状态。
- 文案和布局在桌面宽屏、常规笔记本宽度下不重叠。
