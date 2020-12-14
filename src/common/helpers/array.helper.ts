/**
 * Flatten an array with the given field
 * @param array  array to be flatted
 * @param field  reference field
 */
export function flatten(array:any[],field:string) : any[]{
    return array.reduce((acc,value)=>[...acc,...value[field]],[]);
}


/**
 * @description Initialize array with the given length and value
 * @param array array to be initialized
 * @param length length to be set
 * @param defaultValue values used to fill the array
 */
export function initialize(array:any[], length:number, defaultValue:any) : any[]{
    array.length = length;
    array.fill(defaultValue);
    return array;
}