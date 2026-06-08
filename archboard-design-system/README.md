# ArchBoard Design System Export

这是从当前 `react-tailwind` 项目提取出来的独立设计系统包。它不会接入或修改原项目，目标是给以后新项目复用。

## 使用方式

1. 将 `tokens/globals.css` 引入新项目的全局样式入口。
2. 将 `components/ui` 复制到新项目的统一组件库目录。
3. 新页面只能通过 `tokens` 和 `components/ui` 组合，不允许在业务页面继续散落新的颜色、圆角、阴影和控件样式。
4. 按 `ROUTES.md` 和 `USER_FLOW_LOCK.md` 固定页面层级，不能省略登录、项目列表、画布大厅等中间页。
5. 如果作为独立包使用，安装依赖后运行 `npm run check` 做类型检查。

## 包内容

- `DESIGN.md`: 设计系统约束和开发规则。
- `ROUTES.md`: 页面路由、状态路由和跳转层级。
- `USER_FLOW_LOCK.md`: 主流程锁定，不允许后续开发跳过中间页。
- `UI_CONSISTENCY_CHECKLIST.md`: 每次新增/修改 UI 前后的检查清单。
- `tokens/globals.css`: 可直接引入的 CSS variables + Tailwind v4 `@theme inline` token。
- `tokens/tokens.ts`: 给非 CSS 场景使用的 token 常量。
- `components/ui`: 可复制到其他项目的按钮、卡片、输入框、面板和应用框架组件。
- `examples/refactor-map.md`: 当前项目重复样式到统一组件的替换映射。

## 设计原则

当前视觉效果是白底、黑字、浅灰边框、紧凑型工作台布局。这个包只固化这些规则，不重新设计视觉。
