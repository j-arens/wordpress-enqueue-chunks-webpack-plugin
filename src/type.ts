import { compilation } from 'webpack';

export interface Options {
    context?: 'plugin' | 'theme';
    namespace?: string;
    delimiter?: string;
    assetsDir: string;
    phpScriptDir: string;
}

export interface EntryMeta {
    deps: string[];
}

export interface ChunkMeta {
    hash: string;
    file: string;
}

export type Entries = Record<string, EntryMeta>;
export type Chunks = Record<string, ChunkMeta>;

export interface Manifest {
    entries: Entries;
    chunks: Chunks;
}

export interface ChunkGroup {
    name: string;
    chunks: compilation.Chunk[];
}
