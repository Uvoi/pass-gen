import { getPassword } from "./generate";
import type { ArgonParams } from "./generate";

type WorkerInput = {
    masterKey: string;
    key: string;
    tag: string;
    params: ArgonParams;
};

self.onmessage = async (e: MessageEvent<WorkerInput>) => {
    const { masterKey, key, tag, params } = e.data;
    const password = await getPassword(masterKey, key, tag, params);
    self.postMessage(password);
};
