module.exports = {
    src: ['./lib'],
    includeDeclarations: false,
    tsconfig: 'tsconfig.json',
    excludePrivate: true,
    excludeExternals: true,
    excludeProtected: true,
    excludeNotExported: true,
    readme: 'README.md',
    name: 'Immutable',
    ignoreCompilerErrors: true,
    listInvalidSymbolLinks: true
};