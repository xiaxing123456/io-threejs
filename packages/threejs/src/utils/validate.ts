/**
 * 判断是否为空
 * 空: true
 */
export function validateNull(val: any): boolean {
    // 判断是否为 null 或 undefined
    if (val === null || val === '' || val === undefined) return true;
    // 判断是否为数组且为空
    if (val instanceof Array && val.length === 0) return true;
    // 判断是否为对象且为空
    if (val instanceof Object && Object.keys(val).length === 0) return true;
    // 如果是 boolean 或 number，一定不为空
    if (typeof val === 'boolean' || typeof val === 'number') return false;
    return false;
}
