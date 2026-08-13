function p(t){const [h,m]=t.split(':').map(Number);return h+m/60}
function o(a,b){return p(a.start)<p(b.end)&&p(b.start)<p(a.end)}
const a=(c,m)=>{if(!c)throw new Error(m)}
a(p('09:30')===9.5,'parse');a(o({start:'09:00',end:'10:00'},{start:'09:30',end:'10:30'}),'overlap');a(!o({start:'09:00',end:'10:00'},{start:'10:00',end:'11:00'}),'touch');console.log('YearCraft smoke tests: PASS');
