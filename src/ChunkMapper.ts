import { compilation } from 'webpack';
import {
    ChunkGroup,
    Chunks,
    Entries,
    Manifest,
} from './type';

const entriesMap = new Map();
const chunksMap = new Map();

const mapToObject = <T>(map: Map<any, any>): T | {} => Array.from(map.entries())
    .reduce((obj, [ k, v ]) => {
        obj[String(k)] = v;
        return obj;
    }, {});

function addEntry({ name, chunks }: ChunkGroup) {
    if (entriesMap.has(name)) {
        return;
    }
    entriesMap.set(name, {
        deps: mapDependencies(name, chunks),
    });
}

function mapDependencies(name: string, chunks: compilation.Chunk[]): string[] {
    return chunks
        .filter(chunk => {
            addChunk(chunk);
            return chunk.name !== name;
        })
        .map(c => c.name);
}

function addChunk({ name, hash, files }: compilation.Chunk) {
    if (chunksMap.has(name)) {
        return;
    }
    chunksMap.set(name, {
        file: files[0],
        hash,
    });
}

export function makeManifest(comp: compilation.Compilation): Manifest {
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: mapToObject<Chunks>(chunksMap),
        entries: mapToObject<Entries>(entriesMap),
    };
}
