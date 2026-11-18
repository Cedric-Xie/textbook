/* 时间表 ↔ 教科书：知识点的日期跟着时间表里对应任务的当前位置走 */
(function(){
  const S=window.__sched,B=window.__book;if(!S||!B)return;
  const pad=n=>String(n).padStart(2,"0");
  const mdOf=(start,i)=>{const d=new Date(start+"T00:00:00");d.setDate(d.getDate()+i);return pad(d.getMonth()+1)+"-"+pad(d.getDate())};
  // 原始日程：日期 → 当天任务
  const byDate={};
  S.WEEKS.forEach(w=>S.baseDays(w).forEach((day,i)=>{const md=mdOf(w.start,i);day.forEach(t=>(byDate[md]=byDate[md]||[]).push(t))}));
  function score(tp,task){
    const s=(tp.s||"")+" "+(tp.t||""),x=task.txt;let m;
    if(/PyTorch/.test(s)||tp.ch==="dlpt")return /PyTorch/.test(x)?3:0;
    if((m=s.match(/ML (\d)-(\d)/)))return x.includes("ML "+m[1]+"-"+m[2])?3:x.includes("ML "+m[1])?2:/ML/.test(x)?1:0;
    if((m=s.match(/DL (\d)-(\d)/)))return x.includes("DL "+m[1])?3:/DL/.test(x)?1:0;
    if((m=s.match(/鱼书[^\d]*(\d+)/))){const n=m[1];if(!x.includes("鱼书"))return 0;return (x.includes("第 "+n+" 章")||x.includes("鱼书 "+n+".")||x.includes(" "+n+".")||x.includes("第 "+n))?3:1}
    if(tp.b==="ml")return /ML/.test(x)?1:0;
    if(tp.b==="py")return task.k==="py"?1:0;
    return 0;
  }
  const link={};
  B.ALL.forEach(tp=>{if(!tp.d)return;tp.d0=tp.d;const c=byDate[tp.d]||[];let best=null,bs=0;c.forEach(t=>{const v=score(tp,t);if(v>bs){bs=v;best=t}});if(!best)best=c.find(t=>t.k==="video"||t.k==="code"||t.k==="py");if(best)link[tp.id]=best.id});
  window.__link=link;
  let last="";
  function sync(){
    const where={};
    S.WEEKS.forEach(w=>S.daysOf(w).forEach((day,i)=>{const md=mdOf(w.start,i);day.forEach(t=>{where[t.id]=md})}));
    let sig="";
    B.ALL.forEach(tp=>{if(!tp.d0)return;const id=link[tp.id];tp.d=(id&&where[id])||tp.d0;sig+=tp.d});
    if(sig!==last){last=sig;B.openToday();B.rerender()}
  }
  S.subs.push(sync);sync();
})();
