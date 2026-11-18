/* 补充：Python。X(章节id, 插在哪个知识点之后, 知识点) */
X("py1","py-str",{id:"py-strm",t:"字符串常用方法",s:"补充",d:"11-02",
one:"字符串自带很多“工具”：去空格、替换、拼接、查找、大小写。",
c:"s = \"  Hello World  \"\ns.strip()             # 'Hello World' 去两端空格\ns.replace(\"World\", \"AI\")\ns.lower(), s.upper()\n\"-\".join([\"a\", \"b\"])   # 'a-b'\n\"Wor\" in s            # True\ns.find(\"o\")           # 第一次出现的位置，找不到返回 -1",
x:"字符串**不可修改**：这些方法都返回一个新字符串，原来的不变，所以要写 `s = s.strip()`。"});
X("py1","py-list",{id:"py-listop",t:"列表常用操作",s:"补充",d:"11-02",
one:"增：append/insert；删：pop/remove；排序：sort/sorted；统计：len/sum/max/min。",
c:"a = [3, 1, 2]\na.insert(0, 9)    # [9, 3, 1, 2]\na.pop()           # 删掉并返回最后一个 2\na.remove(9)       # 按值删除\na.sort()          # 原地排序 [1, 3]\nb = sorted(a, reverse=True)  # 返回新列表\n2 in a            # 是否包含\nsum(a), max(a), len(a)",
w:"`a.sort()` 返回 None，写 `a = a.sort()` 会把列表弄丢。要新列表用 `sorted(a)`。"});
X("py1","py-listop",{id:"py-nested",t:"嵌套列表（二维数据）",s:"补充",d:"11-02",
one:"列表里放列表，就是表格：`m[行][列]`。",
c:"m = [[1, 2, 3],\n     [4, 5, 6]]\nm[1][2]      # 6\nlen(m)       # 2 行\nfor row in m:\n    print(row)",
x:"能表示矩阵，但做数学运算很慢、很麻烦，所以后面用 NumPy 数组代替。"});
X("py1","py-dict",{id:"py-tuple",t:"元组 tuple",s:"补充",d:"11-02",
one:"元组是不能修改的列表，用圆括号 `( )`。",
c:"p = (3, 4)\nx, y = p          # 解包：x=3, y=4\na, b = b, a       # 一行交换两个变量\nshape = (2, 3)    # NumPy 的 shape 就是元组",
x:"函数返回多个值时，其实返回的是一个元组。"});
X("py1","py-tuple",{id:"py-set",t:"集合 set",s:"补充",d:"11-02",
one:"集合里的元素不重复、没有顺序，适合去重和判断“在不在”。",
c:"s = set([1, 2, 2, 3])   # {1, 2, 3}\ns.add(4)\n3 in s                   # True，比列表查找快\na, b = {1, 2}, {2, 3}\na & b, a | b, a - b      # 交集 并集 差集"});
X("py1","py-bool",{id:"py-none",t:"None 与真假判断",s:"补充",d:"11-02",
one:"None 表示“什么都没有”；0、空字符串、空列表、None 在判断里都当作 False。",
c:"x = None\nif x is None:\n    print(\"还没赋值\")\nif []:          # 空列表为假，不会执行\n    print(\"不会打印\")"});
X("py1","py-none",{id:"py-io",t:"输入输出 input / print",s:"补充",d:"11-02",
one:"`input()` 读用户输入（永远是字符串），`print()` 输出到屏幕。",
c:"name = input(\"你的名字：\")\nage = int(input(\"年龄：\"))\nprint(\"你好\", name, sep=\"，\")\nprint(\"不换行\", end=\"\")",
x:"`+=` 是 `x = x + ...` 的简写，`-=`、`*=` 同理。"});
X("py2","py-for",{id:"py-zip",t:"enumerate 与 zip",s:"补充",d:"11-03",
one:"enumerate 同时拿到下标和元素；zip 把两个列表“拉链式”配对。",
c:"names = [\"a\", \"b\"]\nscores = [90, 80]\nfor i, n in enumerate(names):\n    print(i, n)\nfor n, s in zip(names, scores):\n    print(n, s)\nd = dict(zip(names, scores))  # {'a': 90, 'b': 80}"});
X("py2","py-zip",{id:"py-nestloop",t:"嵌套循环",s:"补充",d:"11-03",
one:"循环里套循环：外层走一步，内层走完一整圈。",
c:"for i in range(1, 10):\n    for j in range(1, i + 1):\n        print(f\"{j}×{i}={i*j}\", end=\" \")\n    print()",
x:"处理二维数据（表格、图片像素）时常用。层数越多越慢，NumPy 能替代大部分嵌套循环。"});
X("py2","py-func",{id:"py-ret",t:"返回多个值与参数传递",s:"补充",d:"11-03",
one:"`return a, b` 一次返回多个值；调用时可以按位置传，也可以按名字传。",
c:"def stats(lst):\n    return min(lst), max(lst)\nlo, hi = stats([3, 1, 4])\n\ndef train(lr=0.01, epochs=10):\n    ...\ntrain(epochs=5)          # 关键字参数，顺序随意",
w:"默认参数不要用可变对象（如 `def f(a=[])`），多次调用会共用同一个列表。"});
X("py2","py-ret",{id:"py-args",t:"*args 与 **kwargs",s:"补充",d:null,
one:"`*args` 收集任意多个位置参数成元组，`**kwargs` 收集任意多个关键字参数成字典。",
c:"def f(*args, **kwargs):\n    print(args, kwargs)\nf(1, 2, lr=0.1)   # (1, 2) {'lr': 0.1}\n\nx = (2, 3)\nnp.zeros(x)       # 也可写 np.zeros(*[x])",
x:"读框架源码时经常见到，先能看懂即可。"});
X("py2","py-args",{id:"py-scope",t:"变量作用域",s:"补充",d:"11-03",
one:"函数里新建的变量只在函数里有效（局部变量），函数外面看不到。",
c:"x = 10\ndef f():\n    x = 5      # 新的局部 x，不影响外面\n    return x\nf(); print(x)  # 10",
x:"想在函数里改外面的变量，要声明 `global x`，但尽量别这么做，用参数和返回值传数据更清楚。"});
X("py2","py-scope",{id:"py-lambda",t:"lambda 匿名函数",s:"补充",d:null,
one:"一行写完的小函数：`lambda 参数: 表达式`。",
c:"sq = lambda x: x ** 2\nsq(3)   # 9\nwords = [\"apple\", \"hi\", \"cat\"]\nsorted(words, key=lambda w: len(w))  # 按长度排序",
x:"鱼书里用 `f = lambda W: net.loss(x, t)` 把损失包成函数，再交给数值微分。"});
X("py2","py-lambda",{id:"py-builtin",t:"常用内置函数",s:"补充",d:"11-03",
one:"不用 import 就能用：len、sum、max、min、abs、round、sorted、range、type、isinstance。",
c:"round(3.14159, 2)       # 3.14\nabs(-5)                 # 5\nisinstance(3, int)      # True\nmax([3, 7, 2])          # 7\nlist(range(3))          # [0, 1, 2]"});
X("py2","py-comp",{id:"py-recur",t:"递归",s:"补充",d:null,
one:"函数调用自己，把大问题变成同类的小问题，必须有“出口”（停止条件）。",
c:"def fact(n):\n    if n == 1:        # 出口\n        return 1\n    return n * fact(n - 1)",
x:"决策树的构建就是递归：先分根节点，再对左右子树做同样的事。"});
X("py3","py-class",{id:"py-inherit",t:"继承与 super()",s:"补充",d:null,
one:"子类继承父类的全部功能，再增加或改写自己的部分。",
c:"class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):          # 改写\n        return \"汪\"\n\nclass Net(nn.Module):        # PyTorch 就是这样用\n    def __init__(self):\n        super().__init__()    # 先执行父类的初始化",
x:"PyTorch 每个网络都继承 `nn.Module`，所以自动拥有 `parameters()`、`to()` 等功能。"});
X("py3","py-inherit",{id:"py-magic",t:"特殊方法 __xxx__",s:"补充",d:null,
one:"前后带双下划线的方法让对象支持 Python 的内置语法，如 `len(obj)`、`obj(x)`。",
c:"class Layer:\n    def __call__(self, x):   # 让对象能像函数一样调用\n        return self.forward(x)\n    def forward(self, x):\n        return x * 2\nlayer = Layer()\nlayer(3)   # 6",
x:"PyTorch 里写 `model(x)` 能运行，就是因为 `nn.Module` 定义了 `__call__`，它会去调用你写的 `forward`。"});
X("py3","py-module",{id:"py-main",t:"if __name__ == \"__main__\"",s:"补充",d:null,
one:"这行下面的代码只在“直接运行这个文件”时执行，被别的文件 import 时不执行。",
c:"def main():\n    print(\"训练开始\")\n\nif __name__ == \"__main__\":\n    main()",
x:"写好的函数既能自己测试运行，又能被别人导入复用。"});
X("py3","py-main",{id:"py-pip",t:"安装包：pip 与 Anaconda",s:"鱼书 1.2",d:"11-02",
one:"`pip install 包名` 安装第三方库；Anaconda 是一次装好 Python + NumPy + Matplotlib 的发行版。",
c:"pip install numpy matplotlib\npip install torch\npip list            # 看已安装的包\n# Colab 里在命令前加 !\n!pip install xgboost",
x:"鱼书推荐 Anaconda。用 Colab 的话大部分常用库已经装好。"});
X("py3","py-pip",{id:"py-path",t:"文件路径与 sys.path",s:"鱼书代码",d:"11-21",
one:"Python 按 sys.path 列出的文件夹找模块；鱼书代码开头的 `sys.path.append(os.pardir)` 就是把上一级目录加进去。",
c:"import sys, os\nsys.path.append(os.pardir)   # 上一级目录\nfrom dataset.mnist import load_mnist",
w:"运行鱼书代码要先 `cd` 到对应章节的文件夹，否则会找不到 dataset、common 这些模块。"});
X("py3","py-file",{id:"py-pickle",t:"pickle：保存 Python 对象",s:"鱼书 3.6",d:"11-19",
one:"pickle 能把任意 Python 对象（字典、数组、模型参数）原样存成文件，下次直接读回。",
c:"import pickle\nwith open(\"params.pkl\", \"wb\") as f:\n    pickle.dump(params, f)\nwith open(\"sample_weight.pkl\", \"rb\") as f:\n    network = pickle.load(f)",
x:"鱼书 3.6 用它加载训练好的权重。注意是二进制模式 `wb`/`rb`。"});
X("py4","np-create",{id:"np-astype",t:"数据类型转换 astype",s:"补充",d:"11-16",
one:"`x.astype(np.float32)` 把数组转换成另一种类型。",
c:"y = np.array([True, False])\ny.astype(int)          # [1 0]\nimg.astype(np.float32) / 255.0   # 像素归一化",
x:"鱼书阶跃函数就用 `(x > 0).astype(np.int)` 把布尔变成 0/1（新版 NumPy 写 `int`）。"});
X("py4","np-axis",{id:"np-stat",t:"统计函数",s:"补充",d:"11-17",
one:"max、min、mean、std、var、argmax、argmin、sum 都能按 axis 计算。",
c:"x = np.array([3, 1, 4, 1, 5])\nx.mean(), x.std(), x.var()\nx.argmax()             # 4，最大值的下标\nnp.sqrt(x), np.abs(x), np.log(x)",
x:"`np.sum(x)` 和 `x.sum()` 一样。不要对 NumPy 数组用 Python 自带的 `sum()`，多维时结果不对还很慢。"});
X("py4","np-stat",{id:"np-random",t:"随机数与随机种子",s:"鱼书 4.2.3",d:"11-17",
one:"np.random 生成随机数；设了 seed，每次运行结果都一样，实验才能复现。",
c:"np.random.seed(0)\nnp.random.rand(3)            # 0–1 均匀分布\nnp.random.randn(2, 3)        # 标准正态\nnp.random.choice(60000, 10)  # 随机抽 10 个下标\nnp.random.permutation(5)     # 打乱 0–4"},);
X("py4","np-random",{id:"np-where",t:"np.where 与条件选择",s:"补充",d:null,
one:"`np.where(条件, A, B)`：条件为真取 A，否则取 B，逐元素进行。",
c:"x = np.array([-2, 3, -1])\nnp.where(x > 0, x, 0)     # [0 3 0]  就是 ReLU\nnp.where(x > 0)           # 返回满足条件的下标"});
X("py4","np-reshape",{id:"np-concat",t:"拼接与堆叠",s:"补充",d:null,
one:"concatenate 沿已有的维度接起来，stack 新建一个维度叠起来。",
c:"a = np.array([1, 2]); b = np.array([3, 4])\nnp.concatenate([a, b])   # [1 2 3 4]\nnp.stack([a, b])         # [[1 2] [3 4]]  形状 (2, 2)\nnp.vstack, np.hstack     # 竖着拼、横着拼"});
X("py4","np-concat",{id:"np-copy",t:"视图与复制",s:"补充",d:"11-17",
one:"切片得到的是原数组的“视图”，改它会改到原数组；要独立的一份用 `.copy()`。",
c:"a = np.array([1, 2, 3])\nb = a[:2]\nb[0] = 99\nprint(a)       # [99  2  3] 原数组也变了\nc = a.copy()   # 独立副本",
w:"鱼书 ReLU 层写 `out = x.copy()` 就是为了不改动输入 x。"});
X("py4","np-copy",{id:"np-norm",t:"范数与距离",s:"补充",d:null,
one:"`np.linalg.norm(x)` 求向量长度；两个向量相减再求范数就是距离。",
c:"x = np.array([3, 4])\nnp.linalg.norm(x)          # 5.0\nnp.linalg.norm(a - b)      # 欧氏距离",
x:"K-means 找最近中心、人脸识别比较相似度、L2 正则化都要用到。"});
X("py4","np-norm",{id:"np-nditer",t:"逐个遍历多维数组",s:"鱼书 4.4",d:"11-21",
one:"`np.nditer` 能按顺序访问多维数组的每个元素，鱼书的数值梯度函数就靠它。",
c:"it = np.nditer(W, flags=['multi_index'])\nwhile not it.finished:\n    idx = it.multi_index    # 例如 (0, 1)\n    ...                     # 对 W[idx] 做微小改动\n    it.iternext()"});
X("py5","plt-img",{id:"plt-sub",t:"多张子图 subplot",s:"补充",d:"11-18",
one:"`plt.subplot(行, 列, 第几个)` 在一张图里排多个小图。",
c:"for i in range(6):\n    plt.subplot(2, 3, i + 1)\n    plt.imshow(x_train[i].reshape(28, 28), cmap=\"gray\")\n    plt.axis(\"off\")\nplt.show()"});
X("py5","plt-sub",{id:"plt-scatter",t:"散点图与直方图",s:"鱼书 6.2",d:"11-18",
one:"scatter 画数据点，hist 画数值分布。",
c:"plt.scatter(x, y, c=labels)     # 按类别上色\nplt.hist(activations.flatten(), bins=30, range=(0, 1))\nplt.ylim(0, 1)                    # 设定坐标范围",
x:"鱼书 6.2 用直方图看每层激活值的分布，判断初始化好不好。"});
NC("py","py5",{id:"pygit",t:"Git 与 GitHub：管理代码",s:"计划 W3",topics:[
{id:"git-why",t:"为什么要用 Git",s:"Git",d:null,
one:"Git 记录代码的每一次修改，改坏了可以回到以前任何一个版本；GitHub 是放代码的网站。",
x:"像游戏存档：每完成一步就存一次档。GitHub 还能展示你的作品，申请暑研和读博时是很好的证明。"},
{id:"git-basic",t:"四个最常用命令",s:"Git",d:null,
one:"add 选要存的文件，commit 存档，push 上传到 GitHub，pull 下载最新版本。",
c:"git init                      # 新建仓库\ngit add train.py              # 选文件\ngit commit -m \"加入训练代码\"   # 存档并写说明\ngit push                      # 上传\ngit pull                      # 拉取\ngit status / git log          # 看状态、看历史",
x:"commit 说明写清楚“改了什么”，以后找起来方便。"},
{id:"git-ignore",t:".gitignore",s:"Git",d:null,
one:"列出不想上传的文件：大数据集、模型权重、密码文件、缓存。",
c:"# .gitignore\n__pycache__/\n*.pkl\ndata/\n.env"},
{id:"git-branch",t:"分支与 Pull Request",s:"Git",d:null,
one:"分支是在不影响主线的情况下做实验；做好后用 Pull Request 申请合并回主线。",
c:"git checkout -b new-idea   # 新建并切到分支\n# ... 修改、commit ...\ngit checkout main          # 回主线",
x:"这个教科书网站就是先推到一个分支，再由你点 Merge 合并的。"}
]});
