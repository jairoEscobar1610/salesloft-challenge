/**
 * Flatten an array with the given field
 * @param array  array to be flatted
 * @param field  reference field
 */
export function flatten(array:any[],field:string) : any[]{
    return array.reduce((acc,value)=>[...acc,...value[field]],[]);
}