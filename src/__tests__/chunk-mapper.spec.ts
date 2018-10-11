import * as compilation from '../../dev/fixtures/compilation';
import * as cm from '../chunk-mapper';

const clearMaps = () => {
    cm.chunksMap.clear();
    cm.entriesMap.clear();
};

describe('mapToObject()', () => {
    it('converts Maps into plain objects', () => {
        const map = new Map();
        const fn1 = () => {};
        const fn2 = () => {};
        map.set('rofl', 'lol');
        map.set(1234, 5678);
        map.set(fn1, fn2);
        const result = cm.mapToObject(map);
        expect(result).toMatchObject({
            "rofl": 'lol',
            '1234': 5678,
            '() => { }': fn2,
        });
    });
});

describe('addEntry()', () => {
    let chunkGroup;

    beforeEach(() => {
        chunkGroup = {
            name: 'c1',
            chunks: [],
        };
    });

    it('registers entries', () => {
        cm.addEntry(chunkGroup);
        expect(cm.entriesMap.has('c1')).toBe(true);
    });

    it('doesn\'t overwrite previously registered entries', () => {
        const spy = jest.spyOn(cm.entriesMap, 'set');
        cm.addEntry(chunkGroup);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('mapDependencies()', () => {
    let name;
    let chunks;

    beforeEach(() => {
        clearMaps();
        name = 'c1';
        chunks = [
            { name: 'c1', hash: '123', files: [] },
            { name: 'c2', hash: '456', files: [] },
            { name: 'c3', hash: '789', files: [] },
        ];
    });

    it('maps an entrie\'s dependencies by chunk name', () => {
        const result = cm.mapDependencies(name, chunks);
        expect(result[0]).toBe('c2');
        expect(result[1]).toBe('c3');
    });
});

describe('addChunk()', () => {
    let chunk;

    beforeEach(() => {
        chunk = {
            name: 'c1',
            hash: '123',
            files: ['nice/job/man.bundle.js'],
        };
    });

    it('registers chunks', () => {
        clearMaps();
        cm.addChunk(chunk);
        expect(cm.chunksMap.has('c1')).toBe(true);
        expect(cm.chunksMap.get('c1')).toMatchObject({
            file: chunk.files[0],
            hash: chunk.hash,
        });
    });

    it('doesn\'t overwrite previously registered chunks', () => {
        const spy = jest.spyOn(cm.chunksMap, 'set');
        cm.addChunk(chunk);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('makeManifest()', () => {
    beforeEach(() => {
        clearMaps();
    });

    it('makes a manifest of entries and chunks', () => {
        const result = cm.makeManifest(compilation);
        expect(result).toMatchObject({
            entries: {
                c1: {
                    deps: ['c2'],
                },
                c3: {
                    deps: ['c4'],
                },
            },
            chunks: {
                c1: {
                    file: compilation.chunkGroups[0].chunks[0].files[0],
                    hash: compilation.chunkGroups[0].chunks[0].hash,
                },
                c2: {
                    file: compilation.chunkGroups[0].chunks[1].files[0],
                    hash: compilation.chunkGroups[0].chunks[1].hash,
                },
                c3: {
                    file: compilation.chunkGroups[1].chunks[0].files[0],
                    hash: compilation.chunkGroups[1].chunks[0].hash,
                },
                c4: {
                    file: compilation.chunkGroups[1].chunks[1].files[0],
                    hash: compilation.chunkGroups[1].chunks[1].hash,
                },
            },
        });
    });
});
