/* 补充：深度学习 */
X("dl2","dl-gate",{id:"dl-bias",t:"权重与偏置的作用",s:"鱼书 2.3.2",d:"11-18",
one:"权重决定每个输入的重要程度，偏置决定神经元被激活的难易程度。",
x:"把 θ 移到左边写成 b = −θ：b 越大，越容易输出 1。几何上，w 决定分界线的方向，b 决定分界线离原点多远。"});
X("dl3","dl-relu",{id:"dl-tanh",t:"tanh、Leaky ReLU 等其他激活函数",s:"DL 1-3",d:"11-18",
one:"tanh 输出 −1 到 1、以 0 为中心；Leaky ReLU 在负半边留一点小斜率。",
c:"tanh(z) = (e^z − e^−z) / (e^z + e^−z)\nLeakyReLU(z) = max(0.01z, z)",
x:"tanh 输出均值接近 0，隐藏层里通常比 sigmoid 好。ReLU 负半边梯度为 0，神经元可能“死掉”，Leaky ReLU 能缓解。Transformer 里常用 GELU，是 ReLU 的平滑版。"});
X("dl3","dl-tanh",{id:"dl-actgrad",t:"激活函数的导数",s:"DL 1-3",d:"11-18",
one:"sigmoid′ = a(1−a)，tanh′ = 1−a²，ReLU′ = 1（z>0）或 0（z≤0）。",
x:"反向传播要用这些导数。sigmoid 和 tanh 在 z 很大或很小时导数接近 0（饱和），所以容易梯度消失。"});
X("dl3","dl-output",{id:"dl-outnum",t:"输出层神经元数量",s:"鱼书 3.5.3",d:"11-19",
one:"分类问题有几类，输出层就放几个神经元：手写数字 10 类就是 10 个。",
x:"每个输出神经元对应一个类别的得分，最大的那个就是预测结果。"});
X("dl3","dl-mnist",{id:"dl-pre",t:"预处理与正规化",s:"鱼书 3.6.2",d:"11-19",
one:"把输入数据变换到合适的范围再喂给网络，比如像素除以 255 变成 0–1。",
x:"更进一步的做法是让每个特征均值为 0、方差为 1（标准化），或者白化。好的预处理能加快学习、提高精度。"});
X("dl4","dl-ce",{id:"dl-onehot",t:"one-hot 标签与标签形式",s:"鱼书 4.2.4",d:"11-21",
one:"标签有两种写法：one-hot（[0,0,1,0…]）或直接写类别编号（2），交叉熵代码要对应处理。",
c:"# 标签是编号时，直接取出正确类的概率\nbatch_size = y.shape[0]\n-np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size",
x:"`y[np.arange(N), t]` 一次取出每个样本正确类的预测概率，是 NumPy 花式索引的典型用法。"});
X("dl4","dl-numdiff",{id:"dl-numgrad",t:"数值梯度的实现",s:"鱼书 4.4",d:"11-21",
one:"对每个参数分别加减 h，算出两次损失的差，得到这个参数的偏导，循环所有参数就是梯度。",
c:"def numerical_gradient(f, x):\n    h = 1e-4\n    grad = np.zeros_like(x)\n    for idx in range(x.size):\n        tmp = x[idx]\n        x[idx] = tmp + h; fxh1 = f(x)\n        x[idx] = tmp - h; fxh2 = f(x)\n        grad[idx] = (fxh1 - fxh2) / (2 * h)\n        x[idx] = tmp   # 还原\n    return grad",
x:"每个参数都要算两次完整的前向传播，几万个参数就要几万次，这就是它慢的原因。"});
X("dl4","dl-train",{id:"dl-epoch",t:"epoch、batch、iteration 的关系",s:"鱼书 4.5",d:"11-21",
one:"batch：一次用多少样本；iteration：更新一次参数；epoch：全部数据过一遍。",
c:"每个 epoch 的 iteration 数 = 训练样本数 / batch 大小\n60000 / 100 = 600",
q:"有 1 万个样本，batch 大小 50，训练 20 个 epoch，一共更新多少次参数？"});
X("dl4","dl-epoch",{id:"dl-testacc",t:"用测试数据评价",s:"鱼书 4.5.3",d:"11-21",
one:"每个 epoch 记录一次训练准确率和测试准确率，两条曲线差得远就是过拟合。",
x:"鱼书的两层网络两条线几乎重合，说明没有过拟合。曲线是判断训练状态的主要工具。"});
X("dl5","dl-chain",{id:"dl-chainback",t:"链式法则与计算图",s:"鱼书 5.2.3",d:"11-22",
one:"在计算图上，反向传播就是把“上游传来的导数 × 本节点的局部导数”往下游传。",
x:"一个变量被用到多次（图里有分支）时，它的梯度是各条路径传回来的梯度**相加**。"});
X("dl5","dl-addmul",{id:"dl-apple",t:"买苹果例子的反向传播",s:"鱼书 5.3.3–5.4",d:"11-22",
one:"总价 = 苹果单价 × 个数 × 消费税，反向传播一次就能求出每个量对总价的影响。",
x:"苹果 100 元 × 2 个 × 1.1：对单价的导数 2.2，对个数的导数 110，对税率的导数 200。“税率变化影响最大”这类结论一次反向就全得到了。"});
X("dl5","dl-gradcheck",{id:"dl-whybp",t:"为什么反向传播快",s:"鱼书 5",d:"11-22",
one:"数值微分每个参数都要单独算两次前向；反向传播一次前向 + 一次反向就得到全部梯度。",
x:"几十万个参数时，差距是几十万倍。这正是深度学习能训练大模型的基础。"});
X("dl1x","dl-init0",{id:"dl-dnnfb",t:"深层网络的前向与反向",s:"DL 1-4",d:"11-21",
one:"前向时每层把 Z 和 A 存进缓存，反向时从最后一层开始，用缓存一层层算 dW、db、dA。",
c:"前向：Z[l] = W[l]·A[l−1] + b[l],  A[l] = g(Z[l])\n反向：dZ[l] = dA[l] ⊙ g′(Z[l])\n      dW[l] = (1/m) dZ[l]·A[l−1]ᵀ\n      db[l] = (1/m) Σ dZ[l]\n      dA[l−1] = W[l]ᵀ·dZ[l]",
x:"这就是鱼书第 5 章的“层”思想，吴恩达用的是按列放样本的写法。"});
X("dl6","dl-sgd",{id:"dl-opt-cmp",t:"四种优化器对比",s:"鱼书 6.1.7",d:"11-24",
one:"在 MNIST 上，AdaGrad、Adam、Momentum 都比 SGD 学得快，Adam 通常是稳妥的默认选择。",
x:"鱼书画了四种方法在同一个函数上的路径：SGD 之字形、Momentum 像滚球、AdaGrad 步子越来越小、Adam 两者兼有。"});
X("dl6","dl-lrdecay",{id:"dl-earlystop",t:"早停 early stopping",s:"DL 2-1",d:"11-23",
one:"验证集误差不再下降、开始上升时就停止训练，防止过拟合。",
x:"简单好用，缺点是它同时影响“把训练误差降低”和“防止过拟合”两件事（不符合正交化），吴恩达更推荐用 L2 正则化。"});
X("dl6","dl-vanish",{id:"dl-clip",t:"梯度裁剪",s:"DL 5-1",d:"11-23",
one:"梯度太大时把它按比例缩小到一个上限，防止参数一步跳飞（梯度爆炸）。",
c:"torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)",
x:"训练 RNN 和 Transformer 时很常用。"});
X("dl6","dl-l2",{id:"dl-l1",t:"L1 正则化",s:"补充",d:null,
one:"惩罚权重的绝对值之和，会让很多权重正好变成 0（稀疏）。",
x:"L2 让权重都变小但不为 0；L1 倾向于只保留少数重要的权重。深度学习里 L2（权重衰减）更常用。"});
X("dl6","dl-dropout",{id:"dl-ensemble",t:"集成学习",s:"鱼书 6.4.3",d:"11-23",
one:"训练多个模型，预测时取平均，通常比单个模型准几个百分点。",
x:"Dropout 可以看作在一个网络里低成本地实现了集成学习。"});
X("dl6","dl-normin",{id:"dl-bnwhy",t:"Batch Norm 为什么有用",s:"DL 2-3",d:"11-24",
one:"它让每一层的输入分布保持稳定，后面的层不用一直追着前面层的变化重新适应。",
x:"放在线性计算之后、激活函数之前。用了 BN 后偏置 b 可以去掉（被 β 替代）。测试时用训练过程中各 batch 均值和方差的指数加权平均。"});
X("dl7","dl-pool",{id:"dl-avgpool",t:"平均池化与全局池化",s:"DL 4-1",d:"11-26",
one:"平均池化取区域平均值；全局平均池化把整张特征图压成一个数，常代替最后的全连接层。"});
X("dl7","dl-outsize",{id:"dl-params",t:"卷积层的参数量",s:"DL 4-1",d:"11-26",
one:"参数量 = 卷积核个数 × (输入通道 × 核高 × 核宽 + 1)，和图片大小无关。",
c:"10 个 3×3×3 的卷积核：10 × (27 + 1) = 280 个参数\n同样输入做全连接（32×32×3 → 100）：约 30 万个",
q:"输入 3 通道，用 16 个 5×5 的卷积核，参数量是多少？"});
X("dl7","dl-cnnarch",{id:"dl-receptive",t:"感受野",s:"补充",d:"11-26",
one:"输出上的一个点“看到”的原图区域大小，层越深感受野越大。",
x:"两层 3×3 卷积的感受野是 5×5，三层是 7×7。所以深层神经元能识别更大的图案。"});
X("dl7","dl-classic",{id:"dl-vis",t:"CNN 学到了什么",s:"鱼书 7.6",d:"11-26",
one:"第一层卷积核学会了检测边缘和颜色块，越深层学到的特征越抽象。",
x:"鱼书把第一层卷积核画成图片：训练前是随机噪声，训练后变成有规律的条纹、斑点。"});
X("dl5x","dl-w2v",{id:"dl-token",t:"分词与词表",s:"补充",d:"11-28",
one:"文本先切成 token（词或子词），再把每个 token 换成词表里的编号，最后查嵌入表变成向量。",
x:"现代大模型用子词分词（如 BPE）：常见词是一个 token，生僻词拆成几块，这样词表不用太大也能表示任何词。"});
X("dl5x","dl-pe",{id:"dl-ffn",t:"前馈网络、残差与层归一化",s:"DL 5-4",d:"11-28",
one:"每个 Transformer 块里，注意力之后接一个两层全连接网络（FFN），两部分外面都包着“残差 + LayerNorm”。",
c:"x = LayerNorm(x + MultiHeadAttention(x))\nx = LayerNorm(x + FFN(x))",
x:"注意力负责“位置之间交换信息”，FFN 负责“每个位置自己加工信息”。残差连接让深层网络能训练，LayerNorm 让数值稳定。"});
X("dl5x","dl-ffn",{id:"dl-cross",t:"交叉注意力",s:"DL 5-4",d:"11-28",
one:"解码器用自己的 Q 去查编码器输出的 K、V，也就是“翻译每个词时去看原文”。",
x:"自注意力：Q、K、V 都来自同一个序列；交叉注意力：Q 来自一个序列，K、V 来自另一个序列。"});
X("dl5x","dl-mask",{id:"dl-bertgpt",t:"BERT 与 GPT",s:"补充",d:"11-28",
one:"BERT 只用编码器、做完形填空式预训练，擅长理解；GPT 只用解码器、预测下一个词，擅长生成。",
x:"现在的对话大模型（GPT、Claude 等）都是 GPT 这一路：只用解码器的 Transformer，先在海量文本上预训练，再微调和对齐。"});
X("dl5x","dl-bertgpt",{id:"dl-temp",t:"生成时的采样与温度",s:"补充",d:"11-28",
one:"生成下一个词时，温度低就几乎总选概率最大的词（稳定），温度高就更随机（更有创意）。",
c:"p = softmax(logits / T)",
x:"还有 top-k、top-p 采样：只在概率最高的一部分词里抽。"});
X("dlpt","pt-tensor",{id:"pt-shape",t:"张量形状操作",s:"PyTorch",d:"11-23",
one:"view/reshape 改形状，unsqueeze 加一维，squeeze 去掉长度为 1 的维，permute 调换维度顺序。",
c:"x = torch.randn(100, 1, 28, 28)\nx.view(100, -1).shape    # (100, 784)\nx.squeeze(1).shape       # (100, 28, 28)\nx.permute(0, 2, 3, 1)    # (100, 28, 28, 1)"});
X("dlpt","pt-tensor",{id:"pt-device",t:"CPU 与 GPU",s:"PyTorch",d:"11-23",
one:"模型和数据必须在同一个设备上，用 `.to(device)` 搬过去。",
c:"device = \"cuda\" if torch.cuda.is_available() else \"cpu\"\nmodel = model.to(device)\nx, t = x.to(device), t.to(device)",
w:"报错“Expected all tensors to be on the same device”就是有东西没搬到 GPU。"});
X("dlpt","pt-module",{id:"pt-seq",t:"nn.Sequential 与常用层",s:"PyTorch",d:"11-25",
one:"简单的网络可以用 Sequential 按顺序把层串起来，不用写类。",
c:"model = nn.Sequential(\n    nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),\n    nn.Flatten(),\n    nn.Linear(16 * 14 * 14, 10))",
x:"常用层：`nn.Linear` 全连接、`nn.Conv2d` 卷积、`nn.MaxPool2d` 池化、`nn.BatchNorm2d`、`nn.Dropout`、`nn.Embedding` 嵌入。"});
X("dlpt","pt-loop",{id:"pt-optim",t:"优化器与学习率调度",s:"PyTorch",d:"11-25",
one:"`torch.optim` 里有 SGD、Adam 等；scheduler 按计划调整学习率。",
c:"opt = torch.optim.SGD(model.parameters(), lr=0.1, momentum=0.9, weight_decay=1e-4)\nsched = torch.optim.lr_scheduler.StepLR(opt, step_size=10, gamma=0.1)\n# 每个 epoch 结束：sched.step()",
x:"`weight_decay` 就是 L2 正则化。"});
