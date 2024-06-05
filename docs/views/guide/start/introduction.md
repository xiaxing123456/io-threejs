# 简介
## 什么是io-threejs?
io-threejs 是一款用于构建三维云渲染场景的对象API。 它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套简单高效的接口，帮助你高效地开发三维云渲染场景。

下面是一个最基本的示例：

```html
<div class="box" style="width: 100vw;height: 100vh;">
    <canvas class="webgl"></canvas>
</div>

```
```ts
import { createCloud } from 'io-threejs'

const canvas = document.querySelector('canvas.webgl')
const box = document.querySelector('div.box')

const cloud = new createCloud(box, canvas)

```
没错就是这么简单，只需要短短几行代码你就创建出来了一个三维场景。
