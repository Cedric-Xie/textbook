/* 详细讲解：类、模块、文件、NumPy、Matplotlib、Git、怎么写代码 */
D("py-class",{a:"类是一张“学生登记表”的模板，上面有姓名、成绩这些空格；对象是按模板填好的一张张具体的表。self 就是“这张表本身”，方法里写 self.name，意思是“我这张表上的姓名”。",
s:["class 类名: 定义一个类，类名习惯首字母大写。","__init__ 是创建对象时自动执行的“初始化”方法，用来填初始数据。","self.属性 = 值：把数据存到这个对象身上。","方法就是写在类里的函数，第一个参数永远是 self。","创建对象：s = Student('小明')，Python 自动把 s 当作 self 传进去。","调用方法：s.add(90)，等价于 Student.add(s, 90)。"],
ex:"class Student:\n    def __init__(self, name):\n        self.name = name\n        self.scores = []\n    def add(self, s):\n        self.scores.append(s)\na = Student('小明'); b = Student('小红')\na.add(90)\na.scores → [90]，b.scores → []（两张表互不影响）"});
D("py-inherit",{a:"子类像“在父母基础上长大的孩子”：父母会的（方法）孩子天生就会，孩子还可以学新本事，或者用自己的方式做同一件事（改写）。super() 是“先按父母的方式做一遍”。",
s:["class Dog(Animal): 表示 Dog 继承 Animal。","子类自动拥有父类的所有属性和方法。","在子类里写一个同名方法，就会覆盖父类的版本（改写）。","super().__init__(...) 调用父类的初始化，让父类的属性也被设置好。","PyTorch 里每个网络都继承 nn.Module，所以开头一定要写 super().__init__()。"],
ex:"class Animal:\n    def __init__(self, name): self.name = name\n    def speak(self): return '...'\nclass Dog(Animal):\n    def speak(self): return self.name + '：汪'\nd = Dog('旺财')\nd.speak() → '旺财：汪'\nd.name 能用，因为 __init__ 从 Animal 继承来了。"});
D("py-magic",{a:"特殊方法像给对象装上“接口插座”：装了 __len__，len() 就能插进来用；装了 __call__，对象就能像函数一样被“调用”。你写的类就能和 Python 自带的语法无缝配合。",
s:["__init__：创建对象时调用。","__call__：写 obj(x) 时调用。PyTorch 的 model(x) 就是靠它，内部再调用 forward。","__len__：len(obj) 时调用。","__getitem__：obj[i] 时调用。Dataset 就是靠它让 DataLoader 按下标取数据。","__repr__：print(obj) 时显示的内容。","这些方法一般不自己直接调用，而是让 Python 在对应语法时自动调用。"],
ex:"class MyData:\n    def __init__(self, xs): self.xs = xs\n    def __len__(self): return len(self.xs)\n    def __getitem__(self, i): return self.xs[i] * 10\nd = MyData([1, 2, 3])\nlen(d) → 3\nd[1] → 20"});
D("py-module",{a:"模块像工具箱。import numpy as np 是把整个 NumPy 工具箱搬来，并贴上简称 np；from math import sqrt 是只从数学工具箱里拿出开方这一把工具。",
s:["import 模块名：导入整个模块，用时写 模块名.函数。","import 模块名 as 简称：起个短名字，如 np、plt、pd。","from 模块 import 函数：只导入某个函数，用时直接写函数名。","自己写的 utils.py 放在同一个文件夹里，就能 import utils。","尽量不要写 from 模块 import *，会分不清函数从哪来，还可能覆盖同名函数。"],
ex:"import math\nmath.sqrt(16) → 4.0\nfrom math import sqrt, pi\nsqrt(16) → 4.0，pi → 3.14159…\n同一个文件夹里有 my_tools.py，里面有 def add(a, b)\nimport my_tools → my_tools.add(1, 2) → 3"});
D("py-main",{a:"一个 .py 文件有两种身份：被“直接运行”时它是主角，被别人 import 时它是“工具箱”。这句判断就是在问“我现在是主角吗？”，是主角才去执行训练、打印这些主流程。",
s:["每个文件都有一个自动变量 __name__。","直接运行 python a.py 时，a.py 里的 __name__ 等于 '__main__'。","被别的文件 import a 时，a.py 里的 __name__ 等于 'a'。","所以 if __name__ == '__main__': 下面的代码只在直接运行时执行。","好处：同一个文件既能当脚本运行，又能被 import 复用里面的函数，不会一导入就开始训练。"],
ex:"tools.py：\ndef add(a, b): return a + b\nif __name__ == '__main__':\n    print(add(1, 2))\npython tools.py → 打印 3\n在 main.py 里 import tools → 什么也不打印，只是能用 tools.add"});
D("py-pip",{a:"pip 像手机的应用商店：pip install 名字 就是下载安装一个 App。Anaconda 像一台预装了常用 App 的新手机，开机就能用 NumPy、Matplotlib。",
s:["在终端（不是 Python 里）运行：pip install numpy。","pip list 看装了哪些包；pip show 包名 看版本。","pip install -U 包名 升级。","在 Jupyter / Colab 的格子里要加感叹号：!pip install 包名。","import 报 ModuleNotFoundError 时，通常就是没装，或者装到了另一个 Python 环境里。"],
ex:"import torch → ModuleNotFoundError: No module named 'torch'\n解决：在终端运行 pip install torch\nColab 里：!pip install torch\n再 import torch 就成功了。"});
D("py-path",{a:"Python 找模块像你找钥匙：只在几个固定的地方翻（sys.path 列表里的文件夹）。鱼书的代码在 ch03 文件夹里，而 dataset 文件夹在上一级，所以要先把上一级加进“找钥匙的地方”。",
s:["import 时，Python 依次在 sys.path 里的每个文件夹找同名的 .py 文件或文件夹。","sys.path 默认包含：当前脚本所在的文件夹、Python 安装的库目录。","os.pardir 就是 '..'，表示上一级目录。","sys.path.append(os.pardir) 把上一级目录加进搜索列表。","之后 from dataset.mnist import load_mnist 才能找到 ../dataset/mnist.py。"],
ex:"文件结构：\ndeep-learning-from-scratch/\n├── dataset/mnist.py\n└── ch03/neuralnet_mnist.py\n在 ch03 里直接 from dataset.mnist import … → 找不到\n先 sys.path.append('..') → 能找到了\n注意：要在 ch03 文件夹里运行，相对路径才对。"});
D("py-file",{a:"with open() 像借书：借出（打开）、看或写、自动归还（关闭）。with 保证就算中途出错，书也一定会还回去。json 是一种通用的“书写格式”，把列表和字典写成文本，下次能原样读回。",
s:["open(文件名, 模式, encoding='utf-8')：'r' 读，'w' 写（会清空），'a' 追加。","with ... as f: 缩进结束时自动关闭文件。","读：f.read() 读全部；for line in f: 一行行读。","写：f.write('内容\\n')，记得自己加换行。","json.dump(数据, f, ensure_ascii=False) 保存；json.load(f) 读回。中文要加 ensure_ascii=False 才不会变成乱码。"],
ex:"import json\nnotes = {'ML 1-1': '监督学习有标签'}\nwith open('notes.json', 'w', encoding='utf-8') as f:\n    json.dump(notes, f, ensure_ascii=False)\nwith open('notes.json', encoding='utf-8') as f:\n    back = json.load(f)\nback['ML 1-1'] → '监督学习有标签'"});
D("py-pickle",{a:"json 只能存“通用格式”的东西（数字、文字、列表、字典），pickle 像真空压缩袋，任何 Python 对象（包括 NumPy 数组、自己写的类）都能原样压进去，打开还是原来的样子。",
s:["保存：with open('x.pkl', 'wb') as f: pickle.dump(对象, f)。注意是 'wb'（二进制写）。","读取：with open('x.pkl', 'rb') as f: 对象 = pickle.load(f)。","鱼书的 sample_weight.pkl 就是训练好的权重字典，读出来直接能用。","pickle 文件只有 Python 能读，不同版本之间偶尔不兼容。","安全提醒：不要打开来路不明的 .pkl 文件，加载时可能执行恶意代码。"],
ex:"import pickle, numpy as np\nparams = {'W1': np.ones((2, 3)), 'b1': np.zeros(3)}\nwith open('params.pkl', 'wb') as f: pickle.dump(params, f)\nwith open('params.pkl', 'rb') as f: p = pickle.load(f)\np['W1'].shape → (2, 3)"});
D("py-except",{a:"try / except 像走钢丝时下面挂的安全网：上面（try）正常走，一旦掉下来（出错），网（except）接住你，告诉你怎么处理，而不是直接摔死（程序崩溃）。",
s:["把可能出错的代码放进 try:。","出错时跳到对应的 except 错误类型: 执行处理代码，程序继续往下走。","可以写多个 except 处理不同错误：ValueError（值不对）、KeyError（键不存在）、FileNotFoundError（找不到文件）等。","else：没出错时执行；finally：不管出没出错都执行。","不要写空的 except: pass，它会把所有错误都吞掉，出了问题你也不知道。"],
ex:"while True:\n    try:\n        n = int(input('金额：'))\n        break\n    except ValueError:\n        print('请输入数字')\n用户输入 abc → int('abc') 出错 → 打印“请输入数字”，再问一次\n用户输入 25 → 成功，break 跳出"});
D("np-why",{a:"用 Python 列表算一百万个数的平方，像一个人拿计算器按一百万次；用 NumPy，像把整张表交给一台机器一次性算完。NumPy 底层是用 C 语言写的，而且数据在内存里紧挨着放，所以快得多。",
s:["Python 的 for 循环每一步都要检查类型、解释执行，很慢。","NumPy 数组里所有元素类型相同、连续存放，计算交给编译好的 C 代码一次完成。","写法也更简单：x * 2 就是每个元素乘 2，不用写循环。","神经网络的计算就是大量矩阵运算，所以鱼书从第 1 章就开始用 NumPy。","PyTorch 的张量用法和 NumPy 几乎一样，学会 NumPy 就学会了一大半。"],
ex:"一百万个数求平方和：\n列表：sum([x * x for x in lst]) → 约 0.1 秒\nNumPy：(arr ** 2).sum() → 约 0.002 秒\n快了大约 50 倍，数据越大差距越明显。"});
D("np-create",{a:"建数组像准备一个格子本：可以照抄一份已有的数（np.array），也可以直接领一本全是 0 的（zeros）、全是 1 的（ones），或者按规律填好的（arange、linspace）。",
s:["np.array(列表)：从列表创建。嵌套列表就是二维数组。","np.zeros(形状)、np.ones(形状)：全 0、全 1。形状写成元组，如 (2, 3)。","np.arange(开始, 结束, 步长)：像 range，但能用小数步长，不含结束。","np.linspace(开始, 结束, 个数)：在区间内均匀取指定个数的点，含结束。","np.eye(n)：n×n 单位矩阵。np.zeros_like(x)：和 x 形状一样的全 0 数组（鱼书算梯度时常用）。"],
ex:"np.arange(0, 1, 0.25) → [0.   0.25 0.5  0.75]\nnp.linspace(0, 1, 5) → [0.   0.25 0.5  0.75 1.  ]\nnp.zeros((2, 3)) → 2 行 3 列的 0\nnp.eye(2) → [[1. 0.] [0. 1.]]"});
D("np-astype",{a:"astype 像换单位：同样的东西，从“个”换成“小数”，或者从“真假”换成“1 和 0”。换完是一个新的数组，原来的不变。",
s:["每个数组都有一个 dtype：int64、float64、float32、bool 等。","x.astype(新类型) 返回转换后的新数组。","bool → int：True 变 1，False 变 0。鱼书的阶跃函数就是 (x > 0).astype(int)。","float → int：直接砍掉小数部分。","图片像素通常是 uint8（0～255），训练前要转成 float32 再除以 255，变成 0～1。"],
ex:"x = np.array([-1.0, 0.5, 2.0])\n(x > 0) → [False  True  True]\n(x > 0).astype(int) → [0 1 1]\nnp.array([2.7, -2.7]).astype(int) → [ 2 -2]\nnp.array([0, 128, 255], dtype=np.uint8).astype(np.float32) / 255 → [0. 0.502 1.]"});
D("np-shape",{a:"shape 像一个箱子的规格说明：(3, 2) 是“3 层，每层 2 格”。深度学习里大部分报错都是规格对不上，就像想把 A4 纸塞进信封，尺寸不对就是塞不进。",
s:["A.shape：每个维度有多长，返回元组。","A.ndim：有几个维度，就是 shape 的长度。","A.dtype：元素的类型。","A.size：元素总个数，等于 shape 各项相乘。","一维数组 shape 是 (3,)，不是 (3, 1) 也不是 (1, 3)，这点经常引起混淆。","写代码时养成习惯：在注释里标出每个变量的形状。"],
ex:"A = np.array([[1, 2], [3, 4], [5, 6]])\nA.shape → (3, 2)，A.ndim → 2，A.size → 6\nx = np.array([1, 2, 3])\nx.shape → (3,)\nMNIST 一批数据：X.shape → (100, 784)，100 张图，每张 784 个像素"});
D("np-elem",{a:"逐元素运算像两排人一对一握手：第 1 个和第 1 个、第 2 个和第 2 个……各算各的。它不是矩阵乘法，矩阵乘法是一个人要和对面一整列的人都打交道。",
s:["形状相同的两个数组，+ − * / ** 都是对应位置分别计算。","np.exp(x)、np.log(x)、np.sqrt(x) 这类函数也是对每个元素分别计算。","x * y 是逐元素乘法，矩阵乘法要用 x @ y 或 np.dot。","形状不同会尝试广播，不能广播就报错。","sigmoid 就是一行逐元素运算：1 / (1 + np.exp(-x))。"],
ex:"x = np.array([1., 2., 3.])\ny = np.array([2., 4., 6.])\nx + y → [3. 6. 9.]\nx * y → [ 2.  8. 18.]\ny / x → [2. 2. 2.]\n1 / (1 + np.exp(-np.array([0., 2.]))) → [0.5   0.881]"});
D("np-dot",{a:"矩阵乘法像“打分”：每个学生（A 的一行）拿着自己各科的成绩，和每套权重方案（B 的一列）逐科相乘再加起来，得到一个总分。所以 A 的“科目数”（列数）必须等于 B 的“科目数”（行数）。",
s:["A 形状 (m, n)，B 形状 (n, p)，A @ B 形状 (m, p)。中间的 n 必须相等，相当于“消掉”。","结果第 i 行第 j 列 = A 的第 i 行和 B 的第 j 列对应相乘再求和。","神经网络一层：X @ W + b，X 是 (批大小, 输入数)，W 是 (输入数, 输出数)。","形状不匹配会报错：shapes (2,3) and (2,3) not aligned。","一维数组之间 np.dot(a, b) 是内积，结果是一个数。"],
ex:"A = [[1, 2],\n     [3, 4]]   (2, 2)\nB = [[5, 6],\n     [7, 8]]   (2, 2)\n(A @ B)[0][0] = 1×5 + 2×7 = 19\n(A @ B)[0][1] = 1×6 + 2×8 = 22\nA @ B = [[19, 22], [43, 50]]\n形状检查：(100, 784) @ (784, 50) → (100, 50)"});
D("np-bc",{a:"广播像老师给全班发通知：不需要给每个人单独写一份，写一份，自动“复印”给每个人。小数组会被自动复制扩展成大数组的形状，再逐元素计算。",
s:["数和数组：A * 10，10 被扩展成和 A 一样的形状。","规则：从最后一个维度开始往前对齐比较。","每一对维度要么相等，要么其中一个是 1（或者不存在），才能广播。","长度为 1 的那个维度会被复制扩展。","最常用的地方：X @ W + b，b 的形状 (50,) 被广播到 (100, 50)，每一行都加上同一个 b。"],
ex:"A = [[1, 2],\n     [3, 4]]   (2, 2)\nb = [10, 20]   (2,)\nA + b → b 被扩展成 [[10, 20], [10, 20]]\n→ [[11, 22], [13, 24]]\n(3, 1) 和 (1, 4) 相加 → (3, 4)\n(2, 3) 和 (2,) → 最后一维 3 和 2 不等，报错"});
D("np-index",{a:"二维数组像电影院的座位表：A[2, 5] 是“第 2 排第 5 座”；A[2, :] 是“第 2 排所有座位”；A[:, 5] 是“每一排的第 5 座”。冒号就是“这一维全都要”。",
s:["A[i, j]：第 i 行第 j 列（都从 0 开始）。","A[i] 或 A[i, :]：整个第 i 行。","A[:, j]：整个第 j 列。","切片和列表一样：A[0:2, 1:] 取第 0、1 行，第 1 列到最后。","花式索引：A[[0, 2]] 取第 0 行和第 2 行。","鱼书里常见：y[np.arange(batch), t] 一次从每行取出正确标签对应的那个概率。"],
ex:"X = [[51, 55],\n     [14, 19],\n     [ 0,  4]]\nX[1, 0] → 14\nX[:, 1] → [55 19 4]\nX[0:2] → [[51 55] [14 19]]\ny = [[0.1, 0.9], [0.8, 0.2]]，t = [1, 0]\ny[[0, 1], t] → [0.9 0.8]"});
D("np-bool",{a:"布尔索引像用筛子筛沙子：先做一个和数组一样大的筛子（每格写“要”或“不要”），再把数组倒进去，只留下“要”的那些格子。",
s:["X > 15 对每个元素做比较，得到同形状的 True/False 数组（筛子）。","X[筛子] 只取出 True 位置的元素，结果是一维数组。","多个条件用 & 和 |，每个条件要加括号：X[(X > 5) & (X < 20)]。","也可以用来赋值：X[X < 0] = 0，把负数全变 0（就是 ReLU）。","计数：(X > 15).sum() 统计有多少个满足条件，因为 True 当作 1。"],
ex:"X = np.array([51, 55, 14, 19, 0, 4])\nX > 15 → [T T F T F F]\nX[X > 15] → [51 55 19]\n(X > 15).sum() → 3\n准确率：(pred == label).mean()\npred = [1, 2, 3]，label = [1, 0, 3] → [T F T].mean() → 0.667"});
D("np-axis",{a:"一张成绩表，每行一个学生，每列一科。axis=0 是“沿着行往下压”，把所有学生压成一行，得到每科的统计；axis=1 是“沿着列往右压”，把所有科目压成一列，得到每个学生的统计。",
s:["axis=0：跨行计算，结果每列一个值，形状去掉第 0 维。","axis=1：跨列计算，结果每行一个值，形状去掉第 1 维。","记法：axis 等于几，就是把那一维“压扁消失”。","sum、mean、max、argmax 都能用 axis。","分类网络输出 (批大小, 类别数)，np.argmax(y, axis=1) 得到每张图预测的类别。"],
ex:"A = [[1, 2, 3],\n     [4, 5, 6]]   (2, 3)\nA.sum(axis=0) → [5 7 9]   形状 (3,)\nA.sum(axis=1) → [ 6 15]   形状 (2,)\nA.sum() → 21\ny = [[0.1, 0.7, 0.2], [0.6, 0.3, 0.1]]\nnp.argmax(y, axis=1) → [1 0]"});
D("np-stat",{a:"统计函数是一组现成的“计算器按钮”：平均值、最大值、标准差……不用自己写循环，按一下就出结果。",
s:["x.sum()、x.mean()、x.max()、x.min()：总和、平均、最大、最小。","x.std()：标准差，衡量数据分散程度；x.var()：方差 = 标准差²。","x.argmax()、x.argmin()：最大值、最小值所在的下标。","都可以加 axis 参数按行或列计算。","np.sqrt、np.abs、np.log、np.exp 是逐元素的数学函数。"],
ex:"x = np.array([3, 1, 4, 1, 5])\nx.mean() → 2.8\nx.max() → 5，x.argmax() → 4（下标 4）\nx.var() → ((0.2)² + (1.8)² + (1.2)² + (1.8)² + (2.2)²) / 5 = 2.56\nx.std() → √2.56 = 1.6"});
D("np-random",{a:"随机数像掷骰子，每次结果都不一样。设随机种子（seed）就像约定“从骰子的同一个起点开始掷”，每次掷出来的序列都一样，别人照着你的代码跑，也能得到一样的结果。",
s:["np.random.rand(形状)：0～1 之间均匀分布。","np.random.randn(形状)：标准正态分布（均值 0、标准差 1），初始化权重常用。","np.random.randint(低, 高, 个数)：随机整数，不含高。","np.random.choice(n, k)：从 0～n−1 随机选 k 个，鱼书用它抽 mini-batch。","np.random.permutation(n)：0～n−1 的随机排列，用来打乱数据。","np.random.seed(0)：固定随机序列，实验可复现。"],
ex:"np.random.seed(0)\nnp.random.rand(2) → [0.549 0.715]\n再次 np.random.seed(0)，np.random.rand(2) → 还是 [0.549 0.715]\n抽 mini-batch：\nidx = np.random.choice(60000, 100)\nx_batch = x_train[idx]   # (100, 784)"});
D("np-where",{a:"np.where 像一个对每个格子都执行的“如果……就……否则……”：每个位置都问一下条件，成立就从 A 里取，不成立就从 B 里取。",
s:["np.where(条件, A, B)：三个参数，逐元素选择，结果形状和条件相同。","A、B 可以是数组，也可以是一个数（会广播）。","np.where(条件) 只给一个参数时，返回满足条件的元素下标。","ReLU：np.where(x > 0, x, 0)。","和 if 不同：if 只能判断一个值，np.where 一次判断整个数组。"],
ex:"x = np.array([-2, 3, -1, 5])\nnp.where(x > 0, x, 0) → [0 3 0 5]\nnp.where(x > 0, '正', '负') → ['负' '正' '负' '正']\nnp.where(x > 0) → (array([1, 3]),)  下标 1 和 3 是正数"});
D("np-reshape",{a:"reshape 像把一盒 12 颗的鸡蛋重新摆：可以摆成 3×4，也可以 2×6 或 12×1，鸡蛋还是那 12 颗、顺序不变，只是排法变了。转置 .T 像把表格沿对角线翻过来，行变列、列变行。",
s:["x.reshape(新形状)：元素个数必须相同。","−1 表示“这一维你帮我算”：x.reshape(3, -1)。","按行优先的顺序重新排：先填满第 0 行，再填第 1 行。","A.T：转置，(m, n) 变成 (n, m)。","x.flatten() 拉成一维。MNIST 图片 (28, 28) ⇄ (784,) 就是靠 reshape 来回变。"],
ex:"x = np.arange(6) → [0 1 2 3 4 5]\nx.reshape(2, 3) → [[0 1 2] [3 4 5]]\nx.reshape(3, -1) → [[0 1] [2 3] [4 5]]（自动算出 2）\nx.reshape(2, 3).T → [[0 3] [1 4] [2 5]]\nx.reshape(4, 2) → 报错，6 个元素排不成 4×2"});
D("np-concat",{a:"concatenate 像把两列火车车厢首尾接起来，变成一列更长的火车；stack 像把两列火车并排停在两条轨道上，多出了一个“第几条轨道”的维度。",
s:["np.concatenate([a, b], axis=0)：沿着已有的第 0 维接起来，其他维度必须相同。","axis=1 是左右拼接（加列），axis=0 是上下拼接（加行）。","np.stack([a, b])：新建一个维度，把它们叠起来，形状必须完全相同。","np.vstack 上下叠，np.hstack 左右拼，是常用的简写。","常用于把多个 batch 的预测结果合在一起。"],
ex:"a = [1, 2]，b = [3, 4]\nnp.concatenate([a, b]) → [1 2 3 4]   形状 (4,)\nnp.stack([a, b]) → [[1 2] [3 4]]   形状 (2, 2)\nA、B 都是 (2, 3)：\nconcatenate(axis=0) → (4, 3)\nconcatenate(axis=1) → (2, 6)\nstack → (2, 2, 3)"});
D("np-copy",{a:"切片像给同一份文件建了一个快捷方式：你通过快捷方式修改，原文件也变了。.copy() 才是真正复印了一份，改复印件不影响原件。",
s:["切片 b = a[:2] 得到的是视图（view），和 a 共享同一块内存。","改 b 的元素，a 对应位置也会变。","b = a 甚至连视图都不是，就是同一个数组的另一个名字。","要独立的一份：b = a.copy()。","布尔索引和花式索引（a[[0, 2]]）返回的是副本。","鱼书数值求梯度时，先保存 tmp = x[idx]，改完再还原，就是在处理这个问题。"],
ex:"a = np.array([1, 2, 3])\nb = a[:2]; b[0] = 99\na → [99  2  3]（原数组被改了）\nc = a.copy(); c[0] = 0\na → [99  2  3]（不受影响）\nd = a; d[1] = 7\na → [99  7  3]"});
D("np-norm",{a:"范数就是向量的“长度”，像用尺子量从原点到那个点有多远。两个点的距离，就是从一个点指向另一个点的那根箭头的长度。",
s:["L2 范数（默认）：‖x‖ = √(x₁² + x₂² + …)，就是勾股定理。","np.linalg.norm(x) 计算 L2 范数。","两点距离：np.linalg.norm(a − b)。","L1 范数：各分量绝对值之和，np.linalg.norm(x, 1)。","用途：L2 正则化、梯度裁剪、比较两个向量有多接近（人脸识别、词向量）。"],
ex:"x = np.array([3, 4])\nnp.linalg.norm(x) → √(9 + 16) = 5.0\nnp.linalg.norm(x, 1) → 3 + 4 = 7.0\na = [1, 1]，b = [4, 5]\nnp.linalg.norm(a − b) → √(9 + 16) = 5.0"});
D("np-nditer",{a:"多维数组像一栋楼，nditer 是一个按房号顺序逐间敲门的快递员：101、102、103……201、202……不管楼有几层几户，它都能一间不漏地走完，而且每到一间都告诉你房号（multi_index）。",
s:["it = np.nditer(W, flags=['multi_index'], op_flags=['readwrite'])。","while not it.finished: 循环。","idx = it.multi_index 是当前元素的下标元组，如 (0, 1)。","W[idx] 读或改这个元素。","it.iternext() 移到下一个。忘了写会死循环。","鱼书 numerical_gradient 用它对每个权重分别加减一个小量 h，求数值梯度。"],
ex:"W = np.array([[1, 2], [3, 4]])\nit = np.nditer(W, flags=['multi_index'])\nwhile not it.finished:\n    print(it.multi_index, W[it.multi_index])\n    it.iternext()\n输出：(0,0) 1、(0,1) 2、(1,0) 3、(1,1) 4\n同样效果也可以写：for idx in np.ndindex(W.shape):"});
D("np-vec",{a:"搬一百箱货：for 循环是一个人一箱一箱地搬；向量化是叫一辆卡车一次全运走。结果一样，速度差几十上百倍。",
s:["看到“对每个元素做同样的事”的 for 循环，就想想能不能写成数组整体运算。","求和相乘 → np.dot(w, x)。","每个元素套函数 → np.exp(x)、x ** 2。","按条件处理 → 布尔索引或 np.where。","多个样本一起算 → 把样本叠成矩阵，一次矩阵乘法搞定一整个 batch。","先写出能跑的 for 循环版本，再改成向量化版本，对比结果是否一致。"],
ex:"for 循环版：\nz = 0\nfor i in range(len(x)):\n    z += w[i] * x[i]\n向量化：z = np.dot(w, x)\nn = 1,000,000 时：循环约 0.4 秒，向量化约 0.001 秒\n用 np.allclose(结果1, 结果2) 检查两种写法结果一致。"});
D("plt-line",{a:"画线图像描点连线：先准备好一排横坐标 x，再算出每个 x 对应的 y，plt.plot 把这些点按顺序连起来。点取得越密，曲线越平滑。",
s:["import matplotlib.pyplot as plt。","x = np.arange(0, 6, 0.1) 生成横坐标。","y = np.sin(x) 算纵坐标。","plt.plot(x, y, label='sin')；可以多次 plot 画多条线。","plt.xlabel、plt.ylabel、plt.title 加坐标名和标题；plt.legend() 显示图例。","plt.show() 显示。Jupyter 里不写也会显示。"],
ex:"x = np.arange(-5, 5, 0.1)\nplt.plot(x, 1 / (1 + np.exp(-x)), label='sigmoid')\nplt.plot(x, np.maximum(0, x), linestyle='--', label='ReLU')\nplt.ylim(-0.1, 1.1)\nplt.legend(); plt.show()\n一张图上同时看到两种激活函数的形状。"});
D("plt-loss",{a:"损失曲线是训练的“体检报告”：一路往下说明在学；一直不动说明没学进去；突然往上飞说明出问题了。看曲线比盯着一串数字直观得多。",
s:["训练循环里每一步都把 loss 存进列表：losses.append(loss)。","训练完 plt.plot(losses)。","正常：快速下降，然后逐渐变平。","不下降：学习率太小、代码有 bug（比如忘了更新参数）。","忽上忽下剧烈震荡或变成 nan：学习率太大。","同时画训练准确率和测试准确率，两条线差得越来越远就是过拟合。"],
ex:"lr = 0.1：loss 2.3 → 0.8 → 0.4 → 0.3（正常）\nlr = 10：loss 2.3 → 15 → nan（太大）\nlr = 0.00001：loss 2.30 → 2.30 → 2.29（太小）\ntrain_acc 0.99，test_acc 0.80 → 过拟合"});
D("plt-img",{a:"图片在电脑里就是一张数字表格，每个数字是一个像素的亮度。imshow 把这张表格“翻译”回图片：数大就画亮，数小就画暗。",
s:["plt.imshow(二维数组, cmap='gray')：灰度图。","彩色图要是 (高, 宽, 3) 的形状。PyTorch 是 (3, 高, 宽)，显示前要用 transpose 或 permute 调整。","MNIST 每张图是 784 个数，要先 reshape(28, 28)。","plt.axis('off') 去掉坐标轴。","plt.colorbar() 显示颜色和数值的对应条，看特征图时有用。"],
ex:"img = x_train[0]           # 形状 (784,)\nimg = img.reshape(28, 28)\nplt.imshow(img, cmap='gray')\nplt.title(f'label = {t_train[0]}')\n显示出一个手写的 5。\n直接 plt.imshow(x_train[0]) 会报错：不是二维的。"});
D("plt-sub",{a:"subplot 像把一张大纸折成几格，每格画一张小图。plt.subplot(2, 3, 4) 意思是“把纸分成 2 行 3 列，现在画第 4 格”（从 1 开始数，从左到右、从上到下）。",
s:["plt.subplot(行数, 列数, 第几个)，序号从 1 开始。","每次调用 subplot 后，接下来的 plot/imshow 都画在这一格。","用循环批量画：for i in range(6): plt.subplot(2, 3, i + 1)。","plt.figure(figsize=(宽, 高)) 设整张图的大小（英寸）。","plt.tight_layout() 自动调整间距，防止标题重叠。","另一种写法：fig, axes = plt.subplots(2, 3)，然后 axes[0, 1].plot(...)。"],
ex:"plt.figure(figsize=(6, 4))\nfor i in range(6):\n    plt.subplot(2, 3, i + 1)\n    plt.imshow(x_train[i].reshape(28, 28), cmap='gray')\n    plt.title(t_train[i]); plt.axis('off')\nplt.tight_layout(); plt.show()\n第 1～3 张在第一行，第 4～6 张在第二行。"});
D("plt-scatter",{a:"散点图像在地图上插小旗，每个数据点一面旗，颜色表示类别，一眼看出两类数据是挤在一起还是分得很开。直方图像把数据按大小分进一排桶里，看哪个范围的数最多。",
s:["plt.scatter(x, y, c=labels)：画点，c 按类别上色。","适合看分类数据能不能被一条线分开，或看聚类结果。","plt.hist(数据, bins=30)：把数值范围分成 30 个区间，统计每个区间有多少个。","鱼书第 6 章用直方图看每层激活值的分布：挤在 0 和 1 两端说明梯度会消失。","数据是多维数组时，先 .flatten() 拉平再画直方图。"],
ex:"x = [1, 2, 3, 6, 7, 8]\ny = [1, 2, 1, 6, 7, 6]\nlabels = [0, 0, 0, 1, 1, 1]\nplt.scatter(x, y, c=labels) → 左下 3 个点一种颜色，右上 3 个点另一种\nplt.hist(np.random.randn(1000), bins=30) → 一个钟形"});
D("git-why",{a:"Git 像游戏的存档系统：每到一个关键点就存一次档，玩坏了随时读档回去。GitHub 像云存档，换台电脑也能接着玩，还能把存档分享给别人。",
s:["没有 Git 时：train_v1.py、train_v2_final.py、train_真的最终版.py……一团乱。","Git 记录每次修改了什么、什么时候、为什么（提交说明）。","任何时候都能回到以前的版本，或者看两个版本差在哪里。","GitHub 是放 Git 仓库的网站：备份、多人合作、展示作品。","找工作时，GitHub 上的项目也是你的作品集。"],
ex:"周一：模型准确率 95%，commit 存档\n周二：改了一堆代码，准确率掉到 80%，也不记得改了什么\n有 Git：git diff 看改了哪些行；git checkout 回到周一的版本\n没有 Git：只能凭记忆一点点改回去。"});
D("git-basic",{a:"把 Git 想成寄快递：add 是把东西放进箱子，commit 是封箱贴上快递单（写清楚里面是什么），push 是交给快递员送到 GitHub，pull 是把 GitHub 上别人寄来的新东西取回来。",
s:["git init：在当前文件夹新建一个仓库（只做一次）。或 git clone 网址 下载一个已有仓库。","git status：看哪些文件改了、哪些还没 add。最常用，不确定时就敲它。","git add 文件名（或 git add . 全部）：把改动放进“待提交区”。","git commit -m '说明'：存档。说明写清楚做了什么。","git push：上传到 GitHub。git pull：下载别人（或你在另一台电脑上）的更新。","git log：看历史存档列表。"],
ex:"改了 train.py 之后：\ngit status → modified: train.py（红色）\ngit add train.py\ngit status → modified: train.py（绿色，已放进箱子）\ngit commit -m '学习率改成 0.01'\ngit push → GitHub 上就能看到这次修改"});
D("git-ignore",{a:".gitignore 像寄快递时的“禁寄清单”：大件（数据集）、贵重物品（密码）、垃圾（缓存）都写在上面，git add . 时会自动跳过它们。",
s:["在仓库根目录建一个名叫 .gitignore 的文本文件。","每行写一个规则：文件名、文件夹名/、或通配符 *.pkl。","大文件：数据集、模型权重（GitHub 单个文件上限 100MB）。","敏感文件：.env、存 API 密钥的文件。一旦推上去，就算删掉历史里也还在。","自动生成的：__pycache__/、.ipynb_checkpoints/。","已经被 Git 跟踪的文件，加进 .gitignore 也没用，要先 git rm --cached 文件名。"],
ex:".gitignore 内容：\n__pycache__/\n*.pkl\ndata/\n.env\n效果：\ngit add . 后，train.py 被加入，params.pkl、data/mnist.gz、.env 都被忽略。"});
D("git-branch",{a:"分支像平行世界：主线（main）是正式版本，你开一个分支去做实验，随便折腾都不影响主线。实验成功了，再把这个平行世界合并回主线；失败了直接扔掉。",
s:["git checkout -b 分支名：新建分支并切过去（新版也可以用 git switch -c）。","在分支上正常 add、commit。","git push -u origin 分支名：把分支推到 GitHub。","在 GitHub 上开 Pull Request（PR）：申请把分支合并到 main，别人可以在上面看代码、提意见。","确认没问题后点 Merge，改动就进了 main。","git checkout main 切回主线。"],
ex:"main 上的模型准确率 95%\ngit checkout -b try-adam\n把 SGD 换成 Adam，commit\n测试：准确率 97% → 开 PR 合并进 main\n如果是 90% → git checkout main，删掉分支，main 毫发无损"});
D("how-split",{a:"做菜前先看菜谱：洗菜、切菜、热锅、下锅、调味。写代码也一样，先用中文把步骤写下来，每一步都小到“一两行代码能写完”，再逐步翻译成代码。",
s:["① 用一句话说清楚输入是什么、输出是什么。","② 用中文写出步骤，写成注释。","③ 每一步再拆，直到每一步都知道用什么写（循环、字典、某个函数）。","④ 一步一步翻译成代码，每写完一步就运行检查。","⑤ 全部能跑之后，再考虑简化和优化。"],
ex:"题目：统计一段英文里每个单词出现几次\n输入：字符串；输出：{单词: 次数}\n# 1. 转小写，切成单词 → text.lower().split()\n# 2. 准备空字典 → count = {}\n# 3. 每个单词计数 → count[w] = count.get(w, 0) + 1\n# 4. 按次数排序输出 → sorted(count.items(), key=lambda kv: -kv[1])"});
D("how-small",{a:"盖房子前先搭个模型：在小模型上发现问题，改起来又快又便宜。代码也一样，先用 3 条数据、2 个神经元跑通，能手算验证对不对，再换成几万条真数据。",
s:["先造一个能手算的小例子，比如 x = [1, 2]，W 是 2×2。","手算出期望的结果，和代码输出对比。","小数据跑得快，改一次几秒就能看结果。","训练网络时，先拿 100 条数据看能不能让 loss 降到接近 0（能过拟合说明代码基本没写错）。","都没问题了再上全部数据、调超参数。"],
ex:"写 softmax：\n先试 x = [0, 0] → 应该是 [0.5, 0.5]\n再试 x = [1000, 1000] → 如果出现 nan，说明要先减去最大值防溢出\n全部通过，再用在 (100, 10) 的真实输出上。"});
D("how-err",{a:"报错信息像导航提示“前方 500 米出错”：最后一行告诉你“出了什么错”，往上几行告诉你“在哪个文件第几行”。读懂它，大多数错误自己就能修。",
s:["看最后一行：错误类型 + 说明，比如 ValueError: shapes (100,784) and (100,50) not aligned。","往上找属于你自己文件的那一行（File 'train.py', line 23），那就是出错位置。","常见类型：NameError 名字没定义或拼错；TypeError 类型不对；IndexError 下标越界；KeyError 字典里没这个键；ValueError 值或形状不对；IndentationError 缩进不对。","不懂就把最后一行复制去搜索，几乎所有报错别人都遇到过。","修完一个再运行，一次只修一个错误。"],
ex:"Traceback (most recent call last):\n  File 'train.py', line 12, in <module>\n    a1 = x @ W1\nValueError: matmul: … size 784 is different from 100\n解读：第 12 行，x 的列数和 W1 的行数对不上\n下一步：print(x.shape, W1.shape)，发现 W1 写反了。"});
D("how-print",{a:"代码出错像车子有异响，光看外表看不出来，要打开引擎盖在几个关键位置看一看。print 就是在关键位置装一个“观察窗”，看变量到底是不是你以为的样子。",
s:["怀疑哪里有问题，就在它前后 print。","深度学习里最重要的是看形状：print('a1', a1.shape)。","再看几个具体的值：print(a1[:2])，有没有 nan、是不是全 0。","加上标签，否则一堆数字分不清是谁。","二分法：在中间 print，看问题在前半段还是后半段，逐步缩小范围。","找到问题后删掉多余的 print。"],
ex:"网络输出全是同一个数：\nprint('x', x.shape, x[:1, :5]) → x 正常\nprint('a1', a1.shape, a1[:1, :5]) → 正常\nprint('z1', z1[:1, :5]) → 全是 0\n→ ReLU 之前的值都是负数，检查 W1 的初始化，发现乘了 −1。"});
D("how-read",{a:"读陌生代码像看一张陌生城市的地图：先看大致有哪几个区（函数、类），再找起点和终点（输入、输出），最后才看具体每条街（每一行）。",
s:["① 先扫一遍：有哪些 import、哪些函数和类，各自的名字暗示了什么。","② 找入口：if __name__ == '__main__' 或者最下面实际调用的地方。","③ 找输入和输出：数据从哪里读进来，最后返回或打印什么。","④ 跟着一条数据走一遍，在纸上写下每一步变量的形状。","⑤ 不懂的函数查文档，或者自己在 Jupyter 里用小例子试一试。","⑥ 最后用自己的话写一段总结，就是你的笔记。"],
ex:"读鱼书 two_layer_net.py：\n① 一个类 TwoLayerNet，方法 predict、loss、accuracy、gradient\n② 入口在 train_neuralnet.py\n③ 输入 x (100, 784)，输出 y (100, 10)\n④ predict：x @ W1 + b1 → (100, 50) → sigmoid → @ W2 + b2 → (100, 10) → softmax"});
D("how-style",{a:"代码是写给人看的，顺便给机器运行。三天后的你就是一个陌生人：变量名像路牌，注释像旁白，函数像分好的章节，有了它们才能看懂。",
s:["变量名要说清楚是什么：learning_rate 比 lr2 好，train_loss_list 比 a 好。","约定俗成的短名可以用：x、y、W、b、i、np。","重复出现两三次的代码，抽成一个函数。","一个函数只做一件事，不超过一屏。","注释写“为什么”，不用写“做了什么”（代码自己会说）。","遵守 PEP 8：4 个空格缩进，运算符两边加空格，函数名用小写加下划线。"],
ex:"差：\nfor i in range(len(a)):\n    b.append(a[i] / 255)\n好：\n# 像素缩放到 0～1，否则 sigmoid 输入太大会饱和\nx_norm = x_raw / 255.0"});
D("how-ask",{a:"去看医生，说“我不舒服”医生没法帮你；说“我从昨天开始头疼、38 度、吃了退烧药没用”，医生马上就知道怎么查。提问也一样：信息越具体，别人越快能帮你。",
s:["先查官方文档：搜“numpy argmax”，直接看文档里的 Examples 部分。","在 Jupyter 里：函数名? 或 help(函数名) 看说明。","搜索报错：复制最后一行报错去搜。","问人（或问 AI）时带上四样东西：想做什么、相关的代码、完整报错、你已经试过什么。","把代码缩到能重现问题的最小版本，这个过程常常自己就找到原因了。"],
ex:"差的提问：“我的代码跑不了，怎么办？”\n好的提问：\n“我想算 MNIST 一批数据的准确率。\n代码：acc = np.sum(y == t) / len(y)\n结果总是 0。\nprint(y.shape) → (100, 10)，t.shape → (100,)\n我试过把 t 转成 int，还是 0。”\n（答案：y 要先 np.argmax(y, axis=1)）"});
