export default function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}
