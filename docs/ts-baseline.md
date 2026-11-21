# TypeScript Baseline

## Comparison

- Pre-Fase A: `fccf4a3`
- Fase A: `0891ad4`
- The full application typecheck (`NODE_OPTIONS=--max-old-space-size=4096 pnpm exec tsc --noEmit -p artifacts/numatik/tsconfig.json`) was terminated by `SIGTERM` for both commits, before diagnostics were produced.
- To compare the commits, the same targeted TypeScript program was run for the changed i18n entry points and these material folders: `aljabar`, `bilangan-bulat`, `bilangan-rasional`, `garis-singgung-lingkaran`, `himpunan`, `koordinat-cartesius`, and `lingkaran`.
- The baseline produced 278 diagnostics across those roots. Fase A produced the same 278 diagnostics; after normalizing temporary worktree paths, the diagnostic lists were identical. No new diagnostic was found in this comparison.

## Baseline diagnostics by folder

| Folder | Diagnostics |
| --- | ---: |
| `aljabar` | 16 |
| `bilangan-bulat` | 14 |
| `bilangan-rasional` | 144 |
| `garis-singgung-lingkaran` | 17 |
| `himpunan` | 6 |
| `koordinat-cartesius` | 29 |
| `lingkaran` | 38 |
| Imported shared components | 14 |
| **Total** | **278** |

## Baseline diagnostic categories

| Code | Count | Existing diagnostic |
| --- | ---: | --- |
| TS2339 | 1 | `DiagramVennPage.tsx`: property `lang` does not exist on the selected translation object. |
| TS2345 | 2 | `BusurJuringPage.tsx`: `RefObject<SVGSVGElement \| null>` is not assignable to `RefObject<SVGSVGElement>`. |
| TS2367 | 4 | `KaitanBangunDatarLainnyaPage.tsx`: comparisons between the literal strings `"Dikurangi"` and `"Subtraction"` have no overlap. |
| TS7006 | 70 | Parameters implicitly have type `any`. |
| TS7016 | 53 | No declaration file for module `react-katex`. |
| TS7031 | 104 | Destructured binding elements implicitly have type `any`. |
| TS7053 | 44 | A six-language `Language` value indexes translation maps containing only `id`, `en`, and `ja`. |

These are pre-existing baseline diagnostics, not regressions in commit `0891ad4`. They are recorded for comparison and are not authorized for repair under the baseline-only scope.

## Shared component diagnostics

The following imported components had 14 baseline diagnostics, and the same diagnostics were present in `0891ad4`:

| File | Baseline message |
| --- | --- |
| `src/components/FactorTreeAnimation.tsx` | TS7053: `Language` indexes a map containing only `id`, `en`, and `ja`; TS7006: parameters `label` and `i` implicitly have type `any`. |
| `src/components/FractionCircleAnimation.tsx` | TS7016: no declaration file for `react-katex`; TS7053: `Language` indexes a map containing only `id`, `en`, and `ja`. |
| `src/components/FractionMultiplicationAnimation.tsx` | TS7016: no declaration file for `react-katex`. |
| `src/components/JarakDuaTitikInteraktif.tsx` | TS7016: no declaration file for `react-katex`. |
| `src/components/JarakTitikKeGarisInteraktif.tsx` | TS7016: no declaration file for `react-katex`. |
| `src/components/RangkumanSection.tsx` | TS7016: no declaration file for `react-katex`. |
| `src/components/SudutPusatInteraktif.tsx` | TS7053: `Language` indexes a map containing only `id`, `en`, and `ja`. |
| `src/components/SudutPusatProofAnim.tsx` | TS7016: no declaration file for `react-katex`; TS7053: `Language` indexes a map containing only `id`, `en`, and `ja`; TS7006: parameters `_` and `i` implicitly have type `any`. |
