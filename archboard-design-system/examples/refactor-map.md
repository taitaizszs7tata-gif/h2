# Refactor Map

这个文件说明如何把当前项目里重复出现的视觉样式迁移到独立设计系统组件。当前任务不会自动改原项目代码；这是给未来项目或后续迁移使用的映射。

## 搜索框

当前重复样式：

```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]" />
  <input className="w-full h-11 pl-11 pr-4 bg-[#eeeeee] border border-[#d5d5d5] rounded-[999px] ..." />
</div>
```

替换：

```tsx
<DSSearchField icon={<Search className="h-4 w-4" />} placeholder="Search" />
```

## 主按钮

当前重复样式：

```tsx
<button className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#111111] text-white ...">
```

替换：

```tsx
<DSButton variant="primary" className="h-10 rounded-[var(--ds-radius-card)]">
```

## 次级按钮

当前重复样式：

```tsx
<button className="px-3 py-1.5 rounded-lg border border-[#dddddd] text-[12px] text-[#111111] hover:bg-[#f3f3f3]">
```

替换：

```tsx
<DSButton variant="secondary" size="sm">
```

## 图片卡片

当前重复样式：

```tsx
<div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#eeeeee] border border-[#dddddd]">
  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
```

替换：

```tsx
<DSMediaCard image={coverImage} alt={name}>
  <DSCardMeta>
    <DSCardTitle>{name}</DSCardTitle>
    <DSCardDescription>{description}</DSCardDescription>
  </DSCardMeta>
</DSMediaCard>
```

## 新建卡片

当前重复样式：

```tsx
<div className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-[#e5e5e5] bg-white ...">
```

替换：

```tsx
<DSEmptyCard>
  ...
</DSEmptyCard>
```

## 侧栏和右栏面板

当前重复样式：

```tsx
<aside className="w-[260px] border-r border-[#e5e5e5] bg-[#fafafa] flex flex-col">
```

替换：

```tsx
<DSSidebar>
```

右侧协作者面板：

```tsx
<DSCollaboratorPanel>
```

## 分区标题

当前重复样式：

```tsx
<div className="flex items-center gap-2 mb-4">
  <div className="w-2 h-2 rounded-full bg-emerald-500" />
  <span className="text-[13px] text-[#111111] uppercase tracking-[0.02em]">...</span>
</div>
```

替换：

```tsx
<DSSectionLabel>...</DSSectionLabel>
```
