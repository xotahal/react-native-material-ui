# Material React Native

This is currently a loose fork from the original [mrn](https://github.com/binggg/mrn) repository which is still a work in progress.

Please use the original repository until this is in a stable state.

## Changes

- ESLint / Cleanup
- Various bug fixes
- Use of the default MaterialIcons vector icons (allows for much simpler installation)

Please see the [roadmap](https://github.com/binggg/mrn/issues/22) on the original repository for more information.

## React Native 0.16

This library only works with React Native 0.16 due to the breaking changes with Babel and font loading it introduced.

## Known Issues

- The `List` component has currently not yet been ported over.
- Disabled elements still trigger the ripple animation.