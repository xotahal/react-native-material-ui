module.exports = {
  branches: [
    { name: 'master', type: 'release' },
    { name: 'develop', type: 'prerelease', prerelease: 'alpha' },
    { name: 'beta', type: 'prerelease', prerelease: 'beta' },
    { name: 'rc-*', type: 'prerelease', prerelease: 'rc' },
  ],
}
