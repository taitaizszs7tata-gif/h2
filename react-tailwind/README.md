# H2 Architecture AI

这是 H2 Architecture AI 的当前产品项目。后续所有开发必须先阅读本文件和 `DESIGN.md`，再修改页面或组件。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Radix UI / shadcn 风格组件
- lucide-react
- react-hook-form + zod

更完整的可复用技术规范见：

- `../archboard-design-system/TECH_DEVELOPMENT.md`
- `../archboard-design-system/DESIGN.md`
- `../archboard-design-system/ROUTES.md`
- `../archboard-design-system/USER_FLOW_LOCK.md`

## 开发命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

交付前必须至少确认：

```bash
npm run build
```

## 当前主流程

本项目主流程禁止被简化：

```text
登录
  -> 项目列表
  -> 选择项目
  -> 项目工作区
  -> AI 协同画布分类
  -> 公共/个人画布大厅
  -> 画布详情
```

任何新增功能都不能跳过这些中间页。尤其禁止：

- 登录后直接进入画布详情。
- 选择项目后直接进入画布详情。
- 点击顶部 `AI 协同画布` 后直接进入详情。
- 画布详情返回到错误页面。
- 删除公共/个人画布大厅。

## AI 修改规则

AI 或开发者修改代码时必须遵守：

1. 不改变既有页面跳转层级，除非用户明确要求。
2. 不为了省事删除中间页、状态页、画布大厅或返回按钮。
3. 不新增一套不一致的按钮、卡片、输入框、面板样式。
4. 优先复用 `components/ui` 和 `../archboard-design-system/components/ui` 的组件规则。
5. 新增视觉样式前，先检查 `DESIGN.md` 是否已有 token 或组件。
6. 修改登录、项目列表、画布大厅、画布详情时，必须重新检查完整主流程。
7. 只修改用户要求的范围，不做无关重构。

## 目录说明

```text
app/
  page.tsx              # 登录/项目/工作区的主状态入口
  projects/page.tsx     # 项目页入口
components/
  app/                  # 项目列表、工作区、画布大厅、AI 聊天
  flora/                # 登录、画布详情嵌入等产品组件
  ui/                   # 基础 UI 组件
lib/
  mock-data.ts          # 原型数据
  types.ts              # 主业务类型
  utils.ts              # 工具函数
```

## 文档优先级

当代码实现和文档冲突时：

1. 用户当前明确要求优先。
2. `react-tailwind/DESIGN.md` 优先于通用设计系统文档。
3. `../archboard-design-system/*` 作为复用规范和参考。
4. 如果要改变主流程，必须先更新 `DESIGN.md` 并说明原因。
