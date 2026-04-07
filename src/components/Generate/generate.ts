import { argon2id } from "hash-wasm";

const getNormalized = (value: string) => (value.trim().toLowerCase());

const getSalt = (normalizedKey: string, tag: string) => (`${normalizedKey}:${tag || 'default'}:v1`);

const getHash = async (masterKey: string, salt: string) => 
    (await argon2id({
        password: masterKey,
        salt: salt,
        parallelism: 1,
        iterations: 3,
        memorySize: 65536,
        hashLength: 32,
        outputType: "binary", 
    }));

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function mapToCharset(bytes: Uint8Array, length: number) {
    let result = "";

    for (let i = 0; i < length; i++) {
        const byte = bytes[i];
        result += charset[byte % charset.length];
    }

    return result;
}

export const getPassword = async (masterKey: string, key: string, tag: string) =>
{
    const normalizedMasterKey = getNormalized(masterKey);
    const normalizedKey = getNormalized(key);
    const normalizedTag = getNormalized(tag);

    const salt = getSalt(normalizedKey, normalizedTag);

    const hash = await getHash(normalizedMasterKey, salt);

    const finalPassword = mapToCharset(hash, 16);

    return finalPassword;
}