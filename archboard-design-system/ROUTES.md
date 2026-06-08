# Routes And Navigation

## 当前项目路由

| 层级 | 路由或状态 | 页面/组件 | 说明 |
| --- | --- | --- | --- |
| 1 | `/` | `FloraSignIn` | 登录页。登录成功后进入 `/projects`。 |
| 2 | `/projects` | `ProjectSelection` | 项目列表页。用户选择一个已接受邀请的项目。 |
| 3 | `/projects` + `workspace` 状态 | `MainWorkspace` | 项目工作区。顶部导航保持可见。 |
| 4 | `activeTab="canvas"` + `canvasSubview="categories"` | `CanvasCategories` | AI 协同画布分类页。 |
| 5 | `activeTab="canvas"` + `canvasSubview="lobby"` | `CanvasLobby` | 公共/个人画布大厅。 |
| 6 | `activeTab="canvas"` + `canvasSubview="detail"` | `CanvasDetail` / embedded canvas | 画布详情页。 |

## 固定跳转层级

```text
登录
  -> 项目列表
  -> 选择项目
  -> 项目工作区
  -> AI 协同画布分类
  -> 公共/个人画布大厅
  -> 画布详情
```

## 返回规则

- 画布详情返回：回到画布大厅。
- 画布大厅返回：回到画布分类。
- 退出工作区：回到登录或项目入口，不能保留半截状态。
- 顶部导航切换 tab 时，不能自动跳过画布分类/大厅进入详情。

## 新项目路由建议

如果以后把状态路由拆成真实 URL，推荐仍保留层级：

```text
/login
/projects
/projects/:projectId
/projects/:projectId/canvas
/projects/:projectId/canvas/:categoryId
/projects/:projectId/canvas/:categoryId/:boardId
```

真实 URL 可以变化，但层级不能少。
