"""Build the textbook pages. Run: python3 src/build.py  (outputs index.html for GitHub Pages and artifact.html for Claude)."""
import os
D=os.path.dirname(os.path.abspath(__file__))
R=lambda f:open(os.path.join(D,f),encoding="utf-8").read()
helpers='''function D(id,o){for(const b of BOOK)for(const c of b.chapters)for(const t of c.topics)if(t.id===id){if(o.a)t.a=o.a;if(o.s)t.st=o.s;if(o.ex)t.ex=o.ex;if(o.x)t.x=o.x;return}throw new Error("no topic "+id)}
function X(ch,after,t){for(const b of BOOK)for(const c of b.chapters)if(c.id===ch){const i=c.topics.findIndex(x=>x.id===after);c.topics.splice(i<0?c.topics.length:i+1,0,t);return}throw new Error("no chapter "+ch)}
function NC(bk,afterCh,ch){const b=BOOK.find(x=>x.key===bk);const i=afterCh?b.chapters.findIndex(c=>c.id===afterCh):-1;b.chapters.splice(i+1,0,ch)}
'''
data=helpers+"".join(R(f) for f in ["py.js","ml.js","dl.js","extra_py.js","extra_dl.js","extra_ml.js"]+sorted(f for f in os.listdir(D) if f.startswith("deep_") and f.endswith(".js")))
shell=R("shell.html").replace("/*DATA*/",data)
open(os.path.join(D,"..","artifact.html"),"w",encoding="utf-8").write(shell)
body=shell.replace('<title>教科书</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n','')
head='''<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>教科书 · Python、深度学习、机器学习中文速查</title>
<meta name="description" content="零基础中文学习笔记：Python 与 NumPy、深度学习（对照《深度学习入门：基于Python的理论与实现》鱼书）、机器学习（对照吴恩达机器学习课程）和数学基础，每个知识点一句话讲清，附代码例子和自测题，可写自己的笔记。">
<style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
'''
open(os.path.join(D,"..","index.html"),"w",encoding="utf-8").write(head+body+"\n</body>\n</html>\n")

# ---------- 合并页：时间表（默认）+ 教科书，发布到 Claude 版 ----------
import re
def scope_css(css, scope, keep_body=False):
    """给每条规则的选择器加上作用域前缀（支持一层 @media 嵌套）。"""
    out=[];i=0;n=len(css)
    def fix(sel):
        s=sel.strip()
        if not s: return s
        if s.startswith(":root"): return s if keep_body else s+" "+scope
        if s.startswith("body") or s.startswith("html"):
            if keep_body or s.startswith("body.") or s.startswith("body["): return s
            return scope+s[4:] if s.startswith("body") else s
        return scope+" "+s
    def parse(css):
        res=[];i=0
        while i<len(css):
            j=css.find("{",i)
            if j<0: res.append(css[i:]);break
            head=css[i:j]
            # 找到匹配的 }
            d=1;k=j+1
            while d and k<len(css):
                if css[k]=="{": d+=1
                elif css[k]=="}": d-=1
                k+=1
            body=css[j+1:k-1]
            # 去掉注释
            h=re.sub(r"/\*.*?\*/","",head,flags=re.S).strip()
            if h.startswith("@media") or h.startswith("@supports"):
                res.append(h+"{"+parse(body)+"}")
            elif h.startswith("@"):
                res.append(h+"{"+body+"}")
            else:
                res.append(",".join(fix(x) for x in h.split(","))+"{"+body+"}")
            i=k
        return "\n".join(res)
    return parse(css)

sch=R("schedule.html")
sch=sch[sch.index("</head><body>")+len("</head><body>"):]
s_css=sch[sch.index("<style>")+7:sch.index("</style>")]
s_rest=sch[sch.index("</style>")+8:]
s_markup=s_rest[:s_rest.index("<script>")].strip()
s_js=s_rest[s_rest.index("<script>")+8:s_rest.rindex("</script>")]
s_js=s_js.replace("document.body.appendChild(ghost)","document.getElementById('sch').appendChild(ghost)")
s_js+='''
window.__sched={WEEKS,baseDays,daysOf,subs:[]};
{const _render=render;render=function(){_render();window.__sched.subs.forEach(f=>{try{f()}catch(e){console.error(e)}})}}
'''
s_css=scope_css(s_css,"#sch")+"\n#sch{min-height:100vh}"

b=R("shell.html").replace("/*DATA*/",data)
b_css=b[b.index("<style>")+7:b.index("</style>")]
b_rest=b[b.index("</style>")+8:]
b_markup=b_rest[:b_rest.index("<script>")].strip()
b_js=b_rest[b_rest.index("<script>"):]
b_css=scope_css(b_css,"#book",keep_body=True)

nav_css='''
#appnav{display:flex;gap:6px;justify-content:center;padding:10px max(16px,env(safe-area-inset-left,0px)) 0;background:var(--bg)}
#appnav button{font:inherit;font-family:var(--body);font-size:15px;font-weight:700;border:1px solid var(--line);background:var(--paper);color:var(--muted);border-radius:999px;padding:6px 18px;cursor:pointer}
#appnav button[aria-selected="true"]{background:var(--ink);border-color:var(--ink);color:var(--bg)}
#appnav button:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
body.v-sch{background:#f3f5f8}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) body.v-sch{background:#10141b}}
:root[data-theme="dark"] body.v-sch{background:#10141b}
body.v-sch #appnav{background:transparent}
'''
nav_js='''<script>
(function(){
  const views={sch:document.getElementById("sch"),book:document.getElementById("book")};
  const btns=[...document.querySelectorAll("#appnav button")];
  function show(v){
    Object.keys(views).forEach(k=>{views[k].hidden=k!==v});
    btns.forEach(b=>b.setAttribute("aria-selected",b.dataset.v===v?"true":"false"));
    document.body.classList.toggle("v-sch",v==="sch");
    window.scrollTo(0,0);
  }
  btns.forEach(b=>b.onclick=()=>show(b.dataset.v));
  show("sch");
})();
</script>'''
page=('<title>学习主页</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
 '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
 '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;800;900&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap">\n'
 '<style>\n'+b_css+"\n"+s_css+"\n"+nav_css+'</style>\n'
 '<nav id="appnav" role="tablist" aria-label="切换页面"><button type="button" role="tab" data-v="sch">时间表</button><button type="button" role="tab" data-v="book">教科书</button></nav>\n'
 '<div id="sch">\n'+s_markup+'\n</div>\n'
 '<div id="book" hidden>\n'+b_markup+'\n</div>\n'
 +b_js+'\n<script>\n(function(){\n'+s_js+'\n})();\n</script>\n<script>\n'+R('sync.js')+'\n</script>\n'+nav_js+'\n')
open(os.path.join(D,"..","artifact.html"),"w",encoding="utf-8").write(page)
