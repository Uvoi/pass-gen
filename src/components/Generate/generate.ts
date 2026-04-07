import { argon2id } from "hash-wasm";

const getNormalized = (value: string) => (value.trim());

const getSalt = (normalizedKey: string, tag: string) => (`${normalizedKey}:${tag || 'default'}:v1`);

export type ArgonParams = {
    iterations: number;
    memorySize: number;
    hashLength: number;
};

const getHash = async (masterKey: string, salt: string, params: ArgonParams) => 
    (await argon2id({
        password: masterKey,
        salt: salt,
        parallelism: 1,
        iterations: params.iterations,
        memorySize: params.memorySize,
        hashLength: params.hashLength,
        outputType: "binary", 
    }));

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function mapToCharset(bytes: Uint8Array, length: number) {
    const limit = 256 - (256 % charset.length);
    let result = "";
    let i = 0;

    for (const byte of bytes) {
        if (byte >= limit) continue;
        result += charset[byte % charset.length];
        if (++i === length) break;
    }

    return result;
}

export const getPassword = async (masterKey: string, key: string, tag: string, params: ArgonParams) =>
{
    const normalizedMasterKey = getNormalized(masterKey);
    const normalizedKey = getNormalized(key);
    const normalizedTag = getNormalized(tag);

    const salt = getSalt(normalizedKey, normalizedTag);

    const hash = await getHash(normalizedMasterKey, salt, params);

    const finalPassword = mapToCharset(hash, params.hashLength);

    return finalPassword;
}