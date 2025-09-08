# Plan Review: UI Snapshot Capture Plan

> **Original Plan**: `docs/ui-snapshot-capture/PLAN.md`  
> **Review Date**: September 7, 2025  
> **Review Scope**: Implementation feasibility and optimization opportunities against current architecture  

## Executive Summary

- **Plan Status**: Unimplemented - no capture tooling currently exists in the repository
- **Architectural Alignment**: Well-aligned with existing Vue 3 + Vite SSG architecture and CI/CD patterns
- **Consolidation Impact**: Plan could leverage existing test infrastructure and CI patterns; minor documentation consolidation opportunities
- **Recommended Action**: **MODIFY** - Proceed with implementation but optimize against existing patterns and consolidate with current testing approach

## Current State Analysis

### Completed Components
- ✅ **Application Architecture**: Vue 3 + Vite SSG with target routes (`/`, `/about`, `/articles`, `/resume`, `/pdf`) is fully operational
- ✅ **CI/CD Infrastructure**: GitHub Actions workflows (`infra-app.yml`, `infra-base.yml`) established and functional
- ✅ **Build Process**: SSG build to `app/build/` with `pnpm build` command working
- ✅ **Testing Framework**: Vitest configuration with jsdom environment operational

### Remaining Components
- ❌ **Capture Script**: No `scripts/capture.mjs` exists
- ❌ **Capture Dependencies**: No Playwright or headless Chrome tooling installed
- ❌ **Route Configuration**: No `routes.json` or route list defined
- ❌ **Output Management**: `docs/ui-snapshot-capture/ui/` directory structure not established

### Existing Infrastructure Opportunities
- 📁 **Extensive Component Snapshots**: Jest/Vitest snapshots already exist in `app/tests/unit/pdf/__snapshots__/` and `app/tests/unit/start/__snapshots__/` (>150KB of component-level snapshots)
- 🔧 **Package Management**: pnpm 7+ with script infrastructure ready
- 🏗️ **CI Build Process**: App builds and deploys successfully, artifact upload patterns established

## Lessons Learned Integration

### Identified Anti-Patterns to Avoid
- **Duplicate Tooling**: Plan should acknowledge existing snapshot testing infrastructure and explain complementary role
- **Dependency Bloat**: Playwright installation size/time noted as risk - consider alternatives or on-demand installation
- **Process Isolation**: Keep UI capture separate from component testing to avoid confusion

### Current Architectural Patterns
- **Build Output**: Consistent use of `app/build/` for SSG output - plan aligns correctly
- **Script Organization**: No top-level `scripts/` directory exists - consider `app/scripts/` or `.github/scripts/`
- **Documentation Structure**: `docs/` directory with feature-specific subdirectories follows established pattern

## Optimization Recommendations

### Consolidation Opportunities
1. **Script Location Optimization**:
   - Move from `scripts/capture.mjs` to `app/scripts/capture.mjs` to keep tooling with the application
   - Alternative: `.github/scripts/ui-capture.mjs` if primarily for CI use

2. **Dependency Management**:
   - Use `pnpm dlx playwright` approach mentioned in plan to avoid permanent dependency
   - Consider Chrome headless alternative first (system dependency, no install time)

3. **Documentation Consolidation**:
   - Merge route definitions into existing app configuration rather than separate `routes.json`
   - Reference existing testing documentation patterns

### Implementation Efficiency Improvements
1. **Route Discovery**:
   ```javascript
   // Instead of static routes.json, discover from vite-ssg sitemap or router
   // Leverage existing vue-router configuration in app/src/router/
   ```

2. **CI Integration Optimization**:
   - Reuse existing `app/build` artifacts from main build job
   - Add capture as optional job that depends on successful build

3. **Output Management**:
   - Consider organizing by timestamp/branch: `docs/ui-snapshot-capture/ui/{branch}-{timestamp}/`
   - Add `.gitignore` patterns to avoid committing large snapshots if not desired

### Context Updates
- **Testing Relationship**: Clarify relationship between UI snapshots (full-page) vs component snapshots (unit testing)
- **Build Process**: Leverage existing `pnpm preview --host --port 4173` pattern
- **CI Artifacts**: Follow existing artifact patterns from current CI configuration

## Action Items

- [ ] **Relocate script**: Move capture script to `app/scripts/` instead of top-level
- [ ] **Route Integration**: Extract routes from Vue Router config instead of separate JSON file
- [ ] **Documentation Alignment**: Update plan to reference existing testing infrastructure
- [ ] **Dependency Strategy**: Implement Chrome headless first, Playwright as fallback
- [ ] **CI Integration**: Design as extension of existing `infra-app.yml` workflow
- [ ] **Output Strategy**: Define retention policy for snapshot artifacts

## Impact Assessment

### Code/Doc Reduction Potential
- **Lines Saved**: ~50 lines by reusing existing route configuration
- **Files Reduced**: Eliminate separate `routes.json` by leveraging Vue Router
- **Documentation Overhead**: Minimal - plan already well-structured

### Implementation Efficiency
- **Time Saved**: ~2-4 hours by leveraging existing CI patterns and build process
- **Maintainability**: Higher by aligning with existing script organization patterns

### Architecture Alignment
- **Consistency**: Improved by following established `app/scripts/` pattern
- **Clarity**: Better separation between component snapshots (testing) and UI snapshots (documentation)

## Future Considerations

### Long-term Alignment
- Plan fits well into documentation strategy for visual regression and review processes
- Could evolve into automated visual regression testing if needed
- Aligns with existing artifact-based review processes in CI

### Lessons Learned Updates
- **Script Organization**: Document preference for `app/scripts/` over top-level `scripts/`
- **Capture Tooling**: Capture experience with Chrome headless vs Playwright trade-offs
- **CI Integration**: Document pattern for optional artifact generation jobs

---

**Review Outcome**: **MODIFY** - Proceed with optimized implementation  
**Primary Recommendation**: Relocate script to `app/scripts/`, integrate with Vue Router for route discovery, and align with existing CI patterns  
**Quick Wins**: 
1. Start with Chrome headless to avoid Playwright installation overhead
2. Reuse existing `pnpm preview` setup from package.json
3. Leverage existing CI build artifacts to avoid duplicate builds

## Modified Implementation Priority

1. **Phase 1**: Chrome headless implementation in `app/scripts/capture.mjs`
2. **Phase 2**: Route discovery from Vue Router configuration  
3. **Phase 3**: CI integration as optional job extending existing workflow
4. **Phase 4**: Playwright fallback if Chrome headless proves insufficient