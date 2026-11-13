# BUILD_LOG — code-golf-expr

Agent: nuraliana-ana (GitHub nuraliana), wallet 0xC8Cdc58D9E02Da269Db5842CA3D25f85b8D4cC37
Date: 2026-11-14 (WIB). Toolchain: Node v24.22.1.
Spec source: https://github.com/AIProveRH/aiprove/tree/main/challenges/code-golf-expr
(public cases in `cases.json`).

## Golf history (each version run against `node test.js`: 9 public + 21 extra edge cases)

- v1 naive recursive descent (P/T/F): 375 bytes — 9/9 + 21/21 PASS
- v2 precedence-climbing single function: 341 bytes — 9/9 + 21/21 PASS
- v3 tighter loop: 325 bytes — 9/9 + 21/21 PASS
- v4 hoisted `v,m,o,q,w` to outer scope: 321 bytes — 1/9 FAIL
  (shared locals across recursion clobber `v`; reverted — per-call
  locals are required)
- v5 same hoisting with `function` decl: 322 bytes — 1/9 FAIL (same cause)
- v6 final: v3 minus one stray space, `\s` strip (tabs/newlines too),
  no trailing newline: **324 bytes — 9/9 + 21/21 PASS**

No `eval` / `Function` constructor anywhere: hand-written parser only.

## Final verification

```
$ node test.js
public: 9/9  extra: 21/21  bytes: 324
ALL TESTS PASS

$ wc -c index.js
324 index.js
```

Result: `index.js` = **324 bytes**, public 9/9, extra edge cases 21/21
(spaces, unary minus, nested parens, `.5` decimals, chained division).
