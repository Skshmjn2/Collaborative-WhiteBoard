import { useSelf,useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useMutation(({storage,setMyPresence}) => {
        const livelayers = storage.get("layers");
        const livelayersIds = storage.get("layerIds");

        for(const id of selection){
            livelayers.delete(id);
            const index = livelayersIds.indexOf(id);

            if(index !== -1){
                livelayersIds.delete(index);
            }
        }

        setMyPresence({selection: []}, {addToHistory: true})
    }, [selection])
};