
/**
 * Store the character frequency for the given array of content
 * @param contentArray raw content array
 * @param mapFunction transformation function to obtain the string arrays
 * @param resultSet reference object to store the frequency
 * @returns resultSet reference
 */
export function stringCharFrequency(contentArray: any[], mapFunction: (value: any, index: number) => string, resultSet: any): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            resultSet.frequency = (resultSet.frequency || {});
            contentArray
                //Clear the data
                .map(mapFunction)
                .forEach((text) => {
                    for (let i = 0; i < text.length; i++) {
                        let char = text.charAt(i);
                        resultSet.frequency[char] = (resultSet.frequency[char] ? resultSet.frequency[char] + 1 : 1);
                    }
                });
            resolve(resultSet);

        } catch (exception) {
            reject(exception);
        }


    });
}