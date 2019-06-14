"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesMap = new Map();
exports.chunksMap = new Map();
exports.mapToObject = (map) => Array.from(map.entries())
    .reduce((obj, [k, v]) => {
    obj[String(k)] = v;
    return obj;
}, {});
function addEntry({ name, chunks }) {
    if (exports.entriesMap.has(name)) {
        return;
    }
    exports.entriesMap.set(name, {
        deps: mapDependencies(name, chunks),
    });
}
exports.addEntry = addEntry;
function mapDependencies(name, chunks) {
    return chunks
        .filter(chunk => {
        addChunk(chunk);
        return chunk.name !== name;
    })
        .map(c => c.name);
}
exports.mapDependencies = mapDependencies;
function addChunk({ name, hash, files }) {
    if (exports.chunksMap.has(name)) {
        return;
    }
    exports.chunksMap.set(name, {
        file: files[0],
        hash,
    });
}
exports.addChunk = addChunk;
function makeManifest(comp) {
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: exports.mapToObject(exports.chunksMap),
        entries: exports.mapToObject(exports.entriesMap),
    };
}
exports.makeManifest = makeManifest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstbWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NodW5rLW1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFhLFFBQUEsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkIsUUFBQSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV0QixRQUFBLFdBQVcsR0FBRyxDQUFJLEdBQWtCLEVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2xGLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsRUFBRSxFQUFFO0lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFWCxTQUFnQixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFjO0lBQ2pELElBQUksa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsT0FBTztLQUNWO0lBQ0Qsa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2pCLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztLQUN0QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsNEJBT0M7QUFFRCxTQUFnQixlQUFlLENBQUMsSUFBWSxFQUFFLE1BQTJCO0lBQ3JFLE9BQU8sTUFBTTtTQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNaLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO0lBQy9CLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBUEQsMENBT0M7QUFFRCxTQUFnQixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBcUI7SUFDN0QsSUFBSSxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQixPQUFPO0tBQ1Y7SUFDRCxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJO0tBQ1AsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELDRCQVFDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLElBQTZCO0lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkQsT0FBTztRQUNILE1BQU0sRUFBRSxtQkFBVyxDQUFTLGlCQUFTLENBQUM7UUFDdEMsT0FBTyxFQUFFLG1CQUFXLENBQVUsa0JBQVUsQ0FBQztLQUM1QyxDQUFDO0FBQ04sQ0FBQztBQU5ELG9DQU1DIn0=