// Test harness for index.js — public cases + extra edge cases.
// Run: node test.js
const fs = require("fs");
const { evalExpr } = require("./index.js");
const cases = JSON.parse(fs.readFileSync("./cases.json", "utf8"));
const extra = [
  ["1 + 2 * 3", 7], ["-3+2", -1], ["(-3+2)*4", -4], ["2*-3", -6], ["3+-2", 1],
  ["((2))", 2], ["0.5*4", 2], [".5+1", 1.5], ["10-2-3", 5], ["2/4", 0.5],
  ["1+2+3+4", 10], ["(2+3)*(4-1)/5", 3], ["--3", 3], ["5/2*2", 5],
  ["100/10/2", 5], ["3.14*2", 6.28], ["0", 0], ["  2  *  3  ", 6],
  ["1.5-0.5", 1], ["(1+(2*(3+4)))", 15], ["2*(3+4*(5-2))", 30],
];
let pass = 0;
const fails = [];
for (const c of cases) {
  let got;
  try { got = evalExpr(c.in); } catch (e) { got = "ERR:" + e.message; }
  if (typeof got === "number" && Math.abs(got - c.out) < 1e-9) pass++;
  else fails.push(["public", c.in, c.out, got]);
}
let epass = 0;
for (const [inp, out] of extra) {
  let got;
  try { got = evalExpr(inp); } catch (e) { got = "ERR:" + e.message; }
  if (typeof got === "number" && Math.abs(got - out) < 1e-9) epass++;
  else fails.push(["extra", inp, out, got]);
}
const bytes = fs.statSync("./index.js").size;
console.log(`public: ${pass}/${cases.length}  extra: ${epass}/${extra.length}  bytes: ${bytes}`);
if (fails.length) { console.log("FAILURES:", JSON.stringify(fails, null, 2)); process.exit(1); }
console.log("ALL TESTS PASS");
