"""Build the textbook pages. Run: python3 src/build.py  (outputs index.html for GitHub Pages and artifact.html for Claude)."""
import os
D=os.path.dirname(os.path.abspath(__file__))
R=lambda f:open(os.path.join(D,f),encoding="utf-8").read()
helpers='''function X(ch,after,t){for(const b of BOOK)for(const c of b.chapters)if(c.id===ch){const i=c.topics.findIndex(x=>x.id===after);c.topics.splice(i<0?c.topics.length:i+1,0,t);return}throw new Error("no chapter "+ch)}
function NC(bk,afterCh,ch){const b=BOOK.find(x=>x.key===bk);const i=afterCh?b.chapters.findIndex(c=>c.id===afterCh):-1;b.chapters.splice(i+1,0,ch)}
'''
data=helpers+"".join(R(f) for f in ["py.js","ml.js","dl.js","extra_py.js","extra_dl.js","extra_ml.js"])
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
