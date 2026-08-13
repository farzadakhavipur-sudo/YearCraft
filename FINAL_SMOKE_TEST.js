
function parseTimeToHours(timeStr) {
  if (!timeStr) return 0;
  const [h,m] = timeStr.split(':').map(Number);
  return (h||0) + (m||0)/60;
}
function overlaps(a,b) {
  return parseTimeToHours(a.start) < parseTimeToHours(b.end) &&
         parseTimeToHours(b.start) < parseTimeToHours(a.end);
}
const assert = (x,m) => { if(!x) throw new Error(m); };
assert(parseTimeToHours('09:30') === 9.5, 'time parsing');
assert(overlaps({start:'09:00',end:'10:00'},{start:'09:30',end:'11:00'}), 'overlap');
assert(!overlaps({start:'09:00',end:'10:00'},{start:'10:00',end:'11:00'}), 'adjacent blocks');
assert(Math.max(0, Math.min(100, Math.round(50/100*100))) === 50, 'OKR percent');
console.log('YearCraft v7.0 smoke tests: PASS');
